<br>
# CanJS Tutorial Part 1  

## Using StealJS to build a basic app

<br>

### Goals

The goal of this tutorial is to introduce the process of building a simple CanJS page from scratch using the StealJS module loader. It will cover installing dependencies and setting up a `package.json` file with npm, using the `steal` build function, and binding data to a template and building behavior around that data with custom CanJS event attributes. We'll run the app on a local development server. 


### Preface

Why are we using a module loader instead of script tags for our code?

- **Organization**: Modules are beneficial for complex architectures because they allow you to write isolated units of code and inject them easily into different parts of your application. This affords you greater organization and testability. Before module loaders were available, it was a best practice for JavaScript developers to wrap a module in an [IIFE](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression) to isolate it from the global namespace, giving it module-like functionality.

- **Dependency management**: a complex application will require dependencies that require other dependencies that require other dependencies, etc. As the number of modules grow, the app's dependency relationships become increasingly difficult to maintain. A module loader will take care of the dependency tree for you, so you can focus on building your app instead of constantly having to re-order script tags. 

- **Speed**: In the case of StealJS, which is an asynchronous module loader, the app is able to start executing sooner because the module loading process is non-blocking, so modules can be loaded in 'parallel'. 

### The Demo Application

In terms of functionality, the demo app will be very simple: it merely demonstrates how to use `can-EVENT` attribute on an HTML element to manipulate it from your JavaScript code. Subsequent tutorials will explore the power of Can's data structures in more depth.

 The emphasis here is much more on StealJS and the central role of the `package.json` file when building an app with StealJS. I'll also cover the asynchronous structure of the steal function as well as the syntax for importing various types of modules.

### App Setup 

Here is a tree view of what our folder structure will look like:

````
/demo_app
    index.html
    package.json
    node_modules
    /app
        app.js
        app.stache
        app.less
````

We will manually create everything except for the  `node_modules` directory and the `package.json` file.

#### :: Install nvm and node 6.1 :: 

`npm install nvm`

`nvm install 6.1`

`nvm use 6.1`

`nvm current`

#### :: Create our application directories and files ::

`mkdir demo_app demo_app/app`

`touch demo_app/{index.html,app/app{.stache,.js,.less,_test.js}}`

`cd demo_app && ls -aR`

#### :: Initialize your app as a package :: 

It's important to create a `package.json` file **before** you start installing node modules, and to use the --save and --save-dev flags, so that your installations are recorded in the package. StealJS relies on this file to locate your application entry point and its node module dependencies. 

We can create a `package.json` file with this command:

`npm init`

Press `Enter` to accept each default, then type `yes` to accept them and write the `package.json` file to your application's root directory, which should be your current directory. 

#### :: Install the essential project dependencies ::

`npm install --save can steal`

#### :: Install a global development server if you don't already have it ::  

`npm install -g http-server`

#### :: Setting up the `index.html` and the `app/app.js` files ::

Open the `index.html` file and add or copy the following to it:

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

Notice the script tag at the end of the body tag.  This references the `steal.js` loading script. On the page load, `steal.js` will look in our `package.json` file for information about where to find the main application file and which dependencies it should treat as node modules when load the dependencies we specify in our code.

Open the `package.json` file and set the `main` entrypoint (the default is `index.js`) to `app/app`. This indicates that the application entrypoint is `app.js` inside of the `app` directory. The `.js` extension isn't necessary.

#### :: Testing that everything loads correctly ::

Run `http-server` from the root of your project directory, `demo_app`, and copy the `localhost` port location it outputs into your web-browser (StealJS needs a server to handle its request and won't load from the filesystem).  With no arguments, `http-server` should load at `localhost:8080`. If you need a different port, you can use the `-p` flag to specify an alternate.

Once you've loaded that page (which should be blank, we haven't added any code), open your web browser's developer console and ensure there are no `steal.js` or `app.js` errors. You can ignore `favicon.ico` 404 errors.

### Using StealJS 

StealJS is exposed as a single function that accepts as arguments:

+ a list of file paths as strings
+ a final callback function whose arguments are the loaded dependencies found at filepaths. 

It loads the modules located at the paths asynchronously but waits until they're all loaded.  At that point, you access them via the callback under the name spaces that you are able to  use them in a callback.  Here is a conceptual sketch demonstrating the conventions for specifying the three types of dependencies: 

+ node modules
+ absolute user module 
+ relative user module

**Note**: `steal` is also callable as a Promise, but that isn't covered in this tutorial.


Here is a conceptual `steal` call to demonstrate the three conventions above.  Note two things:

+ the order of the dependency paths is consistent with the order of the arguments passed into the callaback, except in the case of the `.less` file, which is not given a namespace because it would provide no benefit. 
+ The `!` at the end of the `.stache` and `.less` filepaths indicates that `steal` should not try to load them as JavaScript files.


````javascript

steal(

    'nodemodule',
    'absolute/user_module.js',
    './relative_user_module.js',
    './app.stache!',
    './app.less!',

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


#### Things to note about StealJS paths 

+ Even if you installed a node module and it's in the `node_modules` directory, you will still get an error from `steal` if it's not listed in your `package.json` file as well.  This is because StealJS uses this file to specifically resolve dependencies in your `node_modules` directory. This is why it's important to run `npm init` before you start installing anything, so that those dependencies are included and steal knows about them.
+ node modules are specified by name, not as file paths 
+ paths that start with './' are relative to the directory of the file you're working in
+ paths that do not start with './' are relative to the directory containing your applications entry point according to the package.json's 'main' entrypoint value
+ stache and less/css files should be suffixed with a '!'
+ stache files require a namespace in the steal callback in order to be used, but less/css files take effect whether you give them a namespace or not (and, in fact, you can't access the less/css file's contents this way).


#### The Demo Application

Now, let's get to work!

Open your `app/app.js` file and add the following:

````javascript
steal(
    'can',
    function(can){
        console.log(can);
    }
);

````

Here, I'm just logging the `can` object to confirm it's present. When I run this in google Chrome, I see this in the console:

````
Object {global: Window, VERSION: "@EDGE", isNode: false, isBrowserWindow: true, isWebWorker: false…}  
````

#### Creating and loading a stache template

To add a stache template, we need to create a `.stache` file. Earlier, we created a file called `app.stache` inside of the `app` directory. Open that file and add the following:

````html
<p>Hey <span>{{ name }}</span>, you are <span>{{ description }}</span>!</p>
````
Now open `app/app.js` and add a reference our  `app.stache` file:

````javascript
steal(
    'can',
    'app.stache!',
    function(can, appTemplate){
        console.log(appTemplate);
    }
);
````

Here i'm logging the `appTemplate` object to see what it is.  In the console, you'll see it's a function.  That is because when we reference a `.stache` file, what is returned is a function that now includes the template and is looking for a data object to merge with the template's parameters. This data argument is considered the 'context' in which the view file lives.

#### Attaching the stache template to our page

Let's use jQuery to attach the template to the `div` in our `index.html` with an id of `app`.

````javascript
steal(
    'can',
    'stache',
    function(can, appTemplate){
        $('#app').append(appTemplate);
    }
);
````

Consider this a gotcha.  The template renders (with notable blanks where the variable substitution should happen), but we haven't injected any data into it the template. We need to do that in order for the `.stache` file to make the variable substitions.  


````javascript
steal(
    'can',
    'stache',
    function(can, appTemplate){

        var data = {
            name: 'Alex',  
            adjective: 'cool',
            altAdjective: 'excellent'
        };

        var compiledTemplate = appTemplate(data); 
        $('#app').append(compiledTemplate);
    }
);
````

Consider this another gotcha! We see the data being merged with the template, so that's a success.  But what we've done wrong is compile the `appTemplate` rendering function with a vanilla JavaScript object.  It won't cause an error, but we also won't be able to achieve our goal of modifying the data underlying the view via interactions with view. We want to pass an object to `.stache` whose values are observable so that when an event happens to an element, and the handler function in our code modifies the data we've provided, we can see the result instantly in our view.

CanJS provides us with a few data structures for this, but I'm only going to talk about the `can.Map` in this part.  A `can.Map` is a data structure that wraps observable behavior around an ordinary JavaScript object.  By observability, I mean that a change in the model is reflected in the view, and a change in the view is reflected in the model. 

Let's make the following modifications to our code:

````javascript
steal(
    'can',
    'stache',
    function(can, appTemplate){

        // data is now an instantiated can.Map object
        var data = new can.Map({
            name: 'Alex',  
            description: 'very cool',
            altDescription: 'quite excellent'
        });

        var compiledTemplate = appTemplate(data); 
        $('#app').append(compiledTemplate);
    }
);
````

Now we are out of gotcha land! But we still have to add some behavior to our page. 
#### Adding description-swapping behavior to your view

If you reload your browser, nothing should have changed since the last modification we made. That is because we haven't attached any behavior to our view data.  So let's add a function called `swap` that swaps the `description` and `altDescription` properties on our `can.Map`. 

Open your `app/app_template.stache` file and add a `can-click` attribute to the `<span>` tag that holds the `attribute` parameter, giving it an event handler name of `swap`. It should look like this:

````html
<p>Hey <span>{{ name }}</span>, you are <span can-click="swap">{{ description }}</span>!</p>
````

Now in your `app/app.js` file, add a function to the `data` map, just below `altDescription`, that swaps `description` with `altDescription`:


````javascript
steal(
    'can',
    'stache',
    function(can, appTemplate){

        // data is now an instantiated can.Map object
        var data = new can.Map({
            name: 'Alex',  
            description: 'very cool',
            altDescription: 'quite excellent',
            swap: function() {
                var tmp = this.attr('description'); 
                this.attr('description', this.attr('altDescription'));
                this.attr('altDescription', tmp);
            }

        });

        var compiledTemplate = appTemplate(data); 
        $('#app').append(compiledTemplate);
    }
);
````

#### The arguments that `swap` receives 

We didn't explicitly pass any parameters to `swap`, but if you add this line into your swap function,

````javascript
console.log(arguments);
````

you should see something like `[Object, jQuery.fn.init[1], j…y.Event]` in the output of your console. This indicates that three arguments are passed to can DOM event handlers: 

+ The data 'context' of your event handler  
+ The jQuery-wrapped element
+ The jQuery-wrapped event

It is important to note that the data 'context' of the event handler is not a `can.Map`, so you unfortunately cannot modify it via the `attr` method or expect it to reflect any changes in your view.  It is a vanilla JavaScript object. However, you can do some useful things with it which we will explore in future tutorials (hint, call the `.indexOf` method on a `can.List` to get its index, should you wish to splice it).


#### What is `this` ? 

We are accessing the values in `data` using `this`.  Because `can.Map` is a constructor function, the execution context for its event handling method `swap` will be the object itself, so `this` will accordingly refer to the `data` object itself. So that is why we use `this` to refer to the properties on our `data` object.

#### Using `attr` 

Forgetting to use `attr` is a common CanJS gotcha.

We use the `attr` method to access the *observed* values that the `can.Map` data structure provides for us.  Remember to *always* use `attr` when working with CanJS  data structures, or you will implicitly lose that observability and be stuck wondering why your view isn't updating. 

#### The final result

Reload your browser and click on the description. If all goes well, you should see a the description alternate between the value of the `description` property and the `altDescription` property as they were defined on the first instantiation. 

