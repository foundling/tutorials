/* FUNCTIONS */

// named function statement
function f1() {
    console.log('I am function ', f1.name);
}

// function declaration (var n = function expression)
var f2 = function() {
    // f2 is a var that points to an anonymous function expression
    console.log('I am function ', f1.name);
}

// this is not valid
function() {
    // f2 is a var that points to an anonymous function expression
    console.log('I am function ', f1.name);
}

// this is valid
function() {
    // f2 is a var that points to an anonymous function expression
    console.log('I am function ', f1.name);
}



var funcs = [];

// 
for (var i = 0; i < 4; i++) {
    funcs.push(function() {
        return i;
    });
}

console.log(funcs[1]());
