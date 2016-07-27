steal(

    'can',
    'can/view/stache/stache.js',

    './book.stache!',
    './book.less!',

    function(

        can, stache,
        bookTemplate

    ) {
        can.Component.extend({
            tag: 'prod-book',
            template: bookTemplate,
            viewModel: null,
            events: {
                'img click': function(el, ev) {
                    console.log(this.viewModel);
                }
            }
        });        
    }
);
