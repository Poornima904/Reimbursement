const cds = require('@sap/cds');
const { insert } = require('@sap/cds/libx/_runtime/hana/execute');
const axios = require('axios');
const { timeStamp } = require('console');
const { workerData } = require('worker_threads');
module.exports = cds.service.impl(async function () {

    var BPA = await cds.connect.to('BPA_S');
    // // let response1 = await BPA.get("/workflow/rest/v1/workflow-instances/74f7f9da-0065-11ef-921f-eeee0a9bcda2/execution-logs/");
    //             // console.log("response1",response1);
    // var destt = await BPA.get("/workflow/rest/v1/workflow-instances");
    // console.log("destt",destt);

    //for attachments
    let { reimbursementitem, comment, vluehelp_remtype, reimbursementtype, reimbursementheader, workflow, reimbursementWorkflow } = this.entities;


    this.before('CREATE', 'Files', (req) => {

        console.log('Create called')
        console.log(JSON.stringify(req.data))
        // req.data.url = `/odata/v4/my/Files(${req.data.ID})/content`
        req.data.url = `/odata/v4/my/Files(ID=${req.data.ID},fileId=${req.data.fileId})/content`

        return req;
    }),

        this.on('getcallcomment', async (req) => {
            //
            let commentshistory = await SELECT.from(comment).where({ reimbursmentId: req.data.reimid });
            return JSON.stringify(commentshistory)


        });

        this.on('itemvalidate', async (req) => {

            let itemlist = await SELECT.from(reimbursementitem.drafts).where({ reimbursmentId: req.data.reiddd });
            return JSON.stringify(itemlist)


        });


        this.on('READ', reimbursementitem.drafts, async (req, next) => {
            debugger
            if (req.data.amountToBeReimbursed) {
                var table = await SELECT.from(reimbursementitem.drafts).where({ reimbursmentId: req.data.reimbursmentId });
                for (i = 0; i < table.length; i++) {

                                let amttoreim = parseFloat(table[i].amountToBeReimbursed)
                                let amttoclaim = parseFloat(table[i].amountEligibleToClaim)
                                if (amttoreim > amttoclaim) {
                    
                                    console.log("fsdfjkshfdjksdjjh")  
                                    //  req.error({
                                    //     message:`Amount To Be Reimbursed ${table[i].amountToBeReimbursed} shoud be less than Amount Eligible To Claim ${table[i].amountEligibleToClaim}`,
                                    //  })
                                    
                                    req.error(406, `Amount To Be Reimbursed ${table[i].amountToBeReimbursed} shoud be less than Amount Eligible To Claim ${table[i].amountEligibleToClaim}`, "Error message here");
                                    
                                    //  throw new Error('Amount to be reimbursed should be less than amount eligible to claim');
                 
                                    
                                }
                            }
            }
            return next();
        });

    // for storing comments in database

    // this.on('CREATE', 'comment', async (req, next) => {
    //     //

    //     // var com = sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Comments--text1").mProperties.value;

    //     // await INSERT.into (comment) .entries ({reimbursmentId : req.data.reimbursmentId,textArea:com});

    // });
    //After getting data from bpa
    this.on('UPDATE', 'reimbursementheader', async (req, next) => {

        console.log("first line");
        console.log("req", req.data);
        console.log("req.odata", req.odataReq._body);
        console.log("//////////////id", req.data.reimbursmentId);
        //
        try {
            if (!req.data.status_val || req.data.status_val == 3) {
                var reimid = req.data.reimbursmentId;
                console.log(reimid);
                console.log('status val is  ', req.data.status_val);
                var reim_in_string = reimid.toString();
                var level = req.odataReq._body.status_dis;
                console.log(level);
                var buttonclicked = req.odataReq._body.status_val;
                console.log(buttonclicked);
                var levels = req.odataReq._body.status_dis;
                var regex = /(\d+\.\d+)/;;
                var match = regex.exec(levels);
                console.log("match = ", match);
                if (match) {
                    var id = parseFloat(match[0]);
                    console.log("id = ", id)
                }
                let id_to_string = id.toFixed(1);//1.0
                console.log("id_to_string", id_to_string)
                if (req.odataReq._body.status_val) {
                    console.log("Status_val is existing", reim_in_string);
                    console.log("Status_val is ", req.odataReq._body.status_val);
                    let levelupdation = id;//here in status_dis we are passing values of level
                    console.log("if status code is 3/levelupdation");
                    // let levelupdationint = parseInt(levelupdation);
                    console.log("if status code is 3/levelupdationint");
                    let levelupdationint1 = id + 1;
                    console.log("if status code is 3/levelupdationint1", levelupdationint1);
                    let levelupdationstring = levelupdationint1.toFixed(1);;
                    console.log("if status code is 3/levelupdationstring", levelupdationstring);//2.0
                    let table_data1 = await SELECT.from(workflow).where({ reimbursmentId: req.data.reimbursmentId, level: levelupdationstring });
                    console.log("string", levelupdationstring);
                    console.log("if status code is 3/table_data1");
                    console.log(table_data1.length);
                    if (table_data1.length === 0) {
                        // table_data1[]
                        console.log("table_data1.length === 0");
                        let update_header = await UPDATE(reimbursementheader).set({ status: 'Approved', status_val: 3 }).where({ reimbursmentId: req.data.reimbursmentId });
                        console.log("update_header", update_header);
                        console.log("table_data1.length === 0/update header");
                    }
                    else {
                        let emailsArray = [];
                        for (let i = 0; i < table_data1.length; i++) {
                            var Users = table_data1[i].Users;
                            emailsArray.push(Users);
                        }
                        let csv = emailsArray.join(' ,');
                        console.log(csv);
                        let update2 = await UPDATE(reimbursementheader).set({ status_dis: table_data1[0].Users }).where({ reimbursmentId: req.data.reimbursmentId });
                        console.log("update2", update2);
                    }
                    let worflow_id_data = await SELECT.from(workflow).where({ reimbursmentId: req.data.reimbursmentId, level: id_to_string });
                    console.log("worflow_id_data", worflow_id_data);
                    for (let k = 0; k < worflow_id_data.length; k++) {
                        console.log("worflow_id_data[k].workFlowId", worflow_id_data[k].workFlowId);
                        let update_workflow = await UPDATE(workflow).set({ status: 'Approved' }).where({ workFlowId: worflow_id_data[k].workFlowId, reimbursmentId: req.data.reimbursmentId, level: id_to_string });
                        console.log("update_workflow", update_workflow);
                    }
                    console.log("At last update workflow");


                }

                else {
                    console.log("Status_val is not existing");
                    let tableeeee = await UPDATE(reimbursementheader).set({ status: 'Rejected', status_val: 1 }).where({ reimbursmentId: req.data.reimbursmentId });
                    console.log("tableeeee", tableeeee);
                    console.log("after updation")
                    var updateddata = await SELECT.from(reimbursementheader).where({ reimbursmentId: req.data.reimbursmentId })
                    console.log(updateddata)
                    let header = await SELECT.from(workflow).where({ reimbursmentId: req.data.reimbursmentId });
                    console.log("header", header);
                    console.log("if status code is 1/update header as rejected");
                    let table_data = await SELECT.from(workflow).where({ reimbursmentId: req.data.reimbursmentId, level: id_to_string });
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
                //TO ADD END DATE IN WORKFLOW
                // const today = new Date();
                // const year = today.getFullYear();
                // const month = today.getMonth() + 1;
                // const day = today.getDate();
                // const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
                const d = new Date();
                const day = String(d.getDate()).padStart(2, '0');
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const year = d.getFullYear();
                const formattedDate = `${day}-${month}-${year}`;
                // let type = typeof formattedDate;
                // console.log("typeof", type);
                let update_date = await UPDATE(workflow).set({ EndDate: formattedDate }).where({ reimbursmentId: req.data.reimbursmentId, level: id_to_string });
                console.log("End date Updated", update_date);

                // days taken calculation

                var worflowhist = await SELECT.from(workflow).where({ reimbursmentId: req.data.reimbursmentId });
                console.log("worflowhist", worflowhist);
                for (var x = 0; x < worflowhist.length; x++) {
                    console.log("sai");
                    console.log("worflowhist[x].BeginDate", worflowhist[x].BeginDate);
                    const beginda = worflowhist[x].BeginDate
                    const enddada = formattedDate

                    console.log("beginda", worflowhist[x].BeginDate);
                    console.log("enddada", formattedDate);


                    const startDateParts = beginda.split("-").map(Number);
                    const endDateParts = enddada.split("-").map(Number);
                    const startDate = new Date(startDateParts[2], startDateParts[1] - 1, startDateParts[0]);
                    const endDate = new Date(endDateParts[2], endDateParts[1] - 1, endDateParts[0]);

                    // Calculate the difference in milliseconds
                    const differenceInMs = endDate - startDate;

                    // Convert milliseconds to days
                    const daysDifference = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

                    console.log("days diffff", daysDifference)
                    console.log("idddddddddtostr : ", id_to_string)
                    console.log("iddddd : ", req.data.reimbursmentId)
                    console.log("commmmmmm", req.odataReq._body.submittedBy)
                    let update_workflow = await UPDATE(workflow).set({ DaysTaken: JSON.stringify(daysDifference) }).where({ reimbursmentId: req.data.reimbursmentId, level: id_to_string });
                    console.log("update_workflow {}", update_workflow)
                }
                // console.log("kkkkkkkkkkkkkkkkkkkkkk");
                // let response1 = await BPA.get("/workflow/rest/v1/workflow-instances/74f7f9da-0065-11ef-921f-eeee0a9bcda2/execution-logs/");
                // console.log("response1", response1);
                // const filteredData = responseData.filter(item => {
                //     return item.type === "USERTASK_COMPLETED" && item.userId === "poornima.am@peolsolutions.com";
                // });

                // COMMENTS ADDITION
                console.log("comment", req.odataReq._body.submittedBy);
                let commentuuid = cds.utils.uuid();
                console.log("reiid : ", req.data.reimbursmentId)
                console.log("textareaaa : ", req.odataReq._body.submittedBy)

                let commentsaddtion = await INSERT.into(comment).entries({ reimbursmentId: req.data.reimbursmentId, textArea: req.odataReq._body.submittedBy });
                console.log("commentsaddtion", commentsaddtion);
                let header_details = await SELECT.from(reimbursementheader).where({ reimbursmentId: req.data.reimbursmentId });
                let workitemID = header_details[0].workitemId;
                console.log("workItem", workitemID);


                //Update ApprovedBy in Header
                let approver = req.data.submissionDate;
                console.log("approver", approver);
                let approver1 = req.odataReq._body.submissionDate;
                console.log("approver1", approver);

                await UPDATE(workflow).set({ ApprovedBy: approver }).where({ reimbursmentId: req.data.reimbursmentId, level: id_to_string });
                return req;

            }


        }
        catch (error) {
            console.log('////////')
            console.log("////error", error)
        }
        return next();
    });


    this.on('READ', reimbursementitem.drafts, async (req, next) => {
        //
        if (req.data.reimbursmentType) {
            var table = await SELECT.from(reimbursementtype).where({ type: req.data.reimbursmentType });

            await cds.update(reimbursementitem.drafts)
                .set({ amountEligibleToClaim: table[0].amount }) // Update with new dat a
                .where({ reimbursmentId: req.data.reimbursmentId, item: req.data.item });


        }
        return next();
    });
    /////
    /////
    /////
    /////FOR REIMBURSEMENT DATE FORMAT DD-MM-YYYY
    // this.on('SAVE', reimbursementheader.drafts, async (req, next) => {
    //   //
    //     if (req.data.reimbursementDate) {
    //         var table = await SELECT.from(reimbursementDate).where({ type: req.data.reimbursmentId});

    //         await cds.update(reimbursementheader.drafts)
    //             .set({ amountEligibleToClaim: table[0].amount }) // Update with new dat a
    //             .where({ reimbursmentId: req.data.reimbursmentId, item: req.data.item });


    //     }
    //     return next();
    // });
    this.on('load', async (req, next) => {
        // 
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
        //workflow
        this.on('afterload', async (req, next) => {
            //
            debugger

            // let header_date = await SELECT.from(reimbursementheader);
            // let rdata = JSON.parse(req.data.paramid);
            // if (rdata.status == 'getWorkflowdata') {
            //     //
            //     var data = await SELECT.from(workflow).where({ reimbursmentId: rdata.key });
            //     return JSON.stringify(data);

            // }
            // let header = await SELECT.from(reimbursementheader).where({ status: 'Approved' });
            // for (let headerindex = 0; headerindex < header.length; headerindex++) {
            // if (header[headerindex].reimbursmentId !== req.data.paramid) {
            /////////
            // let workflow_history = await SELECT.from(workflow).where({ reimbursmentId: req.data.paramid });
            // if (workflow_history.length !== 0) {
            //     await DELETE.from(workflow).where({ reimbursmentId: req.data.paramid })
            // }

          
            let workflow_entries = await SELECT.from(reimbursementWorkflow).orderBy('level');
            console.log("workflow ascending", workflow_entries);
            // sai testing 

            // const emailsByLevel = {};

            // // Populate the object with emails for each level
            // workflow_entries.forEach(([level, Approvers]) => {
            //     if (!emailsByLevel[level]) {
            //         emailsByLevel[level] = [];
            //     }
            //     emailsByLevel[level].push(Approvers);
            // });

            // // Join emails for each level
            // const output = Object.entries(emailsByLevel).map(([level, Approvers]) => `${level}\t${emails.join(',')}`);

            // // Sort the output based on the level
            // output.sort();


            // sai testing



            const d = new Date();
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            const formattedDate = `${day}-${month}-${year}`;
            var workflow_data = [];
            // for (let j = 0; j < workflow_entries.length; j++) {
            //     workflow_data.push
            //         ({
            //             workFlowId: cds.utils.uuid(),
            //             reimbursmentId: req.data.paramid,
            //             level: workflow_entries[j].level,
            //             Users: workflow_entries[j].Approvers,
            //             BeginDate: formattedDate


            //         })
            // }

            //
            // let sorted_table = workflow_entries.sort((a, b) => parseFloat(a.level) - parseFloat(b.level));
            console.log("hhh", workflow_entries);


            let groupedApprovers = {};

            // Iterate through the sorted table and group approvers by level
            workflow_entries.forEach(entry => {
                let level = entry.level;
                console.log("level", level);
                let approver = entry.Approvers;
                console.log("approver", approver);

                // If the level doesn't exist in the groupedApprovers object, create a new array
                if (!groupedApprovers[level]) {
                    groupedApprovers[level] = [approver];
                } else {
                    // If the level exists, push the approver to the existing array
                    groupedApprovers[level].push(approver);
                }
            });

            // Convert the grouped approvers object into CSV format
            let csv1 = '';
            let arrays = [];
            for (let level in groupedApprovers) {
                csv1 += `${groupedApprovers[level].join(' ,')}`;

                console.log("csv1", csv1);
                workflow_data = [];
                workflow_data.push
                    ({
                        workFlowId: cds.utils.uuid(),
                        reimbursmentId: req.data.paramid,
                        level: level,
                        Users: csv1,
                        BeginDate: formattedDate


                    })
                console.log("workflow_data", workflow_data);
                await INSERT.into(workflow, workflow_data);
                csv1 = '';
                console.log("workflow_data", workflow_data);

            }

            //
            // await DELETE.from(workflow)

            // var ins = await INSERT.into(workflow, workflow_data);
            // console.log("inserted workflow", workflow_data[0].workFlowId)
            let emailsArray = [];
            let users = await SELECT.from(workflow).where({ level: '1.0', reimbursmentId: req.data.paramid });
            await UPDATE(reimbursementheader).set({ status_dis: users[0].Users }).where({ reimbursmentId: req.data.paramid });




            return next();
        }),
        this.on('commentfi', async (req, next) => {
            //
            console.log("commentfi function")
            let comtab = await SELECT.from(comment).where({ reimbursmentId: req.data.id });
            if (comtab.length > 0) {

                let uptab = await UPDATE(comment).set({ textArea: req.data.comment }).where({ commentId: comtab[0].commentId });
                let data = await SELECT.from(comment).where({ commentId: comtab[0].commentId })
                console.log("Comments Updated")
                console.log(data)
            }
            else {
                let comment_table = await INSERT.into(comment).entries({ reimbursmentId: req.data.id, textArea: req.data.comment });
            }


        }),
        this.on('asdf', async req => {
            try {
                debugger
                //cono
                // //
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

                let response11 = await BPA.post("/workflow/rest/v1/workflow-instances", bodyy);

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
                console.log("workitemId", workitemId);

            } catch (error) {
                //
            }

            // update workitemId in reim header
            // let wf = await SELECT.from(workflow).where`reimbursmentId = '${req.data.id}' and level = '1.0'`;
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
            await UPDATE(reimbursementheader).set({ workitemId: workitemId }).where({ reimbursmentId: req.data.id });

            var pending = "Pending for Approval"
            await UPDATE(reimbursementheader).set({ status: pending, status_val: 2 }).where({ reimbursmentId: req.data.id });
            const d = new Date();
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            const formattedDate = `${day}-${month}-${year}`;
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

    // =============================================================

    // this.on('CREATE', reimbursementheader, async (req, next,respo) => {

    //     debugger
    //     console.log("created")
    
    //         for (i = 0; i < req.data.headItem1.length; i++) {

    //             let amttoreim = parseFloat(req.data.headItem1[i].amountToBeReimbursed)
    //             let amttoclaim = parseFloat(req.data.headItem1[i].amountEligibleToClaim)
    //             if (amttoreim > amttoclaim) {
    
    //                 console.log("fsdfjkshfdjksdjjh")  
    //                  req.warn({
    //                     message:`Amount To Be Reimbursed ${req.data.headItem1[i].amountToBeReimbursed} shoud be less than Amount Eligible To Claim ${req.data.headItem1[i].amountEligibleToClaim}`,
    //                  })

    //                 //  throw new Error('Amount to be reimbursed should be less than amount eligible to claim');
 
                    
    //             }
    //         }

    //     return next()
    // })


      // =============================================================


      




      


     


        this.on('SAVE', reimbursementheader, async (req, next) => {
            console.log("saveee")
            console.log(req);

            // for (i = 0; i < req.data.headItem1.length; i++) {

            //     let amttoreim = parseFloat(req.data.headItem1[i].amountToBeReimbursed)
            //     let amttoclaim = parseFloat(req.data.headItem1[i].amountEligibleToClaim)
            //     if (amttoreim > amttoclaim) {
            //          req.error({
            //             message:`Amount To Be Reimbursed ${req.data.headItem1[i].amountToBeReimbursed} shoud be less than Amount Eligible To Claim ${req.data.headItem1[i].amountEligibleToClaim}`,
            //             code:'error code'
            //          })

            //     }
            // }



            // var comment = sap.ui.getCore().byId("app1::reimbursementheaderObjectPage--fe::CustomSubSection::Comments--text1").getValue()

            // await INSERT.into(comment).entries({reimbursmentId:})
           
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
