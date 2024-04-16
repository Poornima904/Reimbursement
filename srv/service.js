const cds = require('@sap/cds');
const { insert } = require('@sap/cds/libx/_runtime/hana/execute');
const axios = require('axios');
const { workerData } = require('worker_threads');
module.exports = cds.service.impl(async function () {

    var BPA = await cds.connect.to('BPA_S');

    //for attachments
    let { reimbursementitem, comment, vluehelp_remtype, reimbursementtype, reimbursementheader, workflow, reimbursementWorkflow } = this.entities;
  
  
    this.before('CREATE', 'Files', (req) => {

        console.log('Create called')
        console.log(JSON.stringify(req.data))
        // req.data.url = `/odata/v4/my/Files(${req.data.ID})/content`
        req.data.url = `/odata/v4/my/Files(ID=${req.data.ID},fileId=${req.data.fileId})/content`

        return req;
    }),

    this.on('getcallcomment',async (req) => {
        debugger
        let commentshistory =  await SELECT.from(comment).where({ reimbursmentId: req.data.reimid });

        return JSON.stringify(commentshistory)
    });

    // for storing comments in database

    // this.on('CREATE', 'comment', async (req, next) => {
    //     debugger

    //     // var com = sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Comments--text1").mProperties.value;

    //     // await INSERT.into (comment) .entries ({reimbursmentId : req.data.reimbursmentId,textArea:com});

    // });
        //After getting data from bpa
        this.on('UPDATE', 'reimbursementheader', async (req, next) => {
            console.log("first line");
            debugger
            try {
                if (req.data.status_val || req.data.status_val == 3) {
                    var reimid = req.data.reimbursmentId;
                    console.log(reimid);
                    var reim_in_string = reimid.toString();
                    var level = req.odataReq._body.status_dis;
                    console.log(level);
                    var buttonclicked = req.odataReq._body.status_val;
                    console.log(buttonclicked);

                    console.log("Before Select Query");
                    var levels = req.odataReq._body.status_dis;
                    var regex = /(\d+\.\d+)/;;
                    var match = regex.exec(levels);
                    console.log("match = ", match);
                    if (match) {
                        var id = parseFloat(match[0]);
                        console.log("id = ",id)
                    }
                    let id_to_string = id.toFixed(1);
                    console.log("id_to_string",id_to_string)
                    console.log("Entered If Statement Of Level")
                    if (req.odataReq._body.status_val) {
                        console.log("Status_val is existing", reim_in_string);
                        let levelupdation = id;//here in status_dis we are passing values of level
                        console.log("if status code is 3/levelupdation = value");
                        // let levelupdationint = parseInt(levelupdation);
                        console.log("if status code is 3/levelupdationint");
                        let levelupdationint1 = id + 1;
                        console.log("if status code is 3/levelupdationint1",levelupdationint1);
                        let levelupdationstring = levelupdationint1.toFixed(1);;
                        console.log("if status code is 3/levelupdationstring",levelupdationstring);
                        let table_data1 = await SELECT.from(workflow).where({ reimbursmentId: req.data.reimbursmentId, level: levelupdationstring });
                        console.log("string", levelupdationstring);
                        console.log("if status code is 3/table_data1");
                        console.log(table_data1.length);
                        if (table_data1.length === 0) {
                            console.log("table_data1.length === 0");
                            let update_header = await UPDATE(reimbursementheader).set({ status: 'Approved', status_val: 3 }).where({ reimbursmentId: req.data.reimbursmentId });
                            console.log("update_header", update_header);
                            console.log("table_data1.length === 0/update header");
                        }
                        let update_workflow = await UPDATE(workflow).set({ status: 'Approved' }).where({ reimbursmentId: id_to_string , level: id_to_string });
                        console.log("update_workflow", update_workflow);
                        console.log("At last update workflow");
                    }
                    
                    else {
                        console.log("Status_val is not existing");
                        // var reject = "Rejected";
                        console.log(reim_in_string)
                        await UPDATE(reimbursementheader).set({ status: 'Rejected', status_val: 1 }).where({ reimbursmentId: req.data.reimbursmentId });
                        console.log("after updation")
                        var updateddata = await SELECT.from(reimbursementheader).where({ reimbursmentId: reim_in_string })
                        console.log(updateddata)
                        let header = await SELECT.from(workflow).where`reimbursmentId = ${req.data.reimbursmentId}`;
                        console.log(header);
                        console.log("if status code is 1/update header as rejected");
                        let table_data = await SELECT.from(workflow).where`reimbursmentId = ${req.data.reimbursmentId} AND level=${id}`;
                        console.log("table data", table_data);
                        for (let i = 0; i < table_data.length; i++) {
                            console.log("entered for loop");
                            let wId = table_data[i].workFlowId;//Fetching workFlow Id from the workflow table.
                            console.log(wId);
                            await UPDATE(workflow).set({ status: 'Rejected' }).where({ reimbursmentId: req.data.reimbursmentId, workFlowId: wId });
                            console.log(table_data);
                            console.log("if status code is 1/update workflow as rejected");
                        }

                        console.log("============================");
                    }
                    const today = new Date();
                    const year = today.getFullYear();
                    const month = today.getMonth() + 1;
                    const day = today.getDate();
                    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
                    await UPDATE(workflow).set({ EndDate: formattedDate }).where({ reimbursmentId: req.data.id, level: id });
                    console.log("End date Updated");
                    return req;
                }


            }
            catch (error) {
                console.log('////////////////////////////////////////////')
                console.log(error)
            }
            return next();
        });


    this.on('READ', reimbursementitem.drafts, async (req, next) => {
        debugger
        if (req.data.reimbursmentType) {
            var table = await SELECT.from(reimbursementtype).where({ type: req.data.reimbursmentType });

            await cds.update(reimbursementitem.drafts)
                .set({ amountEligibleToClaim: table[0].amount }) // Update with new dat a
                .where({ reimbursmentId: req.data.reimbursmentId, item: req.data.item });


        }

        return next();
    });
    this.on('load', async (req, next) => {
        debugger
        let value_help = await SELECT.from(vluehelp_remtype);
        if (value_help.length !== 0) {
            let abcd = await DELETE.from(vluehelp_remtype);
            console.log(value_help);
        }
        let reimbursementData = await SELECT`type`.from(reimbursementtype);
        var data = [];
        for (let i = 0; i < reimbursementData.length; i++) {
            data.push
                ({
                    remType: reimbursementData[i].type
                })
        }
        var insres = await INSERT.into(vluehelp_remtype, data);
        return next()

    }),
        this.on('afterload', async (req, next) => {
            debugger
            // let header = await SELECT.from(reimbursementheader).where({ status: 'Approved' });
            // for (let headerindex = 0; headerindex < header.length; headerindex++) {
                // if (header[headerindex].reimbursmentId !== req.data.paramid) {
                    let workflow_history = await SELECT.from(workflow).where({ reimbursmentId: req.data.paramid });
                    if (workflow_history.length !== 0) {
                        await DELETE.from(workflow).where({ reimbursmentId: req.data.paramid })
                    }
                    let workflow_entries = await SELECT.from(reimbursementWorkflow);
                    var workflow_data = [];
                    for (let j = 0; j < workflow_entries.length; j++) {
                        workflow_data.push
                            ({
                                workFlowId: cds.utils.uuid(),
                                reimbursmentId: req.data.paramid,
                                level: workflow_entries[j].level,
                                Users: workflow_entries[j].Approvers
                            })
                    }
                    var ins = await INSERT.into(workflow, workflow_data);
                    console.log("inserted workflow",workflow_data[0].workFlowId)
                    let emailsArray = [];
                    let users = await SELECT.from(workflow).where({ level: '1.0', reimbursmentId: req.data.paramid });
                    for (let i = 0; i < users.length; i++) {
                        var Users = users[i].Users;
                        emailsArray.push(Users);
                    }
                    let csv = emailsArray.join(', ');
                    console.log(csv);
                    await UPDATE(reimbursementheader).set({ status_dis: csv }).where({ reimbursmentId: req.data.paramid });
                // }

            // }



            return next();
        }),
        this.on('commentfi', async req =>{
            debugger

            let comment_table = await INSERT.into (comment) .entries ({reimbursmentId : req.data.id,textArea:req.data.comment}); 

        }),
        this.on('asdf', async req => {
            try {
                //cono
                console.log("process trigger");
                var workitemId;
               
                // var authString = client + ':' + secret;
                // var auth1 = window.btoa(authString);

                var bodyy = JSON.parse(JSON.stringify({
                    "definitionId": process.env.definitionId,
                    "context": {
                        "keyy": `${req.data.id}`,
                        "filter1": "level eq '",
                        "filter2": "'"
                    }



                }));
                console.log(bodyy);
               
                // let response11 = await BPA.post("/",bodyy);

                // const response11 = await fetch('', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Authorization': 'Bearer ' + response1.data.access_token,
                //     },
                //     body: JSON.stringify(bodyy),
                // });

                //

                workitemId = response11.data.rootInstanceId;
                //
                ///////contiiiiiiiiiiiiiiiiiiiii

            } catch (error) {
                //
            }

            //update workitemId in reim header
            // let wf = await SELECT.from(workflow).where`reimbursmentId = '${req.data.id}' and level = '1'`;
            // let users;
            // if (wf.length <= 1) {
            //     users += wf[0].Users;
            // } else {
            //     for (let i = 0; i < (wf.length - 1); i++) {
            //         users += (wf[i].Users + " ,");
            //     }
            //     users += wf[wf.length - 1].Users;
            // }
            //prem
            // await UPDATE(reimbursementheader).set({ workitemId: workitemId, status_dis: users }).where({ reimbursmentId: req.data.id });

            var pending = "Pending for Approval"
            await UPDATE(reimbursementheader).set({ status: pending, status_val: 2 }).where({ reimbursmentId: req.data.id });
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            const day = today.getDate();
            const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
            await UPDATE(workflow).set({ BeginDate: formattedDate }).where({ reimbursmentId: req.data.id });
            console.log(formattedDate);


        });




    this.before('READ', 'Files', req => {
        
        //check content-type
        console.log('content-type: ', req.headers['content-type'])
    })

    //For criticality(new)
    // this.after('CREATE', reimbursementheader.drafts, async (req, next) => {
    //     //
    //     let data = await SELECT.from(reimbursementheader.drafts);

    //     let drafttable = await SELECT.from('DRAFT_DRAFTADMINISTRATIVEDATA');

    //     let rid = req.reimbursmentId;
    //     await UPDATE(reimbursementheader.drafts).set({ status_dis: 'New', status_val: 0 }).where({ reimbursmentId: rid, DRAFTADMINISTRATIVEDATA_DRAFTUUID: drafttable[drafttable.length - 1].DRAFTUUID });

    //     let data2 = await SELECT.from(reimbursementheader.drafts);
    // })
    //For criticality(Draft)
    // this.after('CREATE', reimbursementheader, async (req, next) => {
    //
    // let data1 = await SELECT.from(reimbursementheader);
    // let rid1 = req.reimbursmentId;
    // await UPDATE(reimbursementheader).set({ status_dis: 'Draft' }).where({ reimbursmentId: rid1 });
    // })


    this.on('SAVE', reimbursementheader, async (req, next) => {
        console.log("saveee")
        // console.log(req);
    

        // var comment = sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Comments--text1").getValue()

        // await INSERT.into(comment).entries({reimbursmentId:})
        try {
            if (!req.data.status_val || req.data.status_val == 3) {
                console.log("inside if")
            }
        } catch (error) {
            console.log("inside catch");
            return null;
        }
        //ADDING SUM IN HEADER
        let sum = 0;
        for (let i = 0; i < req.data.headItem1.length; i++) {
            let amount = req.data.headItem1[i].amountToBeReimbursed;
            let amount_in_integer = parseInt(amount);
            sum = sum + amount_in_integer;
        }
        req.data.totalAmount = sum;
        return next();
    })

    // to update app1 as approved/rejected


    // this.on('rheaderfunc', async (req) => {
    //     //
    //     let result = JSON.parse(req.data.data);
    //     if (result.status_dis === "Approved") {
    //         await UPDATE(reimbursementheader).set({ status_dis: result.status_dis, status_val: 3 }).where({ reimbursmentId: result.keyfield });
    //     } else if (result.status_dis === "Rejected") {
    //         await UPDATE(reimbursementheader).set({ status_dis: result.status_dis, status_val: 1 }).where({ reimbursmentId: result.keyfield });
    //     }
    /

    //GENERATION OF HEADER ID
    this.before('CREATE', reimbursementheader.drafts, async (req) => { // sevice name
        //
        var now = new Date();
        var randomNum = '';
        randomNum += Math.round(Math.random() * 9);
        randomNum += Math.round(Math.random() * 9);
        randomNum += now.getTime().toString().slice(-3);
        req.data.reimbursmentId = randomNum
        return req;
    })




    //GENERATION OF ITEM ID
    this.before('CREATE', reimbursementitem.drafts, async (req, next) => {
        //
        //
        var last_variable;
        var variable;
        var rid = req.data.reimbursmentId;
        let item_table_draft = await SELECT.from(reimbursementitem.drafts).where({ reimbursmentId: rid });
        if (item_table_draft.length !== 0) {
            last_variable = item_table_draft[item_table_draft.length - 1].item;
            variable_integer = parseInt(last_variable);
            variable = variable_integer + 10;
            req.data.item = variable.toString();

        }
        else {
            req.data.item = "10";
        }
        return req;
    })
});
