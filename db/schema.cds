namespace db;

using { cuid,managed } from '@sap/cds/common';

entity reimbursementheader{
    key r_id :UUID;
    rem_date :Date;
    total_amount: String;
    status :String;
    created_by: String;
    head_item1: Composition of many reimbursementitem on head_item1.item1 = $self;
    head_item2: Composition of many Files on head_item2.files = $self;
    head_item3: Composition of many comment on head_item3.comment1 = $self;
}

entity reimbursementitem {
    key r_id:UUID;
    key item: UUID;
    rem_type :String;
    rem_date: Date;
    amount_to_be_reimbursed :String;
    amount_eligible_to_claim:String;
    item1: Association to one reimbursementheader on item1.r_id = r_id;
}

entity Files: cuid, managed{
    key file_id : UUID;
    r_id:UUID;
    @Core.MediaType: mediaType
    content: LargeBinary;
    @Core.IsMediaType: true
    mediaType: String;
    fileName: String;
    size: Integer;
    url: String;
    files: Association to one reimbursementheader on files.r_id = r_id;
}

entity comment{
    key comment_id :UUID;
    r_id: UUID;
    textarea: String;
    comment1: Association to one reimbursementheader on comment1.r_id=r_id;
}

entity workflow{
    key w_id: UUID;
    r_id: String;
}

entity vluehelp_remtype{
   key rem_type :String;
}