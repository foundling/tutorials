var Singleton = (function() {

    var instance;

    function init() {
        return {
            publicMethod: function() {
                console.log('publicMethod')
            }     
        };
    };

    return {
        getInstance: function() {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };

}());

var identical = Singleton.getInstance() === Singleton.getInstance();
console.log(identical);
