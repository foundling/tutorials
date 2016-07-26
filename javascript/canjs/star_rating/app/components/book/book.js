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
            viewModel: {
                title: null,
                author: {
                    firstName: null,
                    lastName: null,
                    middleName: null,
                },
                ISBN: null,
                cover_url: null
            },
            events: {
            }
        });        
    }
);
