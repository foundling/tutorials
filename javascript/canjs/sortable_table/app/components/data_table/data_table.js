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

        return can.Component.extend({

            tag: 'data-table',
            template: dataTableView,
            viewModel: {
                employees: null,
            },
            events: {
                'th[id*="sort-"] click': dataTableEvents.sortRows,
                'inserted': function() {
                }
            }

        });

    }
);
