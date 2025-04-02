import React, { useState } from 'react'
import SiteForm from './site-form/SiteForm'
import ActionButtons from '../../common/table/ActionButtons';
import { ISite, ISiteTable } from '../../../interface/Sites';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../common/table/Table';
import { useFetchSites } from '../../../hooks/site/useFetchSites';
import { useDebounce } from 'use-debounce';
import Pagination from '../../common/table/Pagination';
import Search from '../../common/Search';
import { useDeleteSite } from '../../../hooks/site/useDeleteSite'
import { getSiteDataById } from '../../../apis/sitesApi';
import MobilePagination from '../../common/table/MobilePagination';
import { getUserData } from "../../../utils/utils";
import ConfirmationModal from '../../modals/ConfirmationModal';
interface SiteTableProps {
    setShowSiteForm: React.Dispatch<React.SetStateAction<boolean>>;
    onEditSite: (site: ISite) => void;
    onCreateNewSite: () => void;
}

const SiteTable: React.FC<SiteTableProps> = ({ setShowSiteForm, onEditSite, onCreateNewSite }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500); // Debounce search query with 500ms delay
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const userData = getUserData();
    const [confirmationProps, setConfirmationProps] = useState({
        message: '',
        onConfirm: () => { },
        onCancel: () => { },
    });
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const { data: sites, isLoading, isError, error, refetch } = useFetchSites(debouncedSearchQuery, currentPage, itemsPerPage);
    const { deleteSiteData, loading: siteLoader } = useDeleteSite();
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const totalPages = sites ? Math.ceil(sites.totalItems / itemsPerPage) : 1;

    const columns: ColumnDef<ISiteTable>[] = [
        {
            accessorKey: 'permit',
            header: 'PERMIT',
        },
        {
            accessorKey: 'siteName',
            header: 'NAME',
        },
        {
            id: 'actions',
            header: 'ACTION',
            cell: ({ row }) => (
                <ActionButtons
                    id={row.original.siteID}  // Pass the primary key
                    onEdit={() => updateSite(row.original.siteID)}
                    onDelete={() => showDeleteConfirmation(row.original.siteID)}
                    loader={siteLoader && deletingId === row.original.siteID}
                />
            ),
        },
    ];

    const showDeleteConfirmation = (rowId: any) => {
        setConfirmationProps({
            message: 'Are you sure you want to delete Site?',
            onConfirm: async () => {
                deleteSiteData(rowId, refetch);
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

    const updateSite = async (id: number) => {
        const site = await getSiteDataById(id)
        if (!site) {
            return;
        }
        onEditSite(site)
    }

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>{error.message}</p>;

    return (
        <>
            <div className="seachStrip pb-lg-4 pb-md-3 pb-3">
                <div className="row g-4 flex-lg-row flex-md-row flex-sm-row flex-column">
                    <div className="col-12 d-flex align-items-center justify-content-between gap-2">
                        <div
                            className="d-flex align-items-center justify-content-between w-100 gap-lg-5 gap-md-4 gap-4">
                            <div className='DistrictpageSubTitle'>
                                <h2 className='m-0'>Sites</h2>
                            </div>
                            {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" && userData.role !== "Scope.StudentService_PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1AND2" &&
                                <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => onCreateNewSite()}>
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
                    <div
                        className="col-12 d-flex align-items-center flex-xl-nowrap flex-lg-wrap flex-md-wrap flex-wrap gap-3">
                        <div
                            className="d-flex w-100 flex-lg-nowrap flex-md-wrap flex-wrap align-items-center justify-content-between gap-3">

                            <div className="sitesDetails">
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

            <div className="paginationDiv pt-3 mb-lg-0 mb-md-3 mb-3">
                <div className="row g-4 flex-lg-column flex-md-column flex-column-reverse">
                    <div className="col-12">
                        <div className="pageTable">
                            <div className="pageTableInner">
                                <Table data={sites?.data || []} columns={columns} ></Table>
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
                    title="Delete Site"
            />
            {/* </div> */}
        </>
    )
}

export default SiteTable