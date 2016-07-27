steal(
    'can',
    function() {

        var dynamicSort = function() {
            var comparatorFunctions = {

                stringAscending: function(a,b) {
                    if (a < b) return -1;
                    if (a === b) return 0;
                    if (a > b) return 1;
                },

                strDescending: function(a,b) {
                    if (a > b) return -1;
                    if (a === b) return 0;
                    if (a < b) return 1;
                }, 

                numAscending: function(a,b) { 
                    return a - b;
                },

                numDescending: function(a,b) { 
                    return b - a;
                }
            };

        };
        var dynamicSort = function(a,b) {
            console.log(this);
            return b - a;
        };

        return dynamicSort;
});
