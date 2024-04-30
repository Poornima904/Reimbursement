using MyService as service from '../../srv/service';
annotate service.reimbursementheader with @(
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View',
    }
);


annotate service.reimbursementWorkflow with @(
    UI.LineItem #tableView : [
    ],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View reimbursementWorkflow',
    }
);
annotate service.reimbursementWorkflow with @(
    UI.LineItem #tableView1 : [
        {
            $Type : 'UI.DataField',
            Value : level,
            Label : 'level',
        },
        {
            $Type : 'UI.DataField',
            Value : Approvers,
            Label : 'Approvers',
        },],
    UI.SelectionPresentationVariant #tableView1 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView1',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View reimbursementWorkflow 1',
    }
);
annotate service.reimbursementWorkflow with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'WORKFLOW',
            ID : 'WORKFLOW',
            Target : '@UI.FieldGroup#WORKFLOW',
        },
    ],
    UI.FieldGroup #WORKFLOW : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : Approvers,
                Label : 'Approvers',
            },{
                $Type : 'UI.DataField',
                Value : level,
                Label : 'level',
            },],
    }
);
