sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'app2approval',
            componentId: 'reimbursementheaderList',
            contextPath: '/reimbursementheader'
        },
        CustomPageDefinitions
    );
});