steal(

        'can',
        'can/view/stache/stache.js',
        'can/list/sort/sort.js',

        './sort_comparators.js',

        './models/employee.js',
        './services/employee_lookup.js',

        './app.stache!',                // main app view 
        './app.less!',                  // less files don't require a namespace in function parameters  

        function(

            can, stache, sort, 
            sortComparators, 
            Employee, 
            EmployeeLookupService,
            appView

        ) {

            $.get('/employees').then(function(employees){

                var viewModel = { 
                    employees: employees, 
                    filterFunc: function(context, el, event) {
                        var self = this;
                        
                        // reset visibility each time a filter is triggered
                        can.each(this.employees, function(employee) {
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

                        can.each(this.employees, function(employee, index) {

                            var visible = pairs.reduce(function(bool, pair) {
                                var prop = pair[0];
                                var pattern = pair[1];
                                return bool & (new RegExp(pattern, 'i').test(employee[prop]));
                            }, true);

                            self.employees.attr(index + '.visible', visible);
                        });

                    },
                    reSort: function(context, element, event) {

                        var $targetElement = $(event.target),
                            comparator = $targetElement.attr('id').split('-')[1];

                        element.find('.sort-by').filter(function(index, el){
                            return !$targetElement.is(el);
                        }).removeClass('sort-by');

                        if ($targetElement.hasClass('sort-by')) {
                            $targetElement.removeClass('sort-by');
                            employees.reverse();
                        } else {
                            $targetElement.addClass('sort-by');
                            employees.sort(comparator);
                        }
                    }
                };

                var template = appView(viewModel);                      
                $('#app').append(template);                             
            });
        }
);
