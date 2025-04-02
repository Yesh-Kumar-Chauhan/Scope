import React from 'react'

interface PaginationProps {
    currentPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, setCurrentPage, totalPages }) => {

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    return (
        <div className="pagination d-lg-flex d-md-flex d-sm-flex d-none">
            <ul className="d-flex align-items-center gap-2">
                <li>
                    <button
                        className={currentPage === 1 ? "inactive" : "active"}
                        onClick={handleFirstPage}
                        disabled={currentPage === 1} // Disable if on the first page
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none">
                            <path
                                d="M10.8 16.8002L6 12.0002L10.8 7.20019M18 16.8002L13.2 12.0002L18 7.2002"
                                stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </li>
                <li>
                    <button
                        className={currentPage === 1 ? "inactive" : "active"}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1} // Disable if on the first page
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M14.4001 16.7998L9.6001 11.9998L14.4001 7.19981" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </li>
                <li>
                    <div className="tableCounter">
                        {`${currentPage} of ${totalPages}`}
                    </div>
                </li>
                <li>
                    <button
                        className={currentPage === totalPages ? "inactive" : "active"}
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages} // Disable if on the last page
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9.5999 7.2002L14.3999 12.0002L9.5999 16.8002" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </li>

                <li>
                    <button
                        className={currentPage === totalPages ? "inactive" : "active"}
                        onClick={handleLastPage}
                        disabled={currentPage === totalPages} // Disable if on the first page
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none">
                            <path
                                d="M13.2 7.1998L18 11.9998L13.2 16.7998M6 7.19981L10.8 11.9998L6 16.7998"
                                stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Pagination