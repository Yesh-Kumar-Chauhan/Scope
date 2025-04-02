import React, { useEffect, useState } from 'react';
import { openModal } from '../../../../store/modalSlice';
import { useDispatch } from 'react-redux';
import { Table } from '../../../common/table/Table';
import { ColumnDef } from '@tanstack/react-table';
import ActionButtons from '../../../common/table/ActionButtons';
import { ISite, ISiteAssignmentTable } from '../../../../interface/Sites';
import { ModalType } from '../../../../types/modal';
import { useModalCallback } from '../../../../contexts/ModalCallbackContext';
import ConfirmationModal from '../../../modals/ConfirmationModal';

interface AssignmentProps {
    siteFormData: ISite; // Use your ISite interface here
    setSiteFormData: React.Dispatch<React.SetStateAction<ISite>>;
}

const Assignment: React.FC<AssignmentProps> = ({ setSiteFormData, siteFormData }) => {
    const dispatch = useDispatch();
    const { getCallback, setCallback } = useModalCallback();
     const [confirmationProps, setConfirmationProps] = useState({
            message: '',
            onConfirm: () => { },
            onCancel: () => { },
        });
        const [confirmationOpen, setConfirmationOpen] = useState(false);
    const initializeAssignmentData = (siteFormData: ISite) => {
        return [
            {
                description: "District Manager",
                name: siteFormData.fieldSupervisorName || '',
                cell: siteFormData.fieldSupervisorPhone || '',
                ext: siteFormData.fieldSupervisorExt || '',
                fax: siteFormData.fieldSupervisorFax || '',
                email: siteFormData.fieldSupervisorEmail || '',
                forms: siteFormData.fieldSupervisorForms || '',
                others: siteFormData.fieldSupervisorOthers || '',
            },
            {
                description: "Registrar",
                name: siteFormData.registrarName || '',
                cell: siteFormData.registrarPhone || '',
                ext: siteFormData.registrarExt || '',
                fax: siteFormData.registrarFax || '',
                email: siteFormData.registrarEmail || '',
                forms: siteFormData.registrarForms || '',
                others: siteFormData.registrarOthers || '',
            },
            {
                description: "Time Sheets",
                name: siteFormData.staffingAssistantName || '',
                cell: siteFormData.staffingAssistantPhone || '',
                ext: siteFormData.staffingAssistantExt || '',
                fax: siteFormData.staffingAssistantFax || '',
                email: siteFormData.staffingAssistantEmail || '',
                forms: siteFormData.staffingAssistantForms || '',
                others: siteFormData.staffingAssistantOthers || '',
            },
            {
                description: "Food Contact",
                name: siteFormData.foodContactName || '',
                cell: siteFormData.foodContactPhone || '',
                ext: siteFormData.foodContactExt || '',
                fax: siteFormData.foodContactFax || '',
                email: siteFormData.foodContactEmail || '',
                forms: siteFormData.foodContactForms || '',
                others: siteFormData.foodContactOthers || '',
            },
            {
                description: "Supply Contact",
                name: siteFormData.supplyContactName || '',
                cell: siteFormData.supplyContactPhone || '',
                ext: siteFormData.supplyContactExt || '',
                fax: siteFormData.supplyContactFax || '',
                email: siteFormData.supplyContactEmail || '',
                forms: siteFormData.supplyContactForms || '',
                others: siteFormData.supplyContactOthers || '',
            },
            {
                description: "Special Event Contact",
                name: siteFormData.pettyCashSpecialEventContactName || '',
                cell: siteFormData.pettyCashSpecialEventContactPhone || '',
                ext: siteFormData.pettyCashSpecialEventContactExt || '',
                fax: siteFormData.pettyCashSpecialEventContactFax || '',
                email: siteFormData.pettyCashSpecialEventContactEmail || '',
                forms: siteFormData.pettyCashSpecialEventContactForms || '',
                others: siteFormData.pettyCashSpecialEventContactOthers || '',
            },
            {
                description: "Field Trainer",
                name: siteFormData.fieldTrainerName || '',
                cell: siteFormData.fieldTrainerPhone || '',
                ext: siteFormData.fieldTrainerExt || '',
                fax: siteFormData.fieldTrainerFax || '',
                email: siteFormData.fieldTrainerEmail || '',
                forms: siteFormData.fieldTrainerForms || '',
                others: siteFormData.fieldTrainerOthers || '',
            },
            {
                description: "Healthcare Consultant",
                name: siteFormData.healthCareConsultantName || '',
                cell: siteFormData.healthCareConsultantPhone || '',
                ext: siteFormData.healthCareConsultantExt || '',
                fax: siteFormData.healthCareConsultantFax || '',
                email: siteFormData.healthCareConsultantEmail || '',
                forms: siteFormData.healthCareConsultantForms || '',
                others: siteFormData.healthCareConsultantOthers || '',
            },
            {
                description: "Account Billing",
                name: siteFormData.accountBillingName || '',
                cell: siteFormData.accountBillingPhone || '',
                ext: siteFormData.accountBillingExt || '',
                fax: siteFormData.accountBillingFax || '',
                email: siteFormData.accountBillingEmail || '',
                forms: siteFormData.accountBillingForms || '',
                others: siteFormData.accountBillingOthers || '',
            },
            {
                description: "Staffing/Substitutes",
                name: siteFormData.staffingAssistantName || '',
                cell: siteFormData.staffingAssistantPhone || '',
                ext: siteFormData.staffingAssistantExt || '',
                fax: siteFormData.staffingAssistantFax || '',
                email: siteFormData.staffingAssistantEmail || '',
                forms: siteFormData.staffingAssistantForms || '',
                others: siteFormData.staffingAssistantOthers || '',
            },
        ];
    };
    const [data, setData] = useState(initializeAssignmentData(siteFormData));

    // const [data, setData] = useState([
    //     { description: "District Manager", name: "", cell: "", ext: "", fax: "", email: "", forms: "", others: "" },
    //     { description: "Registrar", name: "", cell: "", ext: "", fax: "", email: "", forms: "", others: "" },
    //     { description: "Time Sheets", name: "", cell: "", ext: "", fax: "", email: "", forms: "", others: "" },
    //     { description: "Food Contact", name: "", cell: "", ext: "", fax: "", email: "", forms: "", others: "" },
    //     { description: "Supply Contact", name: "", cell: "", ext: "", fax: "", email: "", forms: "", others: "" },
    //     { description: "Special Event Contact", name: "", cell: "", ext: "", fax: "", email: "", forms: "", others: "" },
    //     { description: "Field Trainer", name: "", cell: "", ext: "", fax: "", email: "", forms: "", others: "" },
    //     { description: "Healthcare Consultant", name: "", cell: "", ext: "", fax: "", email: "", forms: "", others: "" },
    //     { description: "Account Billing", name: "", cell: "", ext: "", fax: "", email: "", forms: "", others: "" },
    //     { description: "Staffing/Substitutes", name: "", cell: "", ext: "", fax: "", email: "", forms: "", others: "" },
    // ]);

    const assignmentMapping: Record<string, Array<keyof ISite>> = {
    // const assignmentMapping: Record<AssignmentDescription, Array<keyof ISite>> = {
        "District Manager": ["fieldSupervisorName", "fieldSupervisorPhone", "fieldSupervisorExt", "fieldSupervisorFax", "fieldSupervisorEmail", "fieldSupervisorForms", "fieldSupervisorOthers"],
        "Registrar": ["registrarName", "registrarPhone", "registrarExt", "registrarFax", "registrarEmail", "registrarForms", "registrarOthers"],
        "Time Sheets": ["staffingAssistantName", "staffingAssistantPhone", "staffingAssistantExt", "staffingAssistantFax", "staffingAssistantEmail", "staffingAssistantForms", "staffingAssistantOthers"],
        "Food Contact": ["foodContactName", "foodContactPhone", "foodContactExt", "foodContactFax", "foodContactEmail", "foodContactForms", "foodContactOthers"],
        "Supply Contact": ["supplyContactName", "supplyContactPhone", "supplyContactExt", "supplyContactFax", "supplyContactEmail", "supplyContactForms", "supplyContactOthers"],
        "Special Event Contact": ["pettyCashSpecialEventContactName", "pettyCashSpecialEventContactPhone", "pettyCashSpecialEventContactExt", "pettyCashSpecialEventContactFax", "pettyCashSpecialEventContactEmail", "pettyCashSpecialEventContactForms", "pettyCashSpecialEventContactOthers"],
        "Field Trainer": ["fieldTrainerName", "fieldTrainerPhone", "fieldTrainerExt", "fieldTrainerFax", "fieldTrainerEmail", "fieldTrainerForms", "fieldTrainerOthers"],
        "Healthcare Consultant": ["healthCareConsultantName", "healthCareConsultantPhone", "healthCareConsultantExt", "healthCareConsultantFax", "healthCareConsultantEmail", "healthCareConsultantForms", "healthCareConsultantOthers"],
        "Account Billing": ["accountBillingName", "accountBillingPhone", "accountBillingExt", "accountBillingFax", "accountBillingEmail", "accountBillingForms", "accountBillingOthers"],
        "Staffing/Substitutes": ["staffingAssistantName", "staffingAssistantPhone", "staffingAssistantExt", "staffingAssistantFax", "staffingAssistantEmail", "staffingAssistantForms", "staffingAssistantOthers"]
    };


    const columns: ColumnDef<ISiteAssignmentTable>[] = [
        {
            accessorKey: 'description',
            header: 'Description',
        },
        {
            accessorKey: 'name',
            header: 'NAME',
        },
        {
            accessorKey: 'cell',
            header: 'Cell',
        },
        {
            id: 'actions',
            header: 'ACTION',
            cell: ({ row }) => (
                <ActionButtons
                    id={row.index}
                    onNew={() => handleNewAssignment(row.index)}
                    onEdit={() => handleEditAssignment(row.index)}
                    onDelete={() => handleDeleteAssignment(row.index)}
                    isRowEmpty={!row.original.name}
                    loader={false}
                />
            ),
        },
    ];

    // useEffect(() => {
    //     if (siteFormData) {
    //         setData(initializeAssignmentData(siteFormData));
    //     }
    // }, [siteFormData]);

    const handleNewAssignment = (index: number) => {
        setCallback((formData: any) => handleSubmitAssignment(index, formData));
        dispatch(openModal({
            modalType: 'SITE-ASSIGNMENT-MODAL' as ModalType,
            modalProps: {
                initialData: data[index],
                // onSubmit: (formData: any) => handleSubmitAssignment(index, formData),
            }
        }));
    };

    const handleSubmitAssignment = (index: number, formData: any) => {
        const updatedData = [...data];
        updatedData[index] = { ...updatedData[index], ...formData };
        setData(updatedData);
        mapAssignmentDataToSiteFormData(updatedData);
    };

    const handleEditAssignment = (index: number) => {
        setCallback((formData: any) => handleSubmitAssignment(index, formData));
        dispatch(openModal({
            modalType: 'SITE-ASSIGNMENT-MODAL' as ModalType,
            modalProps: {
                initialData: data[index],
                //onSubmit: (formData: any) => handleSubmitAssignment(index, formData),
            }
        }));
    };

    const handleDeleteAssignment = (index: number) => {
        setConfirmationProps({
            message: 'Are you sure you want to delete Assignment?',
            onConfirm: async () => {
        const updatedData = [...data];
        updatedData[index] = {
            ...updatedData[index],
            name: "",
            cell: "",
            ext: "",
            fax: "",
            email: "",
            forms: "",
            others: "",
        };
        setData(updatedData);
        mapAssignmentDataToSiteFormData(updatedData);
        setConfirmationOpen(false);
    },
    onCancel: () => {
        setConfirmationOpen(false);
    },
});
setConfirmationOpen(true);
    };

    const mapAssignmentDataToSiteFormData = (assignmentData: typeof data) => {
        setSiteFormData((prevData: any) => {
            const updatedData = { ...prevData };

            assignmentData.forEach((item) => {
                const mapping = assignmentMapping[item.description];
                if (mapping) {
                    updatedData[mapping[0]] = item.name || '';
                    updatedData[mapping[1]] = item.cell || '';
                    updatedData[mapping[2]] = item.ext || '';
                    updatedData[mapping[3]] = item.fax || '';
                    updatedData[mapping[4]] = item.email || '';
                    updatedData[mapping[5]] = item.forms || '';
                    updatedData[mapping[6]] = item.others || '';
                }
            });
            // assignmentData.forEach((item) => {
            //     switch (item.description as AssignmentDescription) {
            //         case "District Manager":
            //             updatedData.fieldSupervisorName = item.name || '';
            //             updatedData.fieldSupervisorPhone = item.cell || '';
            //             updatedData.fieldSupervisorExt = item.ext || '';
            //             updatedData.fieldSupervisorFax = item.fax || '';
            //             updatedData.fieldSupervisorEmail = item.email || '';
            //             updatedData.fieldSupervisorForms = item.forms || '';
            //             updatedData.fieldSupervisorOthers = item.others || '';
            //             break;
            //         case "Registrar":
            //             updatedData.registrarName = item.name || '';
            //             updatedData.registrarPhone = item.cell || '';
            //             updatedData.registrarExt = item.ext || '';
            //             updatedData.registrarFax = item.fax || '';
            //             updatedData.registrarEmail = item.email || '';
            //             updatedData.registrarForms = item.forms || '';
            //             updatedData.registrarOthers = item.others || '';
            //             break;
            //         case "Time Sheets":
            //             updatedData.staffingAssistantName = item.name || '';
            //             updatedData.staffingAssistantPhone = item.cell || '';
            //             updatedData.staffingAssistantExt = item.ext || '';
            //             updatedData.staffingAssistantFax = item.fax || '';
            //             updatedData.staffingAssistantEmail = item.email || '';
            //             updatedData.staffingAssistantForms = item.forms || '';
            //             updatedData.staffingAssistantOthers = item.others || '';
            //             break;
            //         case "Food Contact":
            //             updatedData.foodContactName = item.name || '';
            //             updatedData.foodContactPhone = item.cell || '';
            //             updatedData.foodContactExt = item.ext || '';
            //             updatedData.foodContactFax = item.fax || '';
            //             updatedData.foodContactEmail = item.email || '';
            //             updatedData.foodContactForms = item.forms || '';
            //             updatedData.foodContactOthers = item.others || '';
            //             break;
            //         case "Supply Contact":
            //             updatedData.supplyContactName = item.name || '';
            //             updatedData.supplyContactPhone = item.cell || '';
            //             updatedData.supplyContactExt = item.ext || '';
            //             updatedData.supplyContactFax = item.fax || '';
            //             updatedData.supplyContactEmail = item.email || '';
            //             updatedData.supplyContactForms = item.forms || '';
            //             updatedData.supplyContactOthers = item.others || '';
            //             break;
            //         case "Special Event Contact":
            //             updatedData.pettyCashSpecialEventContactName = item.name || '';
            //             updatedData.pettyCashSpecialEventContactPhone = item.cell || '';
            //             updatedData.pettyCashSpecialEventContactExt = item.ext || '';
            //             updatedData.pettyCashSpecialEventContactFax = item.fax || '';
            //             updatedData.pettyCashSpecialEventContactEmail = item.email || '';
            //             updatedData.pettyCashSpecialEventContactForms = item.forms || '';
            //             updatedData.pettyCashSpecialEventContactOthers = item.others || '';
            //             break;
            //         case "Field Trainer":
            //             updatedData.fieldTrainerName = item.name || '';
            //             updatedData.fieldTrainerPhone = item.cell || '';
            //             updatedData.fieldTrainerExt = item.ext || '';
            //             updatedData.fieldTrainerFax = item.fax || '';
            //             updatedData.fieldTrainerEmail = item.email || '';
            //             updatedData.fieldTrainerForms = item.forms || '';
            //             updatedData.fieldTrainerOthers = item.others || '';
            //             break;
            //         case "Healthcare Consultant":
            //             updatedData.healthCareConsultantName = item.name || '';
            //             updatedData.healthCareConsultantPhone = item.cell || '';
            //             updatedData.healthCareConsultantExt = item.ext || '';
            //             updatedData.healthCareConsultantFax = item.fax || '';
            //             updatedData.healthCareConsultantEmail = item.email || '';
            //             updatedData.healthCareConsultantForms = item.forms || '';
            //             updatedData.healthCareConsultantOthers = item.others || '';
            //             break;
            //         case "Account Billing":
            //             updatedData.accountBillingName = item.name || '';
            //             updatedData.accountBillingPhone = item.cell || '';
            //             updatedData.accountBillingExt = item.ext || '';
            //             updatedData.accountBillingFax = item.fax || '';
            //             updatedData.accountBillingEmail = item.email || '';
            //             updatedData.accountBillingForms = item.forms || '';
            //             updatedData.accountBillingOthers = item.others || '';
            //             break;
            //         case "Staffing/Substitutes":
            //             updatedData.staffingAssistantName = item.name || '';
            //             updatedData.staffingAssistantPhone = item.cell || '';
            //             updatedData.staffingAssistantExt = item.ext || '';
            //             updatedData.staffingAssistantFax = item.fax || '';
            //             updatedData.staffingAssistantEmail = item.email || '';
            //             updatedData.staffingAssistantForms = item.forms || '';
            //             updatedData.staffingAssistantOthers = item.others || '';
            //             break;
            //         // Add cases for other descriptions as needed
            //     }
            // });

            return updatedData;
        });
    };

    return (
        <>
        <div className="tab-pane fade show active" id="nav-assignments" role="tabpanel" aria-labelledby="nav-assignments-tab" tabIndex={0}>
            <div className="row justify-content-start m-0">
                <div className="col-lg-8 col-md-12 col-12 asignmentTable">
                    <Table data={data} columns={columns} />
                </div>
            </div>
        </div>
         <ConfirmationModal
         isOpen={confirmationOpen}
         message={confirmationProps.message}
         onConfirm={confirmationProps.onConfirm}
         onCancel={confirmationProps.onCancel}
         title="Delete Assignment"
 />
 </>
    );
};

export default Assignment;
