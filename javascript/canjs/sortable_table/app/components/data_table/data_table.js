steal(

    'can',
    'can/list/sort/sort.js',

    './data_table_events.js',
    './data_table.stache!', 
    './data_table.less!', 

    function(

        can, sort,
        dataTableEvents, dataTableView

    ) {

        return can.Component.extend({

            tag: 'data-table',
            template: dataTableView,
            viewModel: null,
            events: {
                'input[id*="filter-"] keyup':   dataTableEvents.filterRows,
                '.sort-columns click':          dataTableEvents.sortRows
            }

        });

    }
);
