# Command-Line Applications in Node.js

Today, I decided that the command-line app I'm building is too slow to load.  It looks like this when you're using it:
 
````
app sub-command [ arguments ... ] [ options ... ]

````

e.g.


````
npm install commander

````

With this structure, sub-commands like `install` are the actions that a user would most probably want to take. This is what my cli app looks like: 

````
app stats
app run
app health
app query <name> <date-range>
app update

````

`stats` provides an overall synopsis. `run` starts a local web-server to facilitate an OAuth2 process, and opens a webpage to the address of its index page. `health` reports the vital statistics, like database table-counts, row-counts, date of last API acquisition. `query` acquires project data, and `update` updates the command-line application itself.

By the way, I'm being intentionally opaque about a lot of the details of my actual app because they don't matter. I hope that you conceive of it as just 5 related commands that help a user in some discrete aspect of their work. Furthermore, the app is fundamentally very simple: 5 entirely mutually-exclusive paths. That's not very complex, it's just a lot of work.

## Find a Nice Parsing Library 

When I started building this, I thought like I usually do at first: "Oh, I don't need a parsing library, it's just a few things". But someone's paying me for prompt and functional software. I need to be paying attention to critical stuff like accuracy, reliability and upgradeability. So I had to find a parsing library.

It took me all of 5 seconds to find out that TJ Holowaychuck, author of Express, has a Node library [commander](https://github.com/tj/commander.js). Knowing that TJ wrote Express, I figured this wouldn't be too difficult to pickup.  He writes nice APIs.

Now, after you google "node.js command line app" and see maybe ... [commander](htts://github.com/tj/commander.js) ... you go looking for it. Then you may have what I consider a characteristically Node.js experience. Go to the GithHb, 6 commits, okay. Not many files either, but a pretty clean API. Is anyone here? You walk through an empty room, your well-heeled shoes making dark clacks in the dark space, and then you get to issues page: yes! People are here. Is this too good to be true ? (a few months pass ... ) no, it is the real thing. 

All that to say that commander is good. I appreciate its simplicity and transparency and find it enjoyable to use. But I couldn't really figure out how to best avoid loading everything for every command within the paradigm of this library.

This was my explicit hypothesis, that the dependencies were slowing everything down.

# I'll Explain the Problem in More Detail

So you, with modularity in mind, start writing this with an index file that tries to deal just with commander, requiring modules that do the actual work and passing them to the commander callback registration functions.  But the `require(module)` statement will pull in that module whether the user runs the command or not. Each module is being loaded upfront as part of the standard execution. Here's a code example:

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

...

cli.parse(process.argv);

````

# How to Load the Libraries You Need and No More

Since the paths are mutually exclusive, one is naturally going to try to load on the modules that are needed. How can we gain more control over the time that `require` is executed?

Require is synchronous, meaning it occurs with that guarantee that if you add `4 + require('5.js')` and `5.js` exports 5, you will have 9 because Node will wait for the require call to finish before moving on. So you can thus put require in another function and call that function at a later time. Since `commander` takes a callback as functions to run for a given sub-command, we should register a function with each command callback that returns a function which requires the necessary dependencies. That is a little hard to visualize maybe so here's some code: 


````

const cli = require('commander');

/* New from Here Down */

const basepath = __dirname + '/commands';
const makeLoader = function(name) {

    return function() {

        require(`${basepath}/${name}`).apply(this, arguments);

    };

};

const loaders = [

    'stats', 'run', 'query', 'health', 'update'

]
.reduce((o, dep) => {

   o[dep] = makeLoader(o);

}, {});

{ stats, run, query, health, update } = loaders; 

/* New from Here Up */

cli
    .command('stats')
    .description('gives you stats.')
    .action(stats);

cli
    .command('run')
    .description('runs the app')
    .action(run);

...

cli.parse(process.argv);

````

