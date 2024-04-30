
sap.ui.define(['sap/ui/core/mvc/ControllerExtension', 'sap/m/MessageToast'], function (ControllerExtension, MessageToast) {
	'use strict';
	var mod;
	var flag = true;
	var flag1 = true;

	return ControllerExtension.extend('app1.ext.controller.ObjectC', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements

		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf app1.ext.controller.ObjectC
			 */
			onInit: function (oEvent) {
				//
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
				mod = oModel;
				//
				//
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

				var objpage = sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::ObjectPage");
				objpage.attachSectionChange(function (oEvent) {
					//
					if (oEvent.getSource().getSelectedSection() == "app1::reimbursementheaderObjectPage--fe::CustomSection::Frag1") {
						let uploadset = sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet");
						uploadset.setUploadButtonInvisible(false);

					}
					var items = sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet").getItems();
					for (let i = 0; i < items.length; i++) {
						items[i].setVisibleRemove(true);
						items[i].setVisibleEdit(true);

					}
				})
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

				onAfterBinding: async function () {
					debugger
					//==============================================

					
					//======================================

					let uploadset = this.base.getView().mAggregations.content[0].mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[0];
					uploadset.setMode("None");
					var path1 = window.location.href;
					var regex = /reimbursmentId='(\d+)'/;
					var match = path1.match(regex);
					var key = match[1];
					let operations = JSON.stringify({
						key: key,
						status: "getWorkflowdata"
					})


					//

					var path = this.base.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[0].mBindingInfos.items.binding;
					path.filter(
						new sap.ui.model.Filter({
							path: "reimbursmentId",
							operator: sap.ui.model.FilterOperator.EQ,
							value1: key
						})
					);

					// oFunc.setParameter('paramid', operations);
					// await oFunc.execute();
					// var result = oFunc.getBoundContext().getValue().value;
					// result = JSON.parse(result);

					var worflow_table = sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Workflow--table").mBindingInfos.items.binding;
					worflow_table.filter(
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
					//
				},
				onBeforeSave: async function (oEvent) {
					//


				
						debugger
						let d = new sap.m.Dialog
							({
								title: "Confirmation",
								type: "Message",
								content: new sap.m.Text
									({
										text: "Are you sure want to submit the form?"
									}),
								beginButton: new sap.m.Button
									({
										type: "Accept",
										text: "Yes",
										press: async function (oEvent, oPath) {
											// //
											//
											sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::StandardAction::Edit").setEnabled(false);
											sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::StandardAction::Edit").setVisible(false);
											sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Comments--text1").setValue("")
											MessageToast.show("Submitted successfully for Approval");
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
											window.location.reload();
											d.close();
											window.history.back();

										}
									}),
								endButton: new sap.m.Button({
									type: "Reject",
									text: "Cancel",
									press: function () {
										//
										sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::StandardAction::Edit").setEnabled(true);
										sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::StandardAction::Edit").setVisible(true);
										sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Comments--text1").setValue("")
										// sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet-uploadButton").setVisible(false)
										// window.location.reload();
										d.close();
										// window.history.back();

									}
								}),
								afterClose: function () {
									d.destroy();
								}
							});

						// d.open();
					
					//
					console.log("testetsste")

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

					debugger
					var fname = "itemvalidate";
					let fname1 = sap.ui.getCore().byId('app1::reimbursementheaderObjectPage--fe::Form::GeneratedFacet1::Content').getModel().bindContext(`/${fname}(...)`);
					fname1.setParameter('reiddd', key);
					await fname1.execute();
					console.log("func completed");
					let context = fname1.getBoundContext();
					let getdata = context.getValue();
					let result = getdata.value;
					result = JSON.parse(result);
					// var i1 = result.length;
					for (var i = 0; i < result.length; i++) 
					{

						let amttoreim = parseFloat(result[i].amountToBeReimbursed)
						let amttoclaim = parseFloat(result[i].amountEligibleToClaim)
						if (amttoreim) 
						{
							d.open();	
						}
					}
	

					
					// sendforApproval(oEvent);
				},
				onAfterSave: async function (oEvent) {
					//
					//
					// let uploadset = this.base.getView().mAggregations.content[0].mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[0];
					// uploadset.setMode("None");
					sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet").setUploadButtonInvisible(true);
					// sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet").setUploadEnabled(false);
					var items = sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet").getItems();
					for (let i = 0; i < items.length; i++) {
						items[i].setVisibleRemove(false);
						items[i].setVisibleEdit(false);

					}



					// changed by sai 
					var path1 = window.location.href;
					var regex = /reimbursmentId='(\d+)'/;
					var match = path1.match(regex);
					var key = match[1];

					// runs only once when the status is new
					var stat_new = sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::FormContainer::GeneratedFacet1::FormElement::DataField::status::Field-display").mProperties.text;


					//
					if (flag1) {
						// //  
						var funcname = "afterload";
						let oFunc = sap.ui.getCore().byId('app1::reimbursementheaderObjectPage--fe::Form::GeneratedFacet1::Content').getModel().bindContext(`/${funcname}(...)`);
						oFunc.setParameter('paramid', key);
						await oFunc.execute();

						flag1 = false;
					}


					// sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::StandardAction::Edit").setVisible(false);

					// till here 
				},

				onAfterDiscard: function () {
					//
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
					//
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
					//
					let uploadset = this.base.getView().mAggregations.content[0].mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[0];
					uploadset.setMode("MultiSelect");
					var items = sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet").getItems();
					for (let i = 0; i < items.length; i++) {
						items[i].setVisibleRemove(true);
						items[i].setVisibleEdit(true);

					}
					sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet").setUploadButtonInvisible(false);
				}


			}
		}
	})
});
