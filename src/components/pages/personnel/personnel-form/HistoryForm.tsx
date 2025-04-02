import React from 'react';

interface HistoryFormProps {
    personnelFormData: any;
    errors: any;
    handleChange: any;
}

const HistoryForm: React.FC<any> = ({ personnelFormData, handleChange, errors }) => {
    const formatDate = (dateString: any) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    return (

        <div className="pageTable pt-3">
            <div className="pageTableInner personalForm district">
                <div className="tab-pane fade show active pb-0" id="nav-history" role="tabpanel" aria-labelledby="nav-history-tab" tabIndex={0}>
                    <div className="row justify-content-center m-0">
                        <div className="col-12">
                            <form method="post" className="DistrictForm">
                                <div className='row g-3'>
                                    <div className='col firstCol'>
                                        <div className="formCard h-100">
                                            <div
                                                className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-0">
                                                <h3 className="text-nowrap formTitle m-0">History</h3>
                                                <hr className="w-100" />
                                            </div>

                                            <div className="row g-2">
                                                <div className="col-12">
                                                    <div className="mb-0 d-flex align-items-center justify-content-between inlineForm">
                                                        <label className="form-label mb-1">Medical:</label>
                                                        <input type="date" className="form-control" id="medicalexp" name="medicalexp"
                                                            value={formatDate(personnelFormData.medicalexp)} onChange={handleChange} />
                                                        {errors?.medicalexp && (
                                                            <div className="text-danger">
                                                                {errors?.medicalexp?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="mb-0 d-flex align-items-center justify-content-between inlineForm">
                                                        <label className="form-label mb-1">Child Abuse Expire:</label>
                                                        <input type="date" className="form-control" id="matapp"
                                                            name="matapp"
                                                            value={formatDate(personnelFormData.matapp)} onChange={handleChange} />
                                                        {errors?.matapp && (
                                                            <div className="text-danger">
                                                                {errors?.matapp?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="mb-0 d-flex align-items-center justify-content-between inlineForm">
                                                        <label className="form-label mb-1">First Aid Expires:</label>
                                                        <input type="date" className="form-control" id="firstaid"
                                                            name="firstaid"
                                                            value={formatDate(personnelFormData.firstaid)} onChange={handleChange} />
                                                        {errors?.firstaid && (
                                                            <div className="text-danger">
                                                                {errors?.firstaid?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="mb-0 d-flex align-items-center justify-content-between inlineForm">
                                                        <label className="form-label mb-1">CPR Expires:</label>
                                                        <input type="date" className="form-control" id="cpr" name="cpr"
                                                            value={formatDate(personnelFormData.cpr)} onChange={handleChange} />
                                                        {errors?.cpr && (
                                                            <div className="text-danger">
                                                                {errors?.cpr?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="mb-0 d-flex align-items-center justify-content-between inlineForm">
                                                        <label className="form-label mb-1">MAT Skills:</label>
                                                        <input type="date" className="form-control" id="matStart"
                                                            name="matStart"
                                                            value={formatDate(personnelFormData.matStart)} onChange={handleChange} />
                                                        {errors?.matStart && (
                                                            <div className="text-danger">
                                                                {errors?.matStart?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="mb-0 d-flex align-items-center justify-content-between inlineForm">
                                                        <label className="form-label mb-1">MAT Expire:</label>
                                                        <input type="date" className="form-control" id="matdate"
                                                            name="matdate"
                                                            value={formatDate(personnelFormData.matdate)} onChange={handleChange} />
                                                        {errors?.matdate && (
                                                            <div className="text-danger">
                                                                {errors?.matdate?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="mb-0 d-flex align-items-center justify-content-between inlineForm">
                                                        <label className="form-label mb-1">H&S 5:</label>
                                                        <input type="date" className="form-control" id="foundations" name="foundations"
                                                            value={formatDate(personnelFormData.foundations)} onChange={handleChange} />
                                                        {errors?.foundations && (
                                                            <div className="text-danger">
                                                                {errors?.foundations?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="mb-0 d-flex align-items-center justify-content-between inlineForm">
                                                        <label className="form-label mb-1">H&S 15:</label>
                                                        <input type="date" className="form-control" id="foundations15H" name="foundations15H"
                                                            value={formatDate(personnelFormData.foundations15H)} onChange={handleChange} />
                                                        {errors?.foundations15H && (
                                                            <div className="text-danger">
                                                                {errors?.foundations15H?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="mb-0 d-flex align-items-center justify-content-between inlineForm">
                                                        <label className="form-label mb-1">Sexual Harassment 1:</label>
                                                        <input type="date" className="form-control" id="sHarassmentExp"
                                                            name="sHarassmentExp"
                                                            value={formatDate(personnelFormData.sHarassmentExp)} onChange={handleChange} />
                                                        {errors?.sHarassmentExp && (
                                                            <div className="text-danger">
                                                                {errors?.sHarassmentExp?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                {/* <div className="col-12">
                                                    <div className="mb-0 d-flex align-items-center justify-content-between inlineForm">
                                                        <label className="form-label mb-1">Sexual Harassment 2:</label>
                                                        <input type="date" className="form-control" id="sHarassmentExp2"
                                                            name="sHarassmentExp2"
                                                            value={formatDate(personnelFormData.sHarassmentExp2)} onChange={handleChange} />
                                                        {errors?.sHarassmentExp2 && (
                                                            <div className="text-danger">
                                                                {errors?.sHarassmentExp2?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div> */}
                                                <div className="col-12">
                                                    <div className="mb-0 d-flex align-items-center justify-content-between inlineForm">
                                                        <label className="form-label mb-1">ACES:</label>
                                                        <input type="date" className="form-control" id="aces" name="aces"
                                                            value={formatDate(personnelFormData.aces)} onChange={handleChange} />
                                                        {errors?.aces && (
                                                            <div className="text-danger">
                                                                {errors?.aces?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="mb-0 d-flex align-items-center justify-content-between inlineForm">
                                                        <label className="form-label mb-1">ELAW:</label>
                                                        <input type="date" className="form-control" id="eLaw" name="eLaw"
                                                            value={formatDate(personnelFormData.eLaw)} onChange={handleChange} />
                                                        {errors?.eLaw && (
                                                            <div className="text-danger">
                                                                {errors?.eLaw?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='col secCol'>
                                        <div className="formCard">
                                            <div
                                                className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-0">
                                                <h3 className="text-nowrap formTitle m-0">Contact</h3>
                                                <hr className="w-100" />
                                            </div>

                                            <div className="row g-2">

                                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div className="mb-0">
                                                        <label className="form-label mb-1">Referred By:</label>
                                                        <input type="text" className="form-control" id="referedby" name="referedby"
                                                            value={personnelFormData.referedby} onChange={handleChange} />
                                                        {errors?.referedby && (
                                                            <div className="text-danger">
                                                                {errors?.referedby?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="mb-0">
                                                        <label className="form-label mb-1">Phone1:</label>
                                                        <input type="number" className="form-control" id="emerphonE1" name="emerphonE1"
                                                            value={personnelFormData.emerphonE1} onChange={handleChange} />
                                                        {errors?.emerphonE1 && (
                                                            <div className="text-danger">
                                                                {errors?.emerphonE1?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="mb-0">
                                                        <label className="form-label mb-1">Phone2:</label>
                                                        <input type="number" className="form-control" id="emerphonE2" name="emerphonE2"
                                                            value={personnelFormData.emerphonE2} onChange={handleChange} />
                                                        {errors?.emerphonE2 && (
                                                            <div className="text-danger">
                                                                {errors?.emerphonE2?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="mb-0">
                                                        <label className="form-label mb-1">Cell1:</label>
                                                        <input type="text" className="form-control" id="emercelL1" name="emercelL1"
                                                            value={personnelFormData.emercelL1} onChange={handleChange} />
                                                        {errors?.emercelL1 && (
                                                            <div className="text-danger">
                                                                {errors?.emercelL1?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="mb-0">
                                                        <label className="form-label mb-1">Cell2:</label>
                                                        <input type="text" className="form-control" id="emercelL2" name="emercelL2"
                                                            value={personnelFormData.emercelL2} onChange={handleChange} />
                                                        {errors?.emercelL2 && (
                                                            <div className="text-danger">
                                                                {errors?.emercelL2?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>


                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="mb-0">
                                                        <label className="form-label mb-1">1st Emergency Contact :</label>
                                                        <input type="text" className="form-control" id="emernamE1"
                                                            name="emernamE1" value={personnelFormData.emernamE1}
                                                            onChange={handleChange} />
                                                        {errors?.emernamE1 && (
                                                            <div className="text-danger">
                                                                {errors?.emernamE1?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>


                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="mb-0">
                                                        <label className="form-label mb-1">2nd Emergency Contact :</label>
                                                        <input type="text" className="form-control" id="emernamE2"
                                                            name="emernamE2"
                                                            value={personnelFormData.emernamE2} onChange={handleChange} />
                                                        {errors?.emernamE2 && (
                                                            <div className="text-danger">
                                                                {errors?.emernamE2?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div className="mb-0">
                                                        <label className="form-label mb-1">Type:</label>
                                                        <select className="form-select" id="type" name="type" onChange={handleChange} value={personnelFormData.type}>
                                                            <option value="">Select type</option>
                                                            <option value="0">Pre-k</option>
                                                            <option value="1">Childcare</option>
                                                            <option value="2">Pre-k & Childcare</option>
                                                        </select>
                                                        {errors?.type && (
                                                            <div className="text-danger">
                                                                {errors?.type?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="formCard mt-3">
                                            <div
                                                className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-0">
                                                <h3 className="text-nowrap formTitle m-0">Education</h3>
                                                <hr className="w-100" />
                                            </div>

                                            <div className="row g-2">
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div className="mb-0">
                                                        <label className="form-label mb-1">Education:</label>
                                                        <input type="text" className="form-control" id="education" name="education"
                                                            value={personnelFormData.education} onChange={handleChange} />
                                                        {errors?.education && (
                                                            <div className="text-danger">
                                                                {errors?.education?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                                    <div className="mb-2">
                                                        <label className="form-label mb-1">Personnel:</label>
                                                        <input type="date" className="form-control" name='reF_P_REC'
                                                            value={formatDate(personnelFormData.reF_P_REC)} onChange={handleChange} />
                                                        {errors?.reF_P_REC && (
                                                            <div className="text-danger">
                                                                {errors?.reF_P_REC?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="mb-2">
                                                        {/* <label className="form-label mb-1">PersonnelDate2:</label> */}
                                                        <input type="date" className="form-control" name='reF_P_OUT'
                                                            value={formatDate(personnelFormData.reF_P_OUT)} onChange={handleChange} />
                                                        {errors?.reF_P_OUT && (
                                                            <div className="text-danger">
                                                                {errors?.reF_P_OUT?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="mb-0">
                                                        {/* <label className="form-label mb-1">PersonnelDate3:</label> */}
                                                        <input type="date" className="form-control" name='reF_P_FON'
                                                            value={formatDate(personnelFormData.reF_P_FON)} onChange={handleChange} />
                                                        {errors?.reF_P_FON && (
                                                            <div className="text-danger">
                                                                {errors?.reF_P_FON?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                                    <div className="mb-2">
                                                        <label className="form-label mb-1">Professional:</label>
                                                        <input type="date" className="form-control" name='reF_W1_REC'
                                                            value={formatDate(personnelFormData.reF_W1_REC)} onChange={handleChange} />
                                                        {errors?.reF_W1_REC && (
                                                            <div className="text-danger">
                                                                {errors?.reF_W1_REC?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="mb-2">
                                                        {/* <label className="form-label mb-1">ProfessionalDate12:</label> */}
                                                        <input type="date" className="form-control" name='reF_W1_OUT'
                                                            value={formatDate(personnelFormData.reF_W1_OUT)} onChange={handleChange} />
                                                        {errors?.reF_W1_OUT && (
                                                            <div className="text-danger">
                                                                {errors?.reF_W1_OUT?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="mb-0">
                                                        {/* <label className="form-label mb-1">ProfessionalDate13:</label> */}
                                                        <input type="date" className="form-control" name='reF_W2_OUT'
                                                            value={formatDate(personnelFormData.reF_W2_OUT)} onChange={handleChange} />
                                                        {errors?.reF_W2_OUT && (
                                                            <div className="text-danger">
                                                                {errors?.reF_W2_OUT?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                                    <div className="mb-2">
                                                        <label className="form-label mb-1">Professional:</label>
                                                        <input type="date" className="form-control" name='reF_W2_REC'
                                                            value={formatDate(personnelFormData.reF_W2_REC)} onChange={handleChange} />
                                                        {errors?.reF_W2_REC && (
                                                            <div className="text-danger">
                                                                {errors?.reF_W2_REC?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="mb-2">
                                                        {/* <label className="form-label mb-1">ProfessionalDate22:</label> */}
                                                        <input type="date" className="form-control" name='reF_W1_FON'
                                                            value={formatDate(personnelFormData.reF_W1_FON)} onChange={handleChange} />
                                                        {errors?.reF_W1_FON && (
                                                            <div className="text-danger">
                                                                {errors?.reF_W1_FON?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div><div className="mb-0">
                                                        {/* <label className="form-label mb-1">ProfessionalDate23:</label> */}
                                                        <input type="date" className="form-control" name='reF_W2_FON'
                                                            value={formatDate(personnelFormData.reF_W2_FON)} onChange={handleChange} />
                                                        {errors?.reF_W2_FON && (
                                                            <div className="text-danger">
                                                                {errors?.reF_W2_FON?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col secCol'>
                                        <div className="formCard h-100">
                                            <div
                                                className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-0">
                                                <h3 className="text-nowrap formTitle m-0">Notes</h3>
                                                <hr className="w-100" />
                                            </div>

                                            <div className="row g-2">
                                                {['w4', 'app', 'i9', 'idca', 'iD1', 'iD2', 'hireletter'].map((field) => (
                                                    <div key={field} className="col-lg-6 col-md-6 col-sm-12 col-12 mb-0">
                                                        <div className="d-flex align-items-center gap-2">
                                                            <div className="inputDesign position-relative">
                                                                <input
                                                                    type="checkbox"
                                                                    id={field}
                                                                    name={field}
                                                                    className="form-check-input"
                                                                    onChange={handleChange}
                                                                    checked={personnelFormData[field] || false} // Ensure it's checked if the value is true
                                                                />
                                                                <div className="checked">
                                                                    {/* SVG for checked state */}
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                                        <path d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                    </svg>
                                                                </div>
                                                                <div className="Unchecked">
                                                                    {/* SVG for unchecked state */}
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                                        <path d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z" stroke="#A4A4A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                    </svg>
                                                                </div>
                                                                {errors?.field && (
                                                                    <div className="text-danger">
                                                                        {errors?.field?._errors[0]}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <label className="form-label m-0" style={{ fontWeight: personnelFormData[field] ? 'bold' : 'normal' }}>{field}</label>
                                                        </div>
                                                    </div>
                                                ))}


                                                <div className="col-12">    
                                                    <div className="mb-0">
                                                        <label className="form-label mb-1">Note:</label>
                                                        <textarea className="form-control" id="comments" name="comments" rows={18}
                                                            value={personnelFormData.comments} onChange={handleChange}></textarea>
                                                        {errors?.comments && (
                                                            <div className="text-danger">
                                                                {errors?.comments?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <label className="form-label mb-2">County of :</label>
                                                    <div className="d-flex flex-column align-items-start gap-2">
                                                        <div className="d-flex checked align-items-center gap-2">
                                                            <div
                                                                className="inputDesign position-relative">
                                                                <input
                                                                    type="radio"
                                                                    name="fingercnty"
                                                                    value="N"
                                                                    checked={personnelFormData.fingercnty === 'N'}
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
                                                            <label className="form-label m-0"
                                                                style={{ fontWeight: personnelFormData.fingercnty === 'N' ? 'bold' : 'normal' }}>
                                                                Nassau
                                                            </label>
                                                        </div>
                                                        <div
                                                            className="d-flex align-items-center gap-2">
                                                            <div
                                                                className="inputDesign position-relative">
                                                                <input
                                                                    type="radio"
                                                                    name="fingercnty"
                                                                    value="S"
                                                                    checked={personnelFormData.fingercnty === 'S'}
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
                                                            <label className="form-label m-0"
                                                                style={{ fontWeight: personnelFormData.fingercnty === 'S' ? 'bold' : 'normal' }}
                                                            >Suffolk</label>
                                                        </div>
                                                    </div>
                                                    {errors?.fingercnty && (
                                                        <div className="text-danger">
                                                            {errors?.fingercnty?._errors[0]}
                                                        </div>
                                                    )}

                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <label className="form-label mb-2">Gender:</label>
                                                    <div className="d-flex flex-column align-items-start gap-2">
                                                        <div className="d-flex checked align-items-center gap-2">
                                                            <div
                                                                className="inputDesign position-relative">
                                                                <input
                                                                    type="radio"
                                                                    name="gender"
                                                                    value="male"
                                                                    checked={personnelFormData.gender === 'male'}
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
                                                                className="form-label m-0" style={{ fontWeight: personnelFormData.gender === 'male' ? 'bold' : 'normal' }}>Male</label>
                                                        </div>
                                                        <div
                                                            className="d-flex align-items-center gap-2">
                                                            <div
                                                                className="inputDesign position-relative">
                                                                <input
                                                                    type="radio"
                                                                    name="gender"
                                                                    value="female"
                                                                    checked={personnelFormData.gender === 'female'}
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
                                                                className="form-label m-0" style={{ fontWeight: personnelFormData.gender === 'female' ? 'bold' : 'normal' }}>Female</label>
                                                        </div>
                                                    </div>
                                                    {errors?.gender && (
                                                        <div className="text-danger">
                                                            {errors?.gender?._errors[0]}
                                                        </div>
                                                    )}
                                                </div>
                                                {/* <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="mb-0">
                                                        <label className="form-label mb-1">Medical:</label>
                                                        <input type="date" className="form-control" id="medicalexp" name="medicalexp"
                                                            value={formatDate(personnelFormData.medicalexp)} onChange={handleChange} />
                                                        {errors?.medicalexp && (
                                                            <div className="text-danger">
                                                                {errors?.medicalexp?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="mb-0">
                                                        <label className="form-label mb-1">CPR Expires:</label>
                                                        <input type="date" className="form-control" id="cpr" name="cpr"
                                                            value={formatDate(personnelFormData.cpr)} onChange={handleChange} />
                                                        {errors?.cpr && (
                                                            <div className="text-danger">
                                                                {errors?.cpr?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div> */}


                                                {/* {['phone1', 'phone2', 'cell1', 'cell2'].map((phone) => (
                                    <div key={phone} className="col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="mb-0">
                                            <label className="form-label mb-1">{phone}:</label>
                                            <input type="tel" className="form-control" id={phone} name={phone}
                                                value={personnelFormData.phone} onChange={handleChange} />
                                            {errors?.phone && (
                                                <div className="text-danger">
                                                    {errors?.phone?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))} */}
                                                {/* <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="mb-0">
                                                        <label className="form-label mb-1">First Emergency Contact Name:</label>
                                                        <input type="text" className="form-control" id="emernamE1"
                                                            name="emernamE1" value={personnelFormData.emernamE1}
                                                            onChange={handleChange} />
                                                        {errors?.emernamE1 && (
                                                            <div className="text-danger">
                                                                {errors?.emernamE1?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="mb-0">
                                                        <label className="form-label mb-1">Phone1:</label>
                                                        <input type="text" className="form-control" id="emerphonE1" name="emerphonE1"
                                                            value={personnelFormData.emerphonE1} onChange={handleChange} />
                                                        {errors?.emerphonE1 && (
                                                            <div className="text-danger">
                                                                {errors?.emerphonE1?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="mb-0">
                                                        <label className="form-label mb-1">Cell1:</label>
                                                        <input type="text" className="form-control" id="emercelL1" name="emercelL1"
                                                            value={personnelFormData.emercelL1} onChange={handleChange} />
                                                        {errors?.emercelL1 && (
                                                            <div className="text-danger">
                                                                {errors?.emercelL1?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="mb-0">
                                                        <label className="form-label mb-1">Second Emergency Contact Name:</label>
                                                        <input type="text" className="form-control" id="emernamE2"
                                                            name="emernamE2"
                                                            value={personnelFormData.emernamE2} onChange={handleChange} />
                                                        {errors?.emernamE2 && (
                                                            <div className="text-danger">
                                                                {errors?.emernamE2?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="mb-0">
                                                        <label className="form-label mb-1">Phone2:</label>
                                                        <input type="text" className="form-control" id="emerphonE2" name="emerphonE2"
                                                            value={personnelFormData.emerphonE2} onChange={handleChange} />
                                                        {errors?.emerphonE2 && (
                                                            <div className="text-danger">
                                                                {errors?.emerphonE2?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="mb-0">
                                                        <label className="form-label mb-1">Cell2:</label>
                                                        <input type="text" className="form-control" id="emercelL2" name="emercelL2"
                                                            value={personnelFormData.emercelL2} onChange={handleChange} />
                                                        {errors?.emercelL2 && (
                                                            <div className="text-danger">
                                                                {errors?.emercelL2?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>  */}

                                                {/* <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="mb-0">
                                        <label className="form-label mb-1">Second Emergency Contact:</label>
                                        <input type="text" className="form-control"
                                            id="secondEmergencyConcact" name="secondEmergencyConcact"
                                            value={personnelFormData.secondEmergencyConcact} onChange={handleChange} />
                                        {errors?.secondEmergencyConcact && (
                                            <div className="text-danger">
                                                {errors?.secondEmergencyConcact?._errors[0]}
                                            </div>
                                        )}
                                    </div>
                                </div> */}
                                                {/* <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div className="mb-0">
                                                        <label className="form-label mb-1">Type:</label>
                                                        <select className="form-select" id="type" name="type" onChange={handleChange}>
                                                            <option value="">Select type</option>
                                                            <option value="0">Pre-k</option>
                                                            <option value="1">Childcare</option>
                                                            <option value="2">Pre-k & Childcare</option>
                                                        </select>
                                                        {errors?.type && (
                                                            <div className="text-danger">
                                                                {errors?.type?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>  */}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default HistoryForm;