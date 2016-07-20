steal(
    'can',
    './app.stache',
    function(can, appTemplate) {

        var vm = new can.Map({

            name: 'Bryn',
            role: 'Top Dawg',
            altRole: 'CEO',
            swap: function() {
                var tmp = this.attr('altRole');
                this.attr('altRole', this.attr('role'));
                this.attr('role', tmp);
            }

        });

        var compiledTemplate  = appTemplate(vm); 
        $('#app').append(compiledTemplate);
    }
);
