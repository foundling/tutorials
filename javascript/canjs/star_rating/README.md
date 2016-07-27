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
    node_modules
    package.json
    app/
        app.js
        app.stache
        components/
            book/
                book.js
                book.stache
                book.less
            star_rating/
                star_rating.js
                star_rating.stache
                star_rating.less
        models/
            books.js
        services/
            bookService.js
````
# Why Components ?

A major benefit of using a component is that it simplifies and decouples the interdependencies among various functions of your UI, acting as a self-contained unit.  This makes it easier to develop each piece in isolation. Stylistically, CanJS components provide a clearer and more declarative interface to the functionality they offer than a `can.Control`.

# Let's get started!

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

Now, let's build out the component in JavaScript. We'll do this by pulling in `can`, calling `can.Component.extend` and passing in an object literal that has four top-level properties, `tag`, `template`, `viewModel`, `events`. Only the first two are technically required, but we'll put all four in.

````javascript
steal(
    'can',
    function(can) {
        can.Component.extend({
            tag: '',                 
            template: '',  
            viewMode: {
            },
            events: {
            }

        }); 
    }
)
````
