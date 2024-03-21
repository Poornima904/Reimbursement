sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/ButtonType"
], function(MessageToast, Dialog, Button, ButtonType) {
    'use strict';

    return {
        ApproveM: function(oEvent) {
            var dialog = new Dialog({
                title: "Confirmation",
                type: "Message",
                content: new sap.m.Text({
                    text: "Are you sure want to approve this form?"
                }),
                beginButton: new Button({
                    type: ButtonType.Accept,
                    text: "Yes",
                    press: function () {
                        dialog.close();
                        // window.location.href = "https://port38777-workspaces-ws-crf8t.us10.trial.applicationstudio.cloud.sap/app2approval/webapp/index.html";
                        window.history.go(-1);
                    }
                }),
                endButton: new Button({
                    type: ButtonType.Reject,
                    text: "Cancel",
                    press: function () {
                        dialog.close();
                    }
                }),
                afterClose: function() {
                    dialog.destroy();
                }
            });

            dialog.open();
        }
    };
});
