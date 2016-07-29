steal(

        'can',
        'can/list/sort/sort.js',

        './services/employee_lookup.js',
        './components/data_table/data_table.js',
        './app.stache!',

        function(

            can, sort, 
            EmployeeLookupService,
            dataTable,
            appView

        ) {
            $.get('/employees').then(function(employees){

                var compiledTemplate = appView({ employees: employees });
                $('#app').append(compiledTemplate);

            });
        }
);
