import React, { useState, useEffect } from 'react';
import { fetchAllDistrict } from '../../../../apis/districtsApi';
import { getSiteDataByDistrictId } from '../../../../apis/sitesApi';
import { useFetchMultiSiteDirector } from '../../../../hooks/personnel/useMultiSiteDirector/useFetchMultiSiteDirector';
import { IDirector } from '../../../../interface/Personnel';
import { createMultiSiteDirectorForm, updateMultiSiteDirectorForm } from '../../../../apis/personnelApi'
import { getUserData } from "../../../../utils/utils";
interface MultiSiteDirectorProps {
    personalId: number;
}

interface SelectedSite {
    siteId: number;
    districtName: string;
    siteName: string;
}

interface MultiSiteState {
    districts: any[];
    siteData: any[];
    selectedSites: SelectedSite[];
    selectedRow: number | null;
    selectedDistrict: {
        id: number | null;
        name: string;
    };
    loading: {
        districts: boolean;
        sites: boolean;
    };
}

const initialState: MultiSiteState = {
    districts: [],
    siteData: [],
    selectedSites: [],
    selectedRow: null,
    selectedDistrict: {
        id: null,
        name: '',
    },
    loading: {
        districts: true,
        sites: false,
    },
};

const MultiSiteDirector: React.FC<MultiSiteDirectorProps> = ({ personalId }) => {
    const [state, setState] = useState<MultiSiteState>(initialState);
    const [formLoading, setFormLoading] = useState(false);
    const userData = getUserData();

    const initialFormState = {
        monAMFrom: '',
        monAMTo: '',
        tueAMFrom: '',
        tueAMTo: '',
        wedAMFrom: '',
        wedAMTo: '',
        thuAMFrom: '',
        thuAMTo: '',
        friAMFrom: '',
        friAMTo: '',
        monPMFrom: '',
        monPMTo: '',
        tuePMFrom: '',
        tuePMTo: '',
        wedPMFrom: '',
        wedPMTo: '',
        thuPMFrom: '',
        thuPMTo: '',
        friPMFrom: '',
        friPMTo: '',
    };
    const [formData, setFormData] = useState<IDirector>({
        personID: personalId,
        ...initialFormState,
        distName: '',
        siteName: '',
        siteID: null,
    });

    const { data: data, isLoading, isError, error, refetch } = useFetchMultiSiteDirector(personalId);

    useEffect(() => {
        setState(initialState);
        const fetchDistricts = async () => {
            try {
                const districtDataResponse = await fetchAllDistrict();
                setState(initialState);
                setState(prev => ({
                    ...prev,
                    districts: districtDataResponse?.data || [],
                    loading: { ...prev.loading, districts: false },
                }));
                // If data exists, auto-select the first district and its sites
                if (data?.data && data?.data.length > 0) {
                    // Group data by distNam
                    const groupedByDistrict = data.data.reduce((acc: any, item: any) => {
                        (acc[item.distName] = acc[item.distName] || []).push(item);
                        return acc;
                    }, {});

                    let selectedSitesForCurrentDistrict: any[] = [];
                    let selectedDistrictSiteData: any[] = [];
                    let matchedDistrictId: any = null;
                    let matchedDistrictName: any = null;
                    const uniqueSites = new Set();  // Use a Set to ensure unique sites

                    // Loop over each group of districts
                    for (const distName in groupedByDistrict) {
                        const matchedDistrict = districtDataResponse?.data.find((district: any) => district.distNam === distName);

                        if (matchedDistrict) {
                            matchedDistrictId = matchedDistrict.districtId;
                            matchedDistrictName = matchedDistrict.distNam;

                            // Fetch site data for the current district
                            const sitesResponse = await getSiteDataByDistrictId(matchedDistrict.districtId, 1);

                            // Collect site data for this specific district only
                            selectedDistrictSiteData = sitesResponse;

                            // For each item in the current group of districts, create site data only for this district
                            selectedSitesForCurrentDistrict = groupedByDistrict[distName].map((item: any) => {
                                const site = sitesResponse?.find((site: any) => site.siteID === item.siteID);
                                if (!site || uniqueSites.has(item.siteID)) {
                                    return null; // Skip if the site is already added
                                }

                                uniqueSites.add(item.siteID);  // Add to the set to track unique sites

                                return {
                                    siteId: item.siteID,
                                    districtName: item.distName,
                                    siteName: site.siteName || '',  // Ensure no duplicate siteNames
                                    districtId: matchedDistrict.districtId
                                };
                            }).filter(Boolean); // Filter out any null values

                            // Once we find the matched district, no need to check other districts
                            break;
                        }
                    }

                    // Update the state only with data from the matched district
                    if (selectedSitesForCurrentDistrict.length > 0) {
                        setState(prev => ({
                            ...prev,
                            selectedDistrict: { id: matchedDistrictId, name: matchedDistrictName },
                            siteData: selectedDistrictSiteData || [],  // Only show sites for the selected district
                            selectedSites: selectedSitesForCurrentDistrict,  // Only show selected sites for this district
                            loading: { ...prev.loading, sites: false },
                        }));
                    } else {
                        setState(prev => ({
                            ...prev,
                            selectedDistrict: { id: matchedDistrictId, name: matchedDistrictName },
                            siteData: selectedDistrictSiteData || [],
                            selectedSites: [],  // Clear selected sites if no matching data found
                            loading: { ...prev.loading, sites: false },
                        }));
                    }
                }



                // if (data?.data && data?.data.length > 0) {
                //     const firstDistrict = data?.data[0];
                //     const matchedDistrict = districtDataResponse?.data.find((district: any) => district.distNam === firstDistrict.distName);
                //     if (matchedDistrict) {
                //         const sitesResponse = await getSiteDataByDistrictId(matchedDistrict.districtId, 1);
                //         // Create selectedSites array from data.data
                //         const autoSelectedSites = data?.data.map((item: any) => ({
                //             siteId: item.siteID,
                //             districtName: item.distName,
                //             siteName: sitesResponse?.find((site: any) => site.siteID === item.siteID)?.siteName || '',
                //             districtId: matchedDistrict.districtId
                //         }));
                //         setState(prev => ({
                //             ...prev,
                //             selectedDistrict: { id: matchedDistrict.districtId, name: matchedDistrict.distNam },
                //             siteData: sitesResponse || [],
                //             selectedSites: autoSelectedSites,
                //             loading: { ...prev.loading, sites: false },
                //         }));
                //     }
                // }
            } catch (error) {
                console.error("Error fetching districts:", error);
                setState(prev => ({
                    ...prev,
                    loading: { ...prev.loading, districts: false },
                }));
            }
        };

        fetchDistricts();
    }, [personalId, data?.data]);

    const handleDistrictClick = async (districtId: number, districtName: string) => {
        setState(prev => ({
            ...prev,
            selectedDistrict: { id: districtId, name: districtName },
            selectedSites: [],
            loading: { ...prev.loading, sites: true },
        }));

        try {
            const sitesResponse = await getSiteDataByDistrictId(districtId, 1);
            let autoSelectedSites: any[] = [];
            if (data?.data && data?.data.length > 0) {
                const matchedDistrict = data?.data.find((district: any) => district.distName === districtName);
                if (matchedDistrict) {
                    autoSelectedSites = data?.data
                        .filter((item: any) => item.distName === districtName)
                        .map((item: any) => ({
                            siteId: item.siteID,
                            districtName: item.distName,
                            siteName: sitesResponse?.find((site: any) => site.siteID === item.siteID)?.siteName || '',
                            districtId: matchedDistrict.districtId,
                        }));
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        distName: districtName, // Update district name in form
                        siteID: autoSelectedSites.length > 0 ? autoSelectedSites[0].siteId : null, // Set first site ID
                        siteName: autoSelectedSites.length > 0 ? autoSelectedSites[0].siteName : '', // Set first site name
                    }));
                } else {
                    // If no matching district, reset the form fields
                    setFormData({
                        personID: personalId,
                        ...initialFormState,
                        distName: '',
                        siteName: '',
                        siteID: null,
                    });
                }
            } else {
                // If no data available, reset the form as well
                setFormData({
                    personID: personalId,
                    ...initialFormState,
                    distName: '',
                    siteName: '',
                    siteID: null,
                });
            }

            setState(prev => ({
                ...prev,
                siteData: sitesResponse || [],
                selectedSites: autoSelectedSites.length > 0 ? autoSelectedSites : [],
                loading: { ...prev.loading, sites: false },
            }));
        } catch (error) {
            console.error("Error fetching site data:", error);
            setState(prev => ({
                ...prev,
                loading: { ...prev.loading, sites: false },
            }));
        }
    };


    // Handle checkbox change
    const handleCheckboxChange = (siteId: number, siteName: string) => {
        setState(prev => {
            const isAlreadySelected = prev.selectedSites.some(site => site.siteId === siteId);
            const newSelectedSites = isAlreadySelected
                ? prev.selectedSites.filter(site => site.siteId !== siteId)
                : [...prev.selectedSites, { siteId, siteName, districtName: prev.selectedDistrict.name, districtId: prev.selectedDistrict.id }];
            if (newSelectedSites.length === 0) {
                setFormData({
                    personID: personalId,
                    ...initialFormState,
                    distName: '',
                    siteName: '',
                    siteID: null,
                });
            }
            return {
                ...prev,
                selectedSites: newSelectedSites,
            };
        });
    };

    const handleRowClick = (siteId: number, siteName: string, districtName: string) => {
        const matchSiteID = data?.data.find((x: any) => x.siteID == siteId);
        setFormData((prevData) => ({
            ...prevData,
            siteID: siteId,
            distName: districtName,
            siteName: siteName,
            ...(matchSiteID ? {
                monAMFrom: matchSiteID.monAMFrom || '',
                monAMTo: matchSiteID.monAMTo || '',
                tueAMFrom: matchSiteID.tueAMFrom || '',
                tueAMTo: matchSiteID.tueAMTo || '',
                wedAMFrom: matchSiteID.wedAMFrom || '',
                wedAMTo: matchSiteID.wedAMTo || '',
                thuAMFrom: matchSiteID.thuAMFrom || '',
                thuAMTo: matchSiteID.thuAMTo || '',
                friAMFrom: matchSiteID.friAMFrom || '',
                friAMTo: matchSiteID.friAMTo || '',
                monPMFrom: matchSiteID.monPMFrom || '',
                monPMTo: matchSiteID.monPMTo || '',
                tuePMFrom: matchSiteID.tuePMFrom || '',
                tuePMTo: matchSiteID.tuePMTo || '',
                wedPMFrom: matchSiteID.wedPMFrom || '',
                wedPMTo: matchSiteID.wedPMTo || '',
                thuPMFrom: matchSiteID.thuPMFrom || '',
                thuPMTo: matchSiteID.thuPMTo || '',
                friPMFrom: matchSiteID.friPMFrom || '',
                friPMTo: matchSiteID.friPMTo || '',
            } : initialFormState),
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async () => {
        setFormLoading(true);
        try {
            const matchSiteID = data?.data.find((x: any) => x.siteID == formData.siteID);
            if (matchSiteID) {
                const updatedFormData = {
                    ...formData,
                    directorID: matchSiteID.directorID
                };
                await updateMultiSiteDirectorForm(matchSiteID.directorID, updatedFormData);
            } else {
                await createMultiSiteDirectorForm(formData);
            }
            setFormData(formData);
            refetch();
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <section className="DashboardPage text-nowrap">
            <div className="container-fluid">
                <div className="row">
                    <div className='multiSiteOuter col-12'>
                        <div className="row g-3">
                            <div className="col-lg-3 col-md-3 col-sm-12 col-12 ">
                                <div className='border p-3 rounded-3 siteList'>

                                    {state.districts.length > 0 ? (
                                        <ul>
                                            {state.districts.map((district: any) =>
                                                district.distNam ? (
                                                    <li
                                                        key={district.districtId}
                                                        style={{ cursor: 'pointer' }}
                                                        className={state.selectedDistrict.name === district.distNam ? 'activ px-2 py-2 rounded-2' : 'p-2 rounded-2'}
                                                        onClick={() => handleDistrictClick(district.districtId, district.distNam)}
                                                    >
                                                        {district.distNam}
                                                    </li>
                                                ) : null
                                            )}
                                        </ul>
                                    ) : (
                                        <p>No districts available.</p>
                                    )}
                                </div>

                            </div>
                            <div className="col-lg-9 col-md-9 col-sm-12 col-12">
                                <div className='pageTableInner'>
                                    <div className='pe-2'>

                                        <div className='border p-3 rounded-3 siteSelectList siteList'>
                                            {state.loading.sites ? (
                                                <p>Loading sites...</p>
                                            ) : state.siteData.length > 0 ? (
                                                <ul>
                                                    {state.siteData.map((site: any) => (
                                                        <li key={site.siteID}>
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="inputDesign position-relative">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`site-${site.siteID}`}
                                                                        name={`site-${site.siteID}`}
                                                                        checked={state.selectedSites.some(
                                                                            selectedSite => selectedSite.siteId === site.siteID
                                                                        )}
                                                                        onChange={() => handleCheckboxChange(site.siteID, site.siteName)}
                                                                    />
                                                                    <div className="checked">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                                            <path
                                                                                d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z"
                                                                                stroke="black"
                                                                                strokeWidth="2"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                            />
                                                                        </svg>
                                                                    </div>
                                                                    <div className="Unchecked">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                                            <path
                                                                                d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z"
                                                                                stroke="#A4A4A4"
                                                                                strokeWidth="2"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                            />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <label className="form-label m-0" style={{ fontWeight: state.selectedSites.some(selectedSite => selectedSite.siteId === site.siteID) ? 'bold' : 'normal' }}>{site.siteName}</label>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>No site available.</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className='row mx-0 mt-1 g-3'>
                                        <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                            <div className="selected-sites pageTable ">
                                                <div className='personalTab'>
                                                    {state.selectedSites.length > 0 ? (
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ width: '10%' }}>District</th>
                                                                    <th style={{ width: '10%' }}>Site</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {state.selectedSites.map((site: any) => (
                                                                    <tr key={site.siteId}
                                                                        onClick={() => handleRowClick(site.siteId, site.siteName, site.districtName)}
                                                                        style={{ cursor: 'pointer' }} >
                                                                        <td className={formData.siteID === site.siteId ? 'activ' : ''} style={{ width: '10%' }}>{site.districtName}</td>
                                                                        <td className={formData.siteID === site.siteId ? 'activ' : ''} style={{ width: '10%' }}>{site.siteName}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    ) : (
                                                        <p>No sites selected.</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                            <div className='border rounded-3 p-3'>
                                                <h4 className='m-0 fw-bold'>Schedule</h4>
                                                <div className='row DistrictForm g-3 mt-1'>
                                                    <div className='col-lg-2 d-flex align-items-center col-md-12 col-sm-12 col-12 pt-lg-4'>
                                                        <label className="form-label mt-lg-2 mb-0">Mon</label>
                                                    </div>
                                                    <div className='col-lg-5 col-md-6 col-sm-12 col-12 flex-column d-flex align-items-center gap-3'>

                                                        <label className="form-label w-100 text-center mb-2">AM</label>
                                                        <div className='d-flex align-items-center gap-3 w-100'>
                                                            <input type="time"
                                                                className="form-control w-100"
                                                                placeholder=""
                                                                name="monAMFrom"
                                                                value={formData.monAMFrom}
                                                                onChange={handleInputChange}
                                                            />

                                                            <input type="time"
                                                                className="form-control w-100"
                                                                placeholder=""
                                                                name="monAMTo"
                                                                value={formData.monAMTo}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-5 col-md-6 col-sm-12 col-12 flex-column d-flex align-items-center gap-3'>

                                                        <label className="form-label w-100 text-center mb-2">PM</label>
                                                        <div className='d-flex align-items-center gap-3 w-100'>
                                                            <input type="time"
                                                                className="form-control w-100"
                                                                placeholder=""
                                                                name="monPMFrom"
                                                                value={formData.monPMFrom}
                                                                onChange={handleInputChange}
                                                            />

                                                            <input type="time"
                                                                className="form-control w-100"
                                                                placeholder=""
                                                                name="monPMTo"
                                                                value={formData.monPMTo}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className='col-lg-2 d-flex align-items-center col-md-12 col-sm-12 col-12'>
                                                        <label className="form-label mb-0">Tue</label>
                                                    </div>

                                                    <div className='col-lg-5 col-md-6 col-sm-12 col-12 flex-column d-flex align-items-center gap-3'>

                                                        <div className='d-flex align-items-center gap-3 w-100'>
                                                            <input type="time"
                                                                className="form-control w-100"
                                                                placeholder=""
                                                                name="tueAMFrom"
                                                                value={formData.tueAMFrom}
                                                                onChange={handleInputChange}
                                                            />

                                                            <input type="time"
                                                                className="form-control w-100"
                                                                placeholder=""
                                                                name="tueAMTo"
                                                                value={formData.tueAMTo}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-5 col-md-6 col-sm-12 col-12 flex-column d-flex align-items-center gap-3'>

                                                        <div className='d-flex align-items-center gap-3 w-100'>
                                                            <input type="time"
                                                                className="form-control w-100"
                                                                placeholder=""
                                                                name="tuePMFrom"
                                                                value={formData.tuePMFrom}
                                                                onChange={handleInputChange}
                                                            />

                                                            <input type="time"
                                                                className="form-control w-100"
                                                                placeholder=""
                                                                name="tuePMTo"
                                                                value={formData.tuePMTo}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-2 d-flex align-items-center col-md-12 col-sm-12 col-12'>
                                                        <label className="form-label mb-0">Wed</label>
                                                    </div>
                                                    <div className='col-lg-5 col-md-6 col-sm-12 col-12 flex-column d-flex align-items-center gap-3'>

                                                        <div className='d-flex align-items-center gap-3 w-100'>
                                                            <input type="time"
                                                                className="form-control w-100"
                                                                placeholder=""
                                                                name="wedAMFrom"
                                                                value={formData.wedAMFrom}
                                                                onChange={handleInputChange}
                                                            />

                                                            <input type="time"
                                                                className="form-control w-100"
                                                                placeholder=""
                                                                name="wedAMTo"
                                                                value={formData.wedAMTo}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-5 col-md-6 col-sm-12 col-12 flex-column d-flex align-items-center gap-3'>

                                                        <div className='d-flex align-items-center gap-3 w-100'>
                                                            <input type="time"
                                                                className="form-control w-100"
                                                                placeholder=""
                                                                name="wedPMFrom"
                                                                value={formData.wedPMFrom}
                                                                onChange={handleInputChange}
                                                            />

                                                            <input type="time"
                                                                className="form-control w-100"
                                                                placeholder=""
                                                                name="wedPMTo"
                                                                value={formData.wedPMTo}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-2 d-flex align-items-center col-md-12 col-sm-12 col-12'>
                                                        <label className="form-label mb-0">Thu</label>
                                                    </div>
                                                    <div className='col-lg-5 col-md-6 col-sm-12 col-12 flex-column d-flex align-items-center gap-3'>

                                                        <div className='d-flex align-items-center gap-3 w-100'>
                                                            <input type="time"
                                                                className="form-control w-100"
                                                                placeholder=""
                                                                name="thuAMFrom"
                                                                value={formData.thuAMFrom}
                                                                onChange={handleInputChange}
                                                            />

                                                            <input type="time"
                                                                className="form-control w-100"
                                                                placeholder=""
                                                                name="thuAMTo"
                                                                value={formData.thuAMTo}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-5 col-md-6 col-sm-12 col-12 flex-column d-flex align-items-center gap-3'>

                                                        <div className='d-flex align-items-center gap-3 w-100'>
                                                            <input type="time"
                                                                className="form-control w-100"
                                                                placeholder=""
                                                                name="thuPMFrom"
                                                                value={formData.thuPMFrom}
                                                                onChange={handleInputChange}
                                                            />

                                                            <input type="time"
                                                                className="form-control w-100"
                                                                placeholder=""
                                                                name="thuPMTo"
                                                                value={formData.thuPMTo}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-2 d-flex align-items-center col-md-12 col-sm-12 col-12'>
                                                        <label className="form-label mb-0">Fri</label>
                                                    </div>
                                                    <div className='col-lg-5 col-md-6 col-sm-12 col-12 flex-column d-flex align-items-center gap-3'>

                                                        <div className='d-flex align-items-center gap-3 w-100'>
                                                            <input type="time"
                                                                className="form-control w-100"
                                                                placeholder=""
                                                                name="friAMFrom"
                                                                value={formData.friAMFrom}
                                                                onChange={handleInputChange}
                                                            />

                                                            <input type="time"
                                                                className="form-control w-100"
                                                                placeholder=""
                                                                name="friAMTo"
                                                                value={formData.friAMTo}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-5 col-md-6 col-sm-12 col-12 flex-column d-flex align-items-center gap-3'>

                                                        <div className='d-flex align-items-center gap-3 w-100'>
                                                            <input type="time"
                                                                className="form-control w-100"
                                                                placeholder=""
                                                                name="friPMFrom"
                                                                value={formData.friPMFrom}
                                                                onChange={handleInputChange}
                                                            />

                                                            <input type="time"
                                                                className="form-control w-100"
                                                                placeholder=""
                                                                name="friPMTo"
                                                                value={formData.friPMTo}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" && userData.role !== "Scope.StudentService_PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1AND2" &&
                                                <button className='btn btn-primary mt-3 ms-auto'
                                                    disabled={!formData.siteID || !formData.personID}
                                                    onClick={handleSubmit} > {formLoading ? (
                                                        <span className="btnloader loader"></span> // Show loader while submitting
                                                    ) : (
                                                        <span>{data?.data.some(x => x.siteID === formData.siteID) ? 'Update' : 'Submit'}</span>
                                                    )}</button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default MultiSiteDirector;