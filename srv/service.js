const cds = require('@sap/cds');
const axios = require('axios')
module.exports = cds.service.impl(async function () {

    let { reimbursementitem, reimbursementheader,workflow } = this.entities;
    this.before('CREATE', 'Files', req => {
        console.log('Create called')
        console.log(JSON.stringify(req.data))
        req.data.url = `/odata/v4/my/Files(${req.data.ID})/content`
    })
this.before('UPDATE','reimbursementheader',async req=>{
    console.log("update triggered");
    console.log(req.data);
    console.log("update triggered1");
let curr = await SELECT.from(workflow).where`reimbursmentId = ${req.data.reimbursmentId} and ApprovedBy = 'pending'`
curr.forEach(element => {
    UPDATE (workflow,element.workFlowId) .with ({ApprovedBy : null})
      })
});

let intValue = parseInt(curr[0].level);

// Step 2: Increment the integer value by one
let incrementedValue = intValue + 1;

// Step 3: Convert the incremented integer back to a string
 curr[0].level = String(incrementedValue);

let nextlev = await SELECT.from(workflow).where`reimbursmentId = ${req.data.reimbursmentId} and level = ${curr[0].level}`
nextlev.forEach(element=>{
    UPDATE (workflow,element.workFlowId) .with ({ApprovedBy : 'pending'})
})  
// return req;
    // console.log(req.params);
});

    this.on('asdf', async req => {
        debugger
        try {
            debugger
            var workitemId;
            var client = 'sb-ab1af944-4aa4-4a3b-b685-e4794784a3ad!b248453|xsuaa!b49390';
            var secret = '71878061-64c8-4aef-95c0-e1d473d80faa$O5qo-2sN8OakvZbp90_oT4aYL-jcGs_ANVUmk0VsHeY=';
            var auth1 = Buffer.from(client + ':' + secret, 'utf-8').toString('base64');
            // var authString = client + ':' + secret;
            // var auth1 = window.btoa(authString);
            var response1 = await axios.request('https://fd9d89betrial.authentication.us10.hana.ondemand.com/oauth/token?grant_type=client_credentials',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Basic ' + auth1
                    }
                });
            console.log(response1);
            var bodyy = JSON.parse(JSON.stringify({
                "definitionId": "us10.fd9d89betrial.reimprocess1.reimprocess",
                "context": {
                    "keyy": `${req.data.id}`
                }
            }));

            var response11= await axios.post(`https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances`,bodyy,
            {
               headers:{
                    'Authorization':'Bearer '+response1.data.access_token,
                }
            });

            // const response11 = await fetch('', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': 'Bearer ' + response1.data.access_token,
            //     },
            //     body: JSON.stringify(bodyy),
            // });

            debugger
            workitemId = response11.data.rootInstanceId;
            debugger


        } catch (error) {
            debugger
        }

        //update workitemId in reim header


        
    });


    this.before('READ', 'Files', req => {
        debugger
        //check content-type
        console.log('content-type: ', req.headers['content-type'])
    })

    //For criticality(new)

    this.after('CREATE', reimbursementheader.drafts, async (req, next) => {
        debugger
        let data = await SELECT.from(reimbursementheader.drafts);

        let drafttable = await SELECT.from('DRAFT_DRAFTADMINISTRATIVEDATA');

        let rid = req.reimbursmentId;
        await UPDATE(reimbursementheader.drafts).set({ status_dis: 'New', status_val: 0 }).where({ reimbursmentId: rid, DRAFTADMINISTRATIVEDATA_DRAFTUUID: drafttable[drafttable.length - 1].DRAFTUUID });

        let data2 = await SELECT.from(reimbursementheader.drafts);
    })
    //For criticality(Draft)
    this.after('CREATE', reimbursementheader, async (req, next) => {
        debugger
        let data1 = await SELECT.from(reimbursementheader);
        let rid1 = req.reimbursmentId;
        await UPDATE(reimbursementheader).set({ status_dis: 'Draft' }).where({ reimbursmentId: rid1 });
    })

    this.after('CREATE', reimbursementitem.drafts, async (req, next) => {
        // debugger
        let draft_item = await SELECT.from(reimbursementitem.drafts);
        let original_table = await SELECT.from(reimbursementitem);
        let sum = 0;
        for (let i = 0; i < original_table.length; i++) {
            let amount = original_table[i].amountToBeReimbursed;
            let amount_in_integer = parseInt(amount);
            sum = sum + amount_in_integer;
        }
    })

    //for total amount sum
    this.on('SAVE', reimbursementheader, async (req, next) => {
        console.log("saveee")
        // console.log(req);
        debugger
        try {
            if(req.data.status_val)    
            return null;
        } catch (error) {
            
        }
        
        // var data = await SELECT.from(reimbursementitem).where({ reimbursmentId: req.data.reimbursmentId });
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
    this.on('rheaderfunc', async (req) => {
        debugger


        let result = JSON.parse(req.data.data);
        if (result.status_dis === "Approved") {
            await UPDATE(reimbursementheader).set({ status_dis: result.status_dis, status_val: 3 }).where({ reimbursmentId: result.keyfield });
        } else if (result.status_dis === "Rejected") {
            await UPDATE(reimbursementheader).set({ status_dis: result.status_dis, status_val: 1 }).where({ reimbursmentId: result.keyfield });
        }


    })

    // generating primary key random numbers for header
    this.before('CREATE', reimbursementheader.drafts, async (req) => { // sevice name
        debugger
        var now = new Date();
        var randomNum = '';
        randomNum += Math.round(Math.random() * 9);
        randomNum += Math.round(Math.random() * 9);
        randomNum += now.getTime().toString().slice(-3);
        req.data.reimbursmentId = randomNum
        return req;
    })

    // generating primary key random numbers for header items
    // this.before('CREATE', reimbursementitem.drafts, async (req) => { // sevice name
    //     debugger
    //     var now = new Date();
    //     var randomNum = '';
    //     randomNum += Math.round(Math.random() * 9);
    //     randomNum += Math.round(Math.random() * 9);
    //     randomNum += now.getTime().toString().slice(-3);
    //     req.data.item = randomNum
    //     return req;
    // })

    this.before('CREATE', reimbursementitem.drafts, async (req, next) => {
        debugger
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


