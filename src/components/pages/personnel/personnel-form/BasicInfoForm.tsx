import React from 'react';

const BasicInfoForm: React.FC<any> = ({ personnelFormData, handleChange, errors }) => {

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
                <div className="tab-pane fade show active pb-0" id="nav-basicinfo" role="tabpanel" aria-labelledby="nav-basicinfo-tab" tabIndex={0}>
                    <div className="row justify-content-center m-0">
                        <div className="col-12">
                            <form method="post" className="DistrictForm">

                                <div className='row g-3'>
                                    <div className='col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12'>
                                        <div className="formCard">
                                            <div
                                                className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                                                <h3 className="text-nowrap formTitle m-0">Personnel Details</h3>
                                                <hr className="w-100" />
                                                {/* 
                                                <div className="editForm">
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none">
                                                        <path
                                                            d="M13.7992 19.5514H19.7992M4.19922 19.5514L8.5652 18.6717C8.79698 18.625 9.0098 18.5109 9.17694 18.3437L18.9506 8.56461C19.4192 8.09576 19.4189 7.33577 18.9499 6.86731L16.8795 4.79923C16.4107 4.33097 15.6511 4.33129 15.1827 4.79995L5.40798 14.58C5.24117 14.7469 5.12727 14.9593 5.08052 15.1906L4.19922 19.5514Z"
                                                            stroke="#242A30" stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>
                                                </div> */}
                                            </div>

                                            <div className="mb-0 g-2 row">

                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div>
                                                        <label className="form-label mb-1">First Name :</label>
                                                        <input type="text" className="form-control" placeholder="" id='firstname' name='firstname'
                                                            value={personnelFormData.firstname}
                                                            onChange={(e) => { handleChange(e); }}
                                                            onBlur={(e) => { }}
                                                        />
                                                        {errors?.firstname && (
                                                            <div className="text-danger">
                                                                {errors?.firstname?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">

                                                    <div>
                                                        <label className="form-label mb-1">Last Name :</label>
                                                        <input type="text" className="form-control" placeholder="" id='lastname' name='lastname'
                                                            value={personnelFormData.lastname}
                                                            onChange={(e) => { handleChange(e); }}
                                                            onBlur={(e) => { }}
                                                        />
                                                        {errors?.lastname && (
                                                            <div className="text-danger">
                                                                {errors?.lastname?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">

                                                    <div>
                                                        <label className="form-label mb-1">Date of Birth:</label>
                                                        <input type="date"
                                                            className="form-control" id="dob" name="dob"
                                                            value={formatDate(personnelFormData.dob)}
                                                            onChange={handleChange} />
                                                        {errors?.dob && (
                                                            <div className="text-danger">
                                                                {errors?.dob?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div>
                                                        <label className="form-label mb-1">Email :</label>
                                                        <input type="email" className="form-control" placeholder="" id='email' name='email'
                                                            value={personnelFormData.email}
                                                            onChange={(e) => { handleChange(e); }}
                                                            onBlur={(e) => { }}
                                                        />
                                                        {errors?.email && (
                                                            <div className="text-danger">
                                                                {errors?.email?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>


                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">

                                                    <div>
                                                        <label className="form-label mb-1">Home Phone:</label>
                                                        <input type="text"
                                                            className="form-control"
                                                            id="homephone" name="homephone"
                                                            value={personnelFormData.homephone}
                                                            onChange={handleChange} />
                                                        {errors?.homephone && (
                                                            <div className="text-danger">
                                                                {errors?.homephone?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div>
                                                        <label className="form-label mb-1">Work Phone:</label>
                                                        <input type="text"
                                                            className="form-control" id="workphone" name="workphone"
                                                            value={personnelFormData.workphone}
                                                            onChange={handleChange} />
                                                        {errors?.workphone && (
                                                            <div className="text-danger">
                                                                {errors?.workphone?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div>
                                                        <label className="form-label mb-1">Cell Phone:</label>
                                                        <input type="number"
                                                            className="form-control" id="otherphone" name="otherphone"
                                                            value={personnelFormData.otherphone}
                                                            onChange={handleChange} />
                                                        {errors?.otherphone && (
                                                            <div className="text-danger">
                                                                {errors?.otherphone?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="formCard mt-3">
                                            <div
                                                className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                                                <h3 className="text-nowrap formTitle m-0">Address</h3>
                                                <hr className="w-100" />
                                            </div>

                                            <div className="mb-0 g-2 row">
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div>
                                                        <label className="form-label mb-1">Address :</label>

                                                        <input type="text" className="form-control" placeholder="street" id='street' name='street'
                                                            value={personnelFormData.street}
                                                            onChange={(e) => { handleChange(e); }}
                                                            onBlur={(e) => { }}
                                                        />
                                                        {errors?.street && (
                                                            <div className="text-danger">
                                                                {errors?.street?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div>
                                                        <label className="form-label mb-1">City :</label>

                                                        <input type="text" className="form-control" placeholder="city" id='city' name='city'
                                                            value={personnelFormData.city}
                                                            onChange={(e) => { handleChange(e); }}
                                                            onBlur={(e) => { }}
                                                        />
                                                        {errors?.city && (
                                                            <div className="text-danger">
                                                                {errors?.city?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div>
                                                        <label className="form-label mb-1">State :</label>
                                                        <input type="text" className="form-control" placeholder="state" id='state' name='state'
                                                            value={personnelFormData.state}
                                                            onChange={(e) => { handleChange(e); }}
                                                            onBlur={(e) => { }}
                                                        />
                                                        {errors?.state && (
                                                            <div className="text-danger">
                                                                {errors?.state?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div>
                                                        <label className="form-label mb-1">ZIP CODE :</label>
                                                        <input type="number" className="form-control" placeholder="ZIP CODE" id='zipcode' name='zipcode'
                                                            value={personnelFormData.zipcode}
                                                            onChange={(e) => { handleChange(e); }}
                                                            onBlur={(e) => { }}
                                                        />
                                                        {errors?.zipcode && (
                                                            <div className="text-danger">
                                                                {errors?.zipcode?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className='col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12'>

                                        <div className="formCard">
                                            <div
                                                className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                                                <h3 className="text-nowrap formTitle m-0">Hire details</h3>
                                                <hr className="w-100" />
                                            </div>

                                            <div className="mb-0 g-2 row">


                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div>
                                                        <label className="form-label mb-1">Hire Date:</label>
                                                        <input type="date"
                                                            className="form-control"
                                                            id="doemp" name="doemp"
                                                            value={formatDate(personnelFormData.doemp)}
                                                            onChange={handleChange} />
                                                        {errors?.doemp && (
                                                            <div className="text-danger">
                                                                {errors?.doemp?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div>
                                                        <label className="form-label mb-1">Terminated Date:</label>
                                                        <input type="date"
                                                            className="form-control"
                                                            id="doterm" name="doterm"
                                                            value={formatDate(personnelFormData.doterm)}
                                                            onChange={handleChange} />
                                                        {errors?.doterm && (
                                                            <div className="text-danger">
                                                                {errors?.doterm?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div>
                                                        <label className="form-label mb-1">CBC:</label>
                                                        <input type="date"
                                                            className="form-control"
                                                            id="cbc" name="cbc"
                                                            value={formatDate(personnelFormData.cbc)}
                                                            onChange={handleChange} />
                                                        {errors?.cbc && (
                                                            <div className="text-danger">
                                                                {errors?.cbc?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div>
                                                        <label className="form-label mb-1">Expunge:</label>
                                                        <input type="date"
                                                            className="form-control"
                                                            id="expungeDate" name="expungeDate"
                                                            value={formatDate(personnelFormData.expungeDate)}
                                                            onChange={handleChange} />
                                                        {errors?.expungeDate && (
                                                            <div className="text-danger">
                                                                {errors?.expungeDate?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div>
                                                        <label className="form-label mb-1">Date of Rehire:</label>
                                                        <input type="date"
                                                            className="form-control"
                                                            id="rehired" name="rehired"
                                                            value={formatDate(personnelFormData.rehired)}
                                                            onChange={handleChange} />
                                                        {errors?.rehired && (
                                                            <div className="text-danger">
                                                                {errors?.rehired?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>


                                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div className="d-flex align-items-center gap-2 mb-0">
                                                        <div className="inputDesign position-relative">
                                                            <input
                                                                type="checkbox"
                                                                id="leaves"
                                                                name="leaves"
                                                                className="form-check-input"
                                                                onChange={handleChange}
                                                                checked={personnelFormData.leaves || false} // Ensure it's checked if the value is true
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
                                                            {errors?.leaves && (
                                                                <div className="text-danger">
                                                                    {errors?.leaves?._errors[0]}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <label className="form-label m-0" style={{ fontWeight: personnelFormData.leaves ? 'bold' : 'normal' }}>Leaves</label>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt-0">
                                                    <div>
                                                        <label className="form-label mb-1">Leaves Start:</label>
                                                        <input type="date"
                                                            className="form-control" id="leaveStartDate" name="leaveStartDate"
                                                            value={formatDate(personnelFormData.leaveStartDate)}
                                                            onChange={handleChange} />
                                                        {errors?.leaveStartDate && (
                                                            <div className="text-danger">
                                                                {errors?.leaveStartDate?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt-lg-0 mt-md-0 mt-sm-0">
                                                    <div>
                                                        <label className="form-label mb-1">Leaves End:</label>
                                                        <input type="date" className="form-control" id="leaveEndDate" name="leaveEndDate"
                                                            value={formatDate(personnelFormData.leaveEndDate)}
                                                            onChange={handleChange} />
                                                        {errors?.leaveEndDate && (
                                                            <div className="text-danger">
                                                                {errors?.leaveEndDate?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div className="d-flex align-items-center gap-2 mb-0">
                                                        <div className="inputDesign position-relative">
                                                            <input
                                                                type="checkbox"
                                                                id="suspension"
                                                                name="suspension"
                                                                className="form-check-input"
                                                                onChange={handleChange}
                                                                checked={personnelFormData.suspension || false} // Ensure it's checked if the value is true
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
                                                            {errors?.suspension && (
                                                                <div className="text-danger">
                                                                    {errors?.suspension?._errors[0]}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <label className="form-label m-0" style={{ fontWeight: personnelFormData.suspension ? 'bold' : 'normal' }}>Suspension</label>
                                                    </div>
                                                </div> <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt-0">
                                                    <div>
                                                        <label className="form-label mb-1">Suspension Start:</label>
                                                        <input type="date" className="form-control"
                                                            id="suspensionStartDate" name="suspensionStartDate"
                                                            value={formatDate(personnelFormData.suspensionStartDate)}
                                                            onChange={handleChange} />
                                                        {errors?.suspensionStartDate && (
                                                            <div className="text-danger">
                                                                {errors?.suspensionStartDate?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt-lg-0 mt-md-0 mt-sm-0">
                                                    <div>
                                                        <label className="form-label mb-1">Suspension End:</label>
                                                        <input type="date"
                                                            className="form-control" id="suspensionEndDate" name="suspensionEndDate"
                                                            value={formatDate(personnelFormData.suspensionEndDate)}
                                                            onChange={handleChange} />
                                                        {errors?.suspensionEndDate && (
                                                            <div className="text-danger">
                                                                {errors?.suspensionEndDate?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div>
                                                        <label className="form-label mb-1">Facility ID:</label>
                                                        <input type="number"
                                                            className="form-control" id="stafF_ID" name="stafF_ID"
                                                            value={personnelFormData.stafF_ID}
                                                            onChange={handleChange} />
                                                        {errors?.stafF_ID && (
                                                            <div className="text-danger">
                                                                {errors?.stafF_ID?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div>
                                                        <label className="form-label mb-1">Fingerprint Date:</label>
                                                        <input type="date"
                                                            className="form-control" id="fingerprintDate"
                                                            name="fingerprintDate"
                                                            value={formatDate(personnelFormData.fingerprintDate)}
                                                            onChange={handleChange} />
                                                        {errors?.fingerprintDate && (
                                                            <div className="text-danger">
                                                                {errors?.fingerprintDate?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12'>
                                        <div className="formCard mt-0">
                                            <div
                                                className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                                                <h3 className="text-nowrap formTitle m-0">Other details</h3>
                                                <hr className="w-100" />
                                            </div>
                                            <div className="mb-0 g-2 row">
                                                <div className="mb-0">
                                                    <label className="form-label mb-1">Field Supervisor:</label>
                                                    <input type="text" className="form-control" id="personalFieldSupervisor"
                                                        name="personalFieldSupervisor"
                                                        value={personnelFormData.personalFieldSupervisor}
                                                        onChange={handleChange} />
                                                    {errors?.personalFieldSupervisor && (
                                                        <div className="text-danger">
                                                            {errors?.personalFieldSupervisor?._errors[0]}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mb-0">
                                                    <label className="form-label mb-1">Field Trainer:</label>
                                                    <input type="text" className="form-control" id="personalFieldTrainer" name="personalFieldTrainer"
                                                        value={personnelFormData.personalFieldTrainer}
                                                        onChange={handleChange} />
                                                    {errors?.personalFieldTrainer && (
                                                        <div className="text-danger">
                                                            {errors?.personalFieldTrainer?._errors[0]}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mb-0">
                                                    <label className="form-label mb-1">HHC:</label>
                                                    <input type="text" className="form-control" id="personalHHC" name="personalHHC"
                                                        value={personnelFormData.personalHHC}
                                                        onChange={handleChange} />
                                                    {errors?.personalHHC && (
                                                        <div className="text-danger">
                                                            {errors?.personalHHC?._errors[0]}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* <div className="mb-0">
                                                    <label className="form-label mb-1">Schedule Comment:</label>
                                                    <textarea className="form-control" id="comment" name="comment"
                                                        value={personnelFormData.comment}
                                                        rows={4}
                                                        onChange={handleChange}></textarea>
                                                    {errors?.comment && (
                                                        <div className="text-danger">
                                                            {errors?.comment?._errors[0]}
                                                        </div>
                                                    )}
                                                </div> */}

                                                <div className="col-12 d-flex align-items-center gap-3">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <div className="inputDesign position-relative">
                                                            <input
                                                                type="checkbox"
                                                                id="rehireable"
                                                                name="rehireable"
                                                                className="form-check-input"
                                                                onChange={handleChange}
                                                                checked={personnelFormData.rehireable || false} // Ensure it's checked if the value is true
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
                                                            {errors?.rehireable && (
                                                                <div className="text-danger">
                                                                    {errors?.rehireable?._errors[0]}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <label className="form-label m-0" style={{ fontWeight: personnelFormData.rehireable ? 'bold' : 'normal' }}>Not Eligible For Rehire</label>
                                                    </div>
                                                    {/* <div className="d-flex align-items-center gap-2">
                                        <div className="inputDesign position-relative">
                                            <input
                                                type="checkbox"
                                                id="Hidden"
                                                name="Hidden"
                                                className="form-check-input"
                                                onChange={handleChange}
                                                checked={personnelFormData.Hidden || false} // Ensure it's checked if the value is true
                                            />
                                            <div className="checked">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                    <path d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                            <div className="Unchecked">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                    <path d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z" stroke="#A4A4A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                            {errors?.Hidden && (
                                                <div className="text-danger">
                                                    {errors?.Hidden?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                        <label className="form-label m-0">Hidden</label>
                                    </div> */}
                                                </div>



                                                {/* <div className="col-12">
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="inputDesign position-relative">
                                            <input
                                                type="checkbox"
                                                id="Hidden"
                                                name="Hidden"
                                                className="form-check-input"
                                                onChange={handleChange}
                                            checked={personnelFormData.Hidden || false} // Ensure it's checked if the value is true
                                            />
                                            <div className="checked">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                    <path d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                            <div className="Unchecked">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                    <path d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z" stroke="#A4A4A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                        <label className="form-label m-0">Hidden</label>
                                    </div>
                                </div> */}

                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12'>
                                        <div className="formCard h-100 mt-0">
                                            <div
                                                className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                                                <h3 className="text-nowrap formTitle m-0">Other details</h3>
                                                <hr className="w-100" />
                                            </div>
                                            <div className="mb-0 g-2 h-100 row">
                                                <div className="mb-0">
                                                    <label className="form-label mb-1">Schedule Comment:</label>
                                                    <textarea className="form-control textareHeight" id="comment" name="comment"
                                                        value={personnelFormData.comment}
                                                        rows={4}
                                                        onChange={handleChange}></textarea>
                                                    {errors?.comment && (
                                                        <div className="text-danger">
                                                            {errors?.comment?._errors[0]}
                                                        </div>
                                                    )}
                                                </div>



                                                {/* <div className="col-12">
<div className="d-flex align-items-center gap-2">
    <div className="inputDesign position-relative">
        <input
            type="checkbox"
            id="Hidden"
            name="Hidden"
            className="form-check-input"
            onChange={handleChange}
        checked={personnelFormData.Hidden || false} // Ensure it's checked if the value is true
        />
        <div className="checked">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>
        <div className="Unchecked">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z" stroke="#A4A4A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>
    </div>
    <label className="form-label m-0">Hidden</label>
</div>
</div> */}

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasicInfoForm;