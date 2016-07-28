var comparatorFunctions = module.exports = exports = {

    stringAscending: function(a,b) {

        a = a.toLowerCase();
        b = b.toLowerCase();
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    },

    stringDescending: function(a,b) {

        a = a.toLowerCase();
        b = b.toLowerCase();
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;

    }, 

    numAscending: function(a,b) { 
        return a - b;
    },

    numDescending: function(a,b) { 
        return b - a;
    }

};

