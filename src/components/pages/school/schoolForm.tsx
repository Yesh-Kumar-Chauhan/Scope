import React, { useEffect } from 'react';
import { fetchAllDistrict } from '../../../apis/districtsApi';
import { getSiteDataByDistrictId } from '../../../apis/sitesApi';
import { ISchool } from '../../../interface/School'
interface SchoolFormProps {
    schoolFormData: ISchool;
    errors: any;
    handleChange: (e: any) => void;
    setState: any
    state: any;
    isEditing: boolean;
    setSchoolFormData: any
}

const SchoolForm: React.FC<SchoolFormProps> = ({ schoolFormData, handleChange, errors, setState, state, isEditing, setSchoolFormData }) => {

    useEffect(() => {
        const fetchSiteAndDistrictData = async () => {
            try {
                const [districtDataResponse] = await Promise.all([fetchAllDistrict()]);
                const districts = districtDataResponse.data;
                const data = districts.filter((x: any) => (x.distNum == schoolFormData.distNum && x.distNam == schoolFormData.distNam))
                setSchoolFormData((prevData: any) => ({
                    ...prevData,
                    districtId: data[0]?.districtId,

                }));
                if (data[0]?.districtId) {
                    const response = await getSiteDataByDistrictId(data[0]?.districtId, 0);
                    setState((prevState: any) => ({ ...prevState, siteData: response, districtSchoolData: districts }));
                } else {
                    console.warn("District not found based on distNum");
                }
            } catch (error) {
                console.error("Error fetching district or site data:", error);
            }
        };

        if (schoolFormData.distNum && isEditing) {
            fetchSiteAndDistrictData();
        }
    }, [schoolFormData.distNum]);


    const getErrorMessage = (fieldName: string) => {
        const error = errors.find((error: { path: string[]; }) => error.path[0] === fieldName);
        return error ? error.message : '';
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [districtDataResponse] = await Promise.all([
                    fetchAllDistrict()
                ]);

                setState((prevState: any) => ({
                    ...prevState,
                    districtSchoolData: districtDataResponse?.data,
                }));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchInitialData();
    }, []);

    return (
        <>
            <div className="pageTable  h-100 pt-3">
                <div className="pageTableInner personalTab">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <>
                                <div className="tab-content" id="nav-tabContent">
                                    <div className="tab-pane fade show active" id="nav-basicinfo"
                                        role="tabpanel" aria-labelledby="nav-basicinfo-tab"
                                        tabIndex={0}>
                                        <div className='row g-3'>
                                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'>
                                                <div className="formCard">
                                                    <div
                                                        className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                                                        <h3 className="text-nowrap formTitle m-0">Basic Information
                                                        </h3>
                                                        <hr className="w-100" />
                                                    </div>
                                                    <div className="DistrictForm">
                                                        <div className="mb-0 g-2 row">
                                                            <div className="mb-0">
                                                                <label className="form-label mb-1">School
                                                                    :</label>
                                                                <div className="districtTable d-flex align-items-start gap-2">
                                                                    <div className='numInput'>
                                                                        <input type="number" className="form-control"
                                                                            placeholder=""
                                                                            id='schNum'
                                                                            name='schNum'
                                                                            value={schoolFormData.schNum}
                                                                            onChange={(e) => {
                                                                                handleChange(e);
                                                                            }}
                                                                        />
                                                                        {getErrorMessage('schNum') && <p className="text-danger">{getErrorMessage('schNum')}</p>}

                                                                    </div>

                                                                    <div className='w-100'>
                                                                        <input type="text" className="form-control w-100"
                                                                            placeholder="" id='schNam'
                                                                            name='schNam'
                                                                            value={schoolFormData.schNam}
                                                                            onChange={(e) => {
                                                                                handleChange(e);
                                                                            }}
                                                                        />
                                                                        {getErrorMessage('schNam') && <p className="text-danger">{getErrorMessage('schNam')}</p>}

                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <div className="mb-0">
                                                                    <label className="form-label mb-1">Address1 :</label>
                                                                    <input type="text" className="form-control" id='addr1' name='addr1'
                                                                        value={schoolFormData.addr1}
                                                                        onChange={(e) => { handleChange(e); }}
                                                                        onBlur={(e) => { }}
                                                                    />
                                                                    {getErrorMessage('addr1') && <p className="text-danger">{getErrorMessage('addr1')}</p>}

                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <div className="mb-0">
                                                                    <label className="form-label mb-1">Address2 :</label>
                                                                    <input type="text" className="form-control" id='addr2' name='addr2'
                                                                        value={schoolFormData.addr2}
                                                                        onChange={(e) => { handleChange(e); }}
                                                                        onBlur={(e) => { }}
                                                                    />
                                                                    {getErrorMessage('addr2') && <p className="text-danger">{getErrorMessage('addr2')}</p>}

                                                                </div>
                                                            </div>

                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <div className="mb-0">
                                                                    <label className="form-label mb-1">Districts :</label>
                                                                    <select
                                                                        className="form-select"
                                                                        name="districtId"
                                                                        value={schoolFormData.districtId}
                                                                        onChange={(e) => { handleChange(e); }}
                                                                    >
                                                                        <option value=""> Select Districts</option>
                                                                        {state.districtSchoolData.map((report: any) => (
                                                                            <option key={report.districtId} value={report.districtId}>
                                                                                {report.distNam}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    {getErrorMessage('distNam') && <p className="text-danger">{getErrorMessage('distNam')}</p>}
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <div className="mb-0">
                                                                    <label className="form-label mb-1">Sites :</label>
                                                                    <select
                                                                        className="form-select"
                                                                        name="siteNum"
                                                                        value={schoolFormData.siteNum}
                                                                        onChange={(e) => { handleChange(e); }}
                                                                        disabled={!state.siteData || state.siteData.length === 0}
                                                                    >
                                                                        <option value=""> Select Sites</option>
                                                                        {state.siteData?.map((site: any) => (
                                                                            <option key={site.siteNumber} value={site.siteNumber}>
                                                                                {site.fullName}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    {getErrorMessage('siteNam') && <p className="text-danger">{getErrorMessage('siteNam')}</p>}
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div className="mb-0">
                                                                    <div className="d-flex align-items-center gap-4">
                                                                        <div
                                                                            className="d-flex checked align-items-center gap-2">
                                                                            <div className="inputDesign position-relative">
                                                                                <input type="checkbox" id="hidden"
                                                                                    name="hidden"
                                                                                    checked={schoolFormData.hidden}
                                                                                    onChange={handleChange} />
                                                                                {getErrorMessage('hidden') && <p className="text-danger">{getErrorMessage('hidden')}</p>}
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
                                                                                className="form-label m-0" style={{ fontWeight: schoolFormData.hidden ? 'bold' : 'normal' }}>Hidden</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <div className="mb-0">
                                                                    <label className="form-label mb-1">Dismissal :</label>
                                                                    <input type="text" className="form-control" id='dismisal' name='dismisal'
                                                                        value={schoolFormData.dismisal}
                                                                        onChange={(e) => { handleChange(e); }}
                                                                        onBlur={(e) => { }}
                                                                    />
                                                                    {getErrorMessage('dismisal') && <p className="text-danger">{getErrorMessage('dismisal')}</p>}
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <div className="mb-0">
                                                                    <label className="form-label mb-1">Transportation :</label>
                                                                    <input type="text" className="form-control" id='trans' name='trans'
                                                                        value={schoolFormData.trans}
                                                                        onChange={(e) => { handleChange(e); }}
                                                                        onBlur={(e) => { }}
                                                                    />
                                                                    {getErrorMessage('trans') && <p className="text-danger">{getErrorMessage('trans')}</p>}
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <div className="mb-0">
                                                                    <label className="form-label mb-1">Principal :</label>
                                                                    <input type="text" className="form-control" id='principal' name='principal'
                                                                        value={schoolFormData.principal}
                                                                        onChange={(e) => { handleChange(e); }}
                                                                        onBlur={(e) => { }}
                                                                    />
                                                                    {getErrorMessage('principal') && <p className="text-danger">{getErrorMessage('principal')}</p>}
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <div className="mb-0">
                                                                    <label className="form-label mb-1">Email :</label>
                                                                    <input type="text" className="form-control" id='email' name='email'
                                                                        value={schoolFormData.email}
                                                                        onChange={(e) => { handleChange(e); }}
                                                                        onBlur={(e) => { }}
                                                                    />
                                                                    {getErrorMessage('email') && <p className="text-danger">{getErrorMessage('email')}</p>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div >
                                                </div>
                                            </div>
                                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'>
                                                <div className="formCard h-100">
                                                    <div
                                                        className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                                                        <h3 className="text-nowrap formTitle m-0">Basic Information
                                                        </h3>
                                                        <hr className="w-100" />
                                                    </div>
                                                    <div className="mb-0 g-2 row h-100">
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-12 h-100">
                                                            <div className="DistrictForm">
                                                                <div className="mb-0 h-100">
                                                                    <label className="form-label mb-1">Note:</label>
                                                                    <textarea className="form-control textareHeight" id="notes" name="notes" value={schoolFormData.notes} rows={8}
                                                                        onChange={handleChange}></textarea>
                                                                    {getErrorMessage('notes') && <p className="text-danger">{getErrorMessage('notes')}</p>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SchoolForm;
