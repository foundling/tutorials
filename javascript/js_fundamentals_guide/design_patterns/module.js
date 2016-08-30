/*
 * Benefits: 
 *  - cleaner code than traditional encapsulation.
 *
 * Weaknesses: 
 * - Private variables are not accessible after the object is created. Hard to patch in a bugfix.
 * - Hard to test private variables
 *
 *
 */

var moduleA = {
    name: 'exampleModule',
    getName: function() {
        return this.name;
    } 
};

var moduleB = (function(){

    var name;

    return {
        getName: function() {
            return name;
        },
        setName: function(newName) {
            name = typeof newName === 'string' ? newName : name;
        }
    };

}());
