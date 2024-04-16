sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';
	var mod;
	var flag = true;
	var flag1 = true;
	function sendforApproval(oEvent) {
		debugger
		let d = new sap.m.Dialog({
			title: "Confirmation",
			type: "Message",
			content: new sap.m.Text({
				text: "Are you sure want to submit the form?"
			}),
			beginButton: new sap.m.Button({
				type: "Accept",
				text: "Yes",
				press: async function (oEvent, oPath) {
					debugger
					var path1 = window.location.href;
					var regex = /reimbursmentId='(\d+)'/;
					var match = path1.match(regex);
					var id = match[1];





					// var val1 = "Pending for Approval"
					// var status = 2;
					var funcname = "asdf";
					let oFunc = sap.ui.getCore().byId('app1::reimbursementheaderObjectPage--fe::Form::GeneratedFacet1::Content').getModel().bindContext(`/${funcname}(...)`);
					// oFunc.setParameter('data',val1)
					oFunc.setParameter('id', id)
					// oFunc.setParameter('case',"pending")
					// oFunc.setParameter('statuscode',"pending")
					await oFunc.execute();
					d.close();

				}
			}),
			endButton: new sap.m.Button({
				type: "Reject",
				text: "Cancel",
				press: function () {
					d.close();
				}
			}),
			afterClose: function () {
				d.destroy();
			}
		});

		d.open();
	}
	return ControllerExtension.extend('app1.ext.controller.ObjectC', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements

		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf app1.ext.controller.ObjectC
			 */
			onInit: function (oEvent) {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
				mod = oModel;
				debugger
				// var path1 = window.location.href;
				// 	var regex = /reimbursmentId='(\d+)'/;
				// 	var match = path1.match(regex);
				// 	var key = match[1];
				// var column = oEvent.oSource.getContent()[0].getSections()[3].mAggregations._grid.getContent()[0].mAggregations.blocks[0].mAggregations.content.mAggregations.items[2].mAggregations.content[0].mAggregations.columns;
				// var worflow_path = sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Workflow--table").mBindingInfos.items.binding;
				// path.filter(
				// 	new sap.ui.model.Filter({
				// 		path: "reimbursmentId",
				// 		operator: sap.ui.model.FilterOperator.EQ,
				// 		value1: key
				// 	})
				// );
				// column.filter(
				// 	new sap.ui.model.Filter({
				// 		path: "reimbursmentId",
				// 		operator: sap.ui.model.FilterOperator.EQ,
				// 		value1: key
				// 	})
				// );

				// var objpage = sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::ObjectPage");
				// objpage.attachSectionChange(function (oEvent) {
				// 	debugger
				// 	if (oEvent.getSource().getSelectedSection() == "app1::reimbursementheaderObjectPage--fe::CustomSection::Frag1" ) {
				// 		let uploadset = sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet");
				// 		uploadset.setUploadButtonInvisible(false);

				// 	}
				// 	var items = sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet").getItems();
				// 	for (let i = 0; i < items.length; i++) {
				// 		items[i].setVisibleRemove(true);
				// 		items[i].setVisibleEdit(true);

				// 	}
				// })
			},

			routing:
			{
				onBeforeBinding: async function (oEvent) {
					debugger

					// this.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].setEnabled(false); 
					if (flag) {
						var funcname = "load";
						var cas = 'reimburseDetails';
						let oFunc = sap.ui.getCore().byId('app1::reimbursementheaderObjectPage--fe::Form::GeneratedFacet1::Content').getModel().bindContext(`/${funcname}(...)`);
						oFunc.setParameter('casee', cas);
						await oFunc.execute();
						flag = false;
					}
				},

				beforeNavigationTo: function () {
					debugger
				},

				onAfterBinding: async function () {
					debugger

					let uploadset = this.base.getView().mAggregations.content[0].mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[0];
					uploadset.setMode("None");
					var path1 = window.location.href;
					var regex = /reimbursmentId='(\d+)'/;
					var match = path1.match(regex);
					var key = match[1];
					// if(flag1)
					// {
					SELECT.from()
					var funcname = "afterload";
					let oFunc = sap.ui.getCore().byId('app1::reimbursementheaderObjectPage--fe::Form::GeneratedFacet1::Content').getModel().bindContext(`/${funcname}(...)`);
					oFunc.setParameter('paramid', key);
					await oFunc.execute();
					// 	flag1 = false;
					// }

					debugger

					var path = this.base.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[0].mBindingInfos.items.binding;
					path.filter(
						new sap.ui.model.Filter({
							path: "reimbursmentId",
							operator: sap.ui.model.FilterOperator.EQ,
							value1: key
						})
					);

					var worflow_path = sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Workflow--table").mBindingInfos.items.binding;
					worflow_path.filter(
						new sap.ui.model.Filter({
							path: "reimbursmentId",
							operator: sap.ui.model.FilterOperator.EQ,
							value1: key
						})
					);
					// sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Workflow--table").refreshItems()
					sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Workflow--table").mBindingInfos.items.binding.refresh()
					// let wrk= sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Workflow--table")

				}
			},

			editFlow: {

				beforeNavigationTo: function () {
					debugger
				},
				onBeforeSave: async function (oEvent) {
					debugger
					var com = sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Comments--text1").mProperties.value;
					
					var path = oEvent.context.sPath;
					var regex = /reimbursmentId='(\d+)'/;
					var match = path.match(regex);
					const key = match[1];
					// var testdata = JSON.stringify({ reimbursmentId: key, textArea : com, IsActiveEntity:true});
					var funcname = "commentfi";
						let oFunc = sap.ui.getCore().byId('app1::reimbursementheaderObjectPage--fe::Form::GeneratedFacet1::Content').getModel().bindContext(`/${funcname}(...)`);
						oFunc.setParameter('id', key);
						oFunc.setParameter('comment', com);
						await oFunc.execute();
						sendforApproval(oEvent);
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

				},
				onAfterCreate: function () {
					debugger
					let uploadset = this.base.getView().mAggregations.content[0].mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[0];
					uploadset.setMode("MultiSelect");
					var items = sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet").getItems();
					for (let i = 0; i < items.length; i++) {
						items[i].setVisibleRemove(true);
						items[i].setVisibleEdit(true);

					}
					sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet").setUploadButtonInvisible(false);
				},
				onBeforeEdit: function (oEvent) {
					debugger
				}

			}
		}
	})
});
