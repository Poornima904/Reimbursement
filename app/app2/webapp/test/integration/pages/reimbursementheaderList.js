sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'app2',
            componentId: 'reimbursementheaderList',
            contextPath: '/reimbursementheader'
        },
        CustomPageDefinitions
    );
});