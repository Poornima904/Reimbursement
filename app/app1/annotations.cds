using MyService as service from '../../srv/service';

annotate service.reimbursementheader with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Reimbursement Id',
            Value : r_id,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Reimbursement Date',
            Value : rem_date,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Total Amount',
            Value : total_amount,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Status',
            Value : status,
        },
        
    ]
);
annotate service.reimbursementheader with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Reimbursement_Date',
                Value : rem_date,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Total Amount',
                Value : total_amount,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Status',
                Value : status,
            },
         
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Reimbursement Details',
            ID : 'item',
            Target : 'head_item1/@UI.LineItem#item',
        },
    ]
);
annotate service.reimbursementitem with @(
    UI.LineItem #item : [
        {
            $Type : 'UI.DataField',
             Value : rem_type,
            Label : 'Reimbursement_Type',
            
        },{
            $Type : 'UI.DataField',
            Value : rem_date,
            Label : 'Reimbursement Date',
        },{
            $Type : 'UI.DataField',
            Value : amount_to_be_reimbursed,
            Label : 'Amount to be Reimbursed',
        },{
            $Type : 'UI.DataField',
            Value : amount_eligible_to_claim,
            Label : 'Amount Eligible to Claim',
        },]
);
annotate service.reimbursementitem with {
    rem_type @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'vluehelp_remtype',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : rem_type,
                    ValueListProperty : 'rem_type',
                },
            ],
            Label : 'rem_type',
        },
        Common.ValueListWithFixedValues : true
)};
