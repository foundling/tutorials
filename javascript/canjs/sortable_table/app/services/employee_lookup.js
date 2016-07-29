steal(

    'can',
    'can/util/fixture/fixture.js',
    'can/list/sort/sort.js',
    './employee_mock_data.js',
    function(

        can, fixture, sort,
        employees

    ){

        can.fixture('GET /employees', function() {
            return new can.List(employees);
        });
    }
);
