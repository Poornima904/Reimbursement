sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';
    return {
        onPress: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        },
        formatLevel: function(level) {
                return parseInt(level); // Convert to integer
            
        }
    };
});



