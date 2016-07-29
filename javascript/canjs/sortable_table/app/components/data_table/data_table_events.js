steal(

    'can',

    function(
        can
    ) {

        var sortKey = null;

        return {

            sortRows: function(context, element, event) {
                var id = element.attr('id');
                $('#' + id).addClass('sorted');

                if (element.hasClass('sorted')) {
                    this.attr('employees').reverse();
                } else {
                    element.addClass('sorted');
                    this.attr('employees').sort(comparator);
                }
            },

            filterRows: function (el, event) {

                var employees = this.viewModel.attr('employees');
                
                // reset visibility each time a filter is triggered
                can.each(employees, function(employee) {
                    employee.attr('visible', true);       
                });

                // properties we care about
                var properties = ['firstName', 'lastName', 'level', 'role', 'office', 'eid'];

                // get all patterns
                var patterns = $('input[id*=filter-]').map(function(index, el) {
                    return $(el).val() || '.*';
                });

                // zip properties and patterns
                var pairs = properties.map(function(property, index) {
                    return [property, patterns[index]];
                });

                // do a reduce across each pattern, testing it against the
                // can object's property values, producing a single boolean.
                // do this on each can.each iteration below, to set the obj to 
                // visible or invisible

                can.each(employees, function(employee, index) {

                    var visible = pairs.reduce(function(bool, pair) {
                        var prop = pair[0];
                        var pattern = pair[1];
                        return bool & (new RegExp(pattern, 'i').test(employee[prop]));
                    }, true);

                    employees.attr(index + '.visible', visible);
                });
            }
        };
    }
);
