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
            rows: null,                 // this is the data that is loaded
            tag: 'data-table',
            template: dataTableView,
            viewModel: {
                rows: null,             // this is what the rows of json/js obj data is loaded in as
                sortKey: '',
                sortColumns: null,      // a jquery list of th elements
                filterColumns: null,    // a jquery list of th elements
                pagination: 5,
                sortRows: function(context, element, event) {

                    var comparator = element.attr('id').split('-')[1];
                    var isSorted = element.hasClass('sorted');
                    var sortColumns = this.attr('sortColumns');

                    // clear sorted UI state for all other columns.
                    sortColumns.filter(function(index, col) {
                        return $(col).hasClass('sorted') && !$(col).is(element);
                    }).removeClass('sorted'); 


                    if (comparator === this.attr('sortKey')) {
                        this.attr('sortKey', null);
                        this.attr('rows').reverse();
                        element.removeClass('sorted');
                    } else {
                        element.addClass('sorted');
                        this.attr('sortKey', comparator);
                        this.rows.sort(this.attr('sortKey'));
                    }

                },
                define: {
                    paginationLevel: {
                        value: 5,
                    },
                    pagedData: {
                        value: function() {
                            var pagination = this.attr('paginationLevel');
                            return pagination; 
                        }, 
                    }
                }
            },
            events: {
                'inserted': function() {
                    // cache a ref to columns
                    this.viewModel.attr('sortColumns', $('th[id*="sort-"]'));
                    this.viewModel.attr('filterColumns', $('th[id*="filter-"]'));
                }
            }
        });
    }
);
