# CanJS Training Part I - A Demo App using StealJS

# Table of Contents

### Preface

We're using a module loader instead of a series of script tags in our html because:

- A module loader offers built-in module support which makes your app easier to organize, build and test in a modular fashion.  You don't have to wrap your modules in an [IIFE](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression) to keep them out of the global namespace. 
- A non-trivial application will require dependencies that require other dependencies that require other dependencies. As the number of modules grow, the app's dependency relationships become increasingly precarious and difficult to maintain. The module loader takes care of all of this for you, so you can focus on building your app. So if the node module installation and Steal configuration seems overly complicated, take it slow and make sure you really understand what you're doing.  If you do that, it will be one-time cost that will work in your favor for the rest of your application life-cycle. 
- The app can load faster because the dependency loading process is non-blocking 

The Demo Application:

The demo app will pretty simple at first, just demonstrating the interaction among StealJS, dependencies, stache templates and view models. The demo app will show a list of names and their character counts, as well as provide an input field to add new names. 

### 1. App Setup 

Here is a tree view of our application files:

````
/demo_app
    index.html
    package.json
    /app
        app.stache
        app.js
        app.less
        app_test.js
````

#### [ Install nvm and node 6.1 ]

`npm install nvm`

`nvm install 6.1`

`nvm use 6.1`

`nvm current`

#### [ Create our application root directory with its containing directories and the files necessary for our demo app (except the `package.json`, we'll use `npm init` to create that). ]

`mkdir demo_app demo_app/app`

`touch demo_app/{index.html,app/app{.stache,.js,.less,_test.js}}`

`cd demo_app && ls -aR`

#### [ Initialize your app as a package (required for the StealJS module loader we will be using) ] 

*Note*: It's important to create a `package.json` file before you start installing node modules for your project so that your installations are recorded in the package. StealJS relies on this file to locate dependencies when it loads your app.    

`npm init`

Press `Enter` to accept each default, then type `yes` to accept them and write the `package.json` file to your application's root directory, which should be your current directory. We will be using the `StealJS` module loader (also built by Bitovi), and this requires that we specify our app's main entry point in our `package.json` file.

#### [ Install the essential project dependencies: can, steal, steal-tools ]

`npm install can steal steal-tools`

#### [ Install the developer dependencies with the `--save-dev` flag: steal, steal-tools ]

`npm install mocha chai  --save-dev`

#### [ Install some useful global tools: http-server, jshint ]  

`npm install -g http-server jshint`

#### [ Setting up the `index.html` and the `app/app.js` files ]

Open the `index.html` file and add the following:

````html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
</head>
<body>
    <div id="app"></div>
    <script src="node_modules/steal/steal.js"></script>
</body>
</html>
````

Now, open the `package.json` file and change the `main` entrypoint value from the default (`index.js`) to `app/app`. This indicates that the application entrypoint is `app.js` inside of the `app` directory (the `.js` extension isn't necessary). When our webserver loads the `index.html` file, it will get to the `script` tag at the end of `<body>` tag and load the `steal.js` script.  The `steal.js` script will then look in the `package.json` file in the same directory to find the top-level application file and load its dependencies.

#### [ Testing that everything loads correctly ]

run `http-server` in the root of your project directory, `demo_app`, and copy the `localhost` port location it outputs into your web-browser (StealJS needs a server to handle its request and won't load from the filesystem).  With no arguments, `http-server` should load at `localhost:8080`. If you need a different port, you can use the `-p` flag to specify an alternate.

Once you've loaded that page, Open your web browser's developer console and ensure there are no `steal.js` or `app.js` errors. You can ignore `favicon.ico` 404 errors.

### 2. Using StealJS 

StealJS is exposed as a single function that accepts a list of string paths plus a final callback argument. It loads the modules located at the paths asynchronously and indeterministically (this provides a greater build speed than synchronous module loading), but waits until they're all loaded.  At that point, you access them via the callback under the name spaces that you are able to  use them in a callback.  Here is a conceptual sketch demonstrating the conventions for specifying the three types of dependencies: node modules, absolute and relative user modules.

````javascript

steal(

    'nodemodule',
    'absolute/user_module.js',
    './relative_user_module.js',
    './app_template.stache!',
    './app_style.less!',

    function(

        nodeModule,
        absoluteUserModule,
        relativeUserModule,
        appTemplate
        // no need to give css/less files a namespace  
        
    ) {
        // code goes here
    }
);

````

As noted earlier, even if a node module is in your base directory's `node_modules` directory, you will get an error if it's not in your `package.json` file as well, as StealJS uses this file to specifically resolve dependencies in your `node_modules` directory.

A few things to note about StealJS conventions:

+ node modules are specified by name, not as paths 
+ paths that start with './' are relative to the directory of the file you're working in
+ paths that do not start with './' are relative to the directory containing your applications entry point according to the package.json's 'main' entrypoint value
+ stache and less/css files should be suffixed with a '!'
+ stache files require a namespace in the steal callback in order to be used, but less/css files take effect whether you give them a namespace or not (and, in fact, you can't access the less/css file's contents this way).

Now, let's get to work on the demo application.
When I run this in google Chrome, I see seomthing like this in the console:

````
Object {global: Window, VERSION: "@EDGE", isNode: false, isBrowserWindow: true, isWebWorker: false…}  
````

Running that should output the top-level `can` object in your console.
