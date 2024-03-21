const cds = require('@sap/cds');
module.exports = cds.service.impl(async function () {

    let { reimbursementitem, reimbursementheader } = this.entities;

    this.before('CREATE', 'Files', req => {
        console.log('Create called')
        console.log(JSON.stringify(req.data))
        req.data.url = `/odata/v4/my/Files(${req.data.ID})/content`
    })


    this.
        before('READ', 'Files', req => {
            debugger
            //check content-type
            console.log('content-type: ', req.headers['content-type'])
        })
        
    //For creating unique id for reimbursment item
    this.on('CREATE', reimbursementitem.drafts, async (req) => {
        debugger
    
        var now = new Date();
        var randomNum = '';
        randomNum += Math.round(Math.random() * 9);
        randomNum += Math.round(Math.random() * 9);
        randomNum += now.getTime().toString().slice(-3);
        randomNum = "REM"+ randomNum;

        const roleData = {
            reimbursmentId: req.data.reimbursmentId,
            item: randomNum,
            DRAFTADMINISTRATIVEDATA_DRAFTUUID: req.data.DraftAdministrativeData_DraftUUID
        };

        await cds.transaction(req).run(
            INSERT.into(reimbursementitem.drafts).entries(roleData)
        );

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
    this.after('CREATE', reimbursementheader,async (req, next) => {
        debugger
        let data1 = await SELECT.from(reimbursementheader);
        let rid1 = req.reimbursmentId;
        await UPDATE(reimbursementheader).set({ status_dis: 'Pending', status_val: 2 }).where({reimbursmentId: rid1});
    })

    this.after('CREATE', reimbursementitem.drafts, async (req, next) => {
        // debugger
        let draft_item = await SELECT.from(reimbursementitem.drafts);
        let original_table = await SELECT.from(reimbursementitem);
        let sum = 0;
        for (let i = 0; i < original_table.length ; i++) {
            let amount = original_table[i].amountToBeReimbursed;
            let amount_in_integer = parseInt(amount);
            sum = sum + amount_in_integer;
        }
    })


    this.on('SAVE', reimbursementheader, async (req, next) => {
        debugger
        var data = await SELECT.from(reimbursementitem).where ({reimbursmentId:req.data.reimbursmentId});
        let sum = 0;
        let sum_in_integer;
        for (let i = 0; i < data.length ; i++) {
            let amount = req.data.headItem1[i].amountToBeReimbursed;
            let amount_in_integer = parseInt(amount);
            sum = sum + amount_in_integer;
        }
        sum_in_integer = sum.toString();
        req.data.totalAmount = sum_in_integer;
        return next();
    })
    

});

