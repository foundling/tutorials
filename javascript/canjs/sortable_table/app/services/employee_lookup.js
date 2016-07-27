steal(

    'can',
    'can/util/fixture/fixture.js',
    './employee_mock_data.js',
    function(can, fixture, employees){

        can.fixture('GET /employees', function() {
            return new can.List(employees);
        });
    }
);
