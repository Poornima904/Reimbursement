sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'app1/test/integration/FirstJourney',
		'app1/test/integration/pages/reimbursementheaderList',
		'app1/test/integration/pages/reimbursementheaderObjectPage'
    ],
    function(JourneyRunner, opaJourney, reimbursementheaderList, reimbursementheaderObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('app1') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThereimbursementheaderList: reimbursementheaderList,
					onThereimbursementheaderObjectPage: reimbursementheaderObjectPage
                }
            },
            opaJourney.run
        );
    }
);