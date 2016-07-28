steal(

        'can',
        'can/list/sort/sort.js',

        './models/employee.js',
        './services/employee_lookup.js',

        './components/data_table.js',

        './app.stache!',

        function(

            can, sort, 
            Employee, EmployeeLookupService,
            dataTable,
            appView

        ) {
            $.get('/employees').then(function(employees){

                var compiledTemplate = appView({ employees: employees });
                $('#app').append(compiledTemplate);

            });
        }
);
