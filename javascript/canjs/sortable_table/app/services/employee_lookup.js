steal(

    'can',
    'can/util/fixture/fixture.js',
    'can/list/sort/sort.js',
    './employee_mock_data.js',

    function(

        can, fixture, sort,
        employees

    ){

        var sortKey = null;

        can.fixture('GET /employees', function() {
            var vm = {
                employees: new can.List(employees),
                sortKey: null,

            };
            return new can.Map(vm);
        });
    }
);
