sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        Reject: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});
