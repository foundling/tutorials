/* Scope */

/*
 * Scope: a Victorian tale of digital pecking order

 * Lesson 1: Position Matters
  
 * A scope is a * SET * of bindings from names to values. This means its members
 * are unique. Setting a member could mean overwriting another unintentionally. It also means that they 
 * are treatable as groups, so there is a second order relation between the sets, 
 * the hierarchy of parent, child and sibling. If you're the parent, you're actually 
 * sort of limited because you can't see into the child, but if you're the child, 
 * you get the parent's variables. There are exceptions to this rule of course.  
  
 * The meaning of a given section of JavaScript code is largely determined by 
 * its position within the surrounding source code. The arrangement of code using
 * blocks and the language's set of scoping rules unambiguously determine what 
 * it in effect DOES when the machine executes it.
 
 * The Rule is: a variable in a function can see those in its function scope and 
 * also in any parent function's scope, recursively applying new names (and over-
 * writing them) until there are no more parents.
  
 * But a function cannot see into a child's scope.
 
 * Nesting Functions:
  
 * JavaScript allows you to have functions inside of functions inside of 
 * other functions, etc. This means that you can have layers of values
 * in a hierarchy.  The language doesn't prevent you from using a variable
 * names whenever you want, but realize that computers don't DO ambiguity:
 * you probably want to make sure you're not overwriting a value you want
 * with a value you don't want.
  
 /*
  * The rule is this: when you're 'looking into' some other scope: you get 
  * the parent scope, but not the child scope's variables.
  */ 
  

 function first() {

     var x = 'x';

     function second() {

        var y = 'y';
        console.log(x, y);

     };
     console.log(x, y);
 } 

try {

    first();

} catch(e) {

    console.log("You can't call 'first' because: "  + '\n' + e.message);

}

 /*
  * Scope is clearly a feature, since allowing only one instance of a 
  * variable name throughout a whole program would make naming variables a 
  * nightmare. But, JavaScript lets you manipulate variables in outer functions,
  * so you are not restricted to just the variables in the current function. 
  * This is a benefit and a curse, in that if you're not careful, you could 
  * modifiy variables in an outer / parent scope unintentionally.
 */

var a = 'a';
var c = 'c';

function scopeA() {

    var mine = 'private';
    console.log(mine);
    console.log(a);

}

function scopeB() {

    var b = 'b';
    console.log(b);

    try {
        console.log(mine);
    } catch (e) {
        console.log('error: ' + e.message);
    }

}

function scopeC(c) {

    console.log(c);

}

scopeA();

/* 
 * In the scopeA function, we log 'mine' and it prints what we'd expect:
 * 'private'.
 *
 * Then we log 'a', but 'a' is defined in the main function. 
 *
 */

scopeB();
 /* In scopeB, we first log 'b' and again get what we'd expect, 'b'.  
  * Then we try to log 'mine', which was defined in the 'scopeA' function.
  * 
  * 'scopeA' is not a parent function of scopeB, it's a sibling function. 
  * Thus we do not have access to the variable 'mine'. It effectively doesn't
  * exist from the perspective of scopeB, so we get an error: 'mine is 
  * not defined'. 
  *
  */

scopeC(20);

