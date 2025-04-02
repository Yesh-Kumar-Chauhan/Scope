import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getReport, fetchLookup, fetchPersonnelSearch, fetchTimesheetSitePersonal } from '../../../apis/personnelApi';
import { getSiteDataByDistrictId } from '../../../apis/sitesApi';
import axiosInstance from '../../../utils/axiosConfig';
import Select from 'react-select';
import { fetchAllDistrict } from '../../../apis/districtsApi';
import { fetchAllSites } from '../../../apis/sitesApi';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import moment from 'moment';
import camelCase from "lodash/camelCase";
import BulkTimeSheetForm from './BulkTimeSheetForm';
interface FormData {
    sites: string;
    districts: string;
}

interface ReportState {
    bulkDistrictReportData: any[];
    siteData: any[];
    bulkSiteReportData: any[];
    loading: boolean;
    responseData: any[];
}

const BulkTimeSheet: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        sites: "",
        districts: '',
    });

    const [state, setState] = useState<ReportState>({
        bulkDistrictReportData: [],
        siteData: [],
        bulkSiteReportData: [],
        loading: false,
        responseData: []
    });

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [districtDataResponse, siteDataResponse] = await Promise.all([
                    fetchAllDistrict(),
                    fetchAllSites()
                ]);
                setState(prevState => ({
                    ...prevState,
                    bulkDistrictReportData: districtDataResponse?.data,
                    bulkSiteReportData: siteDataResponse?.data,
                }));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchInitialData();
    }, []);

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        if (name === 'districts' && value) {
            try {
                const response = await getSiteDataByDistrictId(value, 1);
                setState(prevState => ({ ...prevState, siteData: response }));
            } catch (error) {
                console.error("Error fetching site data:", error);
            }
        }

    };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         setState(prevState => ({ ...prevState, loading: true }));
    //         const selectedDistrict = state.bulkDistrictReportData.find(
    //             (district) => district.districtId == parseInt(formData.districts)
    //           );
    //           const distNum = selectedDistrict?.distNum || "";
    //         const currentDate = moment();
    //         const startDate = currentDate.clone().startOf('isoWeek');
    //         const endDate = currentDate.clone().add(1, 'week').endOf('isoWeek');
    //         const formattedStartDate = startDate.format('MM-DD-YYYY');
    //         const formattedEndDate = endDate.format('MM-DD-YYYY');
    //         const responseData = await fetchTimesheetSitePersonal(
    //             formData.sites,
    //             distNum,
    //             formattedStartDate,
    //             formattedEndDate
    //         );
    //         const camelCasedData = toCamelCaseKeys(responseData?.data);
    //         setState(prevState => ({
    //             ...prevState,
    //             responseData: camelCasedData, // Set transformed data
    //           }));
    //     } catch (error) {
    //         console.error('Error generating report:', error);
    //     } finally {
    //         setState(prevState => ({ ...prevState, loading: false }));
    //         // handleClear();
    //     }
    // };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setState((prevState) => ({ ...prevState, loading: true }));
    
            const selectedDistrict = state.bulkDistrictReportData.find(
                (district) => district.districtId == parseInt(formData.districts)
            );
            const distNum = selectedDistrict?.distNum || "";
            const currentDate = moment();
            const startDate = currentDate.clone().startOf("isoWeek");
            const endDate = currentDate.clone().add(1, "week").endOf("isoWeek");
            const formattedStartDate = startDate.format("MM-DD-YYYY");
            const formattedEndDate = endDate.format("MM-DD-YYYY");
    
            const responseData = await fetchTimesheetSitePersonal(
                formData.sites,
                distNum,
                formattedStartDate,
                formattedEndDate
            );
    
            const camelCasedData = toCamelCaseKeys(responseData?.data);
    
            // Filter the schedules
            const filteredData = camelCasedData.map((person:any) => {
                // Filter schedules based on formData.sites
                const filteredSchedules = person.schedules.filter((schedule:any) =>
                    formData.sites.includes(String(schedule.siteId))
                );
    
                // If there are no matching schedules, exclude the person
                if (filteredSchedules.length === 0) {
                    return null;
                }
    
                // Return the person object with the filtered schedules
                return {
                    ...person,
                    schedules: filteredSchedules,
                };
            }).filter(Boolean); // Remove null values
    
            // Update state with the filtered data
            setState((prevState) => ({
                ...prevState,
                responseData: filteredData, // Set the transformed data
            }));
        } catch (error) {
            console.error("Error generating report:", error);
        } finally {
            setState((prevState) => ({ ...prevState, loading: false }));
            // handleClear();
        }
    };
    
    const toCamelCaseKeys = (obj: any): any => {
        if (Array.isArray(obj)) {
          return obj.map(toCamelCaseKeys);
        } else if (obj && typeof obj === "object") {
          return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [camelCase(key), toCamelCaseKeys(value)])
          );
        }
        return obj;
      };
    const handleClear = () => {
        setFormData({
            sites: "",
            districts: '',

        });
        setState(prevState => ({
            ...prevState,
            siteData: [],
            responseData: [],
        }));
    };

    return (
        <section className="DashboardPage py-3">
            <div className='reportOuter'>
                <div className="row justify-content-center mb-3 position-relative" style={{ zIndex: '999' }}>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <form onSubmit={handleSubmit} className="DistrictForm">
                            <div className="formCard p-3">
                                <div className="mb-0 row pe-lg-4 pe-md-4 pe-0 filterForm">

                                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="mb-lg-2 mb-md-2 mb-sm-2 mb-2">
                                            <label className="form-label mb-2">Districts :</label>
                                            <select
                                                className="form-select"
                                                name="districts"
                                                value={formData.districts}
                                                onChange={handleInputChange}
                                                disabled={state.bulkDistrictReportData.length==0}
                                            >
                                                <option value=""></option>
                                                {/* <option value=""> Select Districts</option> */}
                                                {state.bulkDistrictReportData.map((x) => (
                                                    <option key={x.districtId} value={x.districtId}>
                                                        {x.distNam}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="mb-lg-2 mb-md-2 mb-sm-2 mb-2">
                                            <label className="form-label mb-2">Sites :</label>
                                            <select
                                                className="form-select"
                                                name="sites"
                                                value={formData.sites}
                                                onChange={handleInputChange}
                                            disabled={state?.bulkSiteReportData.length === 0}
                                            >
                                                {/* <option value="">Select Sites</option> */}
                                                <option value=""></option>
                                                {state?.siteData && state.siteData.length > 0
                                                    ? state.siteData.map((site: any) => (
                                                        <option key={site.siteID} value={site.siteID}>
                                                            {site.fullName}
                                                        </option>
                                                    ))
                                                    : state?.bulkSiteReportData?.map((x) => (
                                                        <option key={x.siteID} value={x.siteID}>
                                                            {x.siteName}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    </div>

                                </div>
                                <div className="mb-0 row">
                                    <div className='col-12 mt-0'>
                                        <hr className="w-100 mt-2 mb-3" />
                                    </div>
                                    <div className='col-12 mt-0'>
                                        <div className='d-flex align-items-center flex-lg-row flex-md-row flex-md-row flex-sm-row flex-column-reverse justify-content-end gap-lg-4 gap-md-4 gap-3'>
                                            <button type="button" className='btn btn-outline' onClick={handleClear}>Clear all</button>

                                            <button type="submit" 
                                            className='btn btn-primary'
                                            disabled={state.loading || !formData.districts || !formData.sites}
                                             >{state.loading ? (<span className="btnloader loader"></span>) : (<span>Submit</span>)}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                    <div className="col-12">
                        <div className="pageTableInner PendingTab personalTab">
                            {state.responseData && state.responseData.length > 0 ? (
                                <BulkTimeSheetForm initialData={state.responseData} allDistricts={state.bulkDistrictReportData}/>
                            ) : (
                                <p>No data available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BulkTimeSheet;