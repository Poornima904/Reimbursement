//@ui5-bundle project1/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"project1/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","project1/model/models"],function(e,t,i){"use strict";return e.extend("project1.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device")}})});
},
	"project1/controller/App.controller.js":function(){sap.ui.define(["sap/m/MessageToast","sap/ui/core/mvc/Controller","sap/ui/Device","sap/base/Log"],function(e,t,i,n){"use strict";return t.extend("project1.controller.App",{onInit:function(){debugger},onListItemPress:function(e){debugger;var t=e.getParameter("listItem").getCustomData()[0].getValue();this.getSplitAppObj().toDetail(this.createId(t))},getSplitAppObj:function(){debugger;var e=this.byId("SplitAppDemo");if(!e){n.info("SplitApp object can't be found")}return e}})});
},
	"project1/controller/View1.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("project1.controller.View1",{onInit:function(){}})});
},
	"project1/i18n/i18n.properties":'# This is the resource bundle for project1\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=AppFiori\n\n#YDES: Application description\nappDescription=An SAP Fiori application.\n#XTIT: Main view title\ntitle=AppFiori\n\nflpTitle=AppFiori\n',
	"project1/manifest.json":'{"_version":"1.59.0","sap.app":{"id":"project1","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:basic","version":"1.13.0","toolsId":"4013576f-bd42-4967-80b9-aad0f1b7c87f"},"dataSources":{"mainService":{"uri":"odata/v4/my/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"sem-display":{"semanticObject":"sem","action":"display","title":"{{flpTitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.122.0","libs":{"sap.m":{},"sap.ui.core":{},"sap.f":{},"sap.suite.ui.generic.template":{},"sap.ui.comp":{},"sap.ui.generic.app":{},"sap.ui.table":{},"sap.ushell":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"project1.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"project1.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RouteView1","pattern":":?query:","target":["TargetView1"]}],"targets":{"TargetView1":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"View1","viewName":"View1"}}},"rootView":{"viewName":"project1.view.App","type":"XML","async":true,"id":"App"}},"sap.cloud":{"public":true,"service":"unique"}}',
	"project1/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"project1/view/App.view.xml":'<mvc:View controllerName="project1.controller.App"\n    xmlns:html="http://www.w3.org/1999/xhtml"\n    xmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"\n\txmlns:custom="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1"><SplitApp id="SplitAppDemo" initialDetail="detail" initialMaster="master"><masterPages><Page\n\t\t\t\tid="master1"\n\t\t\t\ttitle="Reimbursement Details"\n\t\t\t\tbackgroundDesign="List"><List id="jd" itemPress=".onListItemPress"><items><StandardListItem id="aaa" title="To Detail 1" type="Active" custom:to="detail1" /><StandardListItem id="aa" title="To Detail 2" type="Active" custom:to="detail2" /><StandardListItem id="aaba" title="To Detail 3" type="Active" custom:to="detail3" /></items></List></Page></masterPages><detailPages><Page\n\t\t\t\tid="detail1"\n\t\t\t\ttitle="Detail 1"\n\t\t\t\tbackgroundDesign= "Solid"><Label id="lab1" text="Detail page 1" /></Page><Page\n\t\t\t\tid="detail2"\n\t\t\t\ttitle="Detail 2"\n\t\t\t\tbackgroundDesign= "Solid"><Label id="lab2" text="Detail page 2" /></Page><Page\n\t\t\t\tid="detail3"\n\t\t\t\ttitle="Detail 3"\n\t\t\t\tbackgroundDesign= "Solid"><Label id="lab3" text="Detail page 3" /></Page></detailPages></SplitApp></mvc:View>\n',
	"project1/view/View1.view.xml":'<mvc:View controllerName="project1.controller.View1"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"><Page id="page" title="{i18n>title}"><content /></Page></mvc:View>'
}});