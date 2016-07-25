steal(
    'can',
    './app.stache!',
    './app.less!',
    function(can, appTemplate) {

        var vm = new can.Map({

            name: 'Alex',
            description: 'very cool',
            altDescription: 'quite excellent',
            swap: function() {
                var tmp = this.attr('altDescription');
                this.attr('altDescription', this.attr('description'));
                this.attr('description', tmp);
            }

        });

        var compiledTemplate  = appTemplate(vm); 
        $('#app').append(compiledTemplate);
    }
);
