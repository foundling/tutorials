steal(
    'can',
    function(){

        return can.Model({

            firstName:  '',
            lastName:   '',
            role:       '',
            office:     '',
            level:      '',

            refId: function() {

                var idString = [

                    this.firstName[0],
                    this.lastName,
                    '_',
                    this.role.slice(0,4),
                    this.level

                ].join('');

                return idString;
            }
        });

    }
);
