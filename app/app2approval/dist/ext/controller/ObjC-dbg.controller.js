sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('app2approval.ext.controller.ObjC', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf app2approval.ext.controller.ObjC
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			routing: {
				onAfterBinding: function () {
					debugger
					sap.ui.getCore().byId("app2approval::reimbursementheaderObjectPage--fe::CustomSubSection::Attachment--uploadSet").getBinding("items").refresh();

					var path1 = window.location.href;

					var regex = /reimbursementheader\('(\d+)'\)/;

					// Execute the regular expression on the path
					var match = path1.match(regex);
					var key = match[1];
						// var regex = /reimbursmentId='(\d+)'/;
						// var match = path1.match(regex);
						// var key = match[1];
						var path = this.base.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[0].mBindingInfos.items.binding;
						path.filter(
							new sap.ui.model.Filter({
								path: "reimbursmentId",
								operator: sap.ui.model.FilterOperator.EQ,
								value1: key
							})
						);

					}
				}
			}
		});
});
