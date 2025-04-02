import React, { useState } from 'react'
import ActionButtons from '../../../common/table/ActionButtons';
import { ICalendar, ISchedularTable } from '../../../../interface/Personnel';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../../common/table/Table';
import { useFetchSchedular } from '../../../../hooks/personnel/schedular/useFetchSchedular';
import { useDebounce } from 'use-debounce';
import Pagination from '../../../common/table/Pagination';
import Search from '../../../common/Search';
import { useDeleteSchedular } from '../../../../hooks/personnel/schedular/useDeleteSchedular'
import { fetchTimesheet, getSchedularData } from '../../../../apis/personnelApi';
import MobilePagination from '../../../common/table/MobilePagination';
import { useDispatch } from 'react-redux';
import { ModalType } from '../../../../types/modal';
import { openModal } from '../../../../store/modalSlice';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import moment from 'moment';
import { debug } from 'console';
import { fetchSchedularTimesheetsByScheduleId, getSchedularTimesheetById } from '../../../../apis/schedularTimesheetApi';
import { ISchedularTimesheet } from '../../../../interface/scheduleTimesheet';
import { getUserData } from "../../../../utils/utils";
interface SchedularTableProps {
    onEditSchedular: (site: ICalendar) => void;
    onCreateNewSchedular: () => void;
    personalId: number;
}

const SchedularTable: React.FC<SchedularTableProps> = ({ onEditSchedular, onCreateNewSchedular, personalId }) => {

    const [schedularData, setSchedularData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const userData = getUserData();
    const [isEditingTimesheet, setIsEditingTimesheet] = useState(false);

    const { data: schedular, isLoading, isError, error, refetch } = useFetchSchedular(debouncedSearchQuery, currentPage, itemsPerPage, personalId);
    const { deleteSchedularData, loading: schedualeLoader } = useDeleteSchedular();
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const totalPages = schedular ? Math.ceil(schedular.totalItems / itemsPerPage) : 1;
    const dispatch = useDispatch();

    const columns: ColumnDef<ISchedularTable>[] = [
        {
            accessorFn: row => row.site?.siteName || 'N/A',
            header: 'SITENAME',
        },
        {
            accessorKey: 'siteType',
            header: 'SITETYPE',
        },
        {
            accessorFn: row => moment(row.date).format('YYYY-MM-DD'), // Format date using moment
            header: 'Date',
        },
        {
            accessorKey: 'timeIn',
            header: 'TimeIn',
        },
        {
            accessorKey: 'timeOut',
            header: 'TimeOut',
        },
        {
            id: 'actions',
            header: 'ACTION',
            cell: ({ row }) => (
                <ActionButtons
                    id={row.original.id}
                    onEdit={() => handleEditSchedular(row.original.id)}
                    onDelete={() => { deleteSchedularData(row.original.id, refetch); setDeletingId(row.original.id) }}
                    loader={schedualeLoader && deletingId === row.original.id}
                    schedular={true}
                    onTimeSchedular={() => handleTimeSchedular(row.original)}
                />
            ),
        },
    ];

    const handleTimeSchedular = async (schedular: ISchedularTable) => {
        const response = await fetchSchedularTimesheetsByScheduleId(schedular.id);
        const timesheet: ISchedularTimesheet = response
        let initialData: ISchedularTimesheet = {
            id: 0,
            siteID: schedular.siteID,
            personID: personalId,
            scheduleId: schedular.id,
            position: schedular.position,
            date: schedular.date || '',
            siteType: schedular.siteType,
        };
        let isEditing = false;
        if (timesheet) {
            initialData = { ...timesheet }
            isEditing = true;
        }
        setIsEditingTimesheet(true);
        dispatch(openModal({
            modalType: 'PERSONAL-TIMESHEET-MODAL' as ModalType,
            modalProps: {
                initialData: initialData,
                schedular,
                personalId,
                isEditingTimesheet: isEditing,
                setIsEditingTimesheet
            }
        }));
    }

    const handleNewSchedular = () => {
        // setCallback((formData: any) => handleSubmitAssignment(formData));
        dispatch(openModal({
            modalType: 'SCHEDULAR-TIMESHEET-MODAL' as ModalType,
            modalProps: {
                initialData: {},
                personalId,
                refetch,
            }
        }));
    };

    const handleEditSchedular = async (schedularId: number) => {
        const SchedularData = await getSchedularData(schedularId);

        dispatch(openModal({
            modalType: 'SCHEDULAR-TIMESHEET-MODAL' as ModalType,
            modalProps: {
                initialData: SchedularData?.data,
                isEditingSchedular: true,
                schedularId,
                personalId,
                refetch,
            }
        }));
    };


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleExportToExcel = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Schedular Data');
        // Define headers
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Employee Name', key: 'employeeName', width: 25 },
            { header: 'Site Type', key: 'siteType', width: 20 },
            { header: 'Position', key: 'position', width: 20 },
            { header: 'Notes', key: 'notes', width: 30 },
            { header: 'Date', key: 'date', width: 15 },
            { header: 'Time In', key: 'timeIn', width: 15 },
            { header: 'Time Out', key: 'timeOut', width: 15 },
            { header: 'Lunch In', key: 'lunchIn', width: 15 },
            { header: 'Lunch Out', key: 'lunchOut', width: 15 },
            { header: 'Additional Start', key: 'additionalStart', width: 20 },
            { header: 'Additional Stop', key: 'additionalStop', width: 20 },
        ];

        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });

        schedular?.data.forEach((schedular) => {
            worksheet.addRow({
                id: schedular?.id,
                employeeName: schedular?.personel?.firstname + ' ' + schedular?.personel?.lastname,
                siteType: schedular?.siteType,
                position: schedular?.position,
                notes: schedular?.notes,
                date: schedular?.date ? moment(schedular?.date).format('YYYY-MM-DD') : '',
                timeIn: schedular?.timeIn,
                timeOut: schedular?.timeOut,
                lunchIn: schedular?.lunchIn,
                lunchOut: schedular?.lunchOut,
                additionalStart: schedular?.additionalStart,
                additionalStop: schedular?.additionalStop,
            });
        });

        // Create and download Excel file
        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'SchedularData.xlsx');
        });
    };

    if (isLoading) return <p>Loading...</p>;
    // if (isError) return <p>{error.message}</p>;

    return (
        <section className="DashboardPage">
            <div className="container-fluid">
                <div className="DashboardRow  row d-flex flex-lg-row flex-md-row flex-sm-column flex-column">
                    <div className="seachStrip py-lg-4 py-md-3 py-3">
                        <div className="row g-4 flex-lg-row flex-md-row flex-sm-row flex-column-reverse">
                            <div
                                className="col-12 d-flex align-items-center flex-xl-nowrap flex-lg-wrap flex-md-wrap flex-wrap gap-3">
                                {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService2" &&
                                    <>
                                        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => handleNewSchedular()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none">
                                                <path
                                                    d="M19 11H13V5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5V11H5C4.73478 11 4.48043 11.1054 4.29289 11.2929C4.10536 11.4804 4 11.7348 4 12C4 12.2652 4.10536 12.5196 4.29289 12.7071C4.48043 12.8946 4.73478 13 5 13H11V19C11 19.2652 11.1054 19.5196 11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19V13H19C19.2652 13 19.5196 12.8946 19.7071 12.7071C19.8946 12.5196 20 12.2652 20 12C20 11.7348 19.8946 11.4804 19.7071 11.2929C19.5196 11.1054 19.2652 11 19 11Z"
                                                    fill="white" />
                                            </svg>
                                            New
                                        </button>
                                        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleExportToExcel}>
                                            {/* {loading ? (
                                        <span className="btnloader loader"></span>
                                    ) : ( */}
                                            <span>Export</span>
                                            {/* )} */}
                                        </button>
                                    </>
                                }
                                <div
                                    className="d-flex w-100 flex-lg-nowrap flex-md-nowrap flex-wrap align-items-center justify-content-between gap-3">

                                    {/* <div className="sitesDetails">
                                        <ul
                                            className="tableInfo flex-lg-row flex-md-row flex-sm-row flex-column d-flex justify-content-around align-items-lg-center align-items-md-center align-items-sm-center align-items-start gap-2">
                                            <li className="d-flex align-items-center gap-2">
                                                <span>Active</span>
                                                <span>:</span>
                                                <div className="totalCount bg-none shadow-none">
                                                    {(sites && sites?.data)
                                                        ?
                                                        (sites?.totalItems - sites.data.filter(x => !x.closed).length)
                                                        : 0
                                                    }
                                                </div>
                                            </li>
                                            <li className="SiteSeprator d-lg-flex d-md-flex d-sm-flex d-none">

                                            </li>
                                            <li className="d-flex align-items-center gap-2">
                                                <span>Total</span>
                                                <span>:</span>
                                                <div className="totalCount bg-none shadow-none">
                                                    {sites?.totalItems || 0}
                                                </div>
                                            </li>
                                            <li className="SiteSeprator d-lg-flex d-md-flex d-sm-flex d-none">

                                            </li>
                                            <li className="d-flex align-items-center gap-2">
                                                <span>Terminated</span>
                                                <span>:</span>
                                                <div className="totalCount bg-none shadow-none">
                                                    {(sites && sites?.data)
                                                        ?
                                                        (sites.data.filter(x => !x.closed).length)
                                                        : 0
                                                    }
                                                </div>
                                            </li>
                                        </ul>
                                    </div> */}

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
                            </div>
                        </div>
                    </div>

                    <div className="paginationDiv pt-3 mb-lg-0 mb-md-3 mb-3">
                        <div className="row g-4 flex-lg-column flex-md-column flex-column-reverse">
                            <div className="col-12">
                                <div className="pageTable">
                                    <div className="pageTableInner">
                                        <Table data={schedular?.data || []} columns={columns} ></Table>
                                    </div>

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
        </section>
    )
}

export default SchedularTable