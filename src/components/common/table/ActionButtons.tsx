import React, { useEffect, useState } from 'react';
import { LoaderType } from './../../../types/types'
import schedule from '../../../assets/images/schedule.png';
import timeSheet from '../../../assets/images/timeSheet.png'
import { getUserData } from "../../../utils/utils";

type ActionButtonsProps = {
    id: number;  // Primary key for the district
    onEdit: () => void;
    onDelete: () => void;
    onTimeSchedular?: () => void;
    isRowEmpty?: boolean;
    loader: boolean
    onNew?: () => void;
    schedular?: boolean;
    disableEdit?: boolean;
    disableDelete?: boolean;
};

const ActionButtons: React.FC<ActionButtonsProps> = ({ id, onEdit, onDelete, isRowEmpty, loader, onNew, schedular, onTimeSchedular, disableEdit, disableDelete }) => {
    const userData = getUserData();

    return (
        <div className="d-flex align-items-center gap-lg-4 gap-md-3 gap-3">
            {isRowEmpty ? (
                <button className="btn btn-white d-flex align-items-center gap-2" onClick={onNew}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M19 11H13V5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5V11H5C4.73478 11 4.48043 11.1054 4.29289 11.2929C4.10536 11.4804 4 11.73478 4 12C4 12.2652 4.10536 12.5196 4.29289 12.7071C4.48043 12.8946 4.73478 13 5 13H11V19C11 19.2652 11.1054 19.5196 11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19V13H19C19.2652 13 19.5196 12.8946 19.7071 12.7071C19.8946 12.5196 20 12.2652 20 12C20 11.7348 19.8946 11.4804 19.7071 11.2929C19.5196 11.1054 19.2652 11 19 11Z" fill="#219EBC" />
                    </svg>
                    New
                </button>
            ) : (
                <>
                    {/* View Button (if you need a view action) */}
                    {/* <a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9.49994 8.54195H15.5M15.5 8.54195V14.542M15.5 8.54195L8.99994 15.042M18 21.6004L5.9999 21.6004C4.01168 21.6004 2.3999 19.9886 2.3999 18.0004L2.3999 6.00039C2.3999 4.01217 4.01168 2.40039 5.9999 2.40039L18 2.40039C19.9882 2.40039 21.6 4.01217 21.6 6.00039V18.0004C21.6 19.9886 19.9882 21.6004 18 21.6004Z" stroke="#219EBC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </a> */}

                    {/* Edit Button */}
                    <a onClick={disableEdit ? (e) => e.preventDefault() : onEdit} style={{
                        cursor: disableEdit ? 'not-allowed' : 'pointer',
                        opacity: disableEdit ? 0.5 : 1
                    }}>

                        {/* {schedular? */}
                        {/* <img src={schedule} alt='' style={{width:'24px',height:'24px'}}/>:  */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M13.8001 19.5514H19.8001M4.2002 19.5514L8.56618 18.6717C8.79796 18.625 9.01077 18.5109 9.17791 18.3437L18.9516 8.56461C19.4202 8.09576 19.4199 7.33577 18.9509 6.86731L16.8805 4.79923C16.4117 4.33097 15.6521 4.33129 15.1837 4.79995L5.40896 14.58C5.24214 14.7469 5.12824 14.9593 5.0815 15.1906L4.2002 19.5514Z" stroke="#242A30" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        {/* } */}
                    </a>
                    {schedular &&
                        <a onClick={onTimeSchedular} style={{ cursor: 'pointer' }}>
                            <img src={timeSheet} alt='' style={{ width: '24px', height: '24px' }} />
                        </a>}



                    {/* Delete Button */}
                    {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" && userData.role !== "Scope.StudentService_PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1AND2" &&
                    <a onClick={disableDelete ? (e) => e.preventDefault() : onDelete} style={{
                        cursor: disableDelete ? 'not-allowed' : 'pointer',
                        opacity: disableDelete ? 0.5 : 1
                    }}>
                        {loader ? (
                            <span className="btnloader loader"></span>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M2.3999 5.3998H21.5999M8.3999 1.7998H15.5999M9.5999 17.3998V10.1998M14.3999 17.3998V10.1998M16.1999 22.1998H7.7999C6.47442 22.1998 5.3999 21.1253 5.3999 19.7998L4.85198 6.64976C4.82358 5.96801 5.3686 5.3998 6.05094 5.3998H17.9489C18.6312 5.3998 19.1762 5.96801 19.1478 6.64976L18.5999 19.7998C18.5999 21.1253 17.5254 22.1998 16.1999 22.1998Z" stroke="#242A30" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        )}
                    </a>
                     }
                </>
            )}
        </div>
    );
};
export default ActionButtons;
