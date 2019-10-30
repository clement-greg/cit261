(function () {

    document.getElementById('whole-house-button').addEventListener('click', evt => {
        document.getElementById('appliances-plan').classList.add('collapse-left');
        document.getElementById('plan-selection-container1').classList.add('shift-left-1');
        setTimeout(() => {
            document.getElementById('systems-plan').classList.add('collapse-left');
            document.getElementById('plan-selection-container1').classList.remove('shift-left-1');
            document.getElementById('plan-selection-container1').classList.add('shift-left-2');

            document.getElementById('plan-details').classList.remove('no-display');
            setTimeout(() => {
                document.getElementById('whole-plan').classList.add('expand-out');
                document.getElementById('plan-details').classList.add('visible');
                hidePlanSummaries();
            }, 500);

        }, 500);
    });

    document.getElementById('systems-button').addEventListener('click', evt => {
        document.getElementById('appliances-plan').classList.add('collapse-left');
        document.getElementById('whole-plan').classList.add('collapse-right');

        document.getElementById('plan-details').classList.remove('no-display');
        setTimeout(() => {
            setTimeout(() => {
                document.getElementById('systems-plan').classList.add('expand-out');
                document.getElementById('plan-details').classList.add('visible');
                hidePlanSummaries();
            }, 100);
        }, 500);
    });

    document.getElementById('appliances-button').addEventListener('click', evt => {
        document.getElementById('whole-plan').classList.add('collapse-right');
        document.getElementById('plan-selection-container1').classList.add('shift-right-1');
        setTimeout(() => {
            document.getElementById('systems-plan').classList.add('collapse-right');
            document.getElementById('plan-selection-container1').classList.remove('shift-right-1');
            document.getElementById('plan-selection-container1').classList.add('shift-right-2');

            document.getElementById('plan-details').classList.remove('no-display');
            setTimeout(() => {
                document.getElementById('appliances-plan').classList.add('expand-out');
                document.getElementById('plan-details').classList.add('visible');
                hidePlanSummaries();
            }, 500);

        }, 500);
    });

    function hidePlanSummaries() {
        setTimeout(() => {

            document.getElementById('plan-selection-container1').classList.add('no-display');
        }, 500);
    }

    function hidePlanDetails() {
        setTimeout(() => {

            document.getElementById('plan-details').classList.add('no-display');
        }, 500);
    }

    document.getElementById('close-button').addEventListener('click', evt => {

        document.getElementById('plan-selection-container1').classList.remove('no-display');
        setTimeout(() => {

            document.getElementById('appliances-plan').classList.remove('expand-out');
            document.getElementById('systems-plan').classList.remove('expand-out');
            document.getElementById('whole-plan').classList.remove('expand-out');
            document.getElementById('plan-details').classList.remove('visible');


            setTimeout(() => {
                document.getElementById('plan-selection-container1').classList.remove('shift-right-1');
                document.getElementById('plan-selection-container1').classList.remove('shift-right-2');
                document.getElementById('plan-selection-container1').classList.remove('shift-left-1');
                document.getElementById('plan-selection-container1').classList.remove('shift-left-2');

                document.getElementById('appliances-plan').classList.remove('collapse-right');
                document.getElementById('appliances-plan').classList.remove('collapse-left');

                document.getElementById('systems-plan').classList.remove('collapse-right');
                document.getElementById('systems-plan').classList.remove('collapse-left');
                document.getElementById('systems-plan').classList.remove('collapse');

                document.getElementById('whole-plan').classList.remove('collapse-right');
                document.getElementById('whole-plan').classList.remove('collapse-left');
                hidePlanDetails();

            }, 500);

        });


    });

    document.getElementById('show-compare').addEventListener('click', evt => {

        document.getElementById('appliances-plan').classList.add('collapse-left');
        document.getElementById('whole-plan').classList.add('collapse-right');
        document.getElementById('systems-plan').classList.add('collapse');

        setTimeout(() => hidePlanSummaries(), 500);
        document.getElementById('plan-details').classList.remove('no-display');
        setTimeout(() => document.getElementById('plan-details').classList.add('visible'));

    });
})();