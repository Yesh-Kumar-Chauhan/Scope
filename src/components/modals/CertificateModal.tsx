import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useModalCallback } from '../../contexts/ModalCallbackContext';
import { fetchLookup, createTimeSheetForm, updateTimeSheetForm, getLookUpPositions, getSitesByType } from '../../apis/personnelApi';
import { getSiteDataByDistrictId } from '../../apis/sitesApi';
import { ISchedularTable, ICertificateForm } from '../../interface/Personnel';
import { fetchSchoolList } from '../../apis/schoolApi'
import { useCertificateForm } from '../../hooks/personnel/certificate/useCertificateForm'
import { ISchedularTimesheet } from '../../interface/scheduleTimesheet';
import { getCertificateTypeData } from '../../apis/personnelApi';
import { getUserData } from "../../utils/utils";

const CertificateModal: React.FC<{
    initialData?: ICertificateForm;
    onClose: () => void;
    isEditingTimesheet: boolean;
    setIsEditingTimesheet: React.Dispatch<React.SetStateAction<boolean>>;
    personalId: number;
    timesheetID: number;
    refetch: any;
    schedular: ISchedularTable

}>
    = ({ initialData = {} as ICertificateForm, onClose, isEditingTimesheet, setIsEditingTimesheet, personalId, timesheetID, refetch, schedular }) => {

        const [sites, setSites] = useState<any>([]);
        const [certificateType, setCertificateType] = useState<any>([]);
        const userData = getUserData();

        const {
            certificateFormData,
            setCertificateFormData,
            handleChange,
            handleSubmit,
            errors,
            setErrors,
            loading,
            setDistrictSite,
            districtSite
        } = useCertificateForm(initialData, setIsEditingTimesheet, isEditingTimesheet, timesheetID, onClose, refetch, personalId);

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
                setCertificateFormData(initialData);
            }
        }, [initialData]);

        useEffect(() => {
            if (isEditingTimesheet) {
                setIsEditingTimesheet(true);
            }
        }, [isEditingTimesheet]);

        useEffect(() => {
            const fetchCertificateTypeData = async () => {
                try {
                    const certificateTypeDataResponse = await getCertificateTypeData();
                    setCertificateType(certificateTypeDataResponse?.data)

                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchCertificateTypeData();
        }, []);

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
                                    <h3 className="text-nowrap formTitle m-0">{isEditingTimesheet ? 'Edit CERTIFICATE' : 'CERTIFICATE'}</h3>
                                    <hr className="w-100" />
                                    <div className="editForm" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose} style={{ cursor: 'pointer' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                            <path d="M19 5.5L5 19.5M19 19.5L5 5.5" stroke="black" stroke-width="2" stroke-linecap="round"></path>
                                        </svg>
                                    </div>
                                </div>
                                <form className="DistrictForm">
                                    <div className="mb-3 row g-lg-3 g-md-3 g-3">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="mb-0">
                                                <label className="form-label mb-2">Certificate :</label>
                                                <select
                                                    className="form-select"
                                                    name="certificateTypeID"
                                                    value={certificateFormData.certificateTypeID}
                                                    onChange={(e) => { handleChange(e); }}
                                                // disabled={!districtSite.siteData || districtSite.siteData.length === 0}
                                                >
                                                    <option value=""> Select Certificate</option>
                                                    {certificateType.map((certificate: any) => (
                                                        <option key={certificate.certificateTypeID} value={certificate.certificateTypeID}>
                                                            {certificate.certificateTypeName}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors?.certificateTypeID && (
                                                    <div className="text-danger">
                                                        {errors?.certificateTypeID?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-lg-4 col-md-4 col-sm-6 col-12 d-flex align-items-end">
                                            <div className="d-flex checked align-items-center gap-2">
                                                <div className="inputDesign position-relative">
                                                    <input
                                                        type="checkbox"
                                                        id="certificatePermanent"
                                                        name="certificatePermanent"
                                                        checked={certificateFormData.certificatePermanent}
                                                        onChange={handleChange}
                                                    />
                                                    {errors?.certificatePermanent && (
                                                        <div className="text-danger">
                                                            {errors?.certificatePermanent?._errors[0]}
                                                        </div>
                                                    )}
                                                    <div className="checked">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                            <path d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                    <div className="Unchecked">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                            <path d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <label className="form-label m-0" style={{ fontWeight: certificateFormData.certificatePermanent ? 'bold' : 'normal' }}>Permanent</label>
                                            </div>
                                        </div>

                                        <div className="col-lg-4 col-md-4 col-sm-6 col-12 d-flex align-items-end">
                                            <div className="d-flex checked align-items-center gap-2">
                                                <div className="inputDesign position-relative">
                                                    <input
                                                        type="checkbox"
                                                        id="certificateProfessional"
                                                        name="certificateProfessional"
                                                        checked={certificateFormData.certificateProfessional}
                                                        onChange={handleChange}
                                                    />
                                                    {errors?.certificateProfessional && (
                                                        <div className="text-danger">
                                                            {errors?.certificateProfessional?._errors[0]}
                                                        </div>
                                                    )}
                                                    <div className="checked">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                            <path d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                    <div className="Unchecked">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                            <path d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <label className="form-label m-0" style={{ fontWeight: certificateFormData.certificateProfessional ? 'bold' : 'normal' }}>Professional</label>
                                            </div>
                                        </div>

                                        <div className="col-lg-4 col-md-4 col-sm-4 col-12 d-flex align-items-end">
                                            <div className="d-flex checked align-items-center gap-2">
                                                <div className="inputDesign position-relative">
                                                    <input
                                                        type="checkbox"
                                                        id="certificateCQ"
                                                        name="certificateCQ"
                                                        checked={certificateFormData.certificateCQ}
                                                        onChange={handleChange}
                                                    />
                                                    {errors?.certificateCQ && (
                                                        <div className="text-danger">
                                                            {errors?.certificateCQ?._errors[0]}
                                                        </div>
                                                    )}
                                                    <div className="checked">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                            <path d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                    <div className="Unchecked">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                            <path d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <label className="form-label m-0" style={{ fontWeight: certificateFormData.certificateCQ ? 'bold' : 'normal' }}>CQ</label>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                            <div className="d-flex checked align-items-center gap-2">
                                                <div className="inputDesign position-relative">
                                                    <input
                                                        type="checkbox"
                                                        id="initial"
                                                        name="initial"
                                                        checked={certificateFormData.initial}
                                                        onChange={handleChange}
                                                    />
                                                    {errors?.initial && (
                                                        <div className="text-danger">
                                                            {errors?.initial?._errors[0]}
                                                        </div>
                                                    )}
                                                    <div className="checked">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                            <path d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                    <div className="Unchecked">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                            <path d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <label className="form-label m-0" style={{ fontWeight: certificateFormData.initial ? 'bold' : 'normal' }}>Initial</label>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                            <div className="d-flex checked align-items-center gap-2">
                                                <div className="inputDesign position-relative">
                                                    <input
                                                        type="checkbox"
                                                        id="provisional"
                                                        name="provisional"
                                                        checked={certificateFormData.provisional}
                                                        onChange={handleChange}
                                                    />
                                                    {errors?.provisional && (
                                                        <div className="text-danger">
                                                            {errors?.provisional?._errors[0]}
                                                        </div>
                                                    )}
                                                    <div className="checked">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                            <path d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                    <div className="Unchecked">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                            <path d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <label className="form-label m-0" style={{ fontWeight: certificateFormData.provisional ? 'bold' : 'normal' }}>Provisional</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <label className="form-label mb-2">Initial Expiration Date :</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="initialExpiration"
                                                    name="initialExpiration"
                                                    value={formatDate(certificateFormData.initialExpiration)}
                                                    onChange={(e) => {
                                                        handleChange(e)
                                                    }}
                                                />
                                                {errors?.initialExpiration && (
                                                    <div className="text-danger">
                                                        {errors?.initialExpiration?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <label className="form-label mb-2">Provisional Expiration Date :</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="provisionalExpiration"
                                                    name="provisionalExpiration"
                                                    value={formatDate(certificateFormData.provisionalExpiration)}
                                                    onChange={(e) => {
                                                        handleChange(e)
                                                    }}
                                                />
                                                {errors?.provisionalExpiration && (
                                                    <div className="text-danger">
                                                        {errors?.provisionalExpiration?._errors[0]}
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

export default CertificateModal;
