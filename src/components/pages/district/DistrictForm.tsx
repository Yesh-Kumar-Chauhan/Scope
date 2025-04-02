import React from 'react';
import { z } from 'zod';

interface DistrictFormProps {
    formData: any;
    errors: z.ZodIssue[];
    handleChange: (e: any) => void;
}

const DistrictForm: React.FC<DistrictFormProps> = ({ formData, handleChange, errors }) => {
    const formatDate = (dateString: any) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const getErrorMessage = (fieldName: string) => {
        const error = errors.find(error => error.path[0] === fieldName);
        return error ? error.message : '';
    };
    return (
        <>
            <div className="pageTable pt-3">
                <div className="pageTableInner district">
                    <div className="row mx-0 justify-content-center">
                        <div className="col-xl-12 px-0 districtForm col-lg-12 col-md-12 col-sm-12 col-12">
                            {/* <form > */}
                            <>
                                <div className="tab-content" id="nav-tabContent">
                                    <div className="tab-pane fade show active" id="nav-basicinfo"
                                        role="tabpanel" aria-labelledby="nav-basicinfo-tab"
                                        tabIndex={0}>
                                        <div className='row g-3 mx-0'>
                                            <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12'>
                                                <div className="formCard">
                                                    <div
                                                        className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                                                        <h3 className="text-nowrap formTitle m-0">District details
                                                        </h3>
                                                        <hr className="w-100" />
                                                    </div>
                                                    <div className="DistrictForm">
                                                        <div className="mb-2">
                                                            <label className="form-label mb-1">District
                                                                :</label>
                                                            <div
                                                                className="districtTable d-flex align-items-center gap-2">
                                                                <input type="number"
                                                                    className="form-control"
                                                                    placeholder=""
                                                                    style={{ maxWidth: '80px' }}
                                                                    name="distNum"
                                                                    value={formData.distNum}
                                                                    onChange={handleChange} />
                                                                <input type="text"
                                                                    className="form-control"
                                                                    placeholder=""
                                                                    name="distNam"
                                                                    value={formData.distNam}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                            {getErrorMessage('distNum') && <p className="text-danger">{getErrorMessage('distNum')}</p>}
                                                        </div>
                                                        <div className="mb-2">
                                                            <label className="form-label mb-1">Registrar
                                                                :</label>
                                                            <input type="text"
                                                                className="form-control"
                                                                placeholder=""
                                                                name="rspnsbl"
                                                                value={formData.rspnsbl}
                                                                onChange={handleChange} />
                                                        </div>
                                                        <div className="mb-2">
                                                            <label className="form-label mb-1">Supervisor
                                                                :</label>
                                                            <input type="text"
                                                                className="form-control"
                                                                placeholder=""
                                                                name="supervisor"
                                                                value={formData.supervisor}
                                                                onChange={handleChange} />
                                                        </div>
                                                        <div className="mb-2">
                                                            <label className="form-label mb-1">Trainer :</label>
                                                            <input type="text"
                                                                className="form-control"
                                                                placeholder=""
                                                                name="trainer"
                                                                value={formData.trainer}
                                                                onChange={handleChange} />
                                                        </div>
                                                        <div className="mb-4">
                                                            <label className="form-label mb-1">Terms :</label>
                                                            <input type="text" className="form-control"
                                                                placeholder=""
                                                                name="terms"
                                                                value={formData.terms}
                                                                onChange={handleChange} />
                                                        </div>
                                                        <div className="mb-4 py-2 row g-lg-3 g-md-3 g-3">
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <label className="form-label mb-1">County :</label>
                                                                <div className="d-flex align-items-center gap-4">
                                                                    <div className="d-flex checked align-items-center gap-2">
                                                                        <div
                                                                            className="inputDesign position-relative">
                                                                            <input
                                                                                type="radio"
                                                                                name="county"
                                                                                value="N"
                                                                                checked={formData.county === 'N'}
                                                                                onChange={handleChange}
                                                                            />
                                                                            <div className="checked">
                                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24" height="25"
                                                                                    viewBox="0 0 24 25"
                                                                                    fill="none">
                                                                                    <path
                                                                                        d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z"
                                                                                        stroke="black"
                                                                                        stroke-width="2"
                                                                                        stroke-linecap="round"
                                                                                        stroke-linejoin="round" />
                                                                                </svg>
                                                                            </div>
                                                                            <div className="Unchecked">
                                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24" height="25"
                                                                                    viewBox="0 0 24 25"
                                                                                    fill="none">
                                                                                    <path
                                                                                        d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z"
                                                                                        stroke="#A4A4A4"
                                                                                        stroke-width="2"
                                                                                        stroke-linecap="round"
                                                                                        stroke-linejoin="round" />
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                        <label
                                                                            className="form-label m-0" style={{ fontWeight: formData.county === 'N' ? 'bold' : 'normal' }}>Nassau</label>
                                                                    </div>
                                                                    <div
                                                                        className="d-flex align-items-center gap-2">
                                                                        <div
                                                                            className="inputDesign position-relative">
                                                                            <input
                                                                                type="radio"
                                                                                name="county"
                                                                                value="S"
                                                                                checked={formData.county === 'S'}
                                                                                onChange={handleChange}
                                                                            />
                                                                            <div className="checked">
                                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24" height="25"
                                                                                    viewBox="0 0 24 25"
                                                                                    fill="none">
                                                                                    <path
                                                                                        d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z"
                                                                                        stroke="black"
                                                                                        stroke-width="2"
                                                                                        stroke-linecap="round"
                                                                                        stroke-linejoin="round" />
                                                                                </svg>
                                                                            </div>
                                                                            <div className="Unchecked">
                                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24" height="25"
                                                                                    viewBox="0 0 24 25"
                                                                                    fill="none">
                                                                                    <path
                                                                                        d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z"
                                                                                        stroke="#A4A4A4"
                                                                                        stroke-width="2"
                                                                                        stroke-linecap="round"
                                                                                        stroke-linejoin="round" />
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                        <label
                                                                            className="form-label m-0" style={{ fontWeight: formData.county === 'S' ? 'bold' : 'normal' }}>Suffolk</label>
                                                                    </div>
                                                                </div>
                                                                {getErrorMessage('county') && <p className="text-danger">{getErrorMessage('county')}</p>}

                                                            </div>
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <label className="form-label mb-1">Kindergarten
                                                                    :</label>
                                                                <div className="d-flex  align-items-center gap-4">
                                                                    <div
                                                                        className="d-flex checked align-items-center gap-2">
                                                                        <div
                                                                            className="inputDesign position-relative">

                                                                            <input type="radio"
                                                                                id="kndrgrtn_ft"
                                                                                name="kndrgrtn"
                                                                                value="F"
                                                                                checked={formData.kndrgrtn === 'F'}
                                                                                onChange={handleChange} />
                                                                            <div className="checked">
                                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24" height="25"
                                                                                    viewBox="0 0 24 25"
                                                                                    fill="none">
                                                                                    <path
                                                                                        d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z"
                                                                                        stroke="black"
                                                                                        stroke-width="2"
                                                                                        stroke-linecap="round"
                                                                                        stroke-linejoin="round" />
                                                                                </svg>
                                                                            </div>
                                                                            <div className="Unchecked">
                                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24" height="25"
                                                                                    viewBox="0 0 24 25"
                                                                                    fill="none">
                                                                                    <path
                                                                                        d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z"
                                                                                        stroke="#A4A4A4"
                                                                                        stroke-width="2"
                                                                                        stroke-linecap="round"
                                                                                        stroke-linejoin="round" />
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                        <label className="form-label m-0" style={{ fontWeight: formData.kndrgrtn === 'F' ? 'bold' : 'normal' }}>FT</label>
                                                                    </div>
                                                                    <div
                                                                        className="d-flex align-items-center gap-2">
                                                                        <div
                                                                            className="inputDesign position-relative">
                                                                            <input type="radio"
                                                                                id="kndrgrtn_pt"
                                                                                name="kndrgrtn"
                                                                                value="P"
                                                                                checked={formData.kndrgrtn === 'P'}
                                                                                onChange={handleChange} />
                                                                            <div className="checked">
                                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24" height="25"
                                                                                    viewBox="0 0 24 25"
                                                                                    fill="none">
                                                                                    <path
                                                                                        d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z"
                                                                                        stroke="black"
                                                                                        stroke-width="2"
                                                                                        stroke-linecap="round"
                                                                                        stroke-linejoin="round" />
                                                                                </svg>
                                                                            </div>
                                                                            <div className="Unchecked">
                                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24" height="25"
                                                                                    viewBox="0 0 24 25"
                                                                                    fill="none">
                                                                                    <path
                                                                                        d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z"
                                                                                        stroke="#A4A4A4"
                                                                                        stroke-width="2"
                                                                                        stroke-linecap="round"
                                                                                        stroke-linejoin="round" />
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                        <label className="form-label m-0" style={{ fontWeight: formData.kndrgrtn === 'P' ? 'bold' : 'normal' }}>PT</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mb-0">
                                                            <div className="d-flex flex-column align-items-start gap-2">
                                                                <div
                                                                    className="d-flex checked align-items-center gap-2">
                                                                    <div className="inputDesign position-relative">
                                                                        <input type="checkbox" id="contract"
                                                                            name="contract"
                                                                            checked={formData.contract}
                                                                            onChange={handleChange} />
                                                                        <div className="checked">
                                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="25"
                                                                                viewBox="0 0 24 25" fill="none">
                                                                                <path
                                                                                    d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z"
                                                                                    stroke="black"
                                                                                    stroke-width="2"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round" />
                                                                            </svg>
                                                                        </div>
                                                                        <div className="Unchecked">
                                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="25"
                                                                                viewBox="0 0 24 25" fill="none">
                                                                                <path
                                                                                    d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z"
                                                                                    stroke="#A4A4A4"
                                                                                    stroke-width="2"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round" />
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <label
                                                                        className="form-label m-0" style={{ fontWeight: formData.contract ? 'bold' : 'normal' }}>Contacts</label>
                                                                </div>
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div className="inputDesign position-relative">
                                                                        <input type="checkbox"
                                                                            id="contract"
                                                                            name="contract"
                                                                        />
                                                                        <div className="checked">
                                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="25"
                                                                                viewBox="0 0 24 25" fill="none">
                                                                                <path
                                                                                    d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z"
                                                                                    stroke="black"
                                                                                    stroke-width="2"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round" />
                                                                            </svg>
                                                                        </div>
                                                                        <div className="Unchecked">
                                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="25"
                                                                                viewBox="0 0 24 25" fill="none">
                                                                                <path
                                                                                    d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z"
                                                                                    stroke="#A4A4A4"
                                                                                    stroke-width="2"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round" />
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <label className="form-label m-0">Hidden</label>
                                                                </div>
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div className="inputDesign position-relative">
                                                                        <input type="checkbox"
                                                                            id="active"
                                                                            name="active"
                                                                            checked={formData.active}
                                                                            onChange={handleChange} />
                                                                        <div className="checked">
                                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="25"
                                                                                viewBox="0 0 24 25" fill="none">
                                                                                <path
                                                                                    d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z"
                                                                                    stroke="black"
                                                                                    stroke-width="2"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round" />
                                                                            </svg>
                                                                        </div>
                                                                        <div className="Unchecked">
                                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="25"
                                                                                viewBox="0 0 24 25" fill="none">
                                                                                <path
                                                                                    d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z"
                                                                                    stroke="#A4A4A4"
                                                                                    stroke-width="2"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round" />
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <label className="form-label m-0" style={{ fontWeight: formData.active ? 'bold' : 'normal' }}>Active</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div >
                                                </div>
                                            </div>
                                            <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12'>
                                                <div className="formCard">
                                                    <div
                                                        className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                                                        <h3 className="text-nowrap formTitle m-0">Superintendent
                                                        </h3>
                                                        <hr className="w-100" />
                                                    </div>
                                                    <div className="DistrictForm">
                                                        <div className="mb-2">
                                                            <label className="form-label mb-1">Name :</label>
                                                            <input type="text" className="form-control"
                                                                placeholder=""
                                                                name="super"
                                                                value={formData.super}
                                                                onChange={handleChange} />
                                                        </div>
                                                        <div className="mb-2 row g-2">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Address line 1
                                                                    :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="building"
                                                                    value={formData.building}
                                                                    onChange={handleChange} />
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Address line 2
                                                                    :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="street"
                                                                    value={formData.street}
                                                                    onChange={handleChange} />
                                                            </div>
                                                            {/* <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Address line 3
                                                                    :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="city"
                                                                    value={formData.city}
                                                                    onChange={handleChange} />
                                                            </div> */}
                                                        </div>
                                                        <div className="mb-2 row g-2">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Phone :</label>
                                                                <input type="number" className="form-control"
                                                                    placeholder=""
                                                                    name="phone"
                                                                    value={formData.phone}
                                                                    onChange={handleChange} />
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Fax :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="fax"
                                                                    value={formData.fax}
                                                                    onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                        <div className="mb-0">
                                                            <label className="form-label mb-1">E-mail :</label>
                                                            <input type="email" className="form-control"
                                                                placeholder=""
                                                                name="emailsuper"
                                                                value={formData.emailsuper}
                                                                onChange={handleChange} />
                                                        </div>
                                                        {getErrorMessage('emailsuper') && <p className="text-danger">{getErrorMessage('emailsuper')}</p>}
                                                    </div >
                                                </div>
                                                <div className="formCard mt-3">
                                                    <div
                                                        className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                                                        <h3 className="text-nowrap formTitle m-0">Kinder</h3>
                                                        <hr className="w-100" />
                                                    </div>
                                                    <div className="DistrictForm">
                                                        <div className="mb-2">
                                                            <label className="form-label mb-1">Registration date
                                                                :</label>
                                                            <input type="date" className="form-control"
                                                                placeholder=""
                                                                name="kinreg"
                                                                value={formatDate(formData.kinreg)}
                                                                onChange={handleChange} />
                                                        </div>
                                                        <div className="mb-2">
                                                            <label className="form-label mb-1">Contact person
                                                                :</label>
                                                            <input type="text" className="form-control"
                                                                placeholder=""
                                                                name="kinper"
                                                                value={formData.kinper}
                                                                onChange={handleChange} />
                                                        </div>
                                                        <div className="mb-2 row g-2">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Phone :</label>
                                                                <input type="number" className="form-control"
                                                                    placeholder=""
                                                                    name="bhemerfon"
                                                                    value={formData.bhemerfon}
                                                                    onChange={handleChange} />
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Fax :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="kinfon"
                                                                    value={formData.kinfon}
                                                                    onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                        <div className="mb-0">
                                                            <label className="form-label mb-1">Beyond hours District
                                                                Emergency Contact :</label>
                                                            <input type="text" className="form-control"
                                                                placeholder=""
                                                                name="bhemercon"
                                                                value={formData.bhemercon}
                                                                onChange={handleChange} />
                                                        </div>
                                                    </div >
                                                </div>
                                            </div>

                                            <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12'>
                                                <div className="formCard">
                                                    <div
                                                        className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                                                        <h3 className="text-nowrap formTitle m-0">Liason #1
                                                        </h3>
                                                        <hr className="w-100" />
                                                    </div>
                                                    <div className="DistrictForm">

                                                        <div className="mb-2 row g-2">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Name :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="liaison"
                                                                    value={formData.liaison}
                                                                    onChange={handleChange} />
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Title :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="title"
                                                                    value={formData.title}
                                                                    onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                        <div className="mb-2 row g-2">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Address line 1
                                                                    :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="addr1"
                                                                    value={formData.addr1}
                                                                    onChange={handleChange} />
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Address line 2
                                                                    :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="addr2"
                                                                    value={formData.addr2}
                                                                    onChange={handleChange} />
                                                            </div>
                                                            {/* <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Address line 3
                                                                    :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="addr3"
                                                                    value={formData.addr3}
                                                                    onChange={handleChange} />
                                                            </div> */}
                                                        </div>
                                                        <div className="mb-2 row g-2">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Phone :</label>
                                                                <input type="number" className="form-control"
                                                                    placeholder=""
                                                                    name="lPhone"
                                                                    value={formData.lPhone}
                                                                    onChange={handleChange} />
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Fax :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="lFax"
                                                                    value={formData.lFax}
                                                                    onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                        <div className="mb-0 row g-2">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">E-mail :</label>
                                                                <input type="email" className="form-control"
                                                                    placeholder=""
                                                                    name="lEmail1"
                                                                    value={formData.lEmail1}
                                                                    onChange={handleChange} />
                                                                {getErrorMessage('lEmail1') && <p className="text-danger">{getErrorMessage('lEmail1')}</p>}
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Security :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="secretary"
                                                                    value={formData.secretary}
                                                                    onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                    </div >
                                                </div>
                                                <div className="formCard mt-3">
                                                    <div
                                                        className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                                                        <h3 className="text-nowrap formTitle m-0">Liason #2
                                                        </h3>
                                                        <hr className="w-100" />
                                                    </div>
                                                    <div className="DistrictForm">
                                                        <div className="mb-2 row g-2">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Name :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="liason2"
                                                                    value={formData.liason2}
                                                                    onChange={handleChange} />
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Title :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="title2"
                                                                    value={formData.title2}
                                                                    onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                        <div className="mb-2 row g-2">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Address line 1
                                                                    :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="addr12"
                                                                    value={formData.addr12}
                                                                    onChange={handleChange} />
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Address line 2
                                                                    :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="addr22"
                                                                    value={formData.addr22}
                                                                    onChange={handleChange} />
                                                            </div>
                                                            {/* <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Address line 3
                                                                    :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="addr32"
                                                                    value={formData.addr32}
                                                                    onChange={handleChange} />
                                                            </div> */}
                                                        </div>
                                                        <div className="mb-2 row g-2">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Phone :</label>
                                                                <input type="number" className="form-control"
                                                                    placeholder=""
                                                                    name="lPhone2"
                                                                    value={formData.lPhone2}
                                                                    onChange={handleChange} />
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Fax :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="lPax2"
                                                                    value={formData.lPax2}
                                                                    onChange={handleChange} />
                                                            </div>
                                                        </div>

                                                        <div className="mb-0 row g-2">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">E-mail :</label>
                                                                <input type="email" className="form-control"
                                                                    placeholder=""
                                                                    name="lEmail2"
                                                                    value={formData.lEmail2}
                                                                    onChange={handleChange} />
                                                                {getErrorMessage('lEmail2') && <p className="text-danger">{getErrorMessage('lEmail2')}</p>}
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Security :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="secretary2"
                                                                    value={formData.secretary2}
                                                                    onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                    </div >
                                                </div>
                                            </div>
                                            <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12'>
                                                <div className="formCard">
                                                    <div
                                                        className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                                                        <h3 className="text-nowrap formTitle m-0">Liason #3
                                                        </h3>
                                                        <hr className="w-100" />
                                                    </div>
                                                    <div className="DistrictForm">

                                                        <div className="mb-2 row g-2">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Name :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="liason3"
                                                                    value={formData.liason3}
                                                                    onChange={handleChange} />
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Title :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="title3"
                                                                    value={formData.title3}
                                                                    onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                        <div className="mb-2 row g-2">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Address line 1
                                                                    :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="addr13"
                                                                    value={formData.addr13}
                                                                    onChange={handleChange} />
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Address line 2
                                                                    :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="addr23"
                                                                    value={formData.addr23}
                                                                    onChange={handleChange} />
                                                            </div>
                                                            {/* <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Address line 3
                                                                    :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="addr32"
                                                                    value={formData.addr32}
                                                                    onChange={handleChange} />
                                                            </div> */}
                                                        </div>
                                                        <div className="mb-2 row g-2">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Phone :</label>
                                                                <input type="number" className="form-control"
                                                                    placeholder=""
                                                                    name="lPhone3"
                                                                    value={formData.lPhone3}
                                                                    onChange={handleChange} />
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Fax :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="lPax3"
                                                                    value={formData.lPax3}
                                                                    onChange={handleChange} />
                                                            </div>
                                                        </div>


                                                        <div className="mb-0 row g-2">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">E-mail :</label>
                                                                <input type="email" className="form-control"
                                                                    placeholder=""
                                                                    name="lEmail3"
                                                                    value={formData.lEmail3}
                                                                    onChange={handleChange} />
                                                                {getErrorMessage('lEmail3') && <p className="text-danger">{getErrorMessage('lEmail3')}</p>}
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <label className="form-label mb-1">Security :</label>
                                                                <input type="text" className="form-control"
                                                                    placeholder=""
                                                                    name="secretary3"
                                                                    value={formData.secretary3}
                                                                    onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                    </div >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="nav-notes" role="tabpanel"
                                        aria-labelledby="nav-notes-tab" tabIndex={0} >
                                        {/* <div className="formCard"> */}
                                        <div className='row mx-0'>
                                            <div className='col-12'>
                                                <div
                                                    className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-2 mb-md-2 mb-2">
                                                    <h3 className="text-nowrap formTitle m-0">Notes :
                                                    </h3>
                                                </div>
                                                <div className="DistrictForm">
                                                    <div className="mb-3">
                                                        {/* <label className="form-label">Notes :</label> */}
                                                        <textarea className="form-control"
                                                            placeholder="Program moved to Sailsbury Admin Building 9/1/23"
                                                            rows={15}
                                                            name="notes"
                                                            value={formData.notes}
                                                            onChange={handleChange}></textarea>
                                                    </div>
                                                    {/* <button className="btn btn-primary ps-3 pe-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="me-2"
                                                        width="24" height="24" viewBox="0 0 24 24"
                                                        fill="none">
                                                        <path
                                                            d="M13.8001 19.5514H19.8001M4.2002 19.5514L8.56618 18.6717C8.79796 18.625 9.01077 18.5109 9.17791 18.3437L18.9516 8.56461C19.4202 8.09576 19.4199 7.33577 18.9509 6.86731L16.8805 4.79923C16.4117 4.33097 15.6521 4.33129 15.1837 4.79995L5.40896 14.58C5.24214 14.7469 5.12824 14.9593 5.0815 15.1906L4.2002 19.5514Z"
                                                            stroke="white" stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>
                                                    Edit
                                                </button> */}
                                                </div >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* </div> */}
                            </>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DistrictForm;
