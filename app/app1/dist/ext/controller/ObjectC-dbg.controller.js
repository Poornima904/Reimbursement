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
				onBeforeBinding: function () {
					debugger
					// var items = sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet").getItems();
					// for (let i = 0; i < items.length; i++) {
					// 	items[i].setVisibleRemove(false);
					// 	items[i].setVisibleEdit(false);
					// }
				},

				onAfterBinding: function () {
					debugger
					let uploadset = this.base.getView().mAggregations.content[0].mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[0];
					uploadset.setMode("None");
					var path1 = window.location.href;
					var regex = /reimbursmentId='(\d+)'/;
					var match = path1.match(regex);
					var key = match[1];
					var path = this.base.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[0].mBindingInfos.items.binding;
					path.filter(
						new sap.ui.model.Filter({
							path: "reimbursmentId",
							operator: sap.ui.model.FilterOperator.EQ,
							value1: key
						})
					);
					
				}
			},
			editFlow: {
				beforeNavigationTo: function () {
					debugger
				},
				onAfterSave: function () {
					debugger
					// let uploadset = this.base.getView().mAggregations.content[0].mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[0];
					// uploadset.setMode("None");
					sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet").setUploadButtonInvisible(true);
					// sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet").setUploadEnabled(false);
					var items = sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet").getItems();
					for (let i = 0; i < items.length; i++) {
						items[i].setVisibleRemove(false);
						items[i].setVisibleEdit(false);

					}
				},
				onAfterDiscard: function () {
					debugger
					let uploadset = this.base.getView().mAggregations.content[0].mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[0];
					uploadset.setMode("None");
					sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet").setUploadButtonInvisible(true);
					// sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet").setUploadEnabled(false);
					var items = sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet").getItems();
					for (let i = 0; i < items.length; i++) {
						items[i].setVisibleRemove(false);
						items[i].setVisibleEdit(false);

					}
				},
				onAfterEdit: function (oBindingContext) {
					debugger
					let uploadset = this.base.getView().mAggregations.content[0].mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[0];
					uploadset.setMode("MultiSelect");
					var items = sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet").getItems();
					for (let i = 0; i < items.length; i++) {
						items[i].setVisibleRemove(true);
						items[i].setVisibleEdit(true);

					}
					sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet").setUploadButtonInvisible(false);
					// sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet").setUploadEnabled(true);


					// var path1 = window.location.href;
					// var regex = /reimbursmentId='(\d+)'/;
					// var match = path1.match(regex);
					// var key = match[1];
					
					// var path = this.base.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[0].mBindingInfos.items.binding;
					// path.filter(
					// 	new sap.ui.model.Filter({
					// 		path: "reimbursmentId",
					// 		operator: sap.ui.model.FilterOperator.EQ,
					// 		value1: key
					// 	})
					// );
				}

			}
		}
	})
});
