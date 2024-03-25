sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/ButtonType"
 
],  function(MessageToast, Dialog, Button, ButtonType )  {
    'use strict';

    return {
        Reject: function(oEvent) {
            var that = this;
            debugger
            var dialog = new Dialog({
                title: "Confirmation",
                type: "Message",
                content: new sap.m.Text({
                    text: "Are you sure want to reject this form?"
                }),
                beginButton: new Button({
                    type: ButtonType.Accept,
                    text: "Reject",
                    press: async function (oEvent, oPath) {
                        debugger
                        var status = 'Rejected';
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
                        await oFunction.execute();
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
                afterClose: function() {
                    dialog.destroy();
                }
            });

            dialog.open();
        }
        }
    
});
