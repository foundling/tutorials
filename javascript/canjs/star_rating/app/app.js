steal(

    'can',

    'app/services/book_service.js',
    'app/components/book',
    'app/components/star_rating/star_rating.js',

    'app/app.stache!',
    'app/app.less!',

    function(
        can, 
        bookService, book, starRating, // instantiated upon reference 
        appTemplate
    ) {

        $.get('/books', function(books) {
            var compiled = appTemplate({
                books: books
            });
            $('#app').append(compiled);
        }); 

    }

);
