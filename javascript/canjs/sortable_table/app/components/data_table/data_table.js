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
        });
    }
);
