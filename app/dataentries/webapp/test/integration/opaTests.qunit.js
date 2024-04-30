sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'dataentries/test/integration/FirstJourney',
		'dataentries/test/integration/pages/reimbursementheaderList',
		'dataentries/test/integration/pages/reimbursementheaderObjectPage'
    ],
    function(JourneyRunner, opaJourney, reimbursementheaderList, reimbursementheaderObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('dataentries') + '/index.html'
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