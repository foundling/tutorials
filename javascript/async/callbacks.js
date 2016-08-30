/*
 * Callbacks are functions passed into another function. Anywhere in the function, that callaback can be called. 
 *
 *
 */

var transform = (list, callback) => {

    var new_list = [];
    var i,
        max;

    for (i = 0, max = list.length; i < max; ++i) {
        new_list.push( callback( list[i]) );
    } 

    return new_list;
} 

var list = [1,2,3,4,5];
var doubledList = transform(list, function(element) {
    return element * 2;
});
console.log(list);
console.log(doubledList);
