//@ui5-bundle app1/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"app1/Component.js":function(){sap.ui.define(["sap/fe/core/AppComponent"],function(e){"use strict";return e.extend("app1.Component",{metadata:{manifest:"json"}})});
},
	"app1/ext/controller/ObjectC.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/ControllerExtension"],function(e){"use strict";return e.extend("app1.ext.controller.ObjectC",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel()},routing:{onAfterBinding:function(e){debugger;let t=this.base.getView().mAggregations.content[0].mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[0];t.setMode("None")}},editFlow:{onBeforeEdit:function(e){debugger},onAfterEdit:function(e){debugger;var t=sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Frag1--uploadSet").getItems();for(let e=0;e<t.length;e++){t[e].setVisibleRemove(true);t[e].setVisibleEdit(true)}let g=this.base.getView().mAggregations.content[0].mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[0];g.setMode("MultiSelect")}}}})});
},
	"app1/ext/fragment/Comments.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core" xmlns="sap.m" xmlns:macros="sap.fe.macros"><VBox id = "vbox1" class="mainVboxComment"><HBox id = "hbox1" justifyContent="SpaceBetween"><TextArea id = "text1" placeholder="Write a Comment" value="" rows="8" width = "93vw"/></HBox></VBox></core:FragmentDefinition>\n\n\n',
	"app1/ext/fragment/Comments.js":function(){sap.ui.define(["sap/m/MessageToast"],function(e){"use strict";return{onPress:function(t){e.show("Custom handler invoked.");debugger;var n=new sap.m.Dialog({title:"Comments",endButton:new sap.m.Button({text:"Close",press:async function(){n.close()},layoutData:new sap.m.FlexItemData({growFactor:5,alignSelf:"End"})})});n.addContent(new sap.m.VBox({width:"60vw"}));function a(){var e=Math.floor(Math.random()*1e6);var t=(new Date).getTime();var n=t+"-"+e;return n}debugger;var o=new sap.suite.ui.commons.TimelineItem("thisuniqid1"+a(),{dateTime:"12/3/34",userNameClickable:false,text:"comment1",userName:"Comments"});n.addContent(o);n.open();debugger}}});
},
	"app1/ext/fragment/Frag1.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core" xmlns="sap.m" xmlns:macros="sap.fe.macros" displayBlock="true"\nxmlns:mvc="sap.ui.core.mvc" xmlns:upload="sap.m.upload"><VBox id="11"><upload:UploadSet\n\t\t\t\t\tid="uploadSet"\n\t\t\t\t\tcore:require="{ handler:  \'app1/ext/fragment/Frag1\'}"\n\t\t\t\t\tinstantUpload="false"\n\t\t\t\t\tuploadEnabled="false"\n\t\t\t\t\tshowIcons="true"\n\t\t\t\t\tuploadButtonInvisible="true"\n\t\t\t\t\tafterItemAdded="handler.onAfterItemAdded"\n\t\t\t\t\tuploadCompleted="handler.onUploadCompleted"\n\t\t\t\t\titems="{\n\t\t\t\t\t\t\t\tpath: \'/Files\',\n\t\t\t\t\t\t\t\tparameters: {\n\t\t\t\t\t\t\t\t\t$orderby: \'createdAt desc\'\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\ttemplateShareable: false}"><upload:toolbar></upload:toolbar><upload:items><upload:UploadSetItem\n\t\t\t\t\t\tid="ddd"\n\t\t\t\t\t\t\tfileName="{fileName}"\n\t\t\t\t\t\t\tmediaType="{mediaType}"\n\t\t\t\t\t\t\turl="{url}"\n\t\t\t\t\t\t\tthumbnailUrl="{\n\t\t\t\t\t\t\t\tpath: \'mediaType\',\n\t\t\t\t\t\t\t\tformatter: \'handler.formatThumbnailUrl\'\n\t\t\t\t\t\t\t}"\n\t\t\t\t\t\t\tenabledEdit="false"\n\t\t\t\t\t\t\tvisibleEdit="false"\n\t\t\t\t\t\t\tvisibleRemove="false"\n\t\t\t\t\t\t\topenPressed="handler.onOpenPressed"\n\t\t\t\t\t\t\tremovePressed="handler.onRemovePressed"><upload:attributes><ObjectAttribute\n\t\t\t\t\t\t\t\tid="dd"\n\t\t\t\t\t\t\t\t\ttitle="Uploaded By"\n\t\t\t\t\t\t\t\t\ttext="{createdBy}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/><ObjectAttribute\n\t\t\t\t\t\t\t\tid="dd22"\n\t\t\t\t\t\t\t\t\ttitle="Uploaded on"\n\t\t\t\t\t\t\t\t\ttext="{createdAt}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/><ObjectAttribute\n\t\t\t\t\t\t\t\tid="dddw2"\n\n\t\t\t\t\t\t\t\t\ttitle="File Type"\n\t\t\t\t\t\t\t\t\ttext="{mediaType}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/><ObjectAttribute\n\t\t\t\t\t\t\t\tid="dd22a"\n\t\t\t\t\t\t\t\t\ttitle="File Size"\n\t\t\t\t\t\t\t\t\ttext="{size}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/></upload:attributes></upload:UploadSetItem></upload:items></upload:UploadSet></VBox></core:FragmentDefinition>\n\n\n',
	"app1/ext/fragment/Frag1.js":function(){sap.ui.define(["sap/m/MessageToast","sap/ui/model/json/JSONModel","sap/ui/core/Item","sap/m/MessageToast"],function(e){"use strict";var t=this;return{onPress:function(t){debugger;e.show("Custom handler invoked.")},onAfterItemAdded:function(e){debugger;var t=e.getParameter("item");var a=function(e){var t={mediaType:e.getMediaType(),fileName:e.getFileName(),size:e.getFileObject().size};var a={url:"/odata/v4/my/Files",method:"POST",headers:{"Content-type":"application/json"},data:JSON.stringify(t)};return new Promise((e,t)=>{$.ajax(a).done((t,a,n)=>{e(t.ID)}).fail(e=>{t(e)})})};a(t).then(e=>{var a=`/odata/v4/my/Files(${e})/content`;t.setUploadUrl(a);var n=this.byId("uploadSet");n.setHttpRequestMethod("PUT");n.uploadItem(t)}).catch(e=>{console.log(e)})},onUploadCompleted:function(e){debugger;var t=this.byId("uploadSet");t.removeAllIncompleteItems();t.getBinding("items").refresh()},onRemovePressed:function(t){t.preventDefault();t.getParameter("item").getBindingContext().delete();e.show("Selected file has been deleted")},onOpenPressed:function(e){debugger;e.preventDefault();var t=e.getSource();var a=t.getFileName();var n=function(e){var t={url:e.getUrl(),method:"GET",headers:{"Content-type":"application/octet-stream"},xhrFields:{responseType:"blob"}};return new Promise((e,a)=>{$.ajax(t).done(t=>{e(t)}).fail(e=>{a(e)})})};n(t).then(e=>{var t=window.URL.createObjectURL(e);window.open(t,"_blank")}).catch(e=>{console.log(e)})},_download:function(e){var t={url:e.getUrl(),method:"GET",headers:{"Content-type":"application/octet-stream"},xhrFields:{responseType:"blob"}};return new Promise((e,a)=>{$.ajax(t).done(t=>{e(t)}).fail(e=>{a(e)})})},_createEntity:function(e){var t={mediaType:e.getMediaType(),fileName:e.getFileName(),size:e.getFileObject().size};var a={url:"/my/Files",method:"POST",headers:{"Content-type":"application/json"},data:JSON.stringify(t)};return new Promise((e,t)=>{$.ajax(a).done((t,a,n)=>{e(t.ID)}).fail(e=>{t(e)})})},_uploadContent:function(e,t){var a=`/my/Files(${t})/content`;e.setUploadUrl(a);var n=this.byId("uploadSet");n.setHttpRequestMethod("PUT");n.uploadItem(e)},formatThumbnailUrl:function(e){var t;switch(e){case"image/png":t="sap-icon://card";break;case"text/plain":t="sap-icon://document-text";break;case"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":t="sap-icon://excel-attachment";break;case"application/vnd.openxmlformats-officedocument.wordprocessingml.document":t="sap-icon://doc-attachment";break;case"application/pdf":t="sap-icon://pdf-attachment";break;default:t="sap-icon://attachment"}return t}}});
},
	"app1/ext/fragment/Workflow.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core" xmlns="sap.m" xmlns:macros="sap.fe.macros"><VBox id="v1"><HBox id="buttonContainer" alignItems="End" justifyContent="End" width="100%"><Button  id="btn3" class="buttonhistory" core:require="{ handler: \'app1/ext/fragment/Comments\'}" text="Comment History" \n\t\t\tpress="handler.onPress"  icon="sap-icon://comment" /></HBox><Title text="Level1" id="title1"/><ScrollContainer id="scrollContainer" height="280px" width="100%"><Table id="table" ><columns><Column width="11rem" id="c22" styleClass="colClass"><Text text="Title" id="demo"/></Column><Column id="c1" width="11rem" styleClass="colClass"><Text text="Employee ID" id="t1"/></Column><Column id="c2" width="11rem" styleClass="colClass"><Text text="Employee Name" id="t2" width="11rem"/></Column><Column id="c3" width="11rem" styleClass="colClass"><Text text="Begin Date" id="t3" width="11rem"/></Column><Column id="c4" width="11rem" styleClass="colClass"><Text text="End Date" id="t4"/></Column><Column id="c5" width="11rem" styleClass="colClass"><Text text="Days Taken" id="t5"/></Column><Column id="c6" width="11rem" styleClass="colClass"><Text text="Approved By" id="t06"/></Column></columns><items><ColumnListItem id="cli1"><cells><Text text="Level" id="t14"/><Text text="Title" id="t6"/><Text text="Employee_id" id="t7"/><Text text="Employee_Name" id="t8"/><Text text="Begin_Date_Time" id="t9"/><Text text="End_Date_Time" id="t11"/><Text text="Days_Taken" id="t12"/><Text text="Approved_By" id="t13"/></cells></ColumnListItem></items></Table></ScrollContainer></VBox></core:FragmentDefinition>\n\n\n\n\n',
	"app1/ext/fragment/Workflow.js":function(){
},
	"app1/i18n/i18n.properties":'# This is the resource bundle for app1\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=App1\n\n#YDES: Application description\nappDescription=An SAP Fiori application.\n\nflpTitle=title\n',
	"app1/manifest.json":'{"_version":"1.59.0","sap.app":{"id":"app1","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:lrop","version":"1.13.0","toolsId":"bd9be6de-f78b-4c2c-95f4-47a5a8772896"},"dataSources":{"mainService":{"uri":"odata/v4/my/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"sem-act":{"semanticObject":"sem","action":"act","title":"{{flpTitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.121.2","libs":{"sap.m":{},"sap.ui.core":{},"sap.ushell":{},"sap.fe.templates":{},"sap.suite.ui.commons":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"app1.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}},"@i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties"}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"routes":[{"pattern":":?query:","name":"reimbursementheaderList","target":"reimbursementheaderList"},{"pattern":"reimbursementheader({key}):?query:","name":"reimbursementheaderObjectPage","target":"reimbursementheaderObjectPage"}],"targets":{"reimbursementheaderList":{"type":"Component","id":"reimbursementheaderList","name":"sap.fe.templates.ListReport","options":{"settings":{"contextPath":"/reimbursementheader","variantManagement":"Page","navigation":{"reimbursementheader":{"detail":{"route":"reimbursementheaderObjectPage"}}},"initialLoad":"Enabled","controlConfiguration":{"@com.sap.vocabularies.UI.v1.LineItem":{"columns":{"DataField::reimbursementDate":{"width":"200px"},"DataField::reimbursmentId":{"width":"350px"}}}}}}},"reimbursementheaderObjectPage":{"type":"Component","id":"reimbursementheaderObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"editableHeaderContent":false,"contextPath":"/reimbursementheader","content":{"body":{"sections":{"Frag1":{"template":"app1.ext.fragment.Frag1","position":{"placement":"After","anchor":"Reimburs"},"title":"Attachment","type":"XMLFragment"},"Comments":{"template":"app1.ext.fragment.Comments","position":{"placement":"After","anchor":"Workflow"},"title":"Comments","type":"XMLFragment"},"Workflow":{"template":"app1.ext.fragment.Workflow","position":{"placement":"After","anchor":"Frag1"},"title":"Workflow History","type":"XMLFragment"}}}}}}}}},"extends":{"extensions":{"sap.ui.controllerExtensions":{"sap.fe.templates.ObjectPage.ObjectPageController":{"controllerName":"app1.ext.controller.ObjectC"}}}}},"sap.fiori":{"registrationIds":[],"archeType":"transactional"},"sap.cloud":{"public":true,"service":"unique"}}'
}});
