import React, { useState } from 'react'
// import SiteForm from './site-form/SiteForm'
import ActionButtons from '../../common/table/ActionButtons';
import { IWorkshop, IWorkshopTable } from '../../../interface/Workshop';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../common/table/Table';
import { useFetchWorkshop } from '../../../hooks/workshop/useFetchWorkshop';
import { useDeleteWorkshop } from '../../../hooks/workshop/useDeleteWorkshop';
import { useDebounce } from 'use-debounce';
import Pagination from '../../common/table/Pagination';
import Search from '../../common/Search';
import { getWorkshopDataById } from '../../../apis/workshopApi';
import MobilePagination from '../../common/table/MobilePagination';
import moment from 'moment';
import { getUserData } from "../../../utils/utils";
import ConfirmationModal from '../../modals/ConfirmationModal';
interface WorkshopTableProps {
    onEditWorkshop: (workshop: IWorkshop) => void;
    onCreateNewWorkshop: () => void;
}

const WorkshopTable: React.FC<WorkshopTableProps> = ({ onEditWorkshop, onCreateNewWorkshop }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500); // Debounce search query with 500ms delay
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [confirmationProps, setConfirmationProps] = useState({
                message: '',
                onConfirm: () => { },
                onCancel: () => { },
            });
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const { data: workshop, isLoading, isError, error, refetch } = useFetchWorkshop(debouncedSearchQuery, currentPage, itemsPerPage);
    const { deleteWorkshopData, loading: workshopLoader } = useDeleteWorkshop();
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const totalPages = workshop ? Math.ceil(workshop.totalItems / itemsPerPage) : 1;
    const userData = getUserData();

    const columns: ColumnDef<IWorkshopTable>[] = [
        {
            accessorKey: 'date',
            header: 'DATE',
            cell: ({ row }) => {
                const date = row.original.date;
                return date ? moment(date).format('MM-DD-YYYY') : ''; // Format date or show empty if not available
            }
        },
        {
            accessorKey: 'workshopName',
            header: 'WORKSHOP',
        },
        {
            accessorKey: 'topicNames',
            header: 'TOPICS',
        },
        {
            accessorKey: 'topicCount',
            header: '#TOPICS',
        },
        {
            accessorKey: 'memberCount',
            header: '#MEMBERS',
        },
        {
            id: 'actions',
            header: 'ACTION',
            cell: ({ row }) => (
                <ActionButtons
                    id={row.original.workshopID}  // Pass the primary key
                    onEdit={() => updateWorkshop(row.original.workshopID)}
                    onDelete={() => showDeleteConfirmation(row.original.workshopID)}
                    loader={workshopLoader && deletingId === row.original.workshopID}
                />
            ),
        },
    ];

    const showDeleteConfirmation = (rowId: any) => {
        setConfirmationProps({
            message: 'Are you sure you want to delete Workshop?',
            onConfirm: async () => {
                deleteWorkshopData(rowId, refetch);
                setDeletingId(rowId);
               setConfirmationOpen(false);
            },
            onCancel: () => {
                setConfirmationOpen(false);
            },
        });
        setConfirmationOpen(true);
    };


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const updateWorkshop = async (id: number) => {
        const workshop = await getWorkshopDataById(id)
        if (!workshop) {
            return;
        }
        onEditWorkshop(workshop)
    }

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>{error.message}</p>;

    return (
        <>

            <div className="seachStrip pb-lg-4 pb-md-3 pb-3">
                <div className="row g-4 flex-lg-row flex-md-row flex-sm-row flex-column">
                    <div className="col-12 d-flex align-items-center flex-lg-nowrap flex-md-nowrap flex-sm-nowrap flex-wrap justify-content-between gap-lg-3 gap-md-3 gap-sm-3 gap-4">
                        <div className='DistrictpageSubTitle'>
                            <h2 className='d-flex m-0 align-items-center text-nowrap gap-3'>
                                <b>Workshop</b>
                            </h2>
                        </div>
                        {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" && userData.role !== "Scope.StudentService_PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1AND2" &&
                            <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => onCreateNewWorkshop()}>
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

                    <div className="col-12 d-flex align-items-center justify-content-end gap-2">
                        <div
                            className="d-flex w-100 flex-lg-nowrap flex-md-nowrap flex-wrap align-items-center justify-content-between gap-3">

                            <div className="sitesDetails">
                                <ul
                                    className="tableInfo flex-lg-row flex-md-row flex-sm-row flex-column d-flex justify-content-around align-items-lg-center align-items-md-center align-items-sm-center align-items-start gap-2">
                                    <li className="d-flex align-items-center gap-2">
                                        <span>Active</span>
                                        <span>:</span>
                                        <div className="totalCount bg-none shadow-none">
                                            {(workshop && workshop?.data)
                                                ?
                                                (workshop?.totalItems - workshop.data.filter(x => !x.closed).length)
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
                                            {workshop?.totalItems || 0}
                                        </div>
                                    </li>
                                    <li className="SiteSeprator d-lg-flex d-md-flex d-sm-flex d-none">

                                    </li>
                                    <li className="d-flex align-items-center gap-2">
                                        <span>Terminated</span>
                                        <span>:</span>
                                        <div className="totalCount bg-none shadow-none">
                                            {(workshop && workshop?.data)
                                                ?
                                                (workshop.data.filter(x => !x.closed).length)
                                                : 0
                                            }
                                        </div>
                                    </li>
                                </ul>
                            </div>

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
                </div>
            </div>

            <div className="paginationDiv h-100 pt-3 mb-lg-0 mb-md-0 mb-0">
                <div className="row g-4 flex-lg-column flex-md-column flex-column-reverse h-100">
                    <div className="col-12 h-100">
                        <div className="pageTable h-100">
                            <div className="pageTableInner personalTab">
                                <Table data={workshop?.data || []} columns={columns} ></Table>
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
                    title="Delete Workshop"
            />
        </>
    )
}

export default WorkshopTable