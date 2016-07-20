/*
   Goal: use native ES6 promises to fetch various parts of a sentence in the right order.

   Code Order:
   1) 3 promises
   2) The function definition that uses these promises
   3) The execution of that function to assemble the values returned by the 3 promises
   4) The printing of those values
 */

var p1 = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve(' a full ');
    }, Math.random() * 2);
});

var p2 = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve('sentence.');
    }, Math.random() * 2);
});

var p3 = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve('I am');
    }, Math.random() * 2);
});

function getMsgs() {

    return p1.then(function(msg1) {

        return p2.then(function(msg2) {
            return msg1 + msg2; 
        });

    }).then(function(msg1and2) {

        return p3.then(function(msg3) {
            //output(msg1and2 + msg3);
            output(msg1and2 + msg3);
        });

    });
}

function output (a) { 
    console.log(a);
}  
var msgs = getMsgs();
