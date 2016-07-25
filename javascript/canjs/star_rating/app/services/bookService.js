steal(

    'can',
    'can/util/fixture/fixture.js',
    'app/models/books.js',

    function( can, fixture, books ) {

        return can.fixture('/books', function() {
            return books; 
        });
        
    }

);
