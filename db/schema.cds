namespace db;

using {
    cuid,
    managed
} from '@sap/cds/common';

entity reimbursementheader {
    key reimbursmentId    : UUID;
        reimbursementDate : Date;
        totalAmount       : String @readonly;
        status_dis        : String @readonly;
        status_val        : Integer;
        createdBy         : String;
        headItem1         : Composition of many reimbursementitem
                                on headItem1.item1 = $self;
        headItem2         : Association to many Files
                                on headItem2.reimbursmentId = reimbursmentId;
        headItem3         : Composition of many comment
                                on headItem3.comment1 = $self;
}

entity reimbursementitem {
    key reimbursmentId        : UUID;
    key item                  : String;
        reimbursmentType      : String;
        reimbursmentDate      : Date;
        amountToBeReimbursed  : String;
        amountEligibleToClaim : String;
        item1                 : Association to one reimbursementheader
                                    on item1.reimbursmentId = reimbursmentId;
}

entity Files : cuid, managed {
    key fileId         : UUID;
        reimbursmentId : UUID;

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
        reimbursmentId : UUID;
        textArea       : String;
        comment1       : Association to one reimbursementheader
                             on comment1.reimbursmentId = reimbursmentId;
}

entity workflow {
    key workFlowId     : UUID;
        reimbursmentId : String;
}

entity vluehelp_remtype {
    key remType : String;
}
