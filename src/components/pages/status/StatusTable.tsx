import React, { useState } from 'react'
import { ISiteTable } from '../../../interface/Sites';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../common/table/Table';
import { useDebounce } from 'use-debounce';
import Pagination from '../../common/table/Pagination';
import Search from '../../common/Search';
import { useFetchStatus } from '../../../hooks/status/useFetchStatus';
import ActionButtons from '../../common/table/ActionButtons';
import { createStatusForm, getStatusDataById, updateStatusForm } from '../../../apis/statusApi';
import { useDeleteStatus } from '../../../hooks/status/useDeleteStatus'
import { openModal } from '../../../store/modalSlice';
import { ModalType } from '../../../types/modal';
import { useModalCallback } from '../../../contexts/ModalCallbackContext';
import { useDispatch } from 'react-redux';
import MobilePagination from '../../common/table/MobilePagination';
import { getUserData } from "../../../utils/utils";
import ConfirmationModal from '../../modals/ConfirmationModal';

const StatusTable: React.FC<any> = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { getCallback, setCallback } = useModalCallback();
  const itemsPerPage = 10;
  const userData = getUserData();
  const [confirmationProps, setConfirmationProps] = useState({
            message: '',
            onConfirm: () => { },
            onCancel: () => { },
        });
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const { data: status, isLoading, isError, error, refetch } = useFetchStatus(debouncedSearchQuery, currentPage, itemsPerPage);
  const { deleteStatus, loading: deleteLoader } = useDeleteStatus();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const totalPages = status ? Math.ceil(status.totalItems / itemsPerPage) : 1;

  const columns: ColumnDef<ISiteTable>[] = [
    {
      accessorKey: 'statusID',
      header: 'STATUS ID',
    },
    {
      accessorKey: 'statusName',
      header: 'STATUS NAME',
    },
    {
      id: 'actions',
      header: 'ACTION',
      cell: ({ row }) => (
        <ActionButtons
          id={row.original.statusID}  // Pass the primary key
          onEdit={() => updateStatusModal(row.original.statusID)}
          onDelete={() => showDeleteConfirmation(row.original.statusID)}
          loader={deleteLoader && deletingId === row.original.statusID}
        />
      ),
    },
  ];

  const showDeleteConfirmation = (rowId: any) => {
    setConfirmationProps({
        message: 'Are you sure you want to delete Status?',
        onConfirm: async () => {
            deleteStatus(rowId, refetch);
            setDeletingId(rowId);
            setConfirmationOpen(false);
        },
        onCancel: () => {
            setConfirmationOpen(false);
        },
    });
    setConfirmationOpen(true);
};

  const updateStatusModal = async (id: number) => {
    const statusData = await getStatusDataById(id);
    if (!statusData) {
      return;
    }
    setCallback((statusData: any) => handleEditStatus(statusData));
    dispatch(openModal({
      modalType: 'STATUS-MODAL' as ModalType,
      modalProps: {
        initialData: statusData,
        isEditing: true,
      }
    }));
  }
  const handleEditStatus = async (statusData: any) => {
    try {
      const response = await updateStatusForm(statusData,);
      if (response) {
        refetch();
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };


  const handleNewAssignment = () => {
    setCallback((formData: any) => handleSubmitAssignment(formData));
    dispatch(openModal({
      modalType: 'STATUS-MODAL' as ModalType,
      modalProps: {
        initialData: {},
        isEditing: false,
      }
    }));
  };

  const handleSubmitAssignment = async (formData: any) => {
    try {
      const response = await createStatusForm(formData);
      if (response) {
        refetch();
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <>

      <div className="seachStrip pb-lg-4 pb-md-3 pb-3">
        <div className="row g-4 flex-lg-row flex-md-row flex-sm-row flex-column">
          <div className="col-12 d-flex align-items-center flex-lg-nowrap flex-md-nowrap flex-sm-nowrap flex-wrap justify-content-between gap-lg-3 gap-md-3 gap-sm-3 gap-4">
            <div className='DistrictpageSubTitle'>
              <h2 className='d-flex m-0 align-items-center text-nowrap gap-3'>
                <b>Status</b>
              </h2>
            </div>
            {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" && userData.role !== "Scope.StudentService_PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1AND2" &&
              <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleNewAssignment} style={{ cursor: 'pointer' }} >
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

      <div className="paginationDiv h-100 pt-3 mb-lg-0 mb-md-3 mb-3">
        <div className="row g-4 flex-lg-column flex-md-column flex-column-reverse h-100">
          <div className="col-12 h-100">
            <div className="pageTable h-100">
              <div className="pageTableInner personalTab">
                <Table data={status?.data || []} columns={columns} ></Table>
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
                    title="Delete Status"
            />
    </>
  )
}

export default StatusTable

