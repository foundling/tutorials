steal(

    'can',

    function(can) {
        return new can.List([
            {
                title: 'Structure and Interpretation of Computer Programs', 
                author: {
                    firstName: 'Gerald',
                    middleName: 'Jay',
                    lastName: 'Sussman'
                }, 
                cover_url: 'http://pictures.abebooks.com/isbn/9780070004849-us.jpg',
                ISBN: '0262510871',
            },
            {
                title: 'The Algorithm Design Manual',
                author: {
                    firstName: 'Steven',
                    middleName: 'S.',
                    lastName: 'Skiena'
                },
                cover_url: 'https://images-na.ssl-images-amazon.com/images/I/51pINwAeu5L._SX357_BO1,204,203,200_.jpg',
                ISBN: '1848000693'
            },
            {
                title: 'Perl 6 Essential',
                author: {
                    firstName: 'Allison',
                    middleName: null,
                    lastName: ' Randal',
                },
                cover_url: 'https://images-na.ssl-images-amazon.com/images/I/51%2BILq8bhaL._SX331_BO1,204,203,200_.jpg',
                ISBN: '0596004990',
            }


        ]);
    }
);
