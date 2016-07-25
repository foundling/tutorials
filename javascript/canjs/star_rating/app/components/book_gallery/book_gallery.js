steal(

    'can',
    'can/view/stache/stache.js',
    'app/components/star_rating/book_gallery.stache!',
    'app/components/star_rating/book_gallery.less!',

    function(

        can, stache,
        bookGalleryTemplate

    ) {
        can.Component.extend({
            tag: 'star-rating',
            template: starRatingTemplate,
            viewModel: {
                rated: false,
                rating: can.compute(function() {
                   
                    return can.filter(this.stars, function(star) {
                        return star.attr('selected');
                    }).length;

                }),
                stars: new can.List([

                    { selected: false },
                    { selected: false },
                    { selected: false },
                    { selected: false },
                    { selected: false }

                ]),
                beginRating: function(star) {
                    if (this.rated) {
                        return;
                    }
                    var index = this.stars.indexOf(star);
                    for (var i = 0; i <= index; ++i) {
                        this.stars.attr(i + '.selected', true); 
                    }
                },
                commitRating: function() {
                    this.rated = !this.rated;
                },
                clearRating: function() {
                    if (this.rated) {
                        return;
                    }
                    can.each(this.stars, function(star) {
                        this.attr('selected', false);
                    });
                },
            },
            events: {
            }
        });        
    }
);
