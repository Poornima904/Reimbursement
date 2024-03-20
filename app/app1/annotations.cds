using MyService as service from '../../srv/service';

annotate service.reimbursementheader with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Reimbursment Id',
            Value : reimbursmentId,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Reimbursement Date',
            Value : reimbursementDate,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Total Amount',
            Value : totalAmount,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Status',
            Value : status_dis,
            Criticality : status_val,
            CriticalityRepresentation : #WithIcon,
        }
    ]
);
// annotate MyService.reimbursementheader with @(
//     Capabilities.Insertable : false  
// );
// annotate service.bank with @(
//     Capabilities.Deletable : false  
// );
annotate service.reimbursementheader with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Reimbursement Date',
                Value : reimbursementDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Total Amount',
                Value : totalAmount,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Status',
                Value : status_dis,
            }
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
            Label : 'Reimbursement Type',
            ID : 'item',
            Target : 'headItem1/@UI.LineItem#item',
        },
    ]
);
annotate service.reimbursementitem with @(
    UI.LineItem #item : [
        {
            $Type : 'UI.DataField',
            Value : reimbursmentType,
            Label : 'Reimbursment Type',
        },
        {
            $Type : 'UI.DataField',
            Value : reimbursmentDate,
            Label : 'Reimbursment Date',
        },{
            $Type : 'UI.DataField',
            Value : amountToBeReimbursed,
            Label : 'Amount To Be Reimbursed',
        },{
            $Type : 'UI.DataField',
            Value : amountEligibleToClaim,
            Label : 'Amount Eligible To Claim',
        },]
);
annotate service.reimbursementitem with {
    reimbursmentType @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'vluehelp_remtype',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : reimbursmentType,
                    ValueListProperty : 'remType',
                },
            ],
            Label : 'rem_type',
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.reimbursementheader with {
    createdBy @Common.FieldControl : #ReadOnly
};
