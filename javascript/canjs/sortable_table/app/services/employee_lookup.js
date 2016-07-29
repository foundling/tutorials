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
                sortRows: function(context, element, event) {

                    var comparator = element.attr('id').split('-')[1];
                    var isSorted = element.hasClass('sorted');

                    console.log(this.attr('sortKey'), comparator);

                    if (comparator === this.attr('sortKey')) {
                        this.attr('sortKey', null);
                        this.attr('employees').reverse();
                        element.removeClass('sorted');
                    } else {
                        element.addClass('sorted');
                        this.attr('sortKey', comparator);
                        this.employees.sort(this.attr('sortKey'));
                    }

                },
            };
            return new can.Map(vm);
        });
    }
);
