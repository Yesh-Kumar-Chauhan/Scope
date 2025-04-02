import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useModalCallback } from '../../contexts/ModalCallbackContext';
import { visitFormSchema } from '../../schemas/visits';
import { getUserData } from "../../utils/utils";

interface VisitModalProps {
    initialData?: any;
    onClose: () => void;
    isEditing?: boolean;
}

const VisitModal: React.FC<VisitModalProps> = ({ initialData = {}, onClose, isEditing = false }) => {
    const [formData, setFormData] = useState({
        ...initialData,
        offical: initialData.offical || false,
        staffing: initialData.staffing || false,
        problem: initialData.problem || false,
        training: initialData.training || false,
        quality: initialData.quality || false,
        other: initialData.other || false,
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const { getCallback } = useModalCallback();
    const [loading, setLoading] = useState(false);
    const userData = getUserData();
    const handleChange = (e: any) => {
        const { name, type, checked, value } = e.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const isValid = () => {
        try {
            visitFormSchema.parse(formData);
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.errors.reduce((acc: any, curr) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {});
                setErrors(fieldErrors);
            }
            return false;
        }
    };

    const handleSubmit = async () => {
        if (isValid()) {
            const onSubmit = getCallback();
            if (onSubmit) {
                try {
                    setLoading(true);
                    await onSubmit(formData);
                } catch (error) {
                    console.error('Error submitting form:', error);
                } finally {
                    setLoading(false);
                }
            }
            onClose();
        }
    };

    const handleClose = () => {
        onClose();
    };

    const formatDate = (dateString: any) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    return (
        <div className={`modal fade show visitAddModal editAsignment align-items-lg-start overflow-auto align-items-md-start align-items-start justify-content-center`}
            id="Filter" aria-labelledby="FilterLabel" aria-hidden="true">
            <div className="modal-dialog w-100">
                <div className="modal-content p-4">
                    <div className="modal-body p-lg-2 p-md-2 p-0">
                        <div className="formCard mt-0 p-0 border-0">
                            <div className="FormTitleWithdivider position-relative d-flex align-items-center gap-3 mb-lg-3 mb-md-3 mb-3">
                                <h3 className="text-nowrap formTitle m-0">{isEditing ? 'Edit' : 'Basic'} Information</h3>
                                <hr className="w-100" />
                                <div className="editForm" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose} style={{ cursor: 'pointer' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                        <path d="M19 5.5L5 19.5M19 19.5L5 5.5" stroke="black" strokeWidth="2" strokeLinecap="round"></path>
                                    </svg>
                                </div>
                            </div>
                            <form className="DistrictForm">
                                <div className="mb-4 row g-2">
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 d-flex flex-column align-items-end border-end pe-lg-3 pe-md-3">
                                        <div className="w-100 mb-2">
                                            <label className="form-label mb-1">Date :</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="date"
                                                name="date"
                                                value={formatDate(formData.date)}
                                                onChange={handleChange}
                                            />
                                            {errors.date && <span className="text-danger">{errors.date}</span>}
                                        </div>
                                        <div className="w-100 mb-2">
                                            <label className="form-label mb-1">Name :</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                            {errors.name && <span className="text-danger">{errors.name}</span>}
                                        </div>
                                        <div className="w-100 mb-2">
                                            <label className="form-label mb-1">Time In :</label>
                                            <input
                                                type="time"
                                                className="form-control"
                                                id="timein"
                                                name="timein"
                                                value={formData.timein}
                                                onChange={handleChange}
                                            />
                                            {errors.timein && <span className="text-danger">{errors.timein}</span>}
                                        </div>
                                        <div className="w-100 mb-2">
                                            <label className="form-label mb-1">Time Out :</label>
                                            <input
                                                type="time"
                                                className="form-control"
                                                id="timeout"
                                                name="timeout"
                                                value={formData.timeout}
                                                onChange={handleChange}
                                            />
                                            {errors.timeout && <span className="text-danger">{errors.timeout}</span>}
                                        </div>
                                        <div className="w-100">
                                            <label className="form-label mb-1">Notes :</label>
                                            <textarea
                                                className="w-100"
                                                id="notes"
                                                name="notes"
                                                rows={4}
                                                value={formData.notes}
                                                onChange={handleChange}
                                            ></textarea>
                                            {errors.notes && <span className="text-danger">{errors.notes}</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 d-flex flex-column align-items-start ps-lg-4 ps-md-4 ">
                                        <div className="mb-0">
                                            <div className="d-flex flex-column align-items-start gap-2">
                                                {[
                                                    { name: 'offical', label: 'Official' },
                                                    { name: 'staffing', label: 'Staffing' },
                                                    { name: 'problem', label: 'Problem' },
                                                    { name: 'training', label: 'Training' },
                                                    { name: 'quality', label: 'Quality' },
                                                    { name: 'other', label: 'Other' },
                                                ].map(({ name, label }) => (
                                                    <div key={name} className="d-flex checked align-items-center gap-2">
                                                        <div className="inputDesign position-relative">
                                                            <input
                                                                type="checkbox"
                                                                id={name}
                                                                name={name}
                                                                checked={formData[name]}
                                                                onChange={handleChange}
                                                            />
                                                            {errors?.[name] && (
                                                                <div className="text-danger">
                                                                    {errors[name]}
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
                                                        <label className="form-label m-0" style={{ fontWeight: formData[name] ? 'bold' : 'normal' }}>{label}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center justify-content-end gap-lg-4 gap-md-3 gap-3">
                                    <button type='button' onClick={handleClose} className="btn btn-transparent ps-3 pe-4">
                                        Cancel
                                    </button>

                                    {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" && userData.role !== "Scope.StudentService_PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1AND2" &&
                                        <button type='button' onClick={handleSubmit} className="btn btn-primary ps-3 pe-4">
                                            {loading ? (
                                                <span className="btnloader loader"></span>
                                            ) : (
                                                <span>{isEditing ? 'Edit' : 'Submit'}</span>
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

export default VisitModal;