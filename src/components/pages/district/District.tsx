import React, { useState } from 'react'
import { Table } from '../../common/table/Table';
import { useFetchDistricts } from '../../../hooks/district/useFetchDistricts';
import { useCreateDistrictForm } from '../../../hooks/district/useCreateDistrict';
// import { columns } from './DistrictTable';
import { useDebounce } from 'use-debounce';
import DistrictForm from './DistrictForm';
import { ColumnDef } from '@tanstack/react-table';
import ActionButtons from './../../common/table/ActionButtons';
import { DistrictTableType } from '../../../types/district-type';
import { getDistricDataById } from '../../../apis/districtsApi';
import { useDeleteDistrict } from '../../../hooks/district/useDeleteDistrict'
import Search from '../../common/Search';
import Pagination from '../../common/table/Pagination';
import MobilePagination from '../../common/table/MobilePagination';
import { getUserData } from "../../../utils/utils";
import ConfirmationModal from '../../modals/ConfirmationModal';
const District = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500); // Debounce search query with 500ms delay
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const userData = getUserData();
    const [currentStep, setCurrentStep] = useState(1);
    const [confirmationProps, setConfirmationProps] = useState({
        message: '',
        onConfirm: () => { },
        onCancel: () => { },
    });
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false)
    const { data: districts, isLoading, isError, error, refetch } = useFetchDistricts(debouncedSearchQuery, currentPage, itemsPerPage);
    const { formData, setFormData, handleChange, handleSubmit, resetForm, errors, loading } = useCreateDistrictForm(refetch, isEditing, setIsEditing, setCurrentStep);

    const { deleteDistrictData, loading: deleteLoader } = useDeleteDistrict();
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const totalPages = districts ? Math.ceil(districts.totalItems / itemsPerPage) : 1;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
        setIsEditing(false);
        resetForm();
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const handleNextStep = () => {
        setCurrentStep(prevStep => prevStep + 1);
    };

    const handlePrevStep = () => {
        setCurrentStep(prevStep => prevStep - 1);
        setIsEditing(false);
        resetForm();
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
        setIsEditing(false);
        resetForm();
    };
    const handleLastPage = () => {
        setCurrentPage(totalPages);
        setIsEditing(false);
        resetForm();
    };

    const columns: ColumnDef<DistrictTableType>[] = [
        {
            accessorKey: 'distNum',
            header: 'Number',
        },
        {
            accessorKey: 'distNam',
            header: 'Name',
        },
        {
            id: 'actions',
            header: 'Action',
            cell: ({ row }) => (
                <ActionButtons
                    id={row.original.districtId}  // Pass the primary key
                    onEdit={() => getDistricDataById(row.original.districtId).then(res => { setFormData(res); handleNextStep(); setIsEditing(true) })}
                    onDelete={() => showDeleteConfirmation(row.original.districtId)}
                    loader={deleteLoader && deletingId === row.original.districtId}
                />
            ),
        },
    ];

    const showDeleteConfirmation = (rowId: any) => {
        setConfirmationProps({
            message: 'Are you sure you want to delete District?',
            onConfirm: async () => {
                deleteDistrictData(rowId, refetch);
                setDeletingId(rowId);
               setConfirmationOpen(false);
            },
            onCancel: () => {
                setConfirmationOpen(false);
            },
        });
        setConfirmationOpen(true);
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>{error?.message}</p>;

    return (
        <>
            {currentStep === 1 && (
                <>
                    <div className="seachStrip pb-lg-4 pb-md-3 pb-3">
                        <div className="row g-4 flex-lg-row flex-md-row flex-sm-row flex-column">
                            <div className="col-12 d-flex align-items-center justify-content-between gap-2">
                                <div
                                    className="d-flex align-items-center justify-content-between w-100 gap-lg-5 gap-md-4 gap-4">
                                    <div className='DistrictpageSubTitle'>
                                        <h2 className='m-0'>Districts</h2>
                                    </div>
                                    {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" && userData.role !== "Scope.StudentService_PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1AND2" &&
                                        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => {
                                            setCurrentStep(2);
                                            setIsEditing(false);
                                        }}>
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
                            <div className="col-12 d-flex align-items-center justify-content-between gap-2">
                                {/*  */}
                                <div
                                    className="d-flex align-items-center justify-content-between w-100 gap-lg-5 gap-md-4 gap-4">
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

                    <div className="paginationDiv mb-0">
                        <div className="row g-4 flex-lg-column flex-md-column flex-column-reverse">

                            <div className="col-12">
                                <div className="pageTable pt-3">
                                    <div className="pageTableInner tableInner">
                                        <Table data={districts?.data || []} columns={columns} ></Table>
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
                </>
            )}
            {currentStep === 2 && (
                <>
                    <div className="seachStrip pb-lg-4 pb-md-3 pb-3">
                        <div className="row g-4">
                            <div
                                className="col-12 d-flex align-items-lg-center align-items-md-center align-items-sm-center align-items-start justify-content-between gap-2 flex-lg-row flex-md-row flex-sm-row flex-column">
                                <div className='DistrictpageSubTitle'>
                                    <h2 className='m-0 text-nowrap'>New Districts</h2>
                                </div>
                                {/* <h3 className="text-nowrap formTitle m-0">New District</h3> */}
                                <div
                                    className="d-lg-flex d-md-flex d-sm-flex d-none align-items-center justify-content-lg-end justify-content-md-end justify-content-sm-end justify-content-start w-100 gap-lg-4 gap-md-3 gap-3">

                                    {!isEditing && (
                                        <>
                                            <button className="btn btn-transparent" onClick={handlePrevStep}>Previous</button>
                                            {/* <button className="btn btn-outline" onClick={handlePrevStep}>Previous</button> */}
                                        </>
                                    )}
                                    {isEditing && (
                                        <>
                                            <button className="btn btn-transparent" onClick={handlePrevStep}>Cancel</button>
                                        </>
                                    )}
                                    {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" && userData.role !== "Scope.StudentService_PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1AND2" &&
                                        <button className="btn btn-primary" onClick={handleSubmit}> {loading ? (
                                            <span className="btnloader loader"></span>
                                        ) : (
                                            <span>{isEditing ? 'Edit' : 'Submit'}</span>
                                        )}</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-start pt-lg-0 pt-md-0 pt-0">
                        <div className="col-lg-6 col-md-8 col-sm-12 col-12">
                            <nav className="formTabs mb-2">
                                <div className="nav nav-tabs align-items-center justify-content-start gap-lg-3 gap-md-3 gap-3 border-0"
                                    id="nav-tab" role="tablist">
                                    <button className="nav-link active" id="nav-basicinfo-tab" data-bs-toggle="tab"
                                        data-bs-target="#nav-basicinfo" type="button" role="tab"
                                        aria-controls="nav-basicinfo" aria-selected="true">Basic Information</button>
                                    <span className="Bseprator"></span>
                                    <button className="nav-link" id="nav-notes-tab" data-bs-toggle="tab"
                                        data-bs-target="#nav-notes" type="button" role="tab" aria-controls="nav-notes"
                                        aria-selected="false">Notes</button>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <div className="paginationDiv mb-0">
                        <div className="row justify-content-center">
                            <div className="col-12 px-0">
                                <DistrictForm formData={formData} handleChange={handleChange} errors={errors} />
                                <div
                                    className="d-lg-none px-3 flex-lg-nowrap flex-md-nowrap flex-sm-nowrap flex-wrap d-md-none d-sm-none d-flex mt-lg-0 mt-md-0 mt-sm-0 mt-4 align-items-center justify-content-lg-end justify-content-md-end justify-content-sm-end justify-content-start w-100 gap-lg-4 gap-md-3 gap-3">


                                    {isEditing && (
                                        <>
                                            <button className="btn btn-transparent" onClick={handlePrevStep}>Cancel</button>
                                        </>
                                    )}
                                    {!isEditing && (
                                        <>
                                            <button className="btn btn-transparent" onClick={handlePrevStep}>Discard</button>
                                            <button className="btn btn-outline" onClick={handlePrevStep}>Previous</button>
                                        </>
                                    )}

                                    {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" && userData.role !== "Scope.StudentService_PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1AND2" &&
                                        <button className="btn btn-primary" onClick={handleSubmit}> {loading ? (
                                            <span className="btnloader loader"></span>
                                        ) : (
                                            <span>{isEditing ? 'Edit' : 'Next'}</span>
                                        )}</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <DistrictTable fetchData={fetchData} /> */}
                </>
            )}
             <ConfirmationModal
                    isOpen={confirmationOpen}
                    message={confirmationProps.message}
                    onConfirm={confirmationProps.onConfirm}
                    onCancel={confirmationProps.onCancel}
                    title="Delete District"
            />
        </>
    )
}

export default District