using {db} from '../db/schema';

service MyService {
    @odata.draft.enabled
    entity reimbursementheader as projection on db.reimbursementheader;
    entity reimbursementitem as projection on db.reimbursementitem;
    entity Files as projection on db.Files;
    entity comment as projection on db.comment;
    entity workflow as projection on db.workflow;
    entity vluehelp_remtype as projection on db.vluehelp_remtype;
}

service service2 {
    entity reimbursementheader as projection on db.reimbursementheader;
    entity reimbursementitem as projection on db.reimbursementitem;
    entity Files as projection on db.Files;
    entity comment as projection on db.comment;
    entity workflow as projection on db.workflow;
    entity vluehelp_remtype as projection on db.vluehelp_remtype;
}