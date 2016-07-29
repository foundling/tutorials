steal(

        'can',

        './services/employee_lookup.js',
        './components/data_table/data_table.js',
        './app.stache!',

        function(

            can, 
            EmployeeLookupService, dataTable, appView

        ) {
            $.get('/employees').then(function(employees){

                var compiledTemplate = appView(employees);
                $('#app').append(compiledTemplate);

            });
        }
);
