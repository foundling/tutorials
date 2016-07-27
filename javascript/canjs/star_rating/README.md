# CanJS - Building Features with Components

# Goals 

The goals of this tutorial are:

+ Build two CanJS Components: a book component and a star-rating component
+ Wire them together so that they can share some data in a decoupled manner
+ Mock external API calls to retrieve product data via `can.fixture`

# Project Layout

This is what our file tree will look like:

````javascript
book_gallery/

    README.md
    index.html
    package.json

    node_modules/
        ...

    app/
        app.js
        app.stache
        app.less

        components/

            book/
                book.js
                book.stache
                book.less
                book_test.js

            star_rating/
                star_rating.js
                star_rating.stache
                star_rating.less
                star_rating_test.js

        models/
            books.js
            books_test.js

        services/
            book_service.js
            book_service_test.js
````
# Why Components ?

A component has a layer of abstraction around the implementation of its functionality. You use it through a distinct interface or api. If code having to know about other code is a problem, then a component is one solution because you can work it, think about it, update it, re-design it, etc.  in relative isolation, for the very reason that it doesn't depend on anything else. 

In CanJS, you compose widgets with HTML. 

Let's get started!

<br>

### Component Syntax

In the HTML markup, a CanJS component looks like an ordinary HTML tag:

````
<my-component></my-component>
````


It is considered a best practice to hyphenate your custom HTML elements' tag names, as this distinguishes them from native HTML elements and out of the way of the initial parser. See the 'Core Concepts' section in the [W3C Custom Elements spec](https://www.w3.org/TR/custom-elements/).  

<br>

### Visualizing the Markup

Let's visualize what our markup will look like. We want to loop through a list of book objects and show the book as well as its child star rating component. We can start like this.  The nesting ensures that the `star-rating` component is a child component of `product-book`.

````html
{{#each books}} 
<product-book>
    <star-rating />
</product-book>
{{#each-book}}
````


### Building the Book Component

Now, let's build out the `book` component in JavaScript. We'll do this by pulling in `can`, calling `can.Component.extend` and passing in an object literal that has four top-level properties, `tag`, `template`, `viewModel`, `events`. Only the first two are strictly necessary to instantiate a component, but lets leave the `viewModel` and `events` properties in for completeness.

Open `book_gallery/app/components/book/book.js` and add the following code:

````javascript
steal(
    'can',
    function(can) {
        can.Component.extend({
            tag: 'product-book',                 
            template: null,
            viewModel: {
            },
            events: {
            }

        }); 
    }
)
````

Can components are created differently than controls: they are instantiated as soon as you pull them into your code. This means that we'll be `steal`'ing this component into our main `app.js` file, but not doing anything with it beyond alotting it a namespace in `steal`'s callback.

Above, I left the `template` property `null`, but let's work with that now. As we've done before, we're going to reference a `stache` file that has the markup for our book component. We'll call it `bookTemplate` in the `steal` callback function and bind it to our `template` property as such. 
One final thing before we work on pulling this into our `app.js` file. Components have a few special events that fire at specific times and a useful event we could use in exploring components for the first time is the `inserted` event, which fires once the component is inserted into the `DOM`. Let's simply log 'book inserted' at that point. 

````javascript
steal(
    'can',
    './book.stache!',
    function(
        can,
        bookTemplate
    ) {
        can.Component.extend({
            tag: 'product-book',                 
            template: bookTemplate,
            viewMode: {},
            events: {
                'inserted': function() {
                    console.log('book inserted');
                }
            }
        }); 
    }
)
````

Okay, back to our `app.js` file.  Let's reference our main `app.stache` file as well as the component we just created.

````javascript
steal(
    'can',
    './app.stache!',
    'app/components/book/book.js',
    function(
        can,
        appTemplate,
        book
    ) {
        var compiledTemplate = appTemplate(/* pass view model in here */);
        $('#app').append(compiledTemplate);
    }
)
````

At this point, we need to get ahold of some book data, since we're not passing any data into the template renderer function.

### Mocking API calls with can.fixture

A `can.fixture` intercepts your ajax calls there. I'm going to open `book_gallery/app/services/book_service.js` and define a `can.fixture`. Note, it's a plugin so I'm going to explicitly include it.  
````javascript
steal(
    'can',
    'can/util/fixture/fixture.js',
    'models/books/books.js',
    function(
        can, fixture,
        books
    ){
        can.fixture('GET /books', function() {
            return books;  // a closure, coming from imported books
        });
    });
````
and then use it in my `app.js` file like this:

````javascript
steal(
    'can',
    './app.stache!',
    './app/services/book_service.js',
    'app/components/book/book.js',
    function(
        can,
        appTemplate,
        bookService,
        book
    ) {
        $.get('/books').then(function(books) {

            var compiledTemplate = appTemplate(books);
            $('#app').append(compiledTemplate);

        });
    }
)
````

All you need to do is call `can.fixture` or pull in a module that calls it to intercept get requests globally.

### Building the Star Rating Component

First, the template:

````html
<ul>
    {{#each stars}}
        <li 
            can-mouseenter="beginRating ." 
            can-mouseleave="clearRating ." 
            can-click="commitRating" 
            class="star {{#selected}}full{{else}}empty{{/selected}}"></li>
    {{/each}}
</ul>
````

So we have a list of stars that get rendered (these are unicode stars the css), and attached to each star there is some state toggling going on via the `can-mouseenter`, `can-mouseleave` and `can-click` attributes of the `<li>` element. Some of these event handlers are being called with the argument '`.`', which stands for the current object in the `stars` iteration. 

So how does that hook into the JavaScript? These `can-EVENT` handler attributes modify the state of the stars array in the following component definition.

It's a simplified version of what we're about to do (and there is one major bug in here regarding scope that we'll soon fix). We're creating a new observable list of star states and binding it to the `stars` property in the `viewModel`. 

````javascript
        return can.Component.extend({
            tag: 'star-rating',
            template: starRatingTemplate, 
            viewModel: {
                rated: {
                    value: false
                },
                stars: new can.List([
                    false,
                    false,
                    false,
                    false,
                    false,
                ]),
                rating: can.compute(function() {
                    // code that always returns the current rating 
                }),
                beginRating: function(star) {
                    // mouseover event handler that highlights all stars less than / equal in index to it 
                },
                commitRating: function() {
                    // click event handler code that freezes stars ui state  
                },
                clearRating: function() {
                    // code that un-freezes the stars ui state
                },
            }
        });
````

If you glance at the template again, you'll see this in the `star` class:

````html
    {{#selected}}full{{else}}empty{{/selected}}
````

Initially, this stache template will render a CSS class of `empty` because the stars are all set to `false`. When I hover over a star, the `beginRating` event handler fires and sets the stars less than or equal in index of my mouse's target star to true, which *then* triggers a change in the view as the `{{#selected}}full{{else}}empty{{/selected}}` conditional is re-evaluated and renders a CSS class of `full`.
