import React, { useEffect, useState } from 'react'
import ActionButtons from '../../../common/table/ActionButtons';
import { IInservice, IInserviceTable } from '../../../../interface/Inservice';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../../common/table/Table';
import { useDebounce } from 'use-debounce';
import Pagination from '../../../common/table/Pagination';
import { useDeleteClosing } from '../../../../hooks/closing/useDeleteClosing'
import { useFetchClosing } from '../../../../hooks/closing/useFetchClosing'
import { useModalCallback } from '../../../../contexts/ModalCallbackContext';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../../store/modalSlice';
import { createClosing, getClosingDataById, updateClosing } from '../../../../apis/closingApi';
import { getUserData } from "../../../../utils/utils";
import ConfirmationModal from '../../../modals/ConfirmationModal';
interface InserviceBasicTableProps {
    setShowClosingTable: React.Dispatch<React.SetStateAction<boolean>>;
    districtRowDetails: any
}

const ClosingTable: React.FC<InserviceBasicTableProps> = ({ setShowClosingTable, districtRowDetails }) => {
    const dispatch = useDispatch();
    const { setCallback } = useModalCallback();
    const [currentPage, setCurrentPage] = useState(1);
    const [confirmationProps, setConfirmationProps] = useState({
                message: '',
                onConfirm: () => { },
                onCancel: () => { },
    });
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    
    const itemsPerPage = 10;
    const userData = getUserData();
    const { data: closings, isLoading, isError, error, refetch } = useFetchClosing(districtRowDetails.districtId, currentPage, itemsPerPage);
    const { deleteClosingData, loading: inserviceLoader } = useDeleteClosing();
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const totalPages = closings ? Math.ceil(closings.totalItems / itemsPerPage) : 1;

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
            accessorKey: 'statusName',
            header: 'STATUSNAME',
        },
        {
            accessorKey: 'parentCredit',
            header: 'Parent Credit',
            cell: ({ row }) => (
                <div
                    className="inputDesign position-relative">
                    <input
                        type="checkbox"
                        checked={row.original.parentCredit}
                    />
                    <div className="checked">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none">
                            <path
                                d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z"
                                stroke="black"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className="Unchecked">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none">
                            <path
                                d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z"
                                stroke="#A4A4A4"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: 'staffPaid',
            header: 'Staff Paid',
            cell: ({ row }) => (
                <div
                    className="inputDesign position-relative">
                    <input
                        type="checkbox"
                        checked={row.original.staffPaid}
                    />
                    <div className="checked">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none">
                            <path
                                d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z"
                                stroke="black"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className="Unchecked">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none">
                            <path
                                d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z"
                                stroke="#A4A4A4"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: 'makeUpDay',
            header: 'Make-Up Day',
            cell: ({ row }) => (
                <div
                    className="inputDesign position-relative">
                    <input
                        type="checkbox"
                        checked={row.original.makeUpDay}
                    />
                    <div className="checked">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none">
                            <path
                                d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z"
                                stroke="black"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className="Unchecked">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none">
                            <path
                                d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z"
                                stroke="#A4A4A4"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
            ),
        },
        {
            id: 'actions',
            header: 'ACTION',
            cell: ({ row }) => (
                <ActionButtons
                    id={row.original.closingID}
                    onEdit={() => updateClosingModal(row.original.closingID)}
                    onDelete={() => 
                        showDeleteConfirmation(row.original.closingID)}
                    loader={inserviceLoader && deletingId === row.original.closingID}
                />
            ),
        },
    ];

    const showDeleteConfirmation = (rowId: any) => {
        setConfirmationProps({
            message: 'Are you sure you want to delete Closing?',
            onConfirm: async () => {
                deleteClosingData(rowId, refetch);
                setDeletingId(rowId);
               setConfirmationOpen(false);
            },
            onCancel: () => {
                setConfirmationOpen(false);
            },
        });
        setConfirmationOpen(true);
    };

    const updateClosingModal = async (id: number) => {
        const closingData = await getClosingDataById(id);
        if (!closingData) {
            return;
        }
        setCallback((closingData: any) => handleEditClosing(closingData));
        dispatch(openModal({
            modalType: 'CLOSING-MODAL',
            modalProps: {
                initialData: closingData,
                isEditing: true,
            }
        }));
    }
    const handleEditClosing = async (formData: any) => {
        try {
            const response = await updateClosing(formData)
            if (response) {
                refetch();
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleNewAssignment = () => {
        setCallback((formData: any) => handleSubmitAssignment(formData));
        dispatch(openModal({
            modalType: 'CLOSING-MODAL', // Replace with your modal type
            modalProps: {
                initialData: {},
                isEditing: false,
            }
        }));
    };

    const handleSubmitAssignment = async (formData: any) => {
        const districtID = districtRowDetails.districtId;
        const updatedFormData = { ...formData, districtID };
        try {
            const response = await createClosing(updatedFormData);
            if (response) {
                refetch();
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    // if (isLoading) return <p>Loading...</p>;
    // if (isError) return <p>{error.message}</p>;

    return (
        <>
            <div className="seachStrip pb-lg-4 pb-md-3 pb-3">
                <div className="row g-4 flex-lg-row flex-md-row flex-sm-row flex-column">


                    <div className="col-12 d-flex align-items-center flex-lg-nowrap flex-md-nowrap flex-sm-nowrap flex-wrap justify-content-between gap-lg-3 gap-md-3 gap-sm-3 gap-4">
                        <div className='DistrictpageSubTitle'>
                            <h2 className='d-flex m-0 align-items-center text-nowrap gap-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" onClick={() => setShowClosingTable(false)} style={{ cursor: "pointer" }}>
                                    <path d="M14.2891 22.2973C14.6427 22.7216 15.2732 22.7789 15.6975 22.4253C16.1218 22.0718 16.1791 21.4412 15.8256 21.0169L14.2891 22.2973ZM10.3433 16.0002L9.57504 15.36C9.266 15.7309 9.266 16.2696 9.57504 16.6404L10.3433 16.0002ZM15.8256 10.9835C16.1791 10.5592 16.1218 9.92868 15.6975 9.57512C15.2732 9.22156 14.6427 9.27888 14.2891 9.70316L15.8256 10.9835ZM21.657 17.0002C22.2093 17.0002 22.657 16.5525 22.657 16.0002C22.657 15.4479 22.2093 15.0002 21.657 15.0002V17.0002ZM15.8256 21.0169L11.1115 15.36L9.57504 16.6404L14.2891 22.2973L15.8256 21.0169ZM11.1115 16.6404L15.8256 10.9835L14.2891 9.70316L9.57504 15.36L11.1115 16.6404ZM10.3433 17.0002H21.657V15.0002H10.3433V17.0002ZM7.65634 7.65634C12.2645 3.04815 19.7359 3.04815 24.3441 7.65634L25.7583 6.24212C20.369 0.852887 11.6314 0.852887 6.24212 6.24212L7.65634 7.65634ZM24.3441 7.65634C28.9522 12.2645 28.9522 19.7359 24.3441 24.3441L25.7583 25.7583C31.1475 20.369 31.1475 11.6314 25.7583 6.24212L24.3441 7.65634ZM24.3441 24.3441C19.7359 28.9522 12.2645 28.9522 7.65634 24.3441L6.24212 25.7583C11.6314 31.1475 20.369 31.1475 25.7583 25.7583L24.3441 24.3441ZM7.65634 24.3441C3.04815 19.7359 3.04815 12.2645 7.65634 7.65634L6.24212 6.24212C0.852887 11.6314 0.852887 20.369 6.24212 25.7583L7.65634 24.3441Z" fill="#023047" />
                                </svg>
                                <b>{districtRowDetails.name}</b>
                            </h2>
                        </div>

                        <div className="d-flex align-items-center flex-lg-row flex-md-row flex-sm-row flex-row-reverse justify-content-start gap-3">
                            <button className="btn btn-transparent" type='button' onClick={() => setShowClosingTable(false)}>Discard</button>
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

                    <div className="col-12 d-flex align-items-center justify-content-end gap-2 d-lg-flex d-md-flex d-sm-flex d-none">
                        <Pagination
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                        />
                    </div>
                </div>
            </div>
            <div className="paginationDiv h-100 pt-lg-3 pt-md-3 pt-0 mb-lg-0 mb-md-3 mb-3">
                <div className="row g-4 h-100 flex-lg-column flex-md-column flex-column-reverse">
                    <div className="col-12 h-100">
                        <div className="pageTable h-100">
                            <div className="pageTableInner personalTab">
                                <Table data={closings?.data || []} columns={columns} ></Table>
                            </div>

                            <div className="pagination d-lg-none d-md-flex d-flex mt-4 justify-content-end">
                                <ul className="d-flex align-items-center gap-2">
                                    <li>
                                        <a href="#" className="inactive">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M10.8 16.8002L6 12.0002L10.8 7.20019M18 16.8002L13.2 12.0002L18 7.2002"
                                                    stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="inactive">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none">
                                                <path d="M14.4001 16.7998L9.6001 11.9998L14.4001 7.19981"
                                                    stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <div className="tableCounter">
                                            18 of 80
                                        </div>
                                    </li>
                                    <li>
                                        <a href="#" className="active">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none">
                                                <path d="M9.5999 7.2002L14.3999 12.0002L9.5999 16.8002"
                                                    stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="active">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M13.2 7.1998L18 11.9998L13.2 16.7998M6 7.19981L10.8 11.9998L6 16.7998"
                                                    stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            <ConfirmationModal
                    isOpen={confirmationOpen}
                    message={confirmationProps.message}
                    onConfirm={confirmationProps.onConfirm}
                    onCancel={confirmationProps.onCancel}
                    title="Delete Closing"
            />
        </>
    )
}

export default ClosingTable