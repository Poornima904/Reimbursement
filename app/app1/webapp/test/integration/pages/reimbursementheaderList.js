sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'app1',
            componentId: 'reimbursementheaderList',
            contextPath: '/reimbursementheader'
        },
        CustomPageDefinitions
    );
});