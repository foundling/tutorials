steal(

    'can',
    'can/util/fixture',
    'app/models/books.js',

    function(
        can, fixture, 
        books
    ) {

        can.fixture.delay = 1000;
        return can.fixture('GET /books', function() {
            return books; 
        });
        
    }

);
