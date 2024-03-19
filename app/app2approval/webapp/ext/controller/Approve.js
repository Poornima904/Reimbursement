sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        ApproveM: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});
