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
                employees:  null,
                sortRows: function(context, element, event) {

                    var $targetElement = $(event.target),
                        comparator = $targetElement.attr('id').split('-')[1];

                    element.find('.sorted').filter(function(index, el){
                        return !$targetElement.is(el);
                    }).removeClass('sorted');

                    if ($targetElement.hasClass('sorted')) {
                        $targetElement.removeClass('sorted');
                        this.attr('employees').reverse();
                    } else {
                        $targetElement.addClass('sorted');
                        this.attr('employees').sort(comparator);
                    }

                },

                filterRows: function (el, event) {
                },
            }
        });
    }
);
