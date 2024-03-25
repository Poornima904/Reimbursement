const cds = require('@sap/cds');
module.exports = cds.service.impl(async function () {

    let { reimbursementitem, reimbursementheader } = this.entities;
    this.before('CREATE', 'Files', req => {
        console.log('Create called')
        console.log(JSON.stringify(req.data))
        req.data.url = `/odata/v4/my/Files(${req.data.ID})/content`
    })

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
    //For criticality(pending)
    this.after('CREATE', reimbursementheader, async (req, next) => {
        debugger
        let data1 = await SELECT.from(reimbursementheader);
        let rid1 = req.reimbursmentId;
        await UPDATE(reimbursementheader).set({ status_dis: 'Pending', status_val: 2 }).where({ reimbursmentId: rid1 });
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
        debugger
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
        if(result.status_dis==="Approved"){
            await UPDATE(reimbursementheader).set({ status_dis: result.status_dis, status_val: 3 }).where({ reimbursmentId: result.keyfield });
        }else if(result.status_dis==="Rejected")
        {
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
        let item_table_draft  = await SELECT.from(reimbursementitem.drafts).where({ reimbursmentId : rid });
        if(item_table_draft.length !== 0)
        {
           last_variable = item_table_draft[item_table_draft.length-1].item;
           variable_integer = parseInt(last_variable);
           variable = variable_integer + 10;
           req.data.item  = variable.toString();
           
        }
        else
        {
           req.data.item = "10";         
        }
        return req;
       })
});


