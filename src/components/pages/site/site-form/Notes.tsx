import React from 'react'
import { ISite } from '../../../../interface/Sites';
import { HandleChange } from '../../../../types/types';

interface NotesFormProps {
    siteFormData: ISite;
    errors: any;
    handleChange: HandleChange;
}
const Notes: React.FC<NotesFormProps> = ({ siteFormData, errors, handleChange }) => {

    return (
        <div className="tab-pane fade show active" id="nav-notes" role="tabpanel"
            aria-labelledby="nav-notes-tab" tabIndex={0}>

            <div className="row justify-content-center m-0">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    {/* <div className="formCard"> */}
                        <form className="DistrictForm">

                            <div
                                className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-2 mb-md-2 mb-2">
                                <h3 className="text-nowrap formTitle m-0">Notes :
                                </h3>
                            </div>
                            <div className="DistrictForm">
                                <div className="mb-0">
                                    {/* <label className="form-label">Notes :</label> */}
                                    <textarea className="form-control"
                                        placeholder="please enter the site note"
                                        rows={21} id='notes' name='notes'
                                        value={siteFormData.notes}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    // onBlur={(e) => {
                                    //     handleBlur(e);
                                    // }}
                                    />
                                    {errors?.notes && (
                                        <div className="invalid-feedback">
                                            {errors?.notes?._errors[0]}
                                        </div>
                                    )}
                                </div>
                            </div >
                        </form>
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default Notes