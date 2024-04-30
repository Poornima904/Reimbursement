sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('app1.ext.controller.ListC', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf app1.ext.controller.ListC
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			routing:{
				
				onAfterBinding:function(){
					debugger
			
				},
			},
			editFlow:{
				invokeAction:function(){
					debugger
				},

				beforeNavigationTo:function(){
					debugger
				},
				onAfterActionExecution:function(){
					debugger
				},
				// onBeforeCreate:function(oEvent){
				// 	debugger;
					
				// },
				onAfterCreate: async function(oEvent){
					debugger;

					// 	var path1 = window.location.href;
					// var regex = /reimbursmentId='(\d+)'/;
					// var match = path1.match(regex);
					// var key = match[1];

					// // runs only once when the status is ne

					

							
					// 	// debugger  
					// let oFunc =  this.getView().getModel().bindContext("/afterload(...)");
					// oFunc.setParameter('paramid', key);
					// await oFunc.execute();

					
					
				}
			}
		}
	});
});
