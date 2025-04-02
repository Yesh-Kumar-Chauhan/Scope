import React, { useState } from 'react';
import { openModal } from '../../../../store/modalSlice';
import { useDispatch } from 'react-redux';
import { Table } from '../../../common/table/Table';
import { ModalType } from '../../../../types/modal';
import ActionButtons from '../../../common/table/ActionButtons';
import { ColumnDef } from '@tanstack/react-table';
import { ISite, ISiteAssignmentTable } from '../../../../interface/Sites';
import { useModalCallback } from '../../../../contexts/ModalCallbackContext';
import ConfirmationModal from '../../../modals/ConfirmationModal';

interface Assignment2Props {
    setSiteFormData: (data: any) => void;
    siteFormData: any;
}

const Assignment2: React.FC<Assignment2Props> = ({ setSiteFormData, siteFormData }) => {
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
                description: "SCOPE DSSr",
                name: siteFormData.scopeDSSName || '',
                cell: siteFormData.scopeDSSPhone || '',
                ext: siteFormData.scopeDSSExt || '',
                fax: siteFormData.scopeDSSFax || '',
                email: siteFormData.scopeDSSEmail || '',
                forms: siteFormData.scopeDSSForms || '',
                others: siteFormData.scopeDSSOthers || '',
            },
            {
                description: "Presenters/Photo IDs",
                name: siteFormData.presentersName || '',
                cell: siteFormData.presentersPhone || '',
                ext: siteFormData.presentersExt || '',
                fax: siteFormData.presentersFax || '',
                email: siteFormData.presentersEmail || '',
                forms: siteFormData.presentersForms || '',
                others: siteFormData.presentersOthers || '',
            }
        ];
    };
    const [data, setData] = useState(initializeAssignmentData(siteFormData));


    const assignmentMapping: Record<string, Array<keyof ISite>> = {
        "SCOPE DSSr": ["scopeDSSName", "scopeDSSPhone", "scopeDSSExt", "scopeDSSFax", "scopeDSSEmail", "scopeDSSForms", "scopeDSSOthers"],
        "Presenters/Photo IDs": ["presentersName", "presentersPhone", "presentersExt", "presentersFax", "presentersEmail", "presentersForms", "presentersOthers"],
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

            return updatedData;
        });
    };

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
        mapAssignmentDataToSiteFormData(updatedData); // Update siteFormData with the new assignment data
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
        mapAssignmentDataToSiteFormData(updatedData); // Update siteFormData with the cleared data
        setConfirmationOpen(false);
    },
    onCancel: () => {
        setConfirmationOpen(false);
    },
});
setConfirmationOpen(true);
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

    return (
        <>
        <div className="tab-pane fade show active" id="nav-assignments2" role="tabpanel" aria-labelledby="nav-assignments2-tab" tabIndex={0}>
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

export default Assignment2;
