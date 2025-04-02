import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useModalCallback } from '../../contexts/ModalCallbackContext';
import { fetchClosingStatus } from '../../apis/closingApi';
import { contactFormSchema } from '../../schemas/contact';
import { getUserData } from "../../utils/utils";
// Define the props interface including `isEditing`
interface ClosingModalProps {
    initialData?: any;
    onClose: () => void;
    isEditing?: boolean; // Add `isEditing` to props
}

const ContactModal: React.FC<ClosingModalProps> = ({ initialData = {}, onClose, isEditing = false }) => {
    const [formData, setFormData] = useState({
        ...initialData,

    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const { getCallback } = useModalCallback();
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
            contactFormSchema.parse(formData);
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


    const handleSubmit = () => {
        if (isValid()) {
            const onSubmit = getCallback();
            if (onSubmit) {
                onSubmit(formData);
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

        <div className={`modal fade show closingAddModal editAsignment align-items-lg-center overflow-auto align-items-md-center align-items-start justify-content-center`}
            id="Filter" aria-labelledby="FilterLabel" aria-hidden="true">
            <div className="modal-dialog w-100">
                <div className="modal-content p-4">
                    <div className="modal-body p-lg-2 p-md-2 p-0">
                        <div className="formCard mt-0 p-0 border-0">
                            <div className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                                <h3 className="text-nowrap formTitle m-0">{isEditing ? `${'Edit'}` : `${'Basic'}`} Information</h3>
                                <hr className="w-100" />
                                <div className="editForm" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose} style={{ cursor: 'pointer' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                        <path d="M19 5.5L5 19.5M19 19.5L5 5.5" stroke="black" stroke-width="2" stroke-linecap="round"></path>
                                    </svg>
                                </div>
                            </div>
                            <form className="DistrictForm">
                                <div className="mb-3 row g-lg-2 g-md-2 g-2">
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 d-flex flex-column align-items-end border-end pe-lg-3 pe-md-3">
                                        <div className="mb-2 w-100">
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
                                        <div className="mb-2 w-100">
                                            <label className="form-label mb-1">Name :</label>
                                            <input
                                                type="name"
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                            {errors.name && <span className="text-danger">{errors.name}</span>}
                                        </div>
                                        <div className="mb-2 w-100">
                                            <label className="form-label mb-1">Child :</label>
                                            <input
                                                type="child"
                                                className="form-control"
                                                id="child"
                                                name="child"
                                                value={formData.child}
                                                onChange={handleChange}
                                            />
                                            {errors.child && <span className="text-danger">{errors.child}</span>}
                                        </div>
                                        <div className="mb-0 w-100">
                                            <label className="form-label mb-1">Contact :</label>
                                            <input
                                                type="contact"
                                                className="form-control"
                                                id="contact"
                                                name="contact"
                                                // formatDate
                                                value={formData.contact}
                                                onChange={handleChange}
                                            />
                                            {errors.child && <span className="text-danger">{errors.child}</span>}
                                        </div>

                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 d-flex flex-column align-items-start ps-lg-4 ps-md-4 ">
                                        <div className="mb-0 w-100">
                                            <div className="d-flex flex-column align-items-start">
                                                <label className="form-label mb-1">Situation :</label>
                                                <textarea className='w-100' id="notes"
                                                    name="situation"
                                                    value={formData.situation}
                                                    rows={12}
                                                    onChange={handleChange}></textarea>
                                                {errors.situation && <span className="text-danger">{errors.situation}</span>}
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
                                            {isEditing ? 'Save Changes' : 'Submit'}
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

export default ContactModal;
