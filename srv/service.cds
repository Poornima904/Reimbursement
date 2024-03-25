using {db} from '../db/schema';

service MyService {
    @odata.draft.enabled
    entity reimbursementheader as projection on db.reimbursementheader;

    entity reimbursementitem   as projection on db.reimbursementitem;
    entity Files               as projection on db.Files;
    entity comment             as projection on db.comment;
    entity workflow            as projection on db.workflow;
    entity vluehelp_remtype    as projection on db.vluehelp_remtype;
    function rheaderfunc(data : String) returns String;
}

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
