import React from 'react'

interface BasicInfoFormProps {
  siteFormData: any;
  errors: any;
  handleChange: any;
}
const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ siteFormData, errors, handleChange }) => {
  const formatDate = (dateString: any) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Format in YYYY-MM-DD
  };
  return (
    <div className="tab-pane fade show active pb-0" id="nav-basicinfo"
      role="tabpanel" aria-labelledby="nav-basicinfo-tab"
      tabIndex={0}>
      <div className="row justify-content-center m-0">
        <div className="col-12">
          <form method="post" className="DistrictForm">

            <div className='row g-3'>

              <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12'>

                <div className="formCard">
                  <div
                    className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                    <h3 className="text-nowrap formTitle m-0">Permit
                      Details
                    </h3>
                    <hr className="w-100" />

                    {/* <div className="editForm">
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
                  <div className="mb-2">
                    <label className="form-label mb-1">Site
                      :</label>
                    <div className="districtTable d-flex align-items-start gap-2">
                      <div className='numInput'>
                        <input type="number" className="form-control"
                          placeholder=""
                          id='siteNumber'
                          name='siteNumber'
                          value={siteFormData.siteNumber}
                          onChange={(e) => {
                            handleChange(e);
                          }}

                        />
                        {errors?.siteNumber && (
                          <span
                            style={{
                              fontSize: '12px',
                              lineHeight: '15px',
                              color: 'red',
                              whiteSpace: 'pre-line',
                            }}
                          >
                            {errors?.siteNumber?._errors[0]}
                          </span>
                        )}
                      </div>


                      <div className='w-100'>
                        <input type="text" className="form-control w-100"
                          placeholder="" id='siteName'
                          name='siteName'
                          value={siteFormData.siteName}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                        {errors?.siteName && (
                          <span
                            style={{
                              fontSize: '12px',
                              color: 'red',
                            }}
                          >
                            {errors?.siteName?._errors[0]}
                          </span>
                        )}
                      </div>

                    </div>
                    {/* <div style={{ display: 'flex', flexDirection: 'column' }}>


</div> */}
                  </div>
                  <div className="mb-2">
                    <label className="form-label mb-1">Permit
                      :</label>
                    <input type="text"
                      className="form-control"
                      placeholder=""
                      id='permit'
                      name='permit'
                      value={siteFormData.permit}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={(e) => {

                      }}
                    />
                    {errors?.permit && (
                      <div className="text-danger">
                        {errors?.permit?._errors[0]}
                      </div>
                    )}
                  </div>
                  <div className="mb-0 row g-lg-2 g-md-2 g-2">
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div
                        className="mb-lg-0 mb-md-0 mb-sm-0 mb-0">
                        <label
                          className="form-label mb-1">Issued :
                        </label>
                        <input type="date"
                          className="form-control"
                          placeholder=""
                          id='issued'
                          name='issued'
                          value={formatDate(siteFormData.issued)}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.issued && (
                          <div className="text-danger">
                            {errors?.issued?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="mb-0">
                        <label
                          className="form-label mb-1">Expires :</label>
                        <input type="date"
                          className="form-control"
                          placeholder="" id='expires'
                          name='expires'
                          value={formatDate(siteFormData.expires)}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.expires && (
                          <div className="text-danger">
                            {errors?.expires?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="mb-0">
                        <label
                          className="form-label mb-1">Address1 :</label>
                        <input type="text"
                          className="form-control"
                          placeholder="" id='address1'
                          name='address1'
                          value={siteFormData.address1}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.address1 && (
                          <div className="text-danger">
                            {errors?.address1?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="mb-0">
                        <label
                          className="form-label mb-1">Address2 :</label>
                        <input type="text"
                          className="form-control"
                          placeholder="" id='address2'
                          name='address2'
                          value={siteFormData.address2}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.address2 && (
                          <div className="text-danger">
                            {errors?.address2?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="mb-0">
                        <label
                          className="form-label mb-1">Address3 :</label>
                        <input type="text"
                          className="form-control"
                          placeholder="" id='address3'
                          name='address3'
                          value={siteFormData.address3}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.address3 && (
                          <div className="text-danger">
                            {errors?.address3?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="formCard mt-3">
                  <div
                    className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                    <h3 className="text-nowrap formTitle m-0">Contact

                    </h3>
                    <hr className="w-100" />


                    {/* <div className="editForm">
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
                  <div className="mb-2">
                    <label className="form-label mb-1">Principal :
                    </label>
                    <input type="text" className="form-control"
                      placeholder=""
                      id='principal'
                      name='principal'
                      value={siteFormData.principal}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={(e) => {

                      }}
                    />
                    {errors?.principal && (
                      <div className="text-danger">
                        {errors?.principal?._errors[0]}
                      </div>
                    )}
                  </div>

                  <div className="mb-2 row g-2">
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div
                        className="mb-lg-0 mb-md-0 mb-sm-0 mb-0">
                        <label
                          className="form-label mb-1">School Phone :
                        </label>
                        <input type="number"
                          className="form-control"
                          placeholder=""
                          id='schoolPhone'
                          name='schoolPhone'
                          value={siteFormData.schoolPhone}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.schoolPhone && (
                          <div className="text-danger">
                            {errors?.schoolPhone?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="mb-0">
                        <label
                          className="form-label mb-1">School Fax :</label>
                        <input type="text"
                          className="form-control"
                          placeholder="" id='sFax'
                          name='sFax'
                          value={siteFormData.sFax}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.sFax && (
                          <div className="text-danger">
                            {errors?.sFax?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-0">
                    <label className="form-label mb-1">E-mail
                      :</label>
                    <input type="email"
                      className="form-control"
                      placeholder=""
                      id='parentEmail'
                      name='parentEmail'
                      value={siteFormData.parentEmail}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={(e) => {

                      }}
                    />
                    {errors?.parentEmail && (
                      <div className="text-danger">
                        {errors?.parentEmail?._errors[0]}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12'>
                <div className="formCard">
                  <div
                    className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                    <h3 className="text-nowrap formTitle m-0">Site details
                    </h3>
                    <hr className="w-100" />

                    {/* <div className="editForm">
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
                  <div className="mb-2">
                    <label className="form-label mb-1">Grade Levels
                      :</label>
                    <input type="text" className="form-control"
                      placeholder="" id='gradeLevels'
                      name='gradeLevels'
                      value={siteFormData.gradeLevels}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={(e) => {

                      }}
                    />
                    {errors?.gradeLevels && (
                      <div className="text-danger">
                        {errors?.gradeLevels?._errors[0]}
                      </div>
                    )}
                  </div>
                  <div className="mb-2 row g-2">
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div
                        className="mb-lg-0 mb-md-0 mb-sm-0 mb-0">
                        <label className="form-label mb-1">Start
                          time
                          :</label>
                        <input type="time"
                          className="form-control"
                          placeholder=""
                          id='startTime'
                          name='startTime'
                          value={siteFormData.startTime}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.startTime && (
                          <div className="text-danger">
                            {errors?.startTime?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="mb-0">
                        <label className="form-label mb-1">End
                          time
                          :</label>
                        <input type="time"
                          className="form-control"
                          placeholder=""
                          id='stopTime'
                          name='stopTime'
                          value={siteFormData.stopTime}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.stopTime && (
                          <div className="text-danger">
                            {errors?.stopTime?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 row g-2">
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div
                        className="mb-lg-0 mb-md-0 mb-sm-0 mb-0">
                        <label
                          className="form-label mb-1">Opened
                          :</label>
                        <input type="date"
                          className="form-control"
                          placeholder="" id='started'
                          name='started'
                          value={formatDate(siteFormData.started)}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.started && (
                          <div className="text-danger">
                            {errors?.started?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="mb-0">
                        <label
                          className="form-label mb-1">Closed
                          :</label>
                        <input type="date"
                          className="form-control"
                          placeholder=""
                          id='closed'
                          name='closed'
                          value={formatDate(siteFormData.closed)}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.closed && (
                          <div className="text-danger">
                            {errors?.closed?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 row g-2">
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div
                        className="mb-lg-0 mb-md-0 mb-sm-0 mb-0">
                        <label className="form-label mb-1">Start
                          date:</label>
                        <input type="date"
                          className="form-control"
                          placeholder="" id='startDate'
                          name='startDate'
                          value={formatDate(siteFormData.startDate)}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.startDate && (
                          <div className="text-danger">
                            {errors?.startDate?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="mb-0">
                        <label
                          className="form-label mb-1">Waiver
                          Expires :</label>
                        <input type="date"
                          className="form-control"
                          placeholder=""
                          id='waiverExp'
                          name='waiverExp'
                          value={formatDate(siteFormData.waiverExp)}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.waiverExp && (
                          <div className="text-danger">
                            {errors?.waiverExp?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 row g-2">
                    <div
                      className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <label className="form-label mb-1">Label
                        :</label>
                      <div
                        className="d-flex align-items-center mt-0 gap-4">
                        <div
                          className="d-flex checked align-items-center gap-2">
                          <div
                            className="inputDesign position-relative">
                            <input type="checkbox"
                              id="preKindergarten"
                              name="preKindergarten"
                              // value="Nassau"
                              checked={siteFormData.preKindergarten}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              onBlur={(e) => {

                              }}
                            />

                            <div className="checked">
                              <svg xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
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
                                width="24"
                                height="25"
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
                            className="form-label m-0" style={{ fontWeight: siteFormData.preKindergarten ? 'bold' : 'normal' }}>PK</label>
                          {errors?.preKindergarten && (
                            <div className="text-danger">
                              {errors?.preKindergarten?._errors[0]}
                            </div>
                          )}
                        </div>

                        <div
                          className="d-flex align-items-center gap-2">
                          <div
                            className="inputDesign position-relative">
                            <input type="checkbox"
                              id="universalPreKindergarten"
                              name="universalPreKindergarten"
                              checked={siteFormData.universalPreKindergarten}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              onBlur={(e) => {

                              }}
                            />
                            <div className="checked">
                              <svg xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
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
                                width="24"
                                height="25"
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
                            className="form-label m-0" style={{ fontWeight: siteFormData.universalPreKindergarten ? 'bold' : 'normal' }}>UPK</label>
                          {errors?.universalPreKindergarten && (
                            <div className="text-danger">
                              {errors?.universalPreKindergarten?._errors[0]}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="mb-0">
                        <label className="form-label mb-1">Type
                          :</label>
                        <input type="number"
                          className="form-control"
                          placeholder="" id='type'
                          name='type'
                          value={siteFormData.type}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.type && (
                          <div className="text-danger">
                            {errors?.type?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 row g-2">
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="mb-0">
                        <label className="form-label mb-1">Classification
                          :</label>
                        <select className="form-select"
                          aria-label="Default select example"
                          id='class'
                          name='class'
                          value={siteFormData.class}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        // onBlur={(e) => {
                        //   handleBlur(e as React.FocusEvent<HTMLSelectElement,, Element>);
                        // }}
                        >
                          <option selected>Select
                          </option>
                          <option value="1">BS</option>
                          <option value="2">AS</option>
                          <option value="3">PS</option>
                          <option value="4">DC</option>
                          <option value="5">EK</option>
                        </select>
                        {errors?.class && (
                          <div className="text-danger">
                            {errors?.class?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="mb-0">
                        <label className="form-label mb-1">When
                          :</label>
                        <select className="form-select"
                          aria-label="Default select example"
                          id='when'
                          name='when'
                          value={siteFormData.when}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        // onBlur={(e) => {
                        //   handleBlur(e as React.FocusEvent<HTMLSelectElement,, Element>);
                        // }}
                        >
                          <option selected>Select
                          </option>
                          <option value="1">A</option>
                          <option value="2">B</option>
                          <option value="3">D</option>
                        </select>
                        {errors?.when && (
                          <div className="text-danger">
                            {errors?.when?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-0 row g-2">
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="mb-0">
                        <label className="form-label mb-1">Lic
                          cap
                          :</label>
                        <input type="text"
                          className="form-control"
                          placeholder="" id='capacity'
                          name='capacity'
                          value={siteFormData.capacity}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.capacity && (
                          <div className="text-danger">
                            {errors?.capacity?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="mb-0">
                        <label className="form-label mb-1">Sit
                          cap
                          :</label>
                        <input type="text"
                          className="form-control"
                          placeholder="" id='siteCapacity'
                          name='siteCapacity'
                          value={siteFormData.siteCapacity}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.siteCapacity && (
                          <div className="text-danger">
                            {errors?.siteCapacity?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12'>
                <div className="formCard">
                  <div
                    className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                    <h3 className="text-nowrap formTitle m-0">Scope
                      Contact
                      details</h3>
                    <hr className="w-100" />

                    {/* <div className="editForm">
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

                  <div className="mb-2 row g-2">
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="mb-0">
                        <label className="form-label mb-1">Phone
                          :</label>
                        <input type="number"
                          className="form-control"
                          placeholder="" id='phone'
                          name='phone'
                          value={siteFormData.phone}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.phone && (
                          <div className="text-danger">
                            {errors?.phone?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="mb-0">
                        <label
                          className="form-label mb-1">Available
                          :</label>
                        <input type="text"
                          className="form-control"
                          placeholder="" id='timeAvailable'
                          name='timeAvailable'
                          value={siteFormData.timeAvailable}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.timeAvailable && (
                          <div className="text-danger">
                            {errors?.timeAvailable?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <label className="form-label mb-1">E-mail
                      :</label>
                    <input type="email" className="form-control"
                      placeholder="scope.emdaycare@scopeonline.us" id='scopeEmail'
                      name='scopeEmail'
                      value={siteFormData.scopeEmail}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={(e) => {

                      }}
                    />
                    {errors?.scopeEmail && (
                      <div className="text-danger">
                        {errors?.scopeEmail?._errors[0]}
                      </div>
                    )}
                  </div>
                  <div className="mb-0">
                    <label className="form-label mb-1">Scope Fax
                      :</label>
                    <input type="text" className="form-control"
                      placeholder="" id='scopeFax'
                      name='scopeFax'
                      value={siteFormData.scopeFax}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={(e) => {

                      }}
                    />
                    {errors?.scopeFax && (
                      <div className="text-danger">
                        {errors?.scopeFax?._errors[0]}
                      </div>
                    )}
                  </div>

                </div>
                <div className="formCard mt-3">
                  <div
                    className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                    <h3 className="text-nowrap formTitle m-0">Other
                      details</h3>
                    <hr className="w-100" />

                    {/* <div className="editForm">
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


                  <div className="mb-0 row g-2">
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="mb-2">
                        <label className="form-label mb-1">Nurse
                          Visit 1
                          :</label>
                        <input type="date"
                          className="form-control"
                          placeholder="" id='nurseVisit'
                          name='nurseVisit'
                          value={formatDate(siteFormData.nurseVisit)}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.nurseVisit && (
                          <div className="text-danger">
                            {errors?.nurseVisit?._errors[0]}
                          </div>
                        )}
                      </div>
                      <div className="mb-0">
                        <label className="form-label mb-1">Nurse
                          Visit 2
                          :</label>
                        <input type="date"
                          className="form-control"
                          placeholder="" id='secondNurseVisit'
                          name='secondNurseVisit'
                          value={formatDate(siteFormData.secondNurseVisit)}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.secondNurseVisit && (
                          <div className="text-danger">
                            {errors?.secondNurseVisit?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="mb-2">
                        <label className="form-label mb-1">Nurse
                          Visit 3
                          :</label>
                        <input type="date"
                          className="form-control"
                          placeholder="" id='thirdNurseVisit'
                          name='thirdNurseVisit'
                          value={formatDate(siteFormData.thirdNurseVisit)}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.thirdNurseVisit && (
                          <div className="text-danger">
                            {errors?.thirdNurseVisit?._errors[0]}
                          </div>
                        )}
                      </div>
                      <div className="mb-0">
                        <label className="form-label mb-1">Mid
                          Point
                          :</label>
                        <input type="date"
                          className="form-control"
                          placeholder="" id='midPoint'
                          name='midPoint'
                          value={formatDate(siteFormData.midPoint)}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.midPoint && (
                          <div className="text-danger">
                            {errors?.midPoint?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>

                {/* <div className="formCard mt-3">
                  <div
                    className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                    <h3 className="text-nowrap formTitle m-0">Locations
                    </h3>
                    <hr className="w-100" />

                  </div>
                  <div className="mb-0 row g-2">
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="mb-2">
                        <label
                          className="form-label mb-1">Location
                          :</label>
                        <input type="text"
                          className="form-control"
                          placeholder="" id='additionalLocation'
                          name='additionalLocation'
                          value={siteFormData.additionalLocation}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.additionalLocation && (
                          <div className="text-danger">
                            {errors?.additionalLocation?._errors[0]}
                          </div>
                        )}
                      </div>
                      <div className="mb-0">
                        <label
                          className="form-label mb-1">Location
                          :</label>
                        <input type="text"
                          className="form-control"
                          placeholder="" id='additionalLocation2'
                          name='additionalLocation2'
                          value={siteFormData.additionalLocation2}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.additionalLocation2 && (
                          <div className="text-danger">
                            {errors?.additionalLocation2?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="mb-2">
                        <label
                          className="form-label mb-1">Capacity
                          :</label>
                        <input type="number"
                          className="form-control"
                          placeholder="" id='caP1'
                          name='caP1'
                          value={siteFormData.caP1}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.caP1 && (
                          <div className="text-danger">
                            {errors?.caP1?._errors[0]}
                          </div>
                        )}
                      </div>
                      <div className="mb-0">
                        <label
                          className="form-label mb-1">Capacity
                          :</label>
                        <input type="number"
                          className="form-control"
                          placeholder="" id='caP2'
                          name='caP2'
                          value={siteFormData.caP2}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.caP2 && (
                          <div className="text-danger">
                            {errors?.caP2?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div> */}
                 <div className="formCard mt-3">
                  <div
                    className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                    <h3 className="text-nowrap formTitle m-0">Locations</h3>
                    <hr className="w-100" />

                    {/* <div className="editForm">
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
                  <div className="mb-0 row g-2">
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="mb-2">
                        <label
                          className="form-label mb-1">Location
                          :</label>
                        <input type="text"
                          className="form-control"
                          placeholder="" id='roomNumber'
                          name='roomNumber'
                          value={siteFormData.roomNumber}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.roomNumber && (
                          <div className="text-danger">
                            {errors?.roomNumber?._errors[0]}
                          </div>
                        )}
                      </div>
                      <div className="mb-2">
                        <label
                          className="form-label mb-1">Location
                          :</label>
                        <input type="text"
                          className="form-control"
                          placeholder="" id='roomNumber2'
                          name='roomNumber2'
                          value={siteFormData.roomNumber2}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.roomNumber2 && (
                          <div className="text-danger">
                            {errors?.roomNumber2?._errors[0]}
                          </div>
                        )}
                      </div>
                      <div className="mb-2">
                        <label
                          className="form-label mb-1">Location
                          :</label>
                        <input type="text"
                          className="form-control"
                          placeholder="" id='roomNumber3'
                          name='roomNumber3'
                          value={siteFormData.roomNumber3}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.roomNumber3 && (
                          <div className="text-danger">
                            {errors?.roomNumber3?._errors[0]}
                          </div>
                        )}
                      </div>
                      <div className="mb-0">
                        <label
                          className="form-label mb-1">Location
                          :</label>
                        <input type="text"
                          className="form-control"
                          placeholder="" id='roomNumber4'
                          name='roomNumber4'
                          value={siteFormData.roomNumber4}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.roomNumber4 && (
                          <div className="text-danger">
                            {errors?.roomNumber4?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="mb-2">
                        <label
                          className="form-label mb-1">Capacity
                          :</label>
                        <input type="number"
                          className="form-control"
                          placeholder="" id='caP1'
                          name='caP1'
                          value={siteFormData.caP1}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.caP1 && (
                          <div className="text-danger">
                            {errors?.caP1?._errors[0]}
                          </div>
                        )}
                      </div>
                      <div className="mb-2">
                        <label
                          className="form-label mb-1">Capacity
                          :</label>
                        <input type="number"
                          className="form-control"
                          placeholder="" id='caP2'
                          name='caP2'
                          value={siteFormData.caP2}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.caP2 && (
                          <div className="text-danger">
                            {errors?.caP2?._errors[0]}
                          </div>
                        )}
                      </div>
                      <div className="mb-2">
                        <label
                          className="form-label mb-1">Capacity
                          :</label>
                        <input type="number"
                          className="form-control"
                          placeholder="" id='caP3'
                          name='caP3'
                          value={siteFormData.caP3}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.caP3 && (
                          <div className="text-danger">
                            {errors?.caP3?._errors[0]}
                          </div>
                        )}
                      </div>
                      <div className="mb-0">
                        <label
                          className="form-label mb-1">Capacity
                          :</label>
                        <input type="number"
                          className="form-control"
                          placeholder="" id='caP4'
                          name='caP4'
                          value={siteFormData.caP4}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.caP4 && (
                          <div className="text-danger">
                            {errors?.caP4?._errors[0]}
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
                    <h3 className="text-nowrap formTitle m-0">Additional
                      Approved Space</h3>
                    <hr className="w-100" />

                    {/* <div className="editForm">
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
                  <div className="mb-0 row g-2">
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="mb-2">
                        <label
                          className="form-label mb-1">Location
                          :</label>
                        <input type="text"
                          className="form-control"
                          placeholder="" id='additionalLocation'
                          name='additionalLocation'
                          value={siteFormData.additionalLocation}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.additionalLocation && (
                          <div className="text-danger">
                            {errors?.additionalLocation?._errors[0]}
                          </div>
                        )}
                      </div>
                      <div className="mb-2">
                        <label
                          className="form-label mb-1">Location
                          :</label>
                        <input type="text"
                          className="form-control"
                          placeholder="" id='additionalLocation2'
                          name='additionalLocation2'
                          value={siteFormData.additionalLocation2}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.additionalLocation2 && (
                          <div className="text-danger">
                            {errors?.additionalLocation2?._errors[0]}
                          </div>
                        )}
                      </div>
                      <div className="mb-2">
                        <label
                          className="form-label mb-1">Location
                          :</label>
                        <input type="text"
                          className="form-control"
                          placeholder="" id='additionalLocation3'
                          name='additionalLocation3'
                          value={siteFormData.additionalLocation3}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.additionalLocation3 && (
                          <div className="text-danger">
                            {errors?.additionalLocation3?._errors[0]}
                          </div>
                        )}
                      </div>
                      <div className="mb-0">
                        <label
                          className="form-label mb-1">Location
                          :</label>
                        <input type="text"
                          className="form-control"
                          placeholder="" id='additionalLocation4'
                          name='additionalLocation4'
                          value={siteFormData.additionalLocation4}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.additionalLocation4 && (
                          <div className="text-danger">
                            {errors?.additionalLocation4?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="mb-2">
                        <label
                          className="form-label mb-1">Capacity
                          :</label>
                        <input type="number"
                          className="form-control"
                          placeholder="" id='ascaP1'
                          name='ascaP1'
                          value={siteFormData.ascaP1}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.ascaP1 && (
                          <div className="text-danger">
                            {errors?.ascaP1?._errors[0]}
                          </div>
                        )}
                      </div>
                      <div className="mb-2">
                        <label
                          className="form-label mb-1">Capacity
                          :</label>
                        <input type="number"
                          className="form-control"
                          placeholder="" id='ascaP2'
                          name='ascaP2'
                          value={siteFormData.ascaP2}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.ascaP2 && (
                          <div className="text-danger">
                            {errors?.ascaP2?._errors[0]}
                          </div>
                        )}
                      </div>
                      <div className="mb-2">
                        <label
                          className="form-label mb-1">Capacity
                          :</label>
                        <input type="number"
                          className="form-control"
                          placeholder="" id='ascaP3'
                          name='ascaP3'
                          value={siteFormData.ascaP3}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.ascaP3 && (
                          <div className="text-danger">
                            {errors?.ascaP3?._errors[0]}
                          </div>
                        )}
                      </div>
                      <div className="mb-0">
                        <label
                          className="form-label mb-1">Capacity
                          :</label>
                        <input type="number"
                          className="form-control"
                          placeholder="" id='ascaP4'
                          name='ascaP4'
                          value={siteFormData.ascaP4}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.ascaP4 && (
                          <div className="text-danger">
                            {errors?.ascaP4?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="formCard mt-3">
                  <div
                    className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                    <h3 className="text-nowrap formTitle m-0">Fee</h3>
                    <hr className="w-100" />

                    {/* <div className="editForm">
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
                  <div className="mb-0 row g-2">
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="mb-2">
                        <label className="form-label mb-1">Full
                          :</label>
                        <input type="text"
                          className="form-control"
                          placeholder="" id='full'
                          name='full'
                          value={siteFormData.full}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.full && (
                          <div className="text-danger">
                            {errors?.full?._errors[0]}
                          </div>
                        )}
                      </div>
                      <div className="mb-0">
                        <label className="form-label mb-1">Min.
                          :</label>
                        <input type="text"
                          className="form-control"
                          placeholder="" id='min'
                          name='min'
                          value={siteFormData.min}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.min && (
                          <div className="text-danger">
                            {errors?.min?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="mb-2">
                        <label className="form-label mb-1">Daily
                          :</label>
                        <input type="text"
                          className="form-control"
                          placeholder="" id='daily'
                          name='daily'
                          value={siteFormData.daily}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.daily && (
                          <div className="text-danger">
                            {errors?.daily?._errors[0]}
                          </div>
                        )}
                      </div>
                      <div className="mb-0">
                        <label className="form-label mb-1">AM/PM
                          :</label>
                        <input type="text"
                          className="form-control"
                          placeholder="" id='ampm'
                          name='ampm'
                          value={siteFormData.ampm}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {

                          }}
                        />
                        {errors?.ampm && (
                          <div className="text-danger">
                            {errors?.ampm?._errors[0]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BasicInfoForm