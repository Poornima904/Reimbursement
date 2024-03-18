using MyService as service from '../../srv/service';

annotate service.reimbursementheader with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'r_id',
            Value : r_id,
        },
        {
            $Type : 'UI.DataField',
            Label : 'rem_date',
            Value : rem_date,
        },
        {
            $Type : 'UI.DataField',
            Label : 'total_amount',
            Value : total_amount,
        },
        {
            $Type : 'UI.DataField',
            Label : 'status',
            Value : status,
        },
        {
            $Type : 'UI.DataField',
            Label : 'created_by',
            Value : created_by,
        },
    ]
);
annotate service.reimbursementheader with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'r_id',
                Value : r_id,
            },
            {
                $Type : 'UI.DataField',
                Label : 'rem_date',
                Value : rem_date,
            },
            {
                $Type : 'UI.DataField',
                Label : 'total_amount',
                Value : total_amount,
            },
            {
                $Type : 'UI.DataField',
                Label : 'status',
                Value : status,
            },
            {
                $Type : 'UI.DataField',
                Label : 'created_by',
                Value : created_by,
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
            Label : 'item',
            ID : 'item',
            Target : 'head_item1/@UI.LineItem#item',
        },
    ]
);
annotate service.reimbursementitem with @(
    UI.LineItem #item : [
        {
            $Type : 'UI.DataField',
            Value : r_id,
            Label : 'r_id',
        },{
            $Type : 'UI.DataField',
            Value : item,
            Label : 'item',
        },{
            $Type : 'UI.DataField',
            Value : rem_date,
            Label : 'rem_date',
        },{
            $Type : 'UI.DataField',
            Value : rem_type,
            Label : 'rem_type',
        },{
            $Type : 'UI.DataField',
            Value : amount_to_be_reimbursed,
            Label : 'amount_to_be_reimbursed',
        },{
            $Type : 'UI.DataField',
            Value : amount_eligible_to_claim,
            Label : 'amount_eligible_to_claim',
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
