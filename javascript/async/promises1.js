/*
   Goal: use native ES6 promises to fetch various parts of a sentence in the right order.
 */

var p1 = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve('I am');
    }, Math.random() * 2);
});

var p2 = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve(' a full ');
    }, Math.random() * 2);
});

var p3 = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve('sentence.');
    }, Math.random() * 2);
});

function getMsgs() {

    return p2.then(function(msg2) {
        return p1.then(function(msg1) {
            return msg1 + msg2; 
        });
    }).then(function(msg1and2) {
        return p3.then(function(msg3) {
            output(msg1and2 + msg3);
        });
    });
}

function output (a) { 
    console.log(a);
}  
var msgs = getMsgs();
output(msgs);
