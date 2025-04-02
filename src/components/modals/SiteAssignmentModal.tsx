import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useModalCallback } from '../../contexts/ModalCallbackContext';
import { siteAssignmentSchema } from '../../schemas/site';
import { z } from 'zod';
import { getUserData } from "../../utils/utils";
const SiteAssignmentModal: React.FC<{ initialData?: any; onClose: () => void }>
    = ({ initialData = {}, onClose }) => {
        const [formData, setFormData] = useState(initialData);
        const [errors, setErrors] = useState<{ [key: string]: string }>({});
        const { getCallback } = useModalCallback();
        const userData = getUserData();

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData((prevData: any) => ({
                ...prevData,
                [name]: value,
            }));
        };

        const isValid = () => {
            try {
                // This will throw an error if validation fails
                siteAssignmentSchema.parse(formData);
                return true; // Validation passed
            } catch (error) {
                if (error instanceof z.ZodError) {
                    // Handle the errors
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
            // setFormData({})
            onClose()
        }
        return (
            <div className={`modal fade show editAsignment align-items-xl-center align-items-lg-start overflow-auto align-items-md-center align-items-start justify-content-center`}
                id="Filter" aria-labelledby="FilterLabel" aria-hidden="true">
                <div className="modal-dialog w-100">
                    <div className="modal-content p-4">
                        <div className="modal-body p-lg-2 p-md-2 p-0">
                            <div className="formCard mt-0 p-0 border-0">
                                <div className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-4 mb-md-3 mb-3">
                                    <h3 className="text-nowrap formTitle m-0">{initialData.description}</h3>
                                    <hr className="w-100" />
                                    <div className="editForm" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                            <path d="M19 5.5L5 19.5M19 19.5L5 5.5" stroke="black" stroke-width="2" stroke-linecap="round"></path>
                                        </svg>
                                    </div>
                                </div>
                                <form className="DistrictForm">
                                    <div className="mb-3"> <label className="form-label mb-2">Name :</label>
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
                                    <div className="mb-3 row g-lg-3 g-md-3 g-3">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <label className="form-label mb-2">Cell :</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="cell"
                                                    name="cell"
                                                    value={formData.cell}
                                                    onChange={handleChange}
                                                />
                                                {errors.cell && <span className="text-danger">{errors.cell}</span>}
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <label className="form-label mb-2">EXT :</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="ext"
                                                    name="ext"
                                                    value={formData.ext}
                                                    onChange={handleChange}
                                                />
                                                {errors.ext && <span className="text-danger">{errors.ext}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3"> <label className="form-label mb-2">Fax :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fax"
                                            name="fax"
                                            value={formData.fax}
                                            onChange={handleChange}
                                        />
                                        {errors.fax && <span className="text-danger">{errors.fax}</span>}
                                    </div>
                                    <div className="mb-3"> <label className="form-label mb-2">Email :</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && <span className="text-danger">{errors.email}</span>}
                                    </div>
                                    <div className="mb-3"> <label className="form-label mb-2">Forms :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="forms"
                                            name="forms"
                                            value={formData.forms}
                                            onChange={handleChange}
                                        />
                                        {errors.forms && <span className="text-danger">{errors.forms}</span>}
                                    </div>
                                    <div className="mb-3"> <label className="form-label mb-2">Others :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="others"
                                            name="others"
                                            value={formData.others}
                                            onChange={handleChange}
                                        />
                                        {errors.others && <span className="text-danger">{errors.others}</span>}
                                    </div>
                                    <div className="d-flex align-items-center justify-content-end gap-lg-4 gap-md-3 gap-3">

                                        <button type='button' onClick={handleClose} className="btn btn-transparent ps-3 pe-4">
                                            Delete
                                        </button>
                                        {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" && userData.role !== "Scope.StudentService_PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1AND2" &&
                                            <button type='button' onClick={handleSubmit} className="btn btn-primary ps-3 pe-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="me-2" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M13.8001 19.5514H19.8001M4.2002 19.5514L8.56618 18.6717C8.79796 18.625 9.01077 18.5109 9.17791 18.3437L18.9516 8.56461C19.4202 8.09576 19.4199 7.33577 18.9509 6.86731L16.8805 4.79923C16.4117 4.33097 15.6521 4.33129 15.1837 4.79995L5.40896 14.58C5.24214 14.7469 5.12824 14.9593 5.0815 15.1906L4.2002 19.5514Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                                Submit
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

export default SiteAssignmentModal;
