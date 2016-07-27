steal(

    'can',
    'can/util/fixture',
    'app/models/books.js',

    function(
        can, fixture, 
        books
    ) {

        return can.fixture('GET /books', function() {
            return books; 
        });
        
    }

);
