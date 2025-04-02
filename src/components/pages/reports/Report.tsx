import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getReport, fetchLookup, fetchPersonnelSearch } from '../../../apis/personnelApi';
import { getSiteDataByDistrictId } from '../../../apis/sitesApi';
import axiosInstance from '../../../utils/axiosConfig';
import Select from 'react-select';
import { fetchAllDistrict } from '../../../apis/districtsApi';
import { fetchAllSites } from '../../../apis/sitesApi';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
import ReportViewer from './ReportViewer';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import PdfViewer from './PDFBlobViewer';
import { DownloadExcel } from '../excel/downloadExcel/DownloadExcel';

interface FormData {
    reportType: string;
    personalID: string;
    sites: string;
    districts: string;
    StartDate: string;
    EndDate: string;
    PositionId: number | null;
    country: string;
    Type: string;
    Selections: string;
}

interface ReportState {
    personnelOptions: any[];
    districtReportData: any[];
    reportData: any[];
    siteData: any[];
    positionData: any[];
    siteReportData: any[];
    loading: boolean;
    page: number;
    hasMore: boolean;
}

const Report: React.FC = () => {
    const selectedPersonnel = useRef<any>(null);
    //  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

    const [formData, setFormData] = useState<FormData>({
        reportType: '',
        personalID: '',
        sites: "",
        districts: '',
        StartDate: '',
        EndDate: '',
        PositionId: null,
        country: '',
        Type: '',
        Selections: ''
    });

    const [state, setState] = useState<ReportState>({
        personnelOptions: [],
        districtReportData: [],
        reportData: [],
        siteData: [],
        positionData: [],
        siteReportData: [],
        loading: false,
        page: 1,
        hasMore: true,
    });

    // const [reportData, setReportData] = useState<any>({dummy : 'dummy'});
    const [reportData, setReportData] = useState<any>(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [personnelData, reportDataResponse, districtDataResponse, allPosition, siteDataResponse] = await Promise.all([
                    fetchPersonnelSearch("", 2, 1, 100),
                    getReport(),
                    fetchAllDistrict(),
                    fetchLookup(),
                    fetchAllSites()
                ]);
                setState(prevState => ({
                    ...prevState,
                    // const personnelWithoutNullTermination = personnelData.data.filter((person: any) => person.doterm == null);
                    personnelOptions: mapPersonnelToOptions(personnelData?.data),
                    reportData: reportDataResponse?.data,
                    positionData: allPosition.data,
                    districtReportData: districtDataResponse?.data,
                    hasMore: personnelData?.data.length === 100,
                    siteReportData: siteDataResponse?.data,
                }));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchInitialData();
    }, []);



    const mapPersonnelToOptions = (personnel: any) => {
        return personnel
            .sort((a: any, b: any) => {
                const fullNameA = `${a.firstname} ${a.lastname}`;
                const fullNameB = `${b.firstname} ${b.lastname}`;
                return fullNameA.localeCompare(fullNameB);
            })
            .map((person: any) => ({
                value: person.personalID,
                label: `${person.firstname} ${person.lastname}`,
                ...person
            }));
    };



    const loadMorePersonnel = async (inputValue: string, isNewSearch: boolean = false) => {
        if (!state.hasMore && !isNewSearch) return;
        try {
            const searchPage = isNewSearch ? 1 : state.page;
            const personnelData = await fetchPersonnelSearch(inputValue, 2, searchPage, 100);
            if (personnelData?.data.length > 0) {
                const newOptions = mapPersonnelToOptions(personnelData.data);
                setState(prevState => ({
                    ...prevState,
                    personnelOptions: isNewSearch ? newOptions : [...prevState.personnelOptions, ...newOptions],
                    page: searchPage + 1,
                    hasMore: personnelData.data.length === 100,
                }));
            } else {
                setState(prevState => ({ ...prevState, hasMore: false }));
            }
        } catch (error) {
            console.error("Error fetching more personnel:", error);
        }
    };

    const debouncedLoadMore = useCallback(
        debounce((inputValue: string) => {
            loadMorePersonnel(inputValue, true);
        }, 300),
        []
    );

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
        if (name === 'reportType' && value) {
            setReportData(null);
        }
    };

    const handlePersonnelChange = (selectedOption: any) => {
        setFormData(prevData => ({
            ...prevData,
            personalID: selectedOption ? selectedOption.personalID : null
        }));
    };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         setState(prevState => ({ ...prevState, loading: true }));
    //         const form = new FormData();
    //         if (formData.reportType) form.append('ReportId', formData.reportType);
    //         if (formData.personalID) form.append('PersonelId', formData.personalID);
    //         if (formData.districts) form.append('DistrictId', formData.districts);
    //         if (formData.sites) form.append('SiteId', formData.sites);
    //         if (formData.StartDate) form.append('StartDate', formData.StartDate);
    //         if (formData.EndDate) form.append('EndDate', formData.EndDate);
    //         if (formData.PositionId) form.append('PositionId', formData.PositionId.toString());
    //         if (formData.country) form.append('CountryId', formData.country);
    //         if (formData.Type) form.append('Type', formData.Type);
    //         if (formData.Selections) form.append('Selections', formData.Selections);
    //         const response = await axiosInstance.post('/Report/generate-report', form, {
    //             responseType: 'json',
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
    //         if (!response?.data?.data) {
    //             toast.info(response?.data?.message);
    //             return;
    //         }
    //         const files = response?.data?.data?.files;
    //         if (files && files.length > 0 && files[0]?.fileContent) {
    //             const binaryString = window.atob(files[0].fileContent);
    //             const bytes = new Uint8Array(binaryString.length);
    //             for (let i = 0; i < binaryString.length; i++) {
    //                 bytes[i] = binaryString.charCodeAt(i);
    //             }
    //             const blob = new Blob([bytes], {
    //                 type: response.headers['content-type'] || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    //             });
    //             const url = window.URL.createObjectURL(blob);
    //             const link = document.createElement('a');
    //             link.href = url;
    //             link.setAttribute('download', files[0]?.fileName);
    //             document.body.appendChild(link);
    //             link.click();
    //             window.URL.revokeObjectURL(url);
    //             document.body.removeChild(link);
    //         }
    //         if (response.data.data.reportData) {
    //             setReportData(response.data.data.reportData);
    //         }

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
            setState(prevState => ({ ...prevState, loading: true }));
            const form = new FormData();
            if (formData.reportType) form.append('ReportId', formData.reportType);
            if (formData.personalID) form.append('PersonelId', formData.personalID);
            if (formData.districts) form.append('DistrictId', formData.districts);
            if (formData.sites) form.append('SiteId', formData.sites);
            if (formData.StartDate) form.append('StartDate', formData.StartDate);
            if (formData.EndDate) form.append('EndDate', formData.EndDate);
            if (formData.PositionId) form.append('PositionId', formData.PositionId.toString());
            if (formData.country) form.append('CountryId', formData.country);
            if (formData.Type) form.append('Type', formData.Type);
            if (formData.Selections) form.append('Selections', formData.Selections);

            const response = await axiosInstance.post('/Report/generate-report', form, {
                responseType: 'json',
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (!response?.data?.data) {
                toast.info(response?.data?.message);
                return;
            }

            const files = response?.data?.data?.files;
            if (files && files.length > 0) {
                if (files.length === 1) {
                    // Single file download
                    const file = files[0];
                    const binaryString = window.atob(file.fileContent);
                    const bytes = new Uint8Array(binaryString.length);
                    for (let i = 0; i < binaryString.length; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }
                    const blob = new Blob([bytes], {
                        type: response.headers['content-type'] || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', file.fileName);
                    document.body.appendChild(link);
                    link.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(link);
                } else {
                    const zip = new JSZip();
                    files.forEach((file: any, index: any) => {
                        const binaryString = window.atob(file.fileContent);
                        const bytes = new Uint8Array(binaryString.length);
                        for (let i = 0; i < binaryString.length; i++) {
                            bytes[i] = binaryString.charCodeAt(i);
                        }
                        zip.file(file.fileName, bytes, { binary: true });
                    });

                    const content = await zip.generateAsync({ type: "blob" });
                    saveAs(content, "report_files.zip");
                }
            }

            if (response.data.data.reportData) {
                setReportData(response.data.data.reportData);
            }

        } catch (error) {
            console.error('Error generating report:', error);
        } finally {
            setState(prevState => ({ ...prevState, loading: false }));
            // handleClear();
        }
    };



    const handleClear = () => {
        setFormData({
            reportType: '',
            personalID: '',
            sites: "",
            districts: '',
            StartDate: '',
            EndDate: '',
            PositionId: null,
            country: '',
            Type: '',
            Selections: ''

        });
        setState(prevState => ({
            ...prevState,
            personnelOptions: [],
            siteData: [],
            page: 1,
            hasMore: true,
        }));
        setReportData(null);
        if (selectedPersonnel.current) {
            selectedPersonnel.current.clearValue();
        }
    };

    const handleDownloadExcel = async () => {
        await DownloadExcel(formData.reportType, reportData, formData);
    };

    console.log('formData.reportType', formData.reportType);
    console.log('formData.reportData', reportData);

    return (
        <section className="DashboardPage py-3">
            <div className='reportOuter'>
                <div className="row justify-content-center mb-3 position-relative" style={{ zIndex: '999' }}>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <form onSubmit={handleSubmit} className="DistrictForm">
                            <div className="formCard p-3">
                                <div className="mb-0 row pe-lg-4 pe-md-4 pe-0 filterForm">
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                                        <div className="mb-lg-2 mb-md-2 mb-sm-2 mb-2">
                                            <label className="form-label mb-2">Report type :</label>
                                            <select
                                                className="form-select"
                                                name="reportType"
                                                value={formData.reportType}
                                                onChange={handleInputChange}
                                            >
                                                <option value="" disabled>Select a report type</option>
                                                {state.reportData.map((report) => (
                                                    <option key={report.id} value={report.id}>
                                                        {report.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                                        <div className="mb-lg-2 mb-md-2 mb-sm-2 mb-2">
                                            <label className="form-label mb-2">Personnel :</label>
                                            <Select
                                                ref={selectedPersonnel}
                                                id="personalID"
                                                name="personalID"
                                                value={state.personnelOptions.find((option: any) => option.value === formData.personalID)}
                                                onChange={handlePersonnelChange}
                                                options={state.personnelOptions}
                                                isSearchable={true}
                                                onMenuScrollToBottom={() => loadMorePersonnel("")}
                                                onInputChange={(inputValue) => {
                                                    setState(prevState => ({ ...prevState, page: 1, hasMore: true }));
                                                    debouncedLoadMore(inputValue);
                                                }}
                                                placeholder="Select or search for Person"
                                                isLoading={state.loading}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                                        <div className="mb-lg-2 mb-md-2 mb-sm-2 mb-2">
                                            <label className="form-label mb-2">Districts :</label>
                                            <select
                                                className="form-select"
                                                name="districts"
                                                value={formData.districts}
                                                onChange={handleInputChange}
                                            >
                                                <option value=""> Select Districts</option>
                                                {state.districtReportData.map((report) => (
                                                    <option key={report.districtId} value={report.districtId}>
                                                        {report.distNam}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                                        <div className="mb-lg-2 mb-md-2 mb-sm-2 mb-2">
                                            <label className="form-label mb-2">Sites :</label>
                                            <select
                                                className="form-select"
                                                name="sites"
                                                value={formData.sites}
                                                onChange={handleInputChange}
                                            // disabled={!state.siteData || state.siteData.length === 0}
                                            >
                                                <option value="">All Sites</option>
                                                {state?.siteData && state.siteData.length > 0
                                                    ? state.siteData.map((site: any) => (
                                                        <option key={site.siteID} value={site.siteID}>
                                                            {site.fullName}
                                                        </option>
                                                    ))
                                                    : state?.siteReportData?.map((report) => (
                                                        <option key={report.siteID} value={report.siteID}>
                                                            {report.siteName}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                                        <div className="mb-lg-2 mb-md-2 mb-sm-2 mb-2">
                                            <label className="form-label mb-2">Start Date :</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="StartDate"
                                                value={formData.StartDate}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                                        <div className="mb-lg-2 mb-md-2 mb-sm-2 mb-2">
                                            <label className="form-label mb-2">End Date :</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="EndDate"
                                                value={formData.EndDate}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                                        <div className="mb-lg-2 mb-md-2 mb-sm-2 mb-2">
                                            <label className="form-label mb-2">Position :</label>
                                            <select
                                                className="form-select"
                                                name="PositionId"
                                                value={formData.PositionId || ''}
                                                onChange={handleInputChange}
                                            >
                                                <option>Select a position</option>
                                                {state.positionData.map((position: any) => (
                                                    <option key={position.positionId} value={position.positionId}>
                                                        {position.position}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                                        <div className="mb-lg-2 mb-md-2 mb-sm-2 mb-2">
                                            <label className="form-label mb-2">County :</label>
                                            <select
                                                className="form-select"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select County</option>
                                                <option value="0">Both Counties</option>
                                                <option value="N">Nassau</option>
                                                <option value="S">Suffolk</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-4 col-sm-6 col-12">
                                        <div className="mb-lg-2 mb-md-2 mb-sm-2 mb-2">
                                            <label className="form-label mb-2">Type :</label>
                                            <select
                                                className="form-select"
                                                name="Type"
                                                value={formData.Type}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select Type</option>
                                                <option value="0">All Type</option>
                                                <option value="1">Pre-k</option>
                                                <option value="2">Childcare</option>
                                                <option value="3">Pre-k & Childcare</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-4 col-sm-6 col-12">
                                        <div className="mb-lg-2 mb-md-2 mb-sm-2 mb-2">
                                            <label className="form-label mb-2">Selections :</label>
                                            <select
                                                className="form-select"
                                                name="Selections"
                                                value={formData.Selections}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select Selections</option>
                                                <option value="0">All Selections</option>
                                                <option value="1">Before</option>
                                                <option value="2">During</option>
                                                <option value="3">After</option>
                                                <option value="4">Before & After</option>
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
                                            {/* <button type="submit" className='btn btn-primary' disabled={(!formData.reportType) || state.loading}>{state.loading ? (<span className="btnloader loader"></span>) : (<span>Submit</span>)}</button> */}
                                            {reportData && formData.reportType && (
                                                <button type="button" className="btn btn-primary" onClick={handleDownloadExcel} >
                                                    Download Excel
                                                </button>
                                            )}
                                            <button type="submit" className='btn btn-primary' disabled={(!formData.reportType) || state.loading}>{state.loading ? (<span className="btnloader loader"></span>) : (<span>Generate Report</span>)}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
                {/* {reportData ? (
                    <ReportViewer
                        reportType={'32'}
                        reportData={reportData}
                    />
                ) : (
                    <div className='w-100 text-center pdfArea'></div> 
                )}  */}
                {reportData && formData.reportType ? (
                    // <ReportViewer
                    //     reportType={formData.reportType}
                    //     reportData={reportData}
                    // />
                    <PdfViewer reportType={formData.reportType} reportData={reportData} formData={formData} />
                ) : (
                    <div className='w-100 text-center pdfArea'></div>
                )}
            </div>
        </section>
    );
};

export default Report;