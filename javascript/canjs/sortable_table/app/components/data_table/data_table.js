steal(

    'can',
    './data_table_events.js',
    './data_table.stache!', 
    './data_table.less!', 

    function(

        can,
        dataTableEvents,
        dataTableView

    ) {

        var sortKey = null;
        return can.Component.extend({
            tag: 'data-table',
            template: dataTableView,
            viewModel: {
                sortKey: '',
                sortRows: function(context, element, event) {

                    var comparator = element.attr('id').split('-')[1];
                    var isSorted = element.hasClass('sorted');

                    //console.log(this.attr('sortKey'), comparator);

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
            },
        });
    }
);
