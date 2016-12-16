Functional methods like `.map`, `.filter`, `.reduce`, `.some` and `.all` can bring a lot of clarity and brevity to your code when used within reason. 

Below, I'm sending some fictional dataset through a series of functional methods calling named callbacks. See how clear it can be?

````
dataset
    .filter(hasX)
    .map(transformToY)
    .some(isZ);

````

But in a lot of practical cases, the criteria for transformation of a given data set isn't so cut-and-dry. Let's take `hasX` for example. What if this `X` that a given datum could have is something dynamic like a parameter passed in from an outer context? We'd love to pass that into filter's callback but that callback only accepts a single item from the dataset at any one time and isn't something we have that sort of control over anyway. 

What are we to do? 

Well, we can always refer to that extra parameter from within the `hasX` function definition if we want to keep that variable in an outer scope. Here's a potential definition of `hasX` using that idea:

````
const thing = 'init';
// codes ...
const hasX = (datum) => datum.includes(thing);
````

That's fine, right?

Well, I'd argue it's not, for three reasons:

+ Legibility: As it stands, the only thing that's clear where `thing` comes from is ... not here.
+ Portability: As it stands, `hasX` is like your good but difficult friend `Y`.  You can't just take him *anywhere* because he's always going on about something that no one's ever heard of.
+ Testability: I'd like to drop `hasX` off at my test suite, but the value to which `thing` refers is lexically scoped, so the value is *there* but inaccessible.

So let's make `hasX` a truly great, capable, adaptable citizen in your code.

We'll keep the idea of closure, but greatly reduce the lexical distance between the value closed over and the closing over function by composing two functions that work together to filter out filenames that don't have `X`. This new version of `hasX` should accept an argument, the `X`, and return another function that accepts another argument, the filename. From the inner function, which is executed strictly after the outer function, we will by then have both values we need in order to check whether a datum has the property we're looking for. One function returning another. Two functions working together hand-in-hand. Things have never looked so great.

````
const hasX = (thing) => {
   
    return (datum) => {
        return datum.includes(thing);
    }
};
````

And now, when you get around to using `hasX`, you can write this:

````
dataset
    .filter(hasX('Z'))
    .map(transformToY)
    .some(isZ);

````

That is clean af! And why don't we, in good aesthetic taste, rename the function to `hasA`:

````
const hasA = (thing) => {
   
    return (datum) => {
        return datum.includes(thing);
    }
};

dataset
    .filter(hasA(Z))
    .map(transformToY)
    .some(isZ);
````

And to please all of those bootcamp graduates with English degrees like me, let's bind the name `hasAn` to it as well:

````
const hasA = (thing) => {
   
    return (datum) => {
        return datum.includes(thing);
    }
};

const hasAn = hasA;

dataset
    .filter(hasAn(E))
    .map(transformToY)
    .some(isZ);
````

Okay, that last one wasn't really serious. But there you have it: functional methods callbacks that accept additional parameters!

By the way, this method is technically called currying, a technique named after the mathematician Haskell Curry (Haskell was named after him as well, and in Haskell, functions as a matter of course curry their values). Currying is a technique for evaluating function arguments where, instead of passing all of the arguments you have into a single function, you call a function on one argument and receive a new function that accepts the next one, and so on. That's right, I tricked you into learning what currying was! The benefit, as we can see, is that your function becomes more flexible, independent of outer context and globals, and more expressive if you use it in the right context. 
