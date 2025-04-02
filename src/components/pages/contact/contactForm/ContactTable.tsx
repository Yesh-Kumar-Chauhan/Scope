import React, { useEffect, useState } from 'react'
import ActionButtons from '../../../common/table/ActionButtons';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../../common/table/Table';
import { useDebounce } from 'use-debounce';
import Pagination from '../../../common/table/Pagination';
import { useModalCallback } from '../../../../contexts/ModalCallbackContext';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../../store/modalSlice';
import { createContactForm, getContactDataById, updateContactForm } from '../../../../apis/contactApi';
import { useDeleteContact } from '../../../../hooks/contact/useDeleteContact'
import { useFetchContact } from '../../../../hooks/contact/useFetchContact';
import MobilePagination from '../../../common/table/MobilePagination';
import { getUserData } from "../../../../utils/utils";
import ConfirmationModal from '../../../modals/ConfirmationModal';
interface InserviceBasicTableProps {
    setShowContactTable: React.Dispatch<React.SetStateAction<boolean>>;
    siteRowDetails: any
}

const ContactTable: React.FC<InserviceBasicTableProps> = ({ setShowContactTable, siteRowDetails }) => {
    const dispatch = useDispatch();
    const { setCallback } = useModalCallback();
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const { data: contacts, isLoading, isError, error, refetch } = useFetchContact(debouncedSearchQuery, currentPage, itemsPerPage, siteRowDetails.siteID);
    const { deleteContact, loading: deleteLoader } = useDeleteContact();
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const totalPages = contacts ? Math.ceil(contacts.totalItems / itemsPerPage) : 1;
    const userData = getUserData();
    const [confirmationProps, setConfirmationProps] = useState({
                message: '',
                onConfirm: () => { },
                onCancel: () => { },
            });
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'date',
            header: 'DATE',
            cell: ({ getValue }) => {
                const dateStr = getValue() as string;
                const date = new Date(dateStr);
                return date.toLocaleDateString('en-CA');
            },
        },
        {
            accessorKey: 'name',
            header: 'NAME',
        },
        {
            id: 'actions',
            header: 'ACTION',
            cell: ({ row }) => (
                <ActionButtons
                    id={row.original.contactID}
                    onEdit={() => updateContactModal(row.original.contactID)}
                    onDelete={() => showDeleteConfirmation(row.original.contactID)}
                    loader={deleteLoader && deletingId === row.original.contactID}
                />
            ),
        },
    ];

    const showDeleteConfirmation = (rowId: any) => {
        setConfirmationProps({
            message: 'Are you sure you want to delete Contact?',
            onConfirm: async () => {
                deleteContact(rowId, refetch);
                setDeletingId(rowId);
               setConfirmationOpen(false);
            },
            onCancel: () => {
                setConfirmationOpen(false);
            },
        });
        setConfirmationOpen(true);
    };

    const updateContactModal = async (id: number) => {
        const contactData = await getContactDataById(id);
        if (!contactData) {
            return;
        }
        setCallback((contactData: any) => handleEditContact(contactData));
        dispatch(openModal({
            modalType: 'CONTACT-MODAL',
            modalProps: {
                initialData: contactData,
                isEditing: true,
            }
        }));
    }
    const handleEditContact = async (formData: any) => {
        try {
            const response = await updateContactForm(formData);
            if (response) {
                refetch();
            }
        } catch (error) {
            console.log("error", error)
        }
    };

    const handleNewAssignment = () => {
        setCallback((formData: any) => handleSubmitAssignment(formData));
        dispatch(openModal({
            modalType: 'CONTACT-MODAL',
            modalProps: {
                initialData: {},
                isEditing: false,

            }
        }));
    };

    const handleSubmitAssignment = async (formData: any) => {
        try {
            const siteID = siteRowDetails.siteID;
            const updatedFormData = { ...formData, siteID };
            const response = await createContactForm(updatedFormData)
            if (response) {
                refetch();
            }
        } catch (error) {
            console.log("error", error);
        }

    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>{error.message}</p>;

    return (
        <>
            <div className="seachStrip pb-lg-4 pb-md-3 pb-3">
                <div className="row g-4">
                    <div
                        className="col-12 d-flex align-items-lg-center align-items-md-center align-items-sm-center align-items-start justify-content-between gap-2 flex-lg-row flex-md-row flex-sm-row flex-column">
                        <div className='DistrictpageSubTitle'>
                            <h2 className='m-0 text-nowrap d-flex align-items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" onClick={() => setShowContactTable(false)} style={{ cursor: "pointer" }}>
                                    <path d="M14.2891 22.2973C14.6427 22.7216 15.2732 22.7789 15.6975 22.4253C16.1218 22.0718 16.1791 21.4412 15.8256 21.0169L14.2891 22.2973ZM10.3433 16.0002L9.57504 15.36C9.266 15.7309 9.266 16.2696 9.57504 16.6404L10.3433 16.0002ZM15.8256 10.9835C16.1791 10.5592 16.1218 9.92868 15.6975 9.57512C15.2732 9.22156 14.6427 9.27888 14.2891 9.70316L15.8256 10.9835ZM21.657 17.0002C22.2093 17.0002 22.657 16.5525 22.657 16.0002C22.657 15.4479 22.2093 15.0002 21.657 15.0002V17.0002ZM15.8256 21.0169L11.1115 15.36L9.57504 16.6404L14.2891 22.2973L15.8256 21.0169ZM11.1115 16.6404L15.8256 10.9835L14.2891 9.70316L9.57504 15.36L11.1115 16.6404ZM10.3433 17.0002H21.657V15.0002H10.3433V17.0002ZM7.65634 7.65634C12.2645 3.04815 19.7359 3.04815 24.3441 7.65634L25.7583 6.24212C20.369 0.852887 11.6314 0.852887 6.24212 6.24212L7.65634 7.65634ZM24.3441 7.65634C28.9522 12.2645 28.9522 19.7359 24.3441 24.3441L25.7583 25.7583C31.1475 20.369 31.1475 11.6314 25.7583 6.24212L24.3441 7.65634ZM24.3441 24.3441C19.7359 28.9522 12.2645 28.9522 7.65634 24.3441L6.24212 25.7583C11.6314 31.1475 20.369 31.1475 25.7583 25.7583L24.3441 24.3441ZM7.65634 24.3441C3.04815 19.7359 3.04815 12.2645 7.65634 7.65634L6.24212 6.24212C0.852887 11.6314 0.852887 20.369 6.24212 25.7583L7.65634 24.3441Z" fill="#023047" />
                                </svg>
                                <b>{siteRowDetails.name}</b>
                            </h2>
                        </div>
                        {/* <h3 className="text-nowrap formTitle m-0">New District</h3> */}
                        <div
                            className="d-lg-flex d-md-flex d-sm-flex d-flex mt-lg-0 mt-md-0 mt-sm-0 mt-3 flex-lg-row flex-md-row flex-sm-row flex-row-reverse align-items-center justify-content-lg-end justify-content-md-end justify-content-sm-end justify-content-end w-100 gap-lg-4 gap-md-3 gap-3">
                            <button className="btn btn-transparent" type='button' onClick={() => setShowContactTable(false)}>Discard</button>
                            {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" && userData.role !== "Scope.StudentService_PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1AND2" &&
                                <button className="btn btn-primary d-flex align-items-center gap-2"
                                    onClick={handleNewAssignment}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" style={{ flex: '0 0 auto' }} height="24" viewBox="0 0 24 24"
                                        fill="none">
                                        <path
                                            d="M19 11H13V5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5V11H5C4.73478 11 4.48043 11.1054 4.29289 11.2929C4.10536 11.4804 4 11.7348 4 12C4 12.2652 4.10536 12.5196 4.29289 12.7071C4.48043 12.8946 4.73478 13 5 13H11V19C11 19.2652 11.1054 19.5196 11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19V13H19C19.2652 13 19.5196 12.8946 19.7071 12.7071C19.8946 12.5196 20 12.2652 20 12C20 11.7348 19.8946 11.4804 19.7071 11.2929C19.5196 11.1054 19.2652 11 19 11Z"
                                            fill="white" />
                                    </svg>
                                    New
                                </button>
                            }
                        </div>
                    </div>

                    <div
                        className="col-12 d-lg-flex d-md-flex d-sm-flex d-none align-items-lg-center align-items-md-center align-items-sm-center align-items-start justify-content-end gap-2 flex-lg-row flex-md-row flex-sm-row flex-column">
                        <Pagination
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                        />
                    </div>
                </div>
            </div>

            <div className="paginationDiv pt-3 mb-lg-0 mb-md-0 mb-0">
                <div className="row flex-lg-column flex-md-column flex-column-reverse">
                    <div className="col-12">
                        <div className="pageTable">
                            <div className="pageTableInner personalTab">
                                <Table data={contacts?.data || []} columns={columns} ></Table>
                            </div>
                            <MobilePagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}
                            />
                        </div>
                    </div>
                </div>

            </div>
            <ConfirmationModal
                    isOpen={confirmationOpen}
                    message={confirmationProps.message}
                    onConfirm={confirmationProps.onConfirm}
                    onCancel={confirmationProps.onCancel}
                    title="Delete Contact"
            />
        </>
    )
}

export default ContactTable