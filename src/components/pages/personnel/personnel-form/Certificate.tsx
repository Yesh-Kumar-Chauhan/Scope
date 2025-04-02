import React, { useState } from 'react'
import ActionButtons from '../../../common/table/ActionButtons';
// import { ISite, ISiteTable } from '../../../interface/Sites';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../../common/table/Table';
import { useFetchCertificate } from '../../../../hooks/personnel/certificate/useFetchCertificate';
import { useDeleteCertificate } from '../../../../hooks/personnel/certificate/useDeleteCertificate';
import { useDebounce } from 'use-debounce';
import Pagination from '../../../common/table/Pagination';
import Search from '../../../common/Search';
// import {useDeletePersonnel} from '../../../hooks/personnel/useDeletePersonnel'
import { getCertificateFormData } from '../../../../apis/personnelApi';
import { ICertificateTable } from '../../../../interface/Personnel';
import { ModalType } from '../../../../types/modal';
import { openModal } from '../../../../store/modalSlice';
import { useDispatch } from 'react-redux';
import { useModalCallback } from '../../../../contexts/ModalCallbackContext';
import MobilePagination from '../../../common/table/MobilePagination';
import { getUserData } from "../../../../utils/utils";
import moment from 'moment';
import ConfirmationModal from '../../../modals/ConfirmationModal';
interface CertificateTableProps {
    personalId: number
}
const Certificate: React.FC<CertificateTableProps> = ({ personalId }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isEditingTimesheet, setIsEditingTimesheet] = useState(false);
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500); // Debounce search query with 500ms delay
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const dispatch = useDispatch();
    const userData = getUserData();
    const { getCallback, setCallback } = useModalCallback();
    const [confirmationProps, setConfirmationProps] = useState({
        message: '',
        onConfirm: () => { },
        onCancel: () => { },
    });
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const { data: data, isLoading, isError, error, refetch } = useFetchCertificate(personalId);

    const { deleteCertificateData, loading: certificateLoader } = useDeleteCertificate();
    const [deletingId, setDeletingId] = useState<number | null>(null);
    // const totalPages = data ? Math.ceil(data.totalItems / itemsPerPage) : 1;

    const columns: ColumnDef<ICertificateTable>[] = [
        {
            accessorKey: 'certificateTypeName',
            header: 'Certificate',
        },
        {
            accessorKey: 'certificatePermanent',
            header: 'Permanent',
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={row.original.certificatePermanent}
                    readOnly
                />
            ),
        },
        {
            accessorKey: 'certificateProfessional',
            header: 'Professional',
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={row.original.certificateProfessional}
                    readOnly
                />
            ),
        },
        {
            accessorKey: 'certificateCQ',
            header: 'CQ',
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={row.original.certificateCQ}
                    readOnly
                />
            ),
        },
        {
            accessorKey: 'initial',
            header: 'Initial',
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={row.original.initial}
                    readOnly
                />
            ),
        },
        {
            accessorKey: 'initialExpiration',
            header: 'Expiration',
            cell: ({ row }) => {
                const date = row.original.initialExpiration;
                return date ? moment(date).format('MM-DD-YYYY') : ''; // Format date or show empty if not available
            }
        },
        {
            accessorKey: 'provisional',
            header: 'Provisional',
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={row.original.provisional}
                    readOnly
                />
            ),
        },
        {
            accessorKey: 'provisionalExpiration',
            header: 'Expiration',
            cell: ({ row }) => {
                const date = row.original.provisionalExpiration;
                return date ? moment(date).format('MM-DD-YYYY') : ''; // Format date or show empty if not available
            }
        },

        {
            id: 'actions',
            header: 'ACTION',
            cell: ({ row }) => (
                <ActionButtons
                    id={row.original.personnelID}
                    onEdit={() => handleEditCertificate(row.original.certificateID)}
                    onDelete={() => showDeleteConfirmation(row.original.certificateID)}
                    loader={certificateLoader && deletingId === row.original.certificateID}
                // schedular={true}
                // onTimeSchedular={()=> handleTimeSchedular()}

                />
            ),
        },
    ];

    const showDeleteConfirmation = (rowId: any) => {
        setConfirmationProps({
            message: 'Are you sure you want to delete Certificate?',
            onConfirm: async () => {
                deleteCertificateData(rowId, refetch);
                setDeletingId(rowId);
               setConfirmationOpen(false);
            },
            onCancel: () => {
                setConfirmationOpen(false);
            },
        });
        setConfirmationOpen(true);
    };

    const handleNewCertificate = () => {
        // setCallback((formData: any) => handleSubmitAssignment(formData));
        dispatch(openModal({
            modalType: 'CERTIFICATE-MODAL' as ModalType,
            modalProps: {
                initialData: {},
                // isEditing,
                personalId,
                refetch,
            }
        }));
    };

    const handleEditCertificate = async (timesheetID: number) => {
        const certificateData = await getCertificateFormData(timesheetID);
        setIsEditingTimesheet(true);
        dispatch(openModal({
            modalType: 'CERTIFICATE-MODAL' as ModalType,
            modalProps: {
                initialData: certificateData?.data,
                isEditingTimesheet: true,
                setIsEditingTimesheet,
                timesheetID,
                personalId,
                refetch,
            }
        }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>{error.message}</p>;
    return (
        <>
            <section className="DashboardPage text-nowrap">
                <div className="container-fluid">
                    <div className="DashboardRow  row d-flex flex-lg-row flex-md-row flex-sm-column flex-column">
                        <div className="seachStrip py-lg-4 py-md-3 py-3">
                            <div className="row g-4 flex-lg-row flex-md-row flex-sm-row flex-column-reverse">
                                <div
                                    className="col-12 d-flex align-items-center flex-xl-nowrap flex-lg-wrap flex-md-wrap flex-wrap gap-3">
                                    <div
                                        className="d-flex w-100 flex-lg-nowrap flex-md-nowrap flex-wrap align-items-center justify-content-between gap-3">
                                        <h4 className='m-0 w-auto'><b>Certificate</b></h4>

                                        {/*   <Search
                                        searchQuery={searchQuery}
                                        handleSearchChange={handleSearchChange}
                                        setSearchQuery={setSearchQuery}
                                    /> 

                                     <Pagination
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        totalPages={totalPages}
                                    />*/}
                                    </div>
                                    {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" && userData.role !== "Scope.StudentService_PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1AND2" &&
                                        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => handleNewCertificate()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
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
                        </div>

                        <div className="paginationDiv pt-3 mb-lg-0 mb-md-3 mb-3">
                            <div className="row g-4 flex-lg-column flex-md-column flex-column-reverse">
                                <div className="col-12">
                                    <div className="pageTable">
                                        <div className="pageTableInner personalTab">
                                            <Table data={data?.data || []} columns={columns} ></Table>
                                            {/* <MobilePagination
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                            totalPages={totalPages}
                                        /> */}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </section>
            <ConfirmationModal
                    isOpen={confirmationOpen}
                    message={confirmationProps.message}
                    onConfirm={confirmationProps.onConfirm}
                    onCancel={confirmationProps.onCancel}
                    title="Delete Certificate"
            />
        </>
    )

}
export default Certificate