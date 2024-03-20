// using service2 as service from 'SAP Business Application Studio/projects/Reimbursement/srv/service';
using service2 as service from '../../srv/service';

annotate service.reimbursementheader with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : r_id,
            Label : 'Reimbursement Id',
        },
        {
            $Type : 'UI.DataField',
            Value : rem_date,
            Label : 'Reimbursement Date',
        },
        {
            $Type : 'UI.DataField',
            Value : total_amount,
            Label : 'Total Aamount',
        },
        {
            $Type : 'UI.DataField',
            Value : status,
            Label : 'Status',
        },
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
            Target : 'head_item1/@UI.LineItem#ReimbursementDetails',
        },
    ]
);
annotate service.reimbursementitem with @(
    UI.LineItem #ReimbursementDetails : [
        {
            $Type : 'UI.DataField',
            Value : item1.head_item1.rem_type,
            Label : 'Reimbursement Type',
        },{
            $Type : 'UI.DataField',
            Value : item1.head_item1.amount_to_be_reimbursed,
            Label : 'Amount to be Reimbursed',
        },{
            $Type : 'UI.DataField',
            Value : item1.head_item1.amount_eligible_to_claim,
            Label : 'Amount Eligible to Claim',
        },]
);
annotate service.reimbursementheader with @(
    UI.FieldGroup #GeneralInformation : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : rem_date,
                Label : 'Reimbursement Date',
            },{
                $Type : 'UI.DataField',
                Value : total_amount,
                Label : 'Total Amount',
            },{
                $Type : 'UI.DataField',
                Value : status,
                Label : 'Status',
            },],
    }
);
