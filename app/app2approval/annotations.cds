// using service2 as service from 'SAP Business Application Studio/projects/Reimbursement/srv/service';
using service2 as service from '../../srv/service';

annotate service.reimbursementheader with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : reimbursmentId,
            Label : 'Reimbursement Id',
        },
        {
            $Type : 'UI.DataField',
            Value : reimbursementDate,
            Label : 'Reimbursement Date',
        },
        {
            $Type : 'UI.DataField',
            Value : totalAmount,
            Label : 'Total Amount',
        }
    ]
);
annotate service2.reimbursementheader with @(
    Capabilities.Insertable : false  
);
annotate service2.reimbursementheader with @(
    Capabilities.Deletable : false  
);
annotate service.reimbursementheader with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'General Information',
            ID : 'GeneralInformation',
            Target : '@UI.FieldGroup#GeneralInformation',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Reimbursement Details',
            ID : 'ReimbursementDetails',
            Target : 'headItem1/@UI.LineItem#ReimbursementDetails',
        },
    ]
);
annotate service.reimbursementitem with @(
    UI.LineItem #ReimbursementDetails : [
        {
            $Type : 'UI.DataField',
            Value : item1.headItem1.reimbursmentType,
            Label : 'Reimbursement Type',
        },{
            $Type : 'UI.DataField',
            Value : item1.headItem1.amountToBeReimbursed,
            Label : 'Amount to be Reimbursed',
        },{
            $Type : 'UI.DataField',
            Value : item1.headItem1.amountEligibleToClaim,
            Label : 'Amount Eligible to Claim',
        },]
);
annotate service.reimbursementheader with @(
    UI.FieldGroup #GeneralInformation : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : reimbursementDate,
                Label : 'Reimbursement Date',
            },{
                $Type : 'UI.DataField',
                Value : totalAmount,
                Label : 'Total Amount',
            }],
    }
);
