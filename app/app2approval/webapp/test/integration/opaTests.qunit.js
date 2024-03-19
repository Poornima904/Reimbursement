sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'app2approval/test/integration/FirstJourney',
		'app2approval/test/integration/pages/reimbursementheaderList',
		'app2approval/test/integration/pages/reimbursementheaderObjectPage'
    ],
    function(JourneyRunner, opaJourney, reimbursementheaderList, reimbursementheaderObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('app2approval') + '/index.html'
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