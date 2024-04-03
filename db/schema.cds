namespace db;

using {
    cuid,
    managed
} from '@sap/cds/common';

entity reimbursementheader {
    key reimbursmentId    : String @readonly;
        reimbursementDate : Date;
        totalAmount       : Decimal(10, 2) @readonly;
        status_dis        : String @readonly;
        status_val        : Integer;
        submittedBy         : String;
        submissionDate : DateTime;
        headItem1         : Composition of many reimbursementitem
                                on headItem1.item1 = $self;
        headItem2         : Association to many Files
                                on headItem2.reimbursmentId = reimbursmentId;
        headItem3         : Composition of many comment
                                on headItem3.comment1 = $self;
        headItem4         : Composition of many workflow
                                on headItem4.workflow1 = $self;
}

entity reimbursementitem {
    key reimbursmentId        : String;
    key item                  : String;
        reimbursmentType      : String;
        reimbursmentDate      : Date;
        amountToBeReimbursed  : Decimal(10, 2);
        amountEligibleToClaim : Decimal(10, 2);
        item1                 : Association to one reimbursementheader
                                    on item1.reimbursmentId = reimbursmentId;
}

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
entity comment {
    key commentId      : UUID;
        reimbursmentId : String;
        textArea       : String;
        comment1       : Association to one reimbursementheader
                             on comment1.reimbursmentId = reimbursmentId;
}

entity workflow {
    key workFlowId     : UUID;
        reimbursmentId : String;
        level : String;
        BeginDate: Date;
        EndDate: Date;
        DaysTaken :String;
        Users :String;
        ApprovedBy: String;
        workflow1 : Association to one reimbursementheader on workflow1.reimbursmentId = reimbursmentId;

}

entity vluehelp_remtype {
    key remType : String;
}
