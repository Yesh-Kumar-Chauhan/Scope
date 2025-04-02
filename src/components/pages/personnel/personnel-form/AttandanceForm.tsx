import React, { useEffect, useState } from 'react'
import ActionButtons from '../../../common/table/ActionButtons';
// import { ISite, ISiteTable } from '../../../interface/Sites';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../../common/table/Table';
import { useFetchTimesheet } from '../../../../hooks/personnel/personnelTimesheet/useFetchTimeSheet';
import { useDeleteAttandance } from '../../../../hooks/personnel/attandance/useDeleteAttandance';
import { useFetchAttandance } from '../../../../hooks/personnel/attandance/useFetchAttandance';
import { useDebounce } from 'use-debounce';
import Pagination from '../../../common/table/Pagination';
import Search from '../../../common/Search';
// import {useDeletePersonnel} from '../../../hooks/personnel/useDeletePersonnel'
import { getTimesheetFormData, deleteTimesheet, getAttendanceFormData } from '../../../../apis/personnelApi';
import { IPersonnel, IAttendanceTable } from '../../../../interface/Personnel';
import { ModalType } from '../../../../types/modal';
import { openModal } from '../../../../store/modalSlice';
import { useDispatch } from 'react-redux';
import { useModalCallback } from '../../../../contexts/ModalCallbackContext';
import MobilePagination from '../../../common/table/MobilePagination';
import moment from 'moment';
import { getUserData } from "../../../../utils/utils";
import ConfirmationModal from '../../../modals/ConfirmationModal';
interface AttandanceTableProps {
    personalId: number
    personnelDataById: any;
    personnelFormData: any;
    handleChange: any;
    handleNext: any;
}
const AttandanceForm: React.FC<AttandanceTableProps> = ({ personalId, personnelDataById, personnelFormData, handleChange, handleNext }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isEditingTimesheet, setIsEditingTimesheet] = useState(false);
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500); // Debounce search query with 500ms delay
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const dispatch = useDispatch();
    const { getCallback, setCallback } = useModalCallback();
    const [viewOldAttendance, setViewOldAttendance] = useState(false)
    const userData = getUserData();
     const [confirmationProps, setConfirmationProps] = useState({
            message: '',
            onConfirm: () => { },
            onCancel: () => { },
        });
        const [confirmationOpen, setConfirmationOpen] = useState(false);

    const { data: data, isLoading, isError, error, refetch } = useFetchAttandance(personalId);
    const { deleteAttendanceData, loading: timesheetLoader } = useDeleteAttandance();
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const totalPages = data ? Math.ceil(data.totalItems / itemsPerPage) : 1;

    const [usedData, setUsedData] = useState({
        before: 0,
        during: 0,
        after: 0
    });

    const [remainingData, setRemainingData] = useState({
        before: 0,
        during: 0,
        after: 0
    });
    const [encodedSiteNumbers, setEncodedSiteNumbers] = useState("");
    // Function to calculate the remaining data
    const calculateRemaining = () => {
        setRemainingData({
            before: (personnelFormData?.allottedb || 0) - usedData.before,
            during: (personnelFormData?.allottedd || 0) - usedData.during,
            after: (personnelFormData?.allotteda || 0) - usedData.after,
        });
    };

    const calculateUsedData = (records: any) => {
        let before = 0;
        let during = 0;
        let after = 0;
        if (Array.isArray(records) && records.length > 0) {
            records.forEach((record: { siteNumber: any; weight: any; }) => {
                if (record.siteNumber === personnelFormData?.sitE_NUM_B) {
                    before += record.weight || 0;
                } else if (record.siteNumber === personnelFormData?.sitE_NUM_D) {
                    during += record.weight || 0;
                } else if (record.siteNumber === personnelFormData?.sitE_NUM_A) {
                    after += record.weight || 0;
                }
            });
        } else {
            console.error('No valid attendance records found or records is not an array');
        }
        setUsedData({ before, during, after });
        calculateRemaining();
    };

    useEffect(() => {
        if (data?.data) {
            calculateUsedData(data?.data);
        }
    }, [personnelFormData, data]);

    useEffect(() => {
        if (data?.data) {
            const siteNumbersArray: number[] = data?.data.map((item: any) => item.siteNumber);
            const uniqueSiteNumbers: string = Array.from(new Set(siteNumbersArray)).join(",");
            setEncodedSiteNumbers(uniqueSiteNumbers)
        }
    }, [data]);

    const columns: ColumnDef<IAttendanceTable>[] = [
        {
            accessorKey: 'date',
            header: 'date',
            cell: ({ row }) => {
                const date = row.original.date;
                // return date ? moment(date).format('YYYY-MM-DD') : '';
                return date ? moment(date).format('MM-DD-YYYY') : '';
            }
        },
        {
            accessorKey: 'paid',
            header: 'paid',
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={row.original.paid}
                    readOnly
                />
            ),
        },
        {
            accessorKey: 'fraction',
            header: 'absentName',
        },
        {
            accessorKey: 'charged',
            header: 'charged',
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={row.original.charged}
                    readOnly
                />
            ),
        },
        {
            accessorKey: 'siteName',
            header: 'siteName',
        },
        {
            accessorKey: 'reasonName',
            header: 'reasonName',
        },
        {
            accessorKey: 'reasonID',
            header: 'reasonID',
        },

        {
            id: 'actions',
            header: 'ACTION',
            cell: ({ row }) => (
                <ActionButtons
                    id={row.original.personnelID}
                    onEdit={() => handleEditAttendance(row.original.attendanceID)}
                    onDelete={() => showDeleteConfirmation(row.original.attendanceID)}
                    loader={timesheetLoader && deletingId === row.original.attendanceID}

                />
            ),
        },
    ];

    const showDeleteConfirmation = (rowId: any) => {
        setConfirmationProps({
            message: 'Are you sure you want to delete Attendance?',
            onConfirm: async () => {
                deleteAttendanceData(rowId, refetch);
                setDeletingId(rowId);
               setConfirmationOpen(false);
            },
            onCancel: () => {
                setConfirmationOpen(false);
            },
        });
        setConfirmationOpen(true);
    };


    const handleNewTimesheet = () => {
        // setCallback((formData: any) => handleSubmitAssignment(formData));
        dispatch(openModal({
            modalType: 'ATTANDANCE-MODAL' as ModalType,
            modalProps: {
                initialData: {},
                // isEditing,
                personalId,
                refetch,
                encodedSiteNumbers,
            }
        }));
    };

    const handleEditAttendance = async (attendanceID: number) => {
        const attendanceData = await getAttendanceFormData(attendanceID);
        setIsEditingTimesheet(true);
        dispatch(openModal({
            modalType: 'ATTANDANCE-MODAL' as ModalType,
            modalProps: {
                initialData: attendanceData?.data,
                isEditingTimesheet: true,
                setIsEditingTimesheet,
                attendanceID,
                personalId,
                refetch,
                encodedSiteNumbers,
            }
        }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const toggleViewAttendance = () => {
        setViewOldAttendance(prev => !prev); // Toggle the value of viewOldAttendance
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>{error.message}</p>;
    return (
        <>
            <section className="DashboardPage text-nowrap">
                <div className="container-fluid">
                    <div className="DashboardRow  row d-flex flex-lg-row flex-md-row flex-sm-column flex-column">
                        <div className="seachStrip py-lg-4 py-md-3 py-3">
                            <div className="row g-4 d-flex align-items-center justify-content-between flex-xl-nowrap flex-lg-wrap flex-md-wrap flex-wrap gap-3">
                                <h4 className='m-0 w-auto'><b>Attandance</b></h4>
                                {/*<div
                                    className="col-12 d-flex align-items-center flex-xl-nowrap flex-lg-wrap flex-md-wrap flex-wrap gap-3">
                                    <div
                                        className="d-flex w-100 flex-lg-nowrap flex-md-nowrap flex-wrap align-items-center justify-content-between gap-3">

                                        <Search
                                            searchQuery={searchQuery}
                                            handleSearchChange={handleSearchChange}
                                            setSearchQuery={setSearchQuery}
                                        />

                                        <Pagination
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                            totalPages={totalPages}
                                        />

                                    </div>
                            </div>
                                    */}
                                {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" && userData.role !== "Scope.StudentService_PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1AND2" &&
                                    <button className="btn btn-primary w-auto m-0 d-flex align-items-center gap-2" onClick={() => handleNewTimesheet()}>
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
                            <div className='w-100 row mt-4 justify-content-between m-0'>
                                <div className='col-lg-6 col-md-12 col-sm-12 col-12 d-flex align-items-end pb-2'>
                                    <div className='d-flex align-items-lg-end justify-content-start gap-3 flex-lg-row flex-md-row flex-sm-row flex-column align-items-md-end align-items-sm-end align-items-start attendance'>
                                        <div>
                                            <h6 className='m-0'>Before</h6>
                                        </div>
                                        <div className='d-flex align-items-center gap-3 pb-1'>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-4 col-md-12 col-sm-12 col-12'>
                                    <div className='d-flex align-items-lg-end justify-content-lg-end gap-3 flex-lg-row flex-md-row flex-sm-row flex-column align-items-md-end align-items-sm-end align-items-start attendance'>
                                        <div className='row g-3 DistrictForm w-100  '>
                                            <div className='col-lg-8 d-flex align-items-center gap-3 col-md-8 col-sm-8 col-12'>
                                                <div className="mb-0 w-100">
                                                    <label className="form-label mb-2 d-lg-flex d-md-flex d-sm-flex d-none">Alloted</label>
                                                    <input
                                                        type="number"
                                                        className="w-100 form-control"
                                                        id='allottedb'
                                                        name='allottedb'
                                                        placeholder='Alloted'
                                                        value={personnelFormData?.allottedb}
                                                        onChange={(e) => { handleChange(e) }}
                                                    />
                                                </div>
                                                <div className='mt-lg-4 mt-md-4 md-sm-4 mt-0'>
                                                    -
                                                </div>
                                                <div className="mb-0 w-100">
                                                    <label className="form-label mb-2 d-lg-flex d-md-flex d-sm-flex d-none">Used</label>
                                                    <input
                                                        type="text"
                                                        className="w-100 form-control"
                                                        placeholder='Used'
                                                        value={usedData.before}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-lg-4 col-md-4 col-sm-4 col-12 d-flex align-items-center gap-3'>
                                                <div className='mt-4 d-lg-flex d-md-flex d-sm-flex d-none'>
                                                    =
                                                </div>
                                                <div className="mb-0 w-100">
                                                    <label className="form-label mb-2 d-lg-flex d-md-flex d-sm-flex d-none">Remain</label>
                                                    <input
                                                        type="text"
                                                        className="w-100 form-control"
                                                        placeholder='Remain'
                                                        value={remainingData.before}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-100 row mt-2 justify-content-between m-0'>
                                <div className='col-lg-6 col-md-12 col-sm-12 col-12 d-flex align-items-end pb-2'>
                                    <div className='d-flex align-items-lg-end justify-content-start gap-3 flex-lg-row flex-md-row flex-sm-row flex-column align-items-md-end align-items-sm-end align-items-start attendance'>
                                        <div>
                                            <h6 className='m-0'>During</h6>
                                        </div>
                                        <div className='d-flex align-items-center gap-3 pb-1'>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-4 col-md-12 col-sm-12 col-12'>
                                    <div className='d-flex align-items-lg-end justify-content-lg-end gap-3 flex-lg-row flex-md-row flex-sm-row flex-column align-items-md-end align-items-sm-end align-items-start attendance'>
                                        <div className='row g-3 DistrictForm w-100  '>
                                            <div className='col-lg-8 d-flex align-items-center gap-3 col-md-8 col-sm-8 col-12'>
                                                <div className="mb-0 w-100">
                                                    <input
                                                        type="number"
                                                        className="w-100 form-control"
                                                        id='allottedd'
                                                        name='allottedd'
                                                        placeholder='Alloted'
                                                        value={personnelFormData?.allottedd}
                                                        onChange={(e) => { handleChange(e) }}
                                                    />
                                                </div>
                                                <div className='mt-0'>
                                                    -
                                                </div>
                                                <div className="mb-0 w-100">
                                                    <input
                                                        type="text"
                                                        className="w-100 form-control"
                                                        placeholder='Used'
                                                        value={usedData.during}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-lg-4 col-md-4 col-sm-4 col-12 d-flex align-items-center gap-3'>
                                                <div className='d-lg-flex d-md-flex d-sm-flex d-none'>
                                                    =
                                                </div>
                                                <div className="mb-0 w-100">
                                                    <input
                                                        type="text"
                                                        className="w-100 form-control"
                                                        placeholder='Remain'
                                                        value={remainingData.during}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-100 row mt-2 justify-content-between m-0'>
                                <div className='col-lg-6 col-md-12 col-sm-12 col-12 d-flex align-items-end pb-2'>
                                    <div className='d-flex align-items-lg-end justify-content-start gap-3 flex-lg-row flex-md-row flex-sm-row flex-column align-items-md-end align-items-sm-end align-items-start attendance'>
                                        <div>
                                            <h6 className='m-0'>After</h6>
                                        </div>
                                        <div className='d-flex align-items-center gap-3 pb-1'>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-4 col-md-12 col-sm-12 col-12'>
                                    <div className='d-flex align-items-lg-end justify-content-lg-end gap-3 flex-lg-row flex-md-row flex-sm-row flex-column align-items-md-end align-items-sm-end align-items-start attendance'>
                                        <div className='row g-3 DistrictForm w-100  '>
                                            <div className='col-lg-8 d-flex align-items-center gap-3 col-md-8 col-sm-8 col-12'>
                                                <div className="mb-0 w-100">
                                                    <input
                                                        type="number"
                                                        className="w-100 form-control"
                                                        id='allotteda'
                                                        name='allotteda'
                                                        placeholder='Alloted'
                                                        value={personnelFormData?.allotteda}
                                                        onChange={(e) => { handleChange(e) }}
                                                    />
                                                </div>
                                                <div className='mt-0'>
                                                    -
                                                </div>
                                                <div className="mb-0 w-100">
                                                    <input
                                                        type="text"
                                                        className="w-100 form-control"
                                                        placeholder='Used'
                                                        value={usedData.after}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-lg-4 col-md-4 col-sm-4 col-12 d-flex align-items-center gap-3'>
                                                <div className='d-lg-flex d-md-flex d-sm-flex d-none'>
                                                    =
                                                </div>
                                                <div className="mb-0 w-100">
                                                    <input
                                                        type="text"
                                                        className="w-100 form-control"
                                                        placeholder='Remain'
                                                        value={remainingData.after}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                                <button className="btn btn-primary d-block ps-3 pe-4" onClick={toggleViewAttendance}>
                                    {viewOldAttendance ? 'Hide Old Attendance' : 'View Old Attendance'}
                                </button>
                            </div>
                        </div>

                        {viewOldAttendance ? (
                            <>
                                <form className="DistrictForm mt-4">
                                    <div className="row g-3">
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="mb-0 w-100">
                                                <label>Dates Used</label>
                                                <input
                                                    type="text"
                                                    className="w-100 form-control"
                                                    id="datesused"
                                                    name="datesused"
                                                    value={personnelFormData?.datesused}
                                                    onChange={(e) => { handleChange(e) }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="mb-0 w-100">
                                                <label>Absences</label>
                                                <input
                                                    type="text"
                                                    className="w-100 form-control"
                                                    id="absences"
                                                    name="absences"
                                                    value={personnelFormData?.absences}
                                                    onChange={(e) => { handleChange(e) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </>
                        ) : (
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
                            </div>

                        )}

                    </div>

                </div>
            </section >
            <ConfirmationModal
                    isOpen={confirmationOpen}
                    message={confirmationProps.message}
                    onConfirm={confirmationProps.onConfirm}
                    onCancel={confirmationProps.onCancel}
                    title="Delete Attendance"
            />
        </>
    )

}
export default AttandanceForm