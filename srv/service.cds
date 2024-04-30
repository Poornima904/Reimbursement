using {db} from '../db/schema';




// @requires : 'authenticated-user'
service MyService {


     @odata.draft.enabled
    entity reimbursementWorkflow as projection on db.reimbursementWorkflow;

    @odata.draft.enabled
    entity reimbursementheader as projection on db.reimbursementheader;


    entity reimbursementitem   as projection on db.reimbursementitem;

    entity Files               as projection on db.Files;
    entity comment             as projection on db.comment;
    entity workflow            as projection on db.workflow;
    entity vluehelp_remtype    as projection on db.vluehelp_remtype;
    entity reimbursementtype as projection on db.reimbursementtype;
    // @odata.draft.enabled
    // entity reimbursementWorkflow as projection on db.reimbursementWorkflow;
    function rheaderfunc(data : String) returns String;
    function asdf(id : String)          returns String;
    function load(casee : String)        returns String;
    function afterload(paramid : String)        returns String;
    function commentfi(id : String,comment : String)  returns String;
    function getcallcomment(reimid : String) returns String;
     function itemvalidate(reiddd : String) returns String;  // validation for amountToBeReimbursed
    
}

// @requires : 'authenticated-user'
service service2 {
    // where condition for fetching specific value of field status
    entity reimbursementheader as projection on db.reimbursementheader
                                   where
                                      status_dis = 'Pending';

    entity reimbursementitem   as projection on db.reimbursementitem;
    entity Files               as projection on db.Files;
    entity comment             as projection on db.comment;
    entity workflow            as projection on db.workflow;
    entity vluehelp_remtype    as projection on db.vluehelp_remtype;
    function rheaderfunc(data : String) returns String;
}

