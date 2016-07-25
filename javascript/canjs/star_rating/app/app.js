steal(

    'can',
    'can/view/stache/stache.js',
    'app/models/books.js',
    'app/components/star_rating/star_rating.js',
    function(
        can, 
        stache,
        bookModel, 
        starRating // can.Components are automatically instantiated upon reference
    ) {

        var starRatingTag = '<star-rating></star-rating>';
        var compiled = can.stache(starRatingTag);
        $('#app').append(compiled);
        
    }

);
