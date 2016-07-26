steal(

    'can',
    'can/view/stache/stache.js',
    'can/map/define/define.js',

    'app/components/star_rating/star_rating.stache!',
    'app/components/star_rating/star_rating.less!',

    function(

        can, stache, define,
        starRatingTemplate

    ) {
        return can.Component.extend({
            tag: 'star-rating',
            template: can.view('app/components/star_rating/star_rating.stache'),
            viewModel: {
                define: {
                    rated: {
                        value: false
                    },
                    stars: {
                        value: function() {
                            return new can.List([

                                { selected: false },
                                { selected: false },
                                { selected: false },
                                { selected: false },
                                { selected: false }

                            ]);
                        }
                    },

                },
                beginRating: function(star) {
                    if (this.attr('rated')) {
                        return;
                    }
                    var index = this.attr('stars').indexOf(star);
                    for (var i = 0; i <= index; ++i) {
                        this.attr('stars.' + i + '.selected', true); 
                    }
                },
                commitRating: function() {
                    console.log(this);
                    this.attr('rated', !this.attr('rated'));
                },
                clearRating: function() {
                    if (this.attr('rated')) {
                        return;
                    }
                    can.each(this.stars, function(star) {
                        this.attr('selected', false);
                    });
                },
            },
            events: {
                'inserted': function(){
                    console.log(this);
                }
            }
        }); 
    }
);
