sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/ButtonType"
], function (MessageToast, Dialog, Button, ButtonType) {
    'use strict';

    return {
        ApproveM: function (oEvent) {
            var that = this;
            debugger
            var dialog = new Dialog({
                title: "Confirmation",
                type: "Message",
                content: new sap.m.Text({
                    text: "Are you sure want to approve this form?"
                }),
                beginButton: new Button({
                    type: ButtonType.Accept,
                    text: "Yes",
                    press: async function (oEvent, oPath) {
                        debugger
                        var status = 'Approved';
                        // var url = `/odata/v4/my/reimbursementheader('${reimbursmentId}')`;

                        var path = window.location.href;
                        var kid = path.match(/\(([^\)]+)\)$/)[1];

                        const parts = kid.split("'");
                        const id = parts[parts.length - 2];

                        var url = `/odata/v4/my/reimbursementheader('${id}')`;
                        let testdata = JSON.stringify({ status_dis: status, keyfield: id })

                        let functionname = 'rheaderfunc';
                        let oFunction = that._view.getModel().bindContext(`/${functionname}(...)`);
                        oFunction.setParameter('data', testdata);
                        // oFunction.setParameter('file',this.file);
                        await oFunction.execute();
                        window.history.go(-1);
                        dialog.destroy();
                    }
                }),
                endButton: new Button({
                    type: ButtonType.Reject,
                    text: "Cancel",
                    press: function () {
                        dialog.close();
                    }
                }),
                afterClose: function () {
                    dialog.destroy();
                }
            });

            dialog.open();
        }
    };
});
