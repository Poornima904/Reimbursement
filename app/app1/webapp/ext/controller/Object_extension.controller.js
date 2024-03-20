sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('app1.ext.controller.Object_extension', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf app1.ext.controller.Object_extension
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			routing:
				{
					onAfterBinding: function (oBindingContext) 
					{

						debugger
						sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--ddd-app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet-0-editButton").setEnabled(false);
						sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--ddd-app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet-0-deleteButton").setEnabled(false);

					},
				}

		}
	});
});
