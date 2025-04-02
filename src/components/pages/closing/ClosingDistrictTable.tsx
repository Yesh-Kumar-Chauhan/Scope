import React, { useState } from 'react'
import { ISite, ISiteTable } from '../../../interface/Sites';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../common/table/Table';
import { useDebounce } from 'use-debounce';
import Pagination from '../../common/table/Pagination';
import Search from '../../common/Search';
import { useFetchDistricts } from '../../../hooks/district/useFetchDistricts';
import { DistrictTableType } from '../../../types/district-type';
import MobilePagination from '../../common/table/MobilePagination';

interface SiteTableProps {
  onCreateNewClosing: any;
}

const ClosingDistrictTable: React.FC<SiteTableProps> = ({ onCreateNewClosing }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500); // Debounce search query with 500ms delay
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: districts, isLoading, isError, error, refetch } = useFetchDistricts(debouncedSearchQuery, currentPage, itemsPerPage);
  const totalPages = districts ? Math.ceil(districts.totalItems / itemsPerPage) : 1;


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
      header: 'ACTION',
      cell: ({ row }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onClick={() => onCreateNewClosing(row.original.districtId, row.original.distNam)} style={{ cursor: 'pointer' }}>
          <path d="M9.49994 8.54195H15.5M15.5 8.54195V14.542M15.5 8.54195L8.99994 15.042M18 21.6004L5.9999 21.6004C4.01168 21.6004 2.3999 19.9886 2.3999 18.0004L2.3999 6.00039C2.3999 4.01217 4.01168 2.40039 5.9999 2.40039L18 2.40039C19.9882 2.40039 21.6 4.01217 21.6 6.00039V18.0004C21.6 19.9886 19.9882 21.6004 18 21.6004Z" stroke="#219EBC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      ),
    },
  ];


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

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
                <h2 className='d-flex m-0 align-items-center text-nowrap gap-3'>
                  <b>Closing</b></h2>
              </div>
            </div>
          </div>
          <div
            className="col-12 d-flex align-items-center flex-xl-nowrap flex-lg-wrap flex-md-wrap flex-wrap gap-3">
            <div
              className="d-flex w-100 flex-lg-nowrap flex-md-wrap flex-wrap align-items-center justify-content-between gap-3">
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
              <div className="pageTableInner personalTab">
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
  )
}

export default ClosingDistrictTable