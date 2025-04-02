import React, { useState } from 'react'
import ActionButtons from '../../../common/table/ActionButtons';
// import { ISite, ISiteTable } from '../../../interface/Sites';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../../common/table/Table';
import { useFetchTimesheet } from '../../../../hooks/personnel/personnelTimesheet/useFetchTimeSheet';
import { useDeleteTimesheet } from '../../../../hooks/personnel/personnelTimesheet/useDeleteTimesheet';
import { useDebounce } from 'use-debounce';
import Pagination from '../../../common/table/Pagination';
import Search from '../../../common/Search';
// import {useDeletePersonnel} from '../../../hooks/personnel/useDeletePersonnel'
import { getTimesheetFormData, deleteTimesheet } from '../../../../apis/personnelApi';
import { IPersonnel, ITimesheetTable } from '../../../../interface/Personnel';
import { ModalType } from '../../../../types/modal';
import { openModal } from '../../../../store/modalSlice';
import { useDispatch } from 'react-redux';
import { useModalCallback } from '../../../../contexts/ModalCallbackContext';
import MobilePagination from '../../../common/table/MobilePagination';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import moment from 'moment';
import { toast } from 'react-toastify';
import TimesheetExcel from './timesheetExcel&pdf/TimesheetExcel';
import TimesheetPDF from './timesheetExcel&pdf/TimesheetPDF';
import { useNavigate } from 'react-router-dom';
import TimesheetForm from './TimesheetForm';
import { useFetchSchedular } from '../../../../hooks/personnel/schedular/useFetchSchedular';
import { getUserData } from "../../../../utils/utils";
import ConfirmationModal from '../../../modals/ConfirmationModal';
interface PersonnelTableProps {
    personalId: number
    currentPersonnel: any
}
const TimeSheetTable: React.FC<PersonnelTableProps> = ({ personalId, currentPersonnel }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isEditingTimesheet, setIsEditingTimesheet] = useState(false);
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500); // Debounce search query with 500ms delay
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const dispatch = useDispatch();
    const userData = getUserData();
     const [confirmationProps, setConfirmationProps] = useState({
            message: '',
            onConfirm: () => { },
            onCancel: () => { },
        });
        const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [loading, setLoading] = useState<null | "excel" | "pdf">(null);

    const { data: data, isLoading, isError, error, refetch } = useFetchTimesheet(debouncedSearchQuery, currentPage, itemsPerPage, personalId);
    const { data: schedular } = useFetchSchedular("", 1, 20, personalId);
    const { deleteTimesheetData, loading: timesheetLoader } = useDeleteTimesheet();
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const totalPages = data ? Math.ceil(data.totalItems / itemsPerPage) : 1;

    const columns: ColumnDef<ITimesheetTable>[] = [
        {
            accessorKey: 'TimeSheetDate',
            header: 'Date',
            cell: ({ getValue }) => {
                const dateStr = getValue() as string;
                return moment(dateStr).format('MM-DD-YYYY');
            },
        },
        {
            accessorKey: 'DistrictID',
            header: 'District',
        },
        {
            accessorKey: 'SiteID',
            header: 'Site',
        },
        {
            accessorKey: 'TimeIn',
            header: 'Time In',
            cell: ({ getValue }) => {
                const timeStr = getValue() as string;
                return timeStr ? moment(timeStr, 'HH:mm:ss').format('HH:mm') : ''; // Show formatted time or nothing
            },
        },
        {
            accessorKey: 'TimeOut',
            header: 'Time Out',
            cell: ({ getValue }) => {
                const timeStr = getValue() as string;
                return timeStr ? moment(timeStr, 'HH:mm:ss').format('HH:mm') : ''; // Show formatted time or nothing
            },
        },
        {
            id: 'Status',
            header: 'Status',
            cell: ({ row }) => {
                return row?.original.Status == "Absent" ? 'Absent' : 'Present';
            },
        },
        // {
        //     accessorKey: 'lunchIn',
        //     header: 'Lunch In',
        // },
        // {
        //     accessorKey: 'lunchOut',
        //     header: 'Lunch Out',
        // },
        {
            accessorKey: 'AdditionalStart',
            header: 'Additional Start',
            cell: ({ getValue }) => {
                const timeStr = getValue() as string;
                return timeStr ? moment(timeStr, 'HH:mm:ss').format('HH:mm') : ''; // Format time or show nothing
            },
        },
        {
            accessorKey: 'AdditionalStop',
            header: 'Additional Stop',
            cell: ({ getValue }) => {
                const timeStr = getValue() as string;
                return timeStr ? moment(timeStr, 'HH:mm:ss').format('HH:mm') : ''; // Format time or show nothing
            },
        },
        {
            id: 'actions',
            header: 'ACTION',
            cell: ({ row }) => {
                const isAbsentWithReason = row.original.Status === 'Absent' && row.original.ReasonID;
                return (
                    <ActionButtons
                        id={row.original.personnelID}
                        // onEdit={() => handleEditTimesheet(row.original.TimesheetID)}
                        onEdit={isAbsentWithReason ? () => { } : () => handleEditTimesheet(row.original.TimesheetID)}
                        // onDelete={() => { deleteTimesheetData(row.original.TimesheetID, refetch); setDeletingId(row.original.TimesheetID) }}
                        onDelete={isAbsentWithReason ? () => { } : () => 
                            showDeleteConfirmation(row.original.TimesheetID)
                            }
                        loader={timesheetLoader && deletingId === row.original.TimesheetID}
                        disableEdit={isAbsentWithReason}
                        disableDelete={isAbsentWithReason}
                    // schedular={true}
                    // onTimeSchedular={()=> handleTimeSchedular()}

                    />
                );
            },
        }
    ]

    const showDeleteConfirmation = (rowId: any) => {
        setConfirmationProps({
            message: 'Are you sure you want to delete Timesheet?',
            onConfirm: async () => {
                deleteTimesheetData(rowId, refetch);
                setDeletingId(rowId);
               setConfirmationOpen(false);
            },
            onCancel: () => {
                setConfirmationOpen(false);
            },
        });
        setConfirmationOpen(true);
    };
    const handleTimeSchedular = () => {
        dispatch(openModal({
            modalType: 'PERSONAL-TIMESHEET-SCHEDULE-MODAL' as ModalType,
            modalProps: {
                initialData: {},
            }
        }));
    }
    const navigate = useNavigate();

    const handleNewTimesheet = () => {
        // setCallback((formData: any) => handleSubmitAssignment(formData));
        dispatch(openModal({
            modalType: 'PERSONAL-TIMESHEET-MODAL' as ModalType,
            modalProps: {
                initialData: {},
                // isEditing,
                personalId,
                refetch,
            }
        }));
    };
    const handleTimesheetForm = () => {
        dispatch(openModal({
            modalType: 'TIMESHEET-FORM-MODAL' as ModalType,
            modalProps: {
                timeSheetData: [],
                personalId,
                currentPersonnel: currentPersonnel,
                refetch,
            }
        }));
    };
    const handleEditTimesheet = async (timesheetID: number) => {
        // if(timesheetID){
        const timesheetData = await getTimesheetFormData(timesheetID);
        // }
        setIsEditingTimesheet(true);
        dispatch(openModal({
            modalType: 'PERSONAL-TIMESHEET-MODAL' as ModalType,
            modalProps: {
                initialData: timesheetData?.data,
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

    const handleExportToExcel = async (data: any, currentPersonnel: any) => {
        try {
            setLoading("excel");
            let workbookBuffer;
            let fileName = '';

            fileName = 'Timesheet_Excel.xlsx';
            // workbookBuffer = await TimesheetExcel(data, currentPersonnel);

            if (workbookBuffer) {
                const blob = new Blob([workbookBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                saveAs(blob, fileName);
            }
        } catch (error) {
            console.error('Error downloading Excel:', error);
            toast.error('Failed to download Excel file.');
        } finally {
            setLoading(null);
        }
    };

    const handleExportToPDF = async (timesheetData: any, currentPersonnel: any) => {
        try {
            setLoading("pdf");
            // Validate data before processing
            if (!timesheetData || !timesheetData.data) {
                toast.error('No timesheet data available to export.');
                return;
            }

            try {
                // await TimesheetPDF(timesheetData.data, currentPersonnel);

                // Generate PDF buffer
                // const pdfBuffers = await TimesheetPDF(timesheetData.data, currentPersonnel);

                // if (!pdfBuffers) {
                //     throw new Error('Failed to generate PDF buffer');
                // }

                // pdfBuffers.forEach((buffer, index) => {
                //     const blob = new Blob([buffer], { type: 'application/pdf' });
                //     const url = URL.createObjectURL(blob);
                //     const link = document.createElement('a');
                //     link.href = url;
                //     link.download = `Timesheet-${index + 1}.pdf`;
                //     document.body.appendChild(link);
                //     link.click();
                //     document.body.removeChild(link);
                //     URL.revokeObjectURL(url);
                // });
            } catch (error) {
                // Handle specific error cases
                // toast.dismiss(loadingToastId);
                console.error('PDF generation error:', error);
                toast.error(error instanceof Error ? error.message : 'Failed to generate PDF file.');
            }

        } catch (error) {
            // Handle any unexpected errors
            console.error('Unexpected error during PDF export:', error);
            toast.error('An unexpected error occurred while exporting the PDF.');
        } finally {
            setLoading(null);
        }
    }
    console.log('data?.data', data?.data);

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
                                    className="col-12 d-flex align-items-center flex-xl-nowrap flex-lg-wrap-reverse flex-md-wrap-reverse flex-wrap-reverse gap-3">
                                    <div
                                        className="d-flex w-100 align-items-center TimeSheet justify-content-start gap-3">

                                        {/* <Search
                                        searchQuery={searchQuery}
                                        handleSearchChange={handleSearchChange}
                                        setSearchQuery={setSearchQuery}
                                    />

                                    <Pagination
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        totalPages={totalPages}
                                    /> */}
                                    </div>
                                    {/* <button className="btn btn-primary d-flex align-items-center gap-2"  disabled={schedular?.data.length === 0}  onClick={() => handleTimesheetForm()}> */}
                                    <button className="btn btn-primary d-flex align-items-center gap-2" disabled={schedular?.data.length === 0} onClick={() => handleTimesheetForm()}>
                                        TimeSheet Form
                                    </button>
                                    {/* <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => handleExportToPDF(data, currentPersonnel)}>
                                        {loading === "pdf" ? (
                                            <span className="btnloader loader"></span>
                                        ) : (
                                            <span>Generate PDF</span>
                                        )}
                                    </button>
                                    <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => handleExportToExcel(data, currentPersonnel)}>
                                        {loading === "excel" ? (
                                            <span className="btnloader loader"></span>
                                        ) : (
                                            <span>
                                                Generate Excel
                                            </span>
                                        )}
                                    </button> */}
                                    {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1" &&
                                        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => handleNewTimesheet()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ flex: "0 0 auto" }}
                                                fill="none" >
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
                                        <div className="pageTableInner TimeShetTable personalTab">
                                            <Table data={data?.data || []} columns={columns} ></Table>
                                            {/* <TimesheetForm timeSheetData={data} currentPersonnel={currentPersonnel} ></TimesheetForm> */}
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
                    title="Delete Timesheet"
            />
        </>
    )

}
export default TimeSheetTable