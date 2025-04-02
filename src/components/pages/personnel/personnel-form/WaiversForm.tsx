import React, { useEffect, useState } from 'react'
import ActionButtons from '../../../common/table/ActionButtons';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../../common/table/Table';
import { useFetchWaiver } from '../../../../hooks/personnel/waiver/useFetchWaiver';
import { useDeleteWaiver } from '../../../../hooks/personnel/waiver/useDeleteWaiver';
import { useDebounce } from 'use-debounce';
import Pagination from '../../../common/table/Pagination';
import Search from '../../../common/Search';
import { getWaiverFormData, updateWaiverRecievedForm } from '../../../../apis/personnelApi';
import { IWaiverTable } from '../../../../interface/Personnel';
import { ModalType } from '../../../../types/modal';
import { openModal } from '../../../../store/modalSlice';
import { useDispatch } from 'react-redux';
import { useModalCallback } from '../../../../contexts/ModalCallbackContext';
import MobilePagination from '../../../common/table/MobilePagination';
import moment from 'moment';
import { getUserData } from "../../../../utils/utils";
import { useFetchWaiverRecieved } from '../../../../hooks/personnel/waiver/waiverRecieved/useFetchWaiverRecieved';
import ConfirmationModal from '../../../modals/ConfirmationModal';
interface CertificateTableProps {
    personalId: number
}

const WaiversForm: React.FC<CertificateTableProps> = ({ personalId }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isEditingTimesheet, setIsEditingTimesheet] = useState(false);
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500); // Debounce search query with 500ms delay
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const dispatch = useDispatch();
    const { getCallback, setCallback } = useModalCallback();
    const [nassauChecked, setNassauChecked] = useState(false);
    const [suffolkChecked, setSuffolkChecked] = useState(false);
    const [nassauDate, setNassauDate] = useState('');
    const [suffolkDate, setSuffolkDate] = useState('');
    const userData = getUserData();
    const [confirmationProps, setConfirmationProps] = useState({
        message: '',
        onConfirm: () => { },
        onCancel: () => { },
    });
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const { data: waiverSentdata, isLoading: waiverSentLoading, isError: waiverSentError, error: waiverSentErrorMsg, refetch: refetchWaiverSent } = useFetchWaiver(personalId);
    const { data: waiverRecieveddata, isLoading: waiverReceivedLoading, isError: waiverReceivedError, error: waiverReceivedErrorMsg, refetch: refetchWaiverReceived } = useFetchWaiverRecieved(personalId);

    const { deleteWaiverData, loading: certificateLoader } = useDeleteWaiver();
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [tableData, setTableData] = useState(waiverRecieveddata?.data || []);
    const [isSave, setIsSave] = useState(false);
    // const totalPages = data ? Math.ceil(data.totalItems / itemsPerPage) : 1;

    const columnsSent: ColumnDef<IWaiverTable>[] = [
        {
            accessorKey: 'sent',
            header: 'Date',
            cell: ({ row }) => {
                const date = row.original.sent;
                return date ? moment(date).format('MM-DD-YYYY') : ''; // Format date or show empty if not available
            }
        },
        {
            id: 'actions',
            header: 'ACTION',
            cell: ({ row }) => (
                <ActionButtons
                    id={row.original.personnelID}
                    onEdit={() => handleEditWaiver(row.original.waiversSentID)}
                    onDelete={() => showDeleteConfirmation(row.original.waiversSentID)}
                    loader={certificateLoader && deletingId === row.original.waiversSentID}
                // schedular={true}
                // onTimeSchedular={()=> handleTimeSchedular()}

                />
            ),
        },
    ];

    const columnsReceived: ColumnDef<any>[] = [
        {
            accessorKey: 'distName',
            header: 'District',
        },
        {
            accessorKey: 'siteName',
            header: 'Site',
        },
        {
            accessorKey: 'received',
            header: 'Recieved',
            cell: ({ row }) => {
                const date = row.original.received;
                return date ? moment(date).format('MM-DD-YYYY') : ''; // Format date or show empty if not available
            }
        },
        // {
        //     id: 'actions',
        //     header: 'ACTION',
        //     cell: ({ row }) => (
        //         <button className='btn btn-primary px-3 py-2 h-auto' style={{ minHeight: 'auto', minWidth: 'auto' }}
        //         // onClick={() => handleCreateNewInservice(row.original.personalID, `${row.original.firstname} ${row.original.lastname}`)} 
        //         >
        //             Select
        //         </button>
        //     ),
        // },
    ];

    const showDeleteConfirmation = (rowId: any) => {
        setConfirmationProps({
            message: 'Are you sure you want to delete Waivers?',
            onConfirm: async () => {
                deleteWaiverData(rowId, refetchWaiverSent);
                setDeletingId(rowId);
               setConfirmationOpen(false);
            },
            onCancel: () => {
                setConfirmationOpen(false);
            },
        });
        setConfirmationOpen(true);
    };

    if (userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" && userData.role !== "Scope.StudentService_PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1AND2") {
        columnsReceived.push({
            id: 'actions',
            header: 'ACTION',
            cell: ({ row }) => (
                <button className='btn btn-primary px-3 py-2 h-auto' style={{ minHeight: 'auto', minWidth: 'auto' }}>
                    Select
                </button>
            ),
        });
    }

    useEffect(() => {
        if (waiverRecieveddata?.data) {
            setTableData(waiverRecieveddata?.data)
        }
    }, [waiverRecieveddata]);

    const handleNewCertificate = () => {
        // setCallback((formData: any) => handleSubmitAssignment(formData));
        dispatch(openModal({
            modalType: 'WAIVER-MODAL' as ModalType,
            modalProps: {
                initialData: {},
                // isEditing,
                personalId,
                refetch: refetchWaiverSent,
            }
        }));
    };

    const handleEditWaiver = async (timesheetID: number) => {
        const waiverData = await getWaiverFormData(timesheetID);
        setIsEditingTimesheet(true);
        dispatch(openModal({
            modalType: 'WAIVER-MODAL' as ModalType,
            modalProps: {
                initialData: waiverData?.data,
                isEditingTimesheet: true,
                setIsEditingTimesheet,
                timesheetID,
                personalId,
                refetch: refetchWaiverSent,
            }
        }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleUpdate = () => {
        const updatedData = tableData.map((row: any) => {
            if (nassauChecked && row.country === 'N') {
                return { ...row, received: nassauDate };
            }
            if (suffolkChecked && row.country === 'S') {
                return { ...row, received: suffolkDate };
            }
            return row;
        });
        setTableData(updatedData);

        refetchWaiverReceived();
    };

    const handleSave = async () => {
        try {
            setIsSave(true)
            const updatedRowData = tableData.map(row => ({
                waiversReceivedID: row.waiversReceivedID || 0, // Adjust according to your data structure
                staffID: personalId,
                siteID: row.siteID,
                received: row.received,
                distName: row.distName,
                siteName: row.siteName,
                country: row.country,
            }));

            await updateWaiverRecievedForm(updatedRowData);

            refetchWaiverReceived();
        } catch (error) {
            console.error('Error saving data:', error);
        } finally {
            setIsSave(false)
        }
    };


    if (waiverSentLoading || waiverReceivedLoading) return <p>Loading...</p>;
    if (waiverSentError) return <p>{waiverSentErrorMsg?.message}</p>;
    if (waiverReceivedError) return <p>{waiverReceivedErrorMsg?.message}</p>;

    return (
        <>
            <section className="DashboardPage text-nowrap">
                <div className="container-fluid">
                    <div className="DashboardRow  row d-flex flex-lg-row flex-md-row flex-sm-column flex-column">
                        {/* <div className="seachStrip py-lg-4 py-md-3 py-3">
                            <div className="row g-4 flex-lg-row flex-md-row flex-sm-row flex-column-reverse">
                                <div
                                    className="col-12 d-flex align-items-center flex-xl-nowrap flex-lg-wrap flex-md-wrap flex-wrap gap-3">
                                    <div
                                        className="d-flex w-100 flex-lg-nowrap flex-md-nowrap flex-wrap align-items-center justify-content-between gap-3">

                                        <Search
                                            searchQuery={searchQuery}
                                            handleSearchChange={handleSearchChange}
                                            setSearchQuery={setSearchQuery}
                                        />

                                       

                                    </div>
                                    <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => handleNewCertificate()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none">
                                            <path
                                                d="M19 11H13V5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5V11H5C4.73478 11 4.48043 11.1054 4.29289 11.2929C4.10536 11.4804 4 11.7348 4 12C4 12.2652 4.10536 12.5196 4.29289 12.7071C4.48043 12.8946 4.73478 13 5 13H11V19C11 19.2652 11.1054 19.5196 11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19V13H19C19.2652 13 19.5196 12.8946 19.7071 12.7071C19.8946 12.5196 20 12.2652 20 12C20 11.7348 19.8946 11.4804 19.7071 11.2929C19.5196 11.1054 19.2652 11 19 11Z"
                                                fill="white" />
                                        </svg>
                                        New
                                    </button>
                                </div>

                            </div>
                        </div> */}

                        <div className="paginationDiv pt-3 mb-lg-0 mb-md-3 mb-3">
                            <div className="pageTable">
                                <div className="pageTableInner">
                                    <div className="row m-0 g-lg-4 g-md-4 g-4">
                                        <div className="col-lg-4 col-md-5 col-sm-12 col-12">

                                            <div className='border h-100 rounded-3 p-lg-4 p-md-3 p-3'>
                                                <div className='d-flex align-items-center mb-4 justify-content-between gap-3'>
                                                    <h4 className="m-0 w-auto"><b>Waivers Sent</b></h4>
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
                                                <div className="pageTable waiversSentTable">
                                                    <div className="pageTableInner personalTab">
                                                        <Table data={waiverSentdata?.data || []} columns={columnsSent}></Table>
                                                        {/* <MobilePagination
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                            totalPages={totalPages}
                                        /> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-8 col-md-7 col-sm-12 col-12">
                                            <div className='border h-100 rounded-3 p-lg-4 p-md-3 p-3'>
                                                <div className='mb-4'>
                                                    <div className='d-flex align-items-center mb-4 justify-content-between gap-3'>
                                                        <h4 className="m-0 w-auto"><b>Waivers Recieved</b></h4>
                                                        {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" && userData.role !== "Scope.StudentService_PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1AND2" &&
                                                            <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleUpdate}>
                                                                Update
                                                            </button>
                                                        }
                                                    </div>
                                                    <div className='row mt-3'>
                                                        <div className='col-lg-6 col-md-6 col-sm-12 col-12 d-flex align-items-center'>
                                                            <div className='d-flex align-items-center gap-3'>
                                                                <label className="form-label m-0" style={{ fontWeight: nassauChecked ? 'bold' : 'normal' }}>
                                                                    Waived for all Nassau Country Sites:
                                                                </label>

                                                                <div className="d-flex checked align-items-center gap-2">
                                                                    <div className="inputDesign position-relative">
                                                                        <input
                                                                            type="checkbox"
                                                                            id="nassau"
                                                                            checked={nassauChecked}
                                                                            onChange={() => setNassauChecked(!nassauChecked)}
                                                                        />

                                                                        <div className="checked">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                                                <path d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                            </svg>
                                                                        </div>
                                                                        <div className="Unchecked">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                                                <path d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                            </svg>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-6 DistrictForm col-md-6 col-sm-12 col-12'>
                                                            <div className='d-flex align-items-center gap-3'>
                                                                <label className="form-label m-0">
                                                                    Date Received:
                                                                </label>
                                                                <div className="mb-0 w-100">
                                                                    <input
                                                                        type="date"
                                                                        className="form-control"
                                                                        placeholder='Select Date'
                                                                        value={nassauDate}
                                                                        onChange={(e) => setNassauDate(e.target.value)}
                                                                        disabled={!nassauChecked}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='row mt-2'>
                                                        <div className='col-lg-6 col-md-6 col-sm-12 col-12 d-flex align-items-center'>
                                                            <div className='d-flex align-items-center gap-3'>
                                                                <label className="form-label m-0" style={{ fontWeight: suffolkChecked ? 'bold' : 'normal' }}>
                                                                    Waived for all Suffolk Country Sites:
                                                                </label>

                                                                <div className="d-flex checked align-items-center gap-2">
                                                                    <div className="inputDesign position-relative">
                                                                        <input
                                                                            type="checkbox"
                                                                            id="suffolk"
                                                                            checked={suffolkChecked}
                                                                            onChange={() => setSuffolkChecked(!suffolkChecked)}
                                                                        />

                                                                        <div className="checked">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                                                <path d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                            </svg>
                                                                        </div>
                                                                        <div className="Unchecked">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                                                <path d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                            </svg>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-6 DistrictForm col-md-6 col-sm-12 col-12'>
                                                            <div className='d-flex align-items-center gap-3'>
                                                                <label className="form-label m-0">
                                                                    Date Received:
                                                                </label>
                                                                <div className="mb-0 w-100">
                                                                    <input
                                                                        type="date"
                                                                        className="form-control"
                                                                        placeholder='Select Date'
                                                                        value={suffolkDate}
                                                                        onChange={(e) => setSuffolkDate(e.target.value)}
                                                                        disabled={!suffolkChecked}
                                                                    />

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="pageTable">
                                                    <div className="WaiversList personalTab">
                                                        <Table data={tableData} columns={columnsReceived} ></Table>
                                                    </div>
                                                </div>

                                                {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" && userData.role !== "Scope.StudentService_PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1AND2" &&
                                                    <div className="text-end d-flex justify-content-end mt-3">
                                                        <button
                                                            className="btn btn-primary d-flex align-items-center gap-2"
                                                            onClick={handleSave}
                                                        >
                                                            {isSave ? (
                                                                <span className="btnloader loader"></span>
                                                            ) : (
                                                                <span>  Save</span>
                                                            )}
                                                        </button>
                                                    </div>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <ConfirmationModal
                    isOpen={confirmationOpen}
                    message={confirmationProps.message}
                    onConfirm={confirmationProps.onConfirm}
                    onCancel={confirmationProps.onCancel}
                    title="Delete Waivers"
            />
        </>
    )

}
export default WaiversForm