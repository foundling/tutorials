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

In CanJS, they provide a more markup-centric service, allowing you to compose widgets with HTML. 

Let's get started!

In the HTML markup, a CanJS component looks like an ordinary HTML tag:

````
<my-component></my-component>
````

It is considered a best practice to hyphenate your custom HTML elements' tag names, as this distinguishes them from native HTML elements. For more on this, see the 'Core Concepts' section in the [W3C Custom Elements spec](https://www.w3.org/TR/custom-elements/).  

Let's visualize what our markup will look like. We want to loop through a list of book objects and show the book as well as its child star rating component. We can start like this:

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
            viewMode: {
            },
            events: {
            }

        }); 
    }
)
````

Can `components` work differently than `controls` in that they are instantiated as soon as you pull them into your code, whereas a `control` can be defined and then instantiated separately using the `new` keyword. This means that we'll be `steal`ing this component into our main `app.js` file, but not doing anything beyond giving it a namespace in the `steal` callback function.

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
        var compiledTemplate = appTemplate();
        $('#app').append(compiledTemplate);
    }
)
````

At this point, we need to get ahold of some book data, since we're not passing any data into the template renderer function.
