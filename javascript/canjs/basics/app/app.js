steal(
    'can',
    './app.stache',
    './models/people.js',
    function(can, appTemplate, people) {

        var count = can.compute(function() {
            return people.attr('length');
        });

        var template = appTemplate({ 
            people: people, 
            charCount: function(person) {
                return person.name.length;
            },
            count: count,
            addPerson: function(vm, element, event) {
                var name = element.val().trim(); 
                var people = vm.people;
                if (name) {
                    people.push({name: name});
                    element.val('');
                }
            }
        });

        $('#app').append(template);

    }
);
