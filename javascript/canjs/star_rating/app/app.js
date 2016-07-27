steal(

    'can',
    'can/view/stache/stache.js',

    'app/app.stache!',

    'app/services/book_service.js',
    'app/components/book',
    'app/components/star_rating/star_rating.js',

    function(
        can, stache,
        appTemplate,
        bookService, book, starRating // instantiated upon reference 
    ) {

        $.get('/books', function(books) {
            var compiled = appTemplate({
                books: books
            });
            $('#app').append(compiled);
        }); 

    }

);
