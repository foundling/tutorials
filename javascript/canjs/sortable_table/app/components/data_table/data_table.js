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
                columns: null,
                sortRows: function(context, element, event) {

                    var comparator = element.attr('id').split('-')[1];
                    var isSorted = element.hasClass('sorted');
                    var columns = this.attr('columns');

                    columns.filter(function(index, col) {
                        return $(col).hasClass('sorted') && !$(col).is(element);
                    }).removeClass('sorted'); 


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
            events: {
                'inserted': function() {
                    // cache a ref to columns
                    this.viewModel.attr('columns', $('th[id*="sort-"]'));
                }
            }
        });
    }
);
