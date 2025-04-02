import React from 'react'
import { HandleChange } from '../../../../types/types';
import { ISite } from '../../../../interface/Sites';

interface AdditionalInfoFormProps {
    siteFormData: ISite;
    errors: any;
    handleChange: HandleChange;
}

const AdditionalInfoForm: React.FC<AdditionalInfoFormProps> = ({ siteFormData, errors, handleChange }) => {

    return (
        <div className="tab-pane fade show active pb-0" id="nav-additional" role="tabpanel"
            aria-labelledby="nav-additional-tab" tabIndex={0}>
            <div className="row justify-content-center m-0">
                <div className="col-12">
                    <form action="" method="post" className="DistrictForm">

                        <div className='row g-3'>
                            <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12'>
                                <div className="formCard mt-0">
                                    <div
                                        className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                                        <h3 className="text-nowrap formTitle m-0">Police
                                        </h3>
                                        <hr className="w-100" />
                                        
                                    </div>
                                    <div className="mb-2 row g-2">
                                        {/* <div
                                    className="col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="mb-0">
                                        <label className="form-label mb-1">Name
                                            :</label>
                                        <input type="text"
                                            className="form-control"
                                            placeholder="" id='policeName' name='policeName'
                                            value={siteFormData.policeName}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                            onBlur={(e) => {
                                                
                                            }}
                                        />
                                        {errors?.policeName && (
                                            <div className="invalid-feedback">
                                                {errors?.policeName?._errors[0]}
                                            </div>
                                        )}
                                    </div>
                                </div> */}
                                        <div
                                            className="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="mb-0">
                                                <label className="form-label mb-1">Phone
                                                    :</label>
                                                <input type="number"
                                                    className="form-control"
                                                    placeholder="" id='policePhone' name='policePhone'
                                                    value={siteFormData.policePhone}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                    onBlur={(e) => {

                                                    }}
                                                />
                                                {errors?.policePhone && (
                                                    <div className="invalid-feedback">
                                                        {errors?.policePhone?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-0 row g-2">
                                        <div
                                            className="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="mb-0">
                                                <label
                                                    className="form-label mb-1">Address
                                                    line
                                                    1 :</label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="" id='policeAddress1'
                                                    name='policeAddress1'
                                                    value={siteFormData.policeAddress1}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                    onBlur={(e) => {

                                                    }}
                                                />
                                                {errors?.policeAddress1 && (
                                                    <div className="invalid-feedback">
                                                        {errors?.policeAddress1?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="mb-0">
                                                <label
                                                    className="form-label mb-1">Address
                                                    line
                                                    2 :</label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="" id="policeAddress2" name='policeAddress2'
                                                    value={siteFormData.policeAddress2}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                    onBlur={(e) => {

                                                    }}
                                                />
                                                {errors?.policeAddress2 && (
                                                    <div className="invalid-feedback">
                                                        {errors?.policeAddress2?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="mb-0">
                                                <label
                                                    className="form-label mb-1">Address
                                                    line
                                                    3 :</label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="" id="policeAddress3" name='policeAddress3'
                                                    value={siteFormData.policeAddress3}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                    onBlur={(e) => {

                                                    }}
                                                />
                                                {errors?.policeAddress3 && (
                                                    <div className="invalid-feedback">
                                                        {errors?.policeAddress3?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="formCard mt-3">
                                    <div
                                        className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                                        <h3 className="text-nowrap formTitle m-0">Fire</h3>
                                        <hr className="w-100" />
                                        
                                    </div>
                                    <div className="mb-2 row g-2">
                                        {/* <div
                                    className="col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="mb-0">
                                        <label className="form-label mb-1">Name
                                            :</label>
                                        <input type="text"
                                            className="form-control"
                                            placeholder="" id="fireName" name='fireName'
                                            value={siteFormData.fireName}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                            onBlur={(e) => {
                                                
                                            }}
                                        />
                                        {errors?.fireName && (
                                            <div className="invalid-feedback">
                                                {errors?.fireName?._errors[0]}
                                            </div>
                                        )}
                                    </div>
                                </div> */}
                                        <div
                                            className="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="mb-0">
                                                <label className="form-label mb-1">Phone
                                                    :</label>
                                                <input type="number"
                                                    className="form-control"
                                                    placeholder="" id="firePhone" name='firePhone'
                                                    value={siteFormData.firePhone}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                    onBlur={(e) => {

                                                    }}
                                                />
                                                {errors?.firePhone && (
                                                    <div className="invalid-feedback">
                                                        {errors?.firePhone?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-0 row g-2">
                                        <div
                                            className="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="mb-0">
                                                <label
                                                    className="form-label mb-1">Address
                                                    line
                                                    1 :</label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="" id="fireAddress1" name='fireAddress1'
                                                    value={siteFormData.fireAddress1}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                    onBlur={(e) => {

                                                    }}
                                                />
                                                {errors?.fireAddress1 && (
                                                    <div className="invalid-feedback">
                                                        {errors?.fireAddress1?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="mb-0">
                                                <label
                                                    className="form-label mb-1">Address
                                                    line
                                                    2 :</label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="" id="fireAddress2" name='fireAddress2'
                                                    value={siteFormData.fireAddress2}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                    onBlur={(e) => {

                                                    }}
                                                />
                                                {errors?.fireAddress2 && (
                                                    <div className="invalid-feedback">
                                                        {errors?.fireAddress2?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="mb-0">
                                                <label
                                                    className="form-label mb-1">Address
                                                    line
                                                    3 :</label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="" id="fireAddress3" name='fireAddress3'
                                                    value={siteFormData.fireAddress3}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                    onBlur={(e) => {

                                                    }}
                                                />
                                                {errors?.fireAddress3 && (
                                                    <div className="invalid-feedback">
                                                        {errors?.fireAddress3?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12'>
                                <div className="formCard mt-0">
                                    <div
                                        className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                                        <h3 className="text-nowrap formTitle m-0">Others
                                        </h3>
                                        <hr className="w-100" />
                                        
                                    </div>
                                    <div className="mb-2">
                                        <label
                                            className="form-label mb-1">Land
                                            line location :</label>
                                        <input type="text" className="form-control"
                                            placeholder="" id="landlineLocation" name='landlineLocation'
                                            value={siteFormData.landlineLocation}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                            onBlur={(e) => {

                                            }}
                                        />
                                        {errors?.landlineLocation && (
                                            <div className="invalid-feedback">
                                                {errors?.landlineLocation?._errors[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-2 row g-2">
                                        <div
                                            className="col-lg-12 col-md-12 col-sm-12 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <label className="form-label mb-1">OCFS
                                                    :</label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="" id="dssRep" name='dssRep'
                                                    value={siteFormData.dssRep}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                    onBlur={(e) => {

                                                    }}
                                                />
                                                {errors?.dssRep && (
                                                    <div className="invalid-feedback">
                                                        {errors?.dssRep?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-12 col-md-12 col-sm-12 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <label className="form-label mb-1">Available :</label>
                                                <input type="number"
                                                    className="form-control"
                                                    placeholder="240-2551" id="dssPhone" name='dssPhone'
                                                    value={siteFormData.dssPhone}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                    onBlur={(e) => {

                                                    }}
                                                />
                                                {errors?.dssPhone && (
                                                    <div className="invalid-feedback">
                                                        {errors?.dssPhone?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-2 row g-2">
                                        <div
                                            className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <label
                                                    className="form-label mb-1">Transportation
                                                    :</label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="" id="transport" name='transport'
                                                    value={siteFormData.transport}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                    onBlur={(e) => {

                                                    }}
                                                />
                                                {errors?.transport && (
                                                    <div className="invalid-feedback">
                                                        {errors?.transport?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <input type="number"
                                                    className="form-control"
                                                    placeholder="516-478-5771" id="transportPhone" name='transportPhone'
                                                    value={siteFormData.transportPhone}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                    onBlur={(e) => {

                                                    }}
                                                />
                                                {errors?.transportPhone && (
                                                    <div className="invalid-feedback">
                                                        {errors?.transportPhone?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-2 row g-2">
                                        <div
                                            className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <label
                                                    className="form-label mb-1">Security
                                                    :</label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="" id="security" name='security'
                                                    value={siteFormData.security}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                    onBlur={(e) => {

                                                    }}
                                                />
                                                {errors?.security && (
                                                    <div className="invalid-feedback">
                                                        {errors?.security?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <input type="number"
                                                    className="form-control"
                                                    placeholder="516-228-5232" id="securityPhone" name='securityPhone'
                                                    value={siteFormData.securityPhone}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                    onBlur={(e) => {

                                                    }}
                                                />
                                                {errors?.securityPhone && (
                                                    <div className="invalid-feedback">
                                                        {errors?.securityPhone?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-2"> <label
                                        className="form-label mb-1">Shelter-in-Place
                                        Location :</label>
                                        <input type="text" className="form-control"
                                            placeholder="" id="safePlace" name='safePlace'
                                            value={siteFormData.safePlace}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                            onBlur={(e) => {

                                            }}
                                        />
                                        {errors?.safePlace && (
                                            <div className="invalid-feedback">
                                                {errors?.safePlace?._errors[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-2"> <label
                                        className="form-label mb-1">Outside safe
                                        place
                                        :</label>
                                        <input type="text" className="form-control"
                                            placeholder="" id="ossPlace" name='ossPlace'
                                            value={siteFormData.ossPlace}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                            onBlur={(e) => {

                                            }}
                                        />
                                        {errors?.ossPlace && (
                                            <div className="invalid-feedback">
                                                {errors?.ossPlace?._errors[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-0"> <label
                                        className="form-label mb-1">Ambulance
                                        :</label>
                                        <input type="number" className="form-control"
                                            placeholder="" id="ambulancePhone" name='ambulancePhone'
                                            value={siteFormData.ambulancePhone}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                            onBlur={(e) => {

                                            }}
                                        />
                                        {errors?.ambulancePhone && (
                                            <div className="invalid-feedback">
                                                {errors?.ambulancePhone?._errors[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12'>
                                <div className="formCard mt-0">
                                    <div
                                        className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                                        <h3 className="text-nowrap formTitle m-0">Evacuation
                                            -
                                            Location #1</h3>
                                        <hr className="w-100" />
                                        
                                    </div>
                                    {/* <div className="mb-3">
                                <label
                                    className="form-label mb-1">Location
                                    :</label>
                                <input type="text" className="form-control"
                                    placeholder="" id="evacuation1Location" name='evacuation1Location'
                                    value={siteFormData.evacuation1Location}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    onBlur={(e) => {

                                    }}
                                />
                                {errors?.evacuation1Location && (
                                    <div className="invalid-feedback">
                                        {errors?.evacuation1Location?._errors[0]}
                                    </div>
                                )}
                            </div> */}
                                    <div className="mb-2">
                                        <label
                                            className="form-label mb-1">Location :</label>
                                        <input type="number" className="form-control"
                                            placeholder="" id="evacuation1Phone" name='evacuation1Phone'
                                            value={siteFormData.evacuation1Phone}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                            onBlur={(e) => {

                                            }}
                                        />
                                        {errors?.evacuation1Phone && (
                                            <div className="invalid-feedback">
                                                {errors?.evacuation1Phone?._errors[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-2">
                                        <label
                                            className="form-label mb-1">Phone
                                            :</label>
                                        <input type="number" className="form-control"
                                            placeholder="" id="evacuation1Phone" name='evacuation1Phone'
                                            value={siteFormData.evacuation1Phone}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                            onBlur={(e) => {

                                            }}
                                        />
                                        {errors?.evacuation1Phone && (
                                            <div className="invalid-feedback">
                                                {errors?.evacuation1Phone?._errors[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div
                                        className="col-lg-12 col-md-12 col-sm-12 col-12 d-flex align-items-end">
                                        <div className="mb-0 w-100">
                                            <label
                                                className="form-label mb-1">Address
                                                line
                                                1 :</label>
                                            <input type="text"
                                                className="form-control"
                                                placeholder="" id="evacuation1Address1" name='evacuation1Address1'
                                                value={siteFormData.evacuation1Address1}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                }}
                                                onBlur={(e) => {

                                                }}
                                            />
                                            {errors?.evacuation1Address1 && (
                                                <div className="invalid-feedback">
                                                    {errors?.evacuation1Address1?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-2 row g-2">
                                        <div
                                            className="col-lg-12 col-md-12 col-sm-12 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <label
                                                    className="form-label mb-1">Address
                                                    line
                                                    2 :</label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="" id="evacuation1Address2" name='evacuation1Address2'
                                                    value={siteFormData.evacuation1Address2}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                    onBlur={(e) => {

                                                    }}
                                                />
                                                {errors?.evacuation1Address2 && (
                                                    <div className="invalid-feedback">
                                                        {errors?.evacuation1Address2?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {/* <div
                                            className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <label
                                                    className="form-label mb-1">Address
                                                    line
                                                    3 :</label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="" id="evacuation1Address3" name='evacuation1Address3'
                                                    value={siteFormData.evacuation1Address3}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                    onBlur={(e) => {

                                                    }}
                                                />
                                                {errors?.evacuation1Address3 && (
                                                    <div className="invalid-feedback">
                                                        {errors?.evacuation1Address3?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="formCard mt-3">
                                    <div
                                        className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                                        <h3 className="text-nowrap formTitle m-0">Evacuation
                                            -
                                            Location #2</h3>
                                        <hr className="w-100" />
                                        
                                    </div>
                                    {/* <div className="mb-3"> 
                                <label
                                className="form-label mb-1">Location
                                :</label>
                                <input type="text" className="form-control"
                                    placeholder="" id="evacuation2Location" name='evacuation2Location'
                                    value={siteFormData.evacuation2Location}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    onBlur={(e) => {

                                    }}
                                />
                                {errors?.evacuation2Location && (
                                    <div className="invalid-feedback">
                                        {errors?.evacuation2Location?._errors[0]}
                                    </div>
                                )}
                            </div> */}
                                    <div className="mb-2">
                                        <label
                                            className="form-label mb-1">Location :</label>
                                        <input type="number" className="form-control"
                                            placeholder="" id="evacuation1Phone" name='evacuation1Phone'
                                            value={siteFormData.evacuation1Phone}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                            onBlur={(e) => {

                                            }}
                                        />
                                        {errors?.evacuation1Phone && (
                                            <div className="invalid-feedback">
                                                {errors?.evacuation1Phone?._errors[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-2"> <label
                                        className="form-label mb-1">Phone
                                        :</label>
                                        <input type="number" className="form-control"
                                            placeholder="" id="evacuation2Phone" name='evacuation2Phone'
                                            value={siteFormData.evacuation2Phone}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                            onBlur={(e) => {

                                            }}
                                        />
                                        {errors?.evacuation2Phone && (
                                            <div className="invalid-feedback">
                                                {errors?.evacuation2Phone?._errors[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-2 row g-2">
                                        <div
                                            className="col-lg-12 col-md-12 col-sm-12 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <label
                                                    className="form-label mb-1">Address
                                                    line
                                                    1 :</label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="" id="evacuation2Address1" name='evacuation2Address1'
                                                    value={siteFormData.evacuation2Address1}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                    onBlur={(e) => {

                                                    }}
                                                />
                                                {errors?.evacuation2Address1 && (
                                                    <div className="invalid-feedback">
                                                        {errors?.evacuation2Address1?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-12 col-md-12 col-sm-12 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <label
                                                    className="form-label mb-1">Address
                                                    line
                                                    2 :</label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="" id="evacuation2Address2" name='evacuation2Address2'
                                                    value={siteFormData.evacuation2Address2}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                    onBlur={(e) => {

                                                    }}
                                                />
                                                {errors?.evacuation2Address2 && (
                                                    <div className="invalid-feedback">
                                                        {errors?.evacuation2Address2?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {/* <div
                                            className="col-lg-12 col-md-12 col-sm-12 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <label
                                                    className="form-label mb-1">Address
                                                    line
                                                    3 :</label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="" id="evacuation2Address3" name='evacuation2Address3'
                                                    value={siteFormData.evacuation2Address3}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                    onBlur={(e) => {

                                                    }}
                                                />
                                                {errors?.evacuation2Address3 && (
                                                    <div className="invalid-feedback">
                                                        {errors?.evacuation2Address3?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>

                            <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12'>
                                <div className="formCard mt-0">
                                    <div
                                        className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                                        <h3 className="text-nowrap formTitle m-0">Additional
                                            Information</h3>
                                        <hr className="w-100" />
                                        
                                    </div>
                                    <div className="mb-2"> <label
                                        className="form-label mb-1">Lock
                                        Down Instruction :</label>
                                        <textarea className="form-control"
                                            placeholder="" rows={5} id="lockdown" name='lockdown'
                                            value={siteFormData.lockdown}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                        // onBlur={(e) => {
                                        //     
                                        // }}
                                        />
                                        {errors?.lockdown && (
                                            <div className="invalid-feedback">
                                                {errors?.lockdown?._errors[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-2"> <label
                                        className="form-label mb-1">Building
                                        Entrance Info
                                        :</label>
                                        <textarea className="form-control"
                                            placeholder="" rows={5} id="emergency" name='emergency'
                                            value={siteFormData.emergency}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                        // onBlur={(e) => {
                                        //     
                                        // }}
                                        />
                                        {errors?.emergency && (
                                            <div className="invalid-feedback">
                                                {errors?.emergency?._errors[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-0"> <label
                                        className="form-label mb-1">Additional
                                        Emergency
                                        Information :</label>
                                        <textarea className="form-control"
                                            placeholder="" rows={16} id="additionalEmergencyInfo" name='additionalEmergencyInfo'
                                            value={siteFormData.additionalEmergencyInfo}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                        // onBlur={(e) => {
                                        //     
                                        // }}
                                        />
                                        {errors?.additionalEmergencyInfo && (
                                            <div className="invalid-feedback">
                                                {errors?.additionalEmergencyInfo?._errors[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div >
        </div >
    )
}

export default AdditionalInfoForm