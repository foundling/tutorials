steal(
   'can',
    function(can) {
        var people = [

            {name: 'Kevin',  ext: 1010}, 
            {name: 'Fahad',  ext: 1024}, 
            {name: 'Alex',   ext: 1031}, 
            {name: 'Laura',  ext: 1023}, 
            {name: 'Elliot', ext: 1015} 

        ];

        return new can.List(people);
    }
);
