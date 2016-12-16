Functional methods like `.map`, `.filter`, `.reduce`, `.some`, `.all` and others can bring a lot of clarity and brevity to your code when used within reason. 

Below, I'm sending some fictional dataset through a series of named chained methods. See how clear it can be?

````
dataset
    .filter(hasX)
    .map(transformToY)
    .some(isZ);

````

But in a lot of practical cases, the criteria for transformation of a given data set isn't so cut-and-dry. Let's take `hasX` for example. What if this `X` that a given datum might or might not have is something dynamic like a date or a parameter passed to the top level function? We'd love to pass that into filter's callback but that callback only accepts a single item from the dataset at any one time. 

What are we to do? 

Well, we can always refer to that date or parameter from within the `hasX` function definition if we want to keep that variable in an outer scope. Here's a potential definition of `hasX` using that idea:

````
const hasX = (datum) => datum.includes(thing);
````

That's fine, right?

Well, I'd argue it's not, for three reasons:

+ Legibility: As it stands, the only thing that's clear where `thing` comes from is ... not here.
+ Portability: As it stands, `hasX` is like your good but difficult friend `Y`.  You can't just take him *anywhere* because he's always going on about something that no one has any idea about.
+ Testability: I'd like to drop `hasX` off at my test suite, but I'm making more work for the kind folks there, who need to do some extra work to test its functionality. (This reference to an outer context makes the tests less clear and thus less robust. Tests should be as simple as possible so you know that you're testing what you thought you were testing. Otherwise, you'll need to test your tests, in which case you might as well just not test.)

So let's make `hasX` a truly great, capable, adaptable citizen in your code.

We'll keep the idea of closure *and keep it *close*, re-writing the function so it can exist as a self-contained unit. This new version should accept an argument and return another function that accepts another argument. One function returning another. Two functions working together hand-in-hand.

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

And why don't we, in good aesthetic taste, just name the function `hasA`:

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

And to please all of those bootcamp graduates with English degrees like me, let's make an `hasAn` alias:

````
const hasAn = (thing) => {
   
    return (datum) => {
        return datum.includes(thing);
    }
};

dataset
    .filter(hasAn(E))
    .map(transformToY)
    .some(isZ);
````

And there you have it.  Functional methods with callbacks which accept additional parameters!

