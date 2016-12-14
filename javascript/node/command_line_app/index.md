# Controlling Dependency Loading in Node.js Command-Line Applications

Recently, I've been building a command-line application to manage the data-acquisition process for a scientific study.  Today I admitted that it's just too slow to load and went about figuring out how to fix it.  The results were great! I'd like to write a little bit about how that went down.
 
````
app sub-command [ arguments ... ] [ options ... ]
````

e.g.


````bash
npm install commander
````

Sub-commands are the items of interest, but otherwise there's nothing that complicated going on from an interface standpoint. The app exposes exactly five, mutually-exclusive sub-commands:

````bash
app stats                       # hits an slqite3 database
app run                         # starts web server, opens Google Chrome, hits a database
app show <project metric>       # hits a database, outputs colored text
app query <name> <date-range>   # launches an API client, hits a database, makes a round of requests
app update                      # does a git pull from the master branch on the remote repo
````

## Enter Commander.js 

It took me all of 5 seconds to find `commander.js`. Commander is a nice, small and simple command-line application written by TJ Holowaychuk that exudes transparent feels and a great API. I recommend it.

## Enter the Problem: Loading everything every time. 

With modularity in mind, I broke the functionality into atomic units, assembled them into 5 top-level modules (really just standard non-constructor functions), and used the cli index.js file to simply register them as callbacks to the appropriate sub-command and kick off the parser. 

But I found that when running the app for the first time on a given day, the start up time was about 8 seconds! Subsequent proximal invocations of the command finish on the order of 300 to 400 milliseconds due to the OS cache. But for a user who is coming in and running this app for the first time in a given day, 8 seconds of start up time is unacceptable. I don't imagine I could get a Node app to run as fast as one of a coreutil written in C, but getting close is important. I mean, 8 fucking seconds !?!?

Before I get into how to fix this, here's a sample of my index.js file with the performance problem. 

````

const cli = require('commander');
const { stats, run, query, health, update } = require('./commands');

cli
    .command('stats')
    .description('gives you stats.')
    .action(stats);

cli
    .command('run')
    .description('runs the app')
    .action(run);

cli
    .command('query')
    .description('queries the API')
    .action(query);

cli
    .command('health')
    .description('checks the health of various things')
    .action(health);

cli
    .command('update')
    .description('updates the app')
    .action(update);

cli.parse(process.argv);

````

## How to Load the Libraries You Need and No More

So we want to control when we load our dependencies.  At the very least, this can be achieved by putting our require call inside of a function.

````
function delayedRequire() {

    require('dependency-name');

}
````

Woo! Problem solved. We can just pass something like this to commander's `.command` registration:

````
cli
    .command('stats')
    .description('gets stats')
    .command(delayedRequire);

````


Well ... almost.  Commander is going to pass the parsed arguments to the function registered by `.command`. So our `delayedRequire` function should do something with these arguments. Lets try that out.

````

function requireStats(...args) {
    
    // require returns the sub-command function
    // and we call the functions .apply method on the original arguments.

    require('./commands/stats').apply(this, args);

}

````

If you've never used the `.apply` method of a JavaScript function, it offers finer-grained control over how a function is called. In this case, you first specify the context for the invocation and you second specify an array of arguments (supplied from `delayedRequire` function in this case).

At this point, we might be tempted to start using our function. It requires the dependency only when we get around to calling it, it passes the cli-parsed arguments to the required module function. But it feels a little too boilerplate-y to register essentially the same function expression with the hardcoded dependency name in each `.command` call.   

So let's make a function that 1) accepts a dependency argument and 2) returns a function that takes in the command-line arguments from `commander`, requires the dependency and applies the second function's arguments to the function that require returns.

````
function makeLoader(dependencyName) {

    return function(...args) {
        require(dependencyName).apply(this, args);
    }

}

````

And now we can pass the dependency name to this function and be done with it. So here's what I came up with (including a few additional variations):


````
const cli = require('commander');
const basepath = './commands';
const makeLoader = function(name) {

    return function(...args) {

        require(`${basepath}/${name}`).apply(this, args);

    };

};

const callbacks = [

    'stats', 'run', 'query', 'health', 'update'

]
.reduce((o, dep) => {

   o[dep] = makeLoader(dep);
   return o;

}, {});

{ stats, run, query, health, update } = callbacks; 

cli
    .command('stats')
    .description('gives you stats.')
    .action(stats);

cli
    .command('run')
    .description('runs the app')
    .action(run);

cli
    .command('query')
    .description('queries the API')
    .action(query);

cli
    .command('health')
    .description('checks the health of various things')
    .action(health);

cli
    .command('update')
    .description('updates the app')
    .action(update);


cli.parse(process.argv);

````

