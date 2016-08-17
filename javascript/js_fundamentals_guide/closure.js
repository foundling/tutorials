/* 
 
What is a Closure? 
~~~~~~~~~~~~~~~~~
 
If we think of a function as an encapsulation of a set of operations 
on some data, and the `()` as the location where we name the inputs 
to this set of operations, then there is something somewhat strange 
about a function that does things without accepting any arguments: 
it's value doesn't depend on its input. its referenced through the 
scoping mechanisms of JavaScript.  

Closure is a combination of scoping mechanism and reference counting.
Meaning, you can extend the life of a variable by allowing another
function to have an internal reference to it. As long as there is
a reference to this value, it is not thrown away.  

The way this is commonly achieved is by means of two functions, an 
outer and an inner:

function outer() {

    var counter = 0;

    return function inner() {
        ++counter;
        console.log(counter);
    }

}

var counter = outer();

while (counter() < 10) {
    
}

var toFunc = setTimeout(counter, 1000);


*/

