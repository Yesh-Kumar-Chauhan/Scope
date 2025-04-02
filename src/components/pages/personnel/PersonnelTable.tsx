import React, { useRef, useState } from 'react'
import ActionButtons from '../../common/table/ActionButtons';
// import { ISite, ISiteTable } from '../../../interface/Sites';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../common/table/Table';
import { useFetchPersonnel } from '../../../hooks/personnel/useFetchPersonnel';
import { useDebounce } from 'use-debounce';
import Pagination from '../../common/table/Pagination';
import Search from '../../common/Search';
import { useDeletePersonnel } from '../../../hooks/personnel/useDeletePersonnel'
import { getPersonnelDataById, importSchedule } from '../../../apis/personnelApi';
import { IPersonnel } from '../../../interface/Personnel';
import MobilePagination from '../../common/table/MobilePagination';
import { toast } from 'react-toastify';
import { ModalType } from '../../../types/modal';
import { openModal } from '../../../store/modalSlice';
import { useDispatch } from 'react-redux';
import { getUserData } from "../../../utils/utils";
import ConfirmationModal from '../../modals/ConfirmationModal';
interface PersonnelTableProps {
    onCreateNewPersonnel: () => void
    onEditPersonnel: (site: IPersonnel) => void;
}
const PersonnelTable: React.FC<PersonnelTableProps> = ({ onCreateNewPersonnel, onEditPersonnel }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500); // Debounce search query with 500ms delay
    const [currentPage, setCurrentPage] = useState(1);
    const userData = getUserData();
    const [confirmationProps, setConfirmationProps] = useState({
        message: '',
        onConfirm: () => { },
        onCancel: () => { },
    });
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const dispatch = useDispatch();

    const itemsPerPage = 10;

    const { data: data, isLoading, isError, error, refetch } = useFetchPersonnel(debouncedSearchQuery, currentPage, itemsPerPage);

    const { deletePersonnelData, loading: personnelLoader } = useDeletePersonnel();
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const totalPages = data ? Math.ceil(data.totalItems / itemsPerPage) : 1;
    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'personalID',
            header: 'NUMBER',
        },
        {
            accessorKey: 'firstname',
            header: 'FIRST NAME',
        },
        {
            accessorKey: 'lastname',
            header: 'LAST NAME',
        },
        {
            id: 'actions',
            header: 'ACTION',
            cell: ({ row }) => (
                <ActionButtons
                    id={row.original.personnelID}
                    onEdit={() => updatePersonnel(row.original.personalID)}
                    onDelete={() => showDeleteConfirmation(row.original.personalID)}
                    loader={personnelLoader && deletingId === row.original.personalID}
                />
            ),
        },
    ];

      const showDeleteConfirmation = (personelId:any) => {
             setConfirmationProps({
                 message: 'Are you sure you want to delete Personnel?',
                 onConfirm: async () => {
                    deletePersonnelData(personelId, refetch);
                    setDeletingId(personelId);
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

    const updatePersonnel = async (id: number) => {
        const personnel = await getPersonnelDataById(id)
        if (!personnel) {
            return;
        }
        onEditPersonnel(personnel)
    }

    const handleImportModal = () => {
        // setCallback((formData: any) => handleSubmitAssignment(formData));
        dispatch(openModal({
            modalType: 'PERSONAL-SCHEDULE-IMPORT-MODAL' as ModalType,
            modalProps: {
                initialData: {},
            }
        }));
    }

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>{error.message}</p>;
    return (
        <>

            <div className="seachStrip pb-lg-4 pb-md-3 pb-3">
                <div className="row g-4 flex-lg-row flex-md-row flex-sm-row flex-column">
                    <div className="col-12 d-flex align-items-center justify-content-between gap-2">
                        <div
                            className="d-flex align-items-center justify-content-between flex-lg-nowrap flex-md-nowrap flex-sm-nowrap flex-wrap w-100 gap-lg-5 gap-md-4 gap-sm-4 gap-3">
                            <div className='DistrictpageSubTitle'>
                                <h2 className='m-0'>Personnel</h2>
                            </div>
                            <div className='d-flex align-items-center justify-content-end gap-lg-4 gap-md-4 gap-4'>
                                {/* {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" && userData.role !== "Scope.StudentService_PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1AND2" &&
                                    <button onClick={handleImportModal} className='btn d-flex align-items-center gap-2 btn-primary'
                                    // disabled={!file || isUploading}
                                    >

                                        <svg viewBox="0 0 24 24" width={'22px'} height={'22px'} fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 4L12 14M12 14L15 11M12 14L9 11" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 20C7.58172 20 4 16.4183 4 12M20 12C20 14.5264 18.8289 16.7792 17 18.2454" stroke="#fff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>

                                        {'Import Schedule'}
                                    </button>
                                }  */}
                                {userData.role !== "Scope.AdminView" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" &&
                                    <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => onCreateNewPersonnel()}>
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
                    <div
                        className="col-12 d-flex align-items-center flex-xl-nowrap flex-lg-wrap flex-md-wrap flex-wrap gap-3">
                        {/* <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => onCreateNewPersonnel()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none">
                                            <path
                                                d="M19 11H13V5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5V11H5C4.73478 11 4.48043 11.1054 4.29289 11.2929C4.10536 11.4804 4 11.7348 4 12C4 12.2652 4.10536 12.5196 4.29289 12.7071C4.48043 12.8946 4.73478 13 5 13H11V19C11 19.2652 11.1054 19.5196 11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19V13H19C19.2652 13 19.5196 12.8946 19.7071 12.7071C19.8946 12.5196 20 12.2652 20 12C20 11.7348 19.8946 11.4804 19.7071 11.2929C19.5196 11.1054 19.2652 11 19 11Z"
                                                fill="white" />
                                        </svg>
                                        New
                                    </button> */}
                        <div
                            className="d-flex w-100 flex-lg-nowrap flex-md-nowrap flex-wrap align-items-center justify-content-between gap-3">

                            <div
                                className="d-flex w-100 flex-lg-nowrap flex-md-wrap flex-wrap align-items-center justify-content-between gap-3">
                                <div className="sitesDetails">
                                    <ul
                                        className="tableInfo flex-lg-row flex-md-row flex-sm-row flex-column d-flex justify-content-around align-items-lg-center align-items-md-center align-items-sm-center align-items-start gap-2">
                                        <li className="d-flex align-items-center gap-2">
                                            <span>Active</span>
                                            <span>:</span>
                                            <div className="totalCount bg-none shadow-none">
                                                {(data && data?.data)
                                                    ?
                                                    (data?.totalItems - data.data.filter(x => !x.closed).length)
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
                                                {data?.totalItems || 0}
                                            </div>
                                        </li>
                                        <li className="SiteSeprator d-lg-flex d-md-flex d-sm-flex d-none">

                                        </li>
                                        <li className="d-flex align-items-center gap-2">
                                            <span>Terminated</span>
                                            <span>:</span>
                                            <div className="totalCount bg-none shadow-none">
                                                {(data && data?.data)
                                                    ?
                                                    (data.data.filter(x => !x.closed).length)
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
            </div>

            <div className="paginationDiv pt-3 mb-lg-0 mb-md-3 mb-3">
                <div className="row g-4 flex-lg-column flex-md-column flex-column-reverse">
                    <div className="col-12">
                        <div className="pageTable">
                            <div className="pageTableInner personalTab">
                                <Table data={data?.data || []} columns={columns} ></Table>
                            </div>
                            {/* <div className="pagination d-lg-none d-md-flex d-flex mt-4 justify-content-end">
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
                                                    8 of 80
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
                                    </div> */}
                            <MobilePagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}
                            />
                        </div>
                    </div>
                </div>
                <ConfirmationModal
                isOpen={confirmationOpen}
                message={confirmationProps.message}
                onConfirm={confirmationProps.onConfirm}
                onCancel={confirmationProps.onCancel}
                title="Delete Personnel"
            />
            </div>
            {/* </div> */}
        </>
    )

}
export default PersonnelTable
