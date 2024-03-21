sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('app1.ext.controller.ObjectC', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf app1.ext.controller.ObjectC
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			
			routing:
				{
					onAfterBinding:function(oEvent){
						
						debugger
					// 	var items = sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet").getItems();
					// for (let i = 0; i < items.length; i++) {
					// 	items[i].setVisibleRemove(false);
					// 	items[i].setVisibleEdit(false);
					// }
					let uploadset = this.base.getView().mAggregations.content[0].mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[0];
					uploadset.setMode("None");
					}
					
				},
			editFlow:{
				
				onBeforeEdit:function(oBindingContext){
					debugger
				},
				onAfterEdit:function (oBindingContext) {
					debugger
					var items = sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet").getItems();
					for (let i = 0; i < items.length; i++) {
						items[i].setVisibleRemove(true);
						items[i].setVisibleEdit(true);
						
					}
					let uploadset = this.base.getView().mAggregations.content[0].mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[0];
					uploadset.setMode("MultiSelect");
				}
				// uploadEnabled="false"
			}
		}
	});
});
