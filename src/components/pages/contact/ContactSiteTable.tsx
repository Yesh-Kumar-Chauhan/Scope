import React, { useState } from 'react'
import { ISiteTable } from '../../../interface/Sites';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../common/table/Table';
import { useFetchSites } from '../../../hooks/site/useFetchSites';
import { useDebounce } from 'use-debounce';
import Pagination from '../../common/table/Pagination';
import Search from '../../common/Search';
import MobilePagination from '../../common/table/MobilePagination';

interface SiteTableProps {
  onCreateNewSite: any;
}

const ContactSiteTable: React.FC<SiteTableProps> = ({ onCreateNewSite }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: sites, isLoading, isError, error, refetch } = useFetchSites(debouncedSearchQuery, currentPage, itemsPerPage);
  const totalPages = sites ? Math.ceil(sites.totalItems / itemsPerPage) : 1;

  const columns: ColumnDef<ISiteTable>[] = [
    {
      accessorKey: 'permit',
      header: 'NUMBER',
    },
    {
      accessorKey: 'siteName',
      header: 'SITE',
    },
    {
      id: 'actions',
      header: 'ACTION',
      cell: ({ row }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ cursor: "pointer" }} onClick={() => onCreateNewSite(row?.original?.siteID, row?.original?.siteName)}>
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
          <div className="col-12 d-flex align-items-center flex-lg-nowrap flex-md-nowrap flex-sm-nowrap flex-wrap justify-content-between gap-lg-3 gap-md-3 gap-sm-3 gap-4">
            <div className='DistrictpageSubTitle'>
              <h2 className='d-flex m-0 align-items-center text-nowrap gap-3'>
                <b>Contacts</b>
              </h2>
            </div>
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

      {/* <div className="seachStrip py-lg-4 py-md-3 py-3">
        <div className="row g-4 flex-lg-row flex-md-row flex-sm-row flex-column-reverse">
          <div
            className="col-12 d-flex align-items-center flex-xl-nowrap flex-lg-wrap flex-md-wrap flex-wrap gap-3">
            <div
              className="d-flex w-100 flex-lg-nowrap flex-md-nowrap flex-wrap align-items-center justify-content-between gap-3">

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
              <div className='d-flex w-100 flex-lg-nowrap flex-md-nowrap flex-wrap align-items-center justify-content-end gap-3'>
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
      </div> */}

      <div className="paginationDiv pt-3 mb-lg-0 mb-md-0 mb-0">
        <div className="row g-4 flex-lg-column flex-md-column flex-column-reverse">
          <div className="col-12">
            <div className="pageTable">
              <div className="pageTableInner personalTab">
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
    </>
  )
}

export default ContactSiteTable