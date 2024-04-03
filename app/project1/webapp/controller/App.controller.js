sap.ui.define([
  "sap/m/MessageToast",
  "sap/ui/core/mvc/Controller",
  "sap/ui/Device",
  "sap/base/Log"
], function (MessageToast, Controller, Device, Log) {
  "use strict";

  return Controller.extend("project1.controller.App", {
      onInit: function () {
        debugger
      },
      onListItemPress: function (oEvent) {
        debugger
        var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();
  
        this.getSplitAppObj().toDetail(this.createId(sToPageId));
      },
      getSplitAppObj: function () {
        debugger
        var result = this.byId("SplitAppDemo");
        if (!result) {
          Log.info("SplitApp object can't be found");
        }
        return result;
      }
  });
});
