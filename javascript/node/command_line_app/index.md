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

All that to say that commander is good. I appreciate its simplicity and transparency and find it enjoyable to use. But I couldn't really figure out how to best avoid loading everything for every command.

This was my explicit hypothesis, that the dependencies were slowing everything down.

# I'll Explain the Problem in More Detail

So the problem starts when you require your libraries and define your command callbacks and secondary functions all in one file. You want to keep it simple and clean in a single file like TJ, but in thinking this, you conflate the aims of a library's documentation with those of the library user. 

# Step One

Divide the code into modules that corresond to the command paths, `run`, `update`, etc ... The simplest thing is to export a top level function from each module.

# Step Two

Add an `index.js` file that imports `commander` and the command functions you just created. Register each function with the commander application.

# Step Three

Call the 

+ in your main script you import the `commander` library and start registering commands and options on the object like `.command(doX)` and `.option(doY)`.

on the imported object as callbacks. Then you call 

# Don't Load Libraries That You Don't Need

Since the paths are mutually exclusive, it is possible that by not loading everything on very invocation . Each command was bearing the dependency loading cost of the entire app.

# How to Load Dependencies On Demand in Node



