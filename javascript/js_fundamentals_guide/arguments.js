var log = function() {

    console.log('****\n');
    for (var i = 0, len = arguments.length; i < len; ++i) {
        console.log('** ', arguments[i]);
    }
    console.log('\n****\n');

};


/*
 * The Arguments Keyword
 * ~~~~~~~~~~~~~~~~~~~~~
 *
 * You can use this to write functions that accept an arbitrary number of arguments. 
 * Note that ES6 has the 'rest parameters' (...varName), as in 'give me the rest of 
 * the parameters'. This can be used to achieve a similar thing, but those values
 * are NOT accessible via the 'arguments' array. You use this by adding '...' to 
 * the front of your final function parameter to indicate that the name should 
 * be bound to a list of any arguments passed in at or after that parameter position
 * in the function call.
 *
 */

function showArgs() {


    /* Arguments: An Implicit Keyword
     *
     * 'arguments' is an implicit keyword available inside functions that provides 
     * the arguments. 'arguments' is array-LIKE, but it isn't really an array. You can't forEach,
     * join, map, etc, without using Array.prototype.<METHOD_NAME>.call on it. 
     *
     */
    
    var isArray = arguments instanceof Array;
    log('Arguments is an array: ' + isArray); // see? You don't get the fun stuff. 

     /* no slice ... */
    try { 
        arguments.slice(0); 
    } catch(e) {
        if (e instanceof TypeError) {
            log('I can\'t call arguments.slice(0) because: ',  e.message);
        }
    }   
    return;

    /* no forEach */
    try { 
        arguments.forEach(function(arg) {
            log(arg);
        });
    } catch(e) {
        if (e instanceof TypeError) {
            log(e.message);
        }
    }

    /* ... no map, filter, reduce, some, all, slice, splice, join, ... etc. None of these.

    /* Although, arguments DOES have a length property */
    for (var i = 0, len = arguments.length; i < len; ++i) {
        log(arguments[i]);
    }

    /* Dealing with 'arguments' 

        Just convert the damn thing into an array! Most people want to do all sorts of unholy things
        to arrays, so just make a new one using arguments as source data.  But if you try to mutate 
        'arguments' itself, well ... it's bad. 

        Use Array.prototype.slice.call on 'arguments' and conform to slice's  normal interface for specifying start
        and stop points.

    */

    var argsArray = Array.prototype.slice.call(arguments);  // convert arguments to an actual array 
    log('built-in arguments object: ', arguments);
    log('converted arguments object: ', argsArray);

}


showArgs('a', 1, {}, showArgs)
