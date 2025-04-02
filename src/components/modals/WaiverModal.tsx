import React, { useState, useEffect } from 'react';
import { useModalCallback } from '../../contexts/ModalCallbackContext';
import { IWaiverForm } from '../../interface/Personnel';
import { useWaiverForm } from '../../hooks/personnel/waiver/useWaiverForm'
import { getUserData } from "../../utils/utils";

const WaiverModal: React.FC<{
    initialData?: IWaiverForm;
    onClose: () => void;
    isEditingTimesheet: boolean;
    setIsEditingTimesheet: React.Dispatch<React.SetStateAction<boolean>>;
    personalId: number;
    timesheetID: number;
    refetch: any;

}>
    = ({ initialData = {} as IWaiverForm, onClose, isEditingTimesheet, setIsEditingTimesheet, personalId, timesheetID, refetch }) => {

        // const [certificateType, setCertificateType] = useState<any>([]);
        const userData = getUserData();
        const {
            waiverFormData,
            setWaiverFormData,
            handleChange,
            handleSubmit,
            errors,
            setErrors,
            loading,
        } = useWaiverForm(initialData, setIsEditingTimesheet, isEditingTimesheet, timesheetID, onClose, refetch, personalId);

        const formatDate = (dateString: any) => {
            if (!dateString) return '';

            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            return `${year}-${month}-${day}`;
        };

        useEffect(() => {
            if (initialData) {
                setWaiverFormData(initialData);
            }
        }, [initialData]);

        useEffect(() => {
            if (isEditingTimesheet) {
                setIsEditingTimesheet(true);
            }
        }, [isEditingTimesheet]);

        // useEffect(() => {
        //     const fetchCertificateTypeData = async () => {
        //         try {
        //             const certificateTypeDataResponse = await getCertificateTypeData();
        //             setCertificateType(certificateTypeDataResponse?.data)

        //         } catch (error) {
        //             console.error("Error fetching data:", error);
        //         }
        //     };
        //     fetchCertificateTypeData();
        // }, []);

        const handleClose = () => {
            onClose()
        }

        return (
            <div className={`modal fade show timesheetModal editAsignment align-items-lg-center overflow-auto align-items-md-start align-items-start justify-content-center`}
                id="Filter" aria-labelledby="FilterLabel" aria-hidden="true">
                <div className="modal-dialog w-100">
                    <div className="modal-content p-4">
                        <div className="modal-body p-lg-2 p-md-2 p-0">
                            <div className="formCard mt-0 p-0 border-0">
                                <div className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-4 mb-md-3 mb-3">
                                    <h3 className="text-nowrap formTitle m-0">{isEditingTimesheet ? 'Edit Waiver' : 'Waiver'}</h3>
                                    <hr className="w-100" />
                                    <div className="editForm" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose} style={{ cursor: 'pointer' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                            <path d="M19 5.5L5 19.5M19 19.5L5 5.5" stroke="black" stroke-width="2" stroke-linecap="round"></path>
                                        </svg>
                                    </div>
                                </div>
                                <form className="DistrictForm">
                                    <div className="mb-3 row g-lg-3 g-md-3 g-3">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <label className="form-label mb-2">Date :</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="sent"
                                                    name="sent"
                                                    value={formatDate(waiverFormData.sent)}
                                                    onChange={(e) => {
                                                        handleChange(e)
                                                    }}
                                                />
                                                {errors?.sent && (
                                                    <div className="text-danger">
                                                        {errors?.sent?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-end gap-lg-4 gap-md-3 gap-3">
                                        <button type='button' onClick={handleClose} className="btn btn-transparent ps-3 pe-4">
                                            Cancel
                                        </button>
                                        {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" && userData.role !== "Scope.StudentService_PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1AND2" &&
                                            <button type='button' onClick={handleSubmit} className="btn btn-primary ps-3 pe-4" style={{ cursor: 'pointer' }}>
                                                {loading ? (
                                                    <span className="btnloader loader"></span>
                                                ) : (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="me-2" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <path d="M13.8001 19.5514H19.8001M4.2002 19.5514L8.56618 18.6717C8.79796 18.625 9.01077 18.5109 9.17791 18.3437L18.9516 8.56461C19.4202 8.09576 19.4199 7.33577 18.9509 6.86731L16.8805 4.79923C16.4117 4.33097 15.6521 4.33129 15.1837 4.79995L5.40896 14.58C5.24214 14.7469 5.12824 14.9593 5.0815 15.1906L4.2002 19.5514Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                        <span>{isEditingTimesheet ? 'Save Changes' : 'Submit'}</span>
                                                    </>
                                                )}
                                            </button>
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

export default WaiverModal;
