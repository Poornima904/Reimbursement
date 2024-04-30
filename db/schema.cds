namespace db;

using {
    cuid,
    managed
} from '@sap/cds/common';


// @cds.persistence.journal
entity reimbursementtype{
    key type : String;
    amount : Decimal(10, 2);
}
// @cds.persistence.journal
entity reimbursementWorkflow{
    key level : String @UI.Placeholder : 'Enter level ex: 1.0';
    key Approvers : String @UI.Placeholder : 'Enter Gmail';
}


// @cds.persistence.journal
entity reimbursementheader {
    key reimbursmentId    : String @readonly;
        workitemId        : String;
        reimbursementDate : Date;
        totalAmount       : Decimal(10, 2) @readonly;
        status_dis        : String;
        status_val        : Integer;
        submittedBy       : String;
        submissionDate    : String;
        status            : String default 'New';
        headItem1         : Composition of many reimbursementitem
                                on headItem1.item1 = $self;
        headItem2         : Association to many Files
                                on headItem2.reimbursmentId = reimbursmentId;
        headItem3         : Composition of many comment
                                on headItem3.comment1 = $self;
        headItem4         : Composition of many workflow
                                on headItem4.workflow1 = $self;
}
// @cds.persistence.journal
entity reimbursementitem {
    key reimbursmentId        : String;
    key item                  : String;
        reimbursmentType      : String;
        reimbursmentDate      : Date;
        amountToBeReimbursed  : Decimal(10, 2) ;
        // amountToBeReimbursed  : Decimal(10, 2) @assert.range: [ 0, amountEligibleToClaim ];
        amountEligibleToClaim : Decimal(10, 2);
        item1                 : Association to one reimbursementheader
                                    on item1.reimbursmentId = reimbursmentId;
}
// @cds.persistence.journal
entity Files : cuid, managed {
    key fileId         : UUID;
        reimbursmentId : String;
        @Core.MediaType  : mediaType
        content        : LargeBinary;
        @Core.IsMediaType: true
        mediaType      : String;
        fileName       : String;
        size           : Integer;
        url            : String;
        files          : Association to one reimbursementheader
                             on files.reimbursmentId = reimbursmentId;
}
// @cds.persistence.journal
entity comment {
    key commentId      : UUID;
        reimbursmentId : String;
        textArea       : String;
        comment1       : Association to one reimbursementheader
                             on comment1.reimbursmentId = reimbursmentId;
}
// @cds.persistence.journal
entity workflow : managed{
    key workFlowId     : UUID;
     reimbursmentId : String;
        level : String;
        status : String;
        BeginDate: String;
        EndDate: String;
        DaysTaken :String;
        Users :String;
        ApprovedBy: String;
        workflow1 : Association to one reimbursementheader on workflow1.reimbursmentId = reimbursmentId;

}
// @cds.persistence.journal
entity vluehelp_remtype {
    key remType : String;
}
