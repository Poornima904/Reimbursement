using MyService as service from '../../srv/service';

annotate service.reimbursementheader with @(UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Label: 'Reimbursment Id',
        Value: reimbursmentId,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Reimbursement Date',
        Value: reimbursementDate,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Total Amount',
        Value: totalAmount,
    },
    {
        $Type : 'UI.DataField',
        Value : status,
        Label : 'status',
        Criticality : status_val,
    }
]);


annotate MyService.reimbursementitem with @Common.SideEffects: {
    // $Type           : 'Common.SideEffectsType',
    SourceProperties: ['reimbursmentType'],
    TargetProperties: ['amountEligibleToClaim' ],
};


// annotate MyService.reimbursementheader with @(
//     Capabilities.Insertable : false
// );
annotate MyService.reimbursementheader with @(Capabilities.Deletable: false);

annotate service.reimbursementheader with @(
    UI.FieldGroup #GeneratedGroup1: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'Reimbursement Date',
                Value: reimbursementDate,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Total Amount',
                Value: totalAmount,
            },
            {
                $Type : 'UI.DataField',
                Value : status,
                Label : 'status',
            }
        ],
    },
    UI.Facets                     : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'GeneratedFacet1',
            Label : 'General Information',
            Target: '@UI.FieldGroup#GeneratedGroup1',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Reimbursement Details',
            ID    : 'Reimburs',
            Target: 'headItem1/@UI.LineItem#Reimburs',
        },
    ]
);

annotate service.reimbursementitem with @(UI.LineItem #item: [
    {
        $Type: 'UI.DataField',
        Value: item,
        Label: 'item',
    },
    {
        $Type: 'UI.DataField',
        Value: reimbursmentType,
        Label: 'Reimbursment Type',
    },
    {
        $Type: 'UI.DataField',
        Value: reimbursmentDate,
        Label: 'Reimbursment Date',
    },
    {
        $Type: 'UI.DataField',
        Value: amountToBeReimbursed,
        Label: 'Amount To Be Reimbursed',
    },
    {
        $Type: 'UI.DataField',
        Value: amountEligibleToClaim,
        Label: 'Amount Eligible To Claim',
    },
]);

annotate service.reimbursementitem with {
    reimbursmentType @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'vluehelp_remtype',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: reimbursmentType,
                ValueListProperty: 'remType',
            }, ],
            Label         : 'rem_type',
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.reimbursementheader with {
    submittedBy @Common.FieldControl: #ReadOnly
};

annotate MyService.reimbursementheader with @(UI.HeaderInfo: {
    Title         : {
        $Type: 'UI.DataField',
        Value: reimbursmentId,
    },
    TypeName      : 'Reimbursement Details',
    TypeNamePlural: '',
});

annotate service.reimbursementitem with @(UI.LineItem #Reimburs: [
    {
        $Type: 'UI.DataField',
        Value: item,
        Label: 'Item Id',
    },
    {
        $Type: 'UI.DataField',
        Value: reimbursmentType,
        Label: 'Reimbursment Type',
    },
    {
        $Type: 'UI.DataField',
        Value: reimbursmentDate,
        Label: 'Reimbursment Date',
    },
    {
        $Type: 'UI.DataField',
        Value: amountToBeReimbursed,
        Label: 'Amount to be Re imbursed',
    },
    {
        $Type: 'UI.DataField',
        Value: amountEligibleToClaim,
        Label: 'Amount Eligible to Claim',
    },
]);

annotate service.workflow with @(UI.LineItem #workflow: [
    {
        $Type: 'UI.DataField',
        Value: level,
        Label: 'level',
    },
    {
        $Type: 'UI.DataField',
        Value: Users,
        Label: 'Users',
    },
    {
        $Type: 'UI.DataField',
        Value: BeginDate,
        Label: 'BeginDate',
    },
    {
        $Type: 'UI.DataField',
        Value: reimbursmentId,
        Label: 'reimbursmentId',
        ![@UI.Hidden],
    },
    {
        $Type: 'UI.DataField',
        Value: EndDate,
        Label: 'EndDate',
    },
    {
        $Type: 'UI.DataField',
        Value: DaysTaken,
        Label: 'DaysTaken',
    },
    {
        $Type: 'UI.DataField',
        Value: ApprovedBy,
        Label: 'ApprovedBy',
    },
]);

annotate service.reimbursementheader with {
    status @Common.FieldControl : #ReadOnly
};
annotate service.reimbursementitem with {
    amountEligibleToClaim @Common.FieldControl : #ReadOnly
};
