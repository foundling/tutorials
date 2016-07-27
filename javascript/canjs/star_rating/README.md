# CanJS - Building Features with Components

# Goals 

The goals of this tutorial are:

+ Build a book gallery out of CanJS Components
+ Relate them in a way that they can share specific data but stay relatively independent of one another
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

A component has a layer of abstraction around the implementation of its functionality which takes the form of an interface or API. If code having to know about other code is a problem in software development, then a component is one solution because when you conceive of code as components, you can think about it, work on it, develop it, etc., in a fair degree of isolation because it tries to depend on very little.

In CanJS, you can implement components with `can.Component.extend` and compose them with custom HTML tags. 

Let's get started!

### Component Syntax

In the HTML markup, a CanJS component looks like an ordinary HTML tag, except that it is hyphenated to distinguish itself from built-in HTML elements. For more information, see the 'Core Concepts' section in the [W3C Custom Elements spec](https://www.w3.org/TR/custom-elements/). 

````
<my-component></my-component>
````

### Visualizing the Markup

Let's visualize what our markup will look like. We want to loop through a list of book objects, rendering the book as well as its star rating. The goal is for the star rating to be contained within the book, but have a very loose relation to it, sending just one piece of information to the book: the rating. 

We can start like this.  

````html
{{#each books}} 
<product-book>
    <star-rating />
</product-book>
{{#each-book}}
````

The nesting of `star-rating` does two things:

+ It includes the markup of the `star-rating` within the `product-book` markup
+ It ensures that the `star-rating` component can be treated as a child component of `product-book`. 

There are a few things we need to add in order to send the `star-rating`'s rating value to the `product-book`. But first, let's build our first component, the book component.

# Building the Book Component

We'll do this by pulling in `can`, calling `can.Component.extend` and passing in an object literal that has four top-level properties, `tag`, `template`, `viewModel`, `events`. Only the first two are strictly necessary to instantiate a component, but lets leave the `viewModel` and `events` properties in for completeness.

Open `book_gallery/app/components/book/book.js` and add the following code:

````javascript
steal(
    'can',
    function(can) {
        can.Component.extend({
            tag: 'product-book',                 
            template: null,
            viewModel: {},
            events: {}
        }); 
    }
)
````

Can components are created differently than controls: they are only created by `extending` them, and they are instantiated as soon as you pull them into your code. This means that we'll be `steal`'ing this component into our main `app.js` file, but not doing anything with it beyond alotting it a namespace in `steal`'s callback.

Above, I left the `template` property `null`, but let's work with that now. As we've done before, we're going to reference a `stache` file that has the markup for our book component. We'll call it `bookTemplate` in the `steal` callback function and bind it to our `template` property as such. 
One final thing before we work on pulling this into our `app.js` file. Components have a few special events that fire at specific times. A useful event we could use in exploring components for the first time is the `inserted` event, which fires once the component is inserted into the `DOM`. Let's simply log 'book inserted' at that point. 

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
        var compiledTemplate = appTemplate(/* something important goes here */);
        $('#app').append(compiledTemplate);
    }
)
````

At this point, we need to get ahold of some book data and send it into `appTemplate`. We can do that with mock data by registering a REST call with `can.fixture` to intercept.

# Mocking API calls with can.fixture

Registering a `can.fixture` to the path `GET /books` will intercept any AJAX call we make to `/books`. I'm going to open `book_gallery/app/services/book_service.js` and define a `can.fixture`. Note, it's a plugin so I'm going to explicitly include it.  
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
            return books;  // a closure, coming from books imported above
        });
    });
````
and then I just need to pull it into my `app.js` file to activate it:

````javascript
steal(
    'can',
    './app.stache!',
    './app/services/book_service.js',
    'app/components/book/book.js',
    function(
        can,
        appTemplate, bookService, book
    ) {
        $.get('/books').then(function(books) {

            var compiledTemplate = appTemplate(books);
            $('#app').append(compiledTemplate);

        });
    }
)
````

### Our Books Data

Before moving on, let's quickly glance at the structure of our mock books data. This is a pretty pared-down model for book metadata, but it's good enough for the purpose of this tutorial. 

````javascript
{
    title: 'Structure and Interpretation of Computer Programs',
    author: {
        firstName: 'Gerald',
        middleName: 'Jay',
        lastName: 'Sussman'
    },
    cover_url: 'http://pictures.abebooks.com/isbn/9780070004849-us.jpg',
    ISBN: '0262510871',
},
````

# Building the Star Rating Component

The star rating component behaves in the following way:

+ When you hover over a star, the stars from that star all the way to the left turn black.
+ When you click on a star, the state of the star rating freezes.
+ When you click on any star in the freezed state, it unfreezes the state.

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
Some comments on this:

We have a list of star `<li>`'s that get rendered. The actual stars are unicode characters contained in the `star_rating.less` file's `.full` and `.empty` classes, which allows us to programmatically toggle a star's appearance by changing the value of `selected`. 

Attached to each star are a few CanJS-specific event handlers that let us toggle the UI state of each star: `can-mouseenter`, `can-mouseleave` and `can-click`. Some of these event handlers are given the argument '`.`', which represents the current star in the `stars` `{{#each}}` loop. 

So how does that hook into the JavaScript? The keynames for these event-handler attributes are event callbacks found within our component code. Here's a simplified version of what we're about to do (and there is one major bug in here regarding scope that we'll soon fix). We're creating a new observable list of star states and binding it to the `stars` property in the `viewModel`. 

````javascript
        return can.Component.extend({
            tag: 'star-rating',
            template: starRatingTemplate, 
            viewModel: {
                rated: {
                    value: false
                },
                stars: new can.List([
                    {selected: false},
                    {selected: false},
                    {selected: false},
                    {selected: false},
                    {selected: false}
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

# The Update Cycle

Let's review the `view` -> `viewModel` -> `view` update cycle that occurs when we interact with the stars. As we saw before, this is in the class declaration at the bottom of each star `<li>` element.

````html
{{#selected}}full{{else}}empty{{/selected}}
````

Initially, this stache template will render classes of `empty` for all stars because their corresponding observable `selected` properties are all set to `false`. 

````javascript
stars: new can.List([
    {selected: false},
    {selected: false},
    {selected: false},
    {selected: false},
    {selected: false}
])

````

When I hover over a star, let's say the third star from the right, the `beginRating` event handler fires and sets the stars less than or equal in index of my mouse's target star to `true`.

````javascript
stars: new can.List([
    {selected: true},
    {selected: true},
    {selected: true},
    {selected: false},
    {selected: false}
]),

````
This forces the view to update and the `{{#selected}}full{{else}}empty{{/selected}}` conditional is re-evaluated. The result is that list elements 1, 2 and 3 now have a class `full`, so their unicode star ☆ is replaced with ★.


