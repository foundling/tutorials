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
                '{window} click': function() {
                    console.log(this.viewModel);
                }
            }
        });        
    }
);
