import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useModalCallback } from '../../contexts/ModalCallbackContext';
import { fetchLookup, createTimeSheetForm, updateTimeSheetForm, getLookUpPositions, getSitesByType, getSchedularDataForPersonDate } from '../../apis/personnelApi';
import { getSiteDataByDistrictId } from '../../apis/sitesApi';
import { ISchedularTable, ITimesheetForm } from '../../interface/Personnel';
import { fetchSchoolList } from '../../apis/schoolApi'
import { useTimesheetForm } from '../../hooks/personnel/personnelTimesheet/useTimesheetForm'
import { ISchedularTimesheet } from '../../interface/scheduleTimesheet';
import { fetchAllDistrict } from '../../apis/districtsApi';
import { getUserData } from "../../utils/utils";

const PersonalTimesheetModal: React.FC<{
    initialData?: ITimesheetForm;
    onClose: () => void;
    isEditingTimesheet: boolean;
    setIsEditingTimesheet: React.Dispatch<React.SetStateAction<boolean>>;
    personalId: number;
    timesheetID: number;
    refetch: any;
    schedular: ISchedularTable
}>
    = ({ initialData = {} as ITimesheetForm, onClose, isEditingTimesheet, setIsEditingTimesheet, personalId, timesheetID, refetch, schedular }) => {

        const [sites, setSites] = useState<any>([]);
        const [position, setPosition] = useState<any>([]);
        const [siteTypes, setSiteTypes] = useState<any>([]);
        const userData = getUserData();

        const {
            timesheetFormData,
            setTimesheetFormData,
            handleChange,
            handleSubmit,
            errors,
            setErrors,
            loading,
            setDistrictSite,
            districtSite,
            schedules,
            setSchedules
        } = useTimesheetForm(initialData, setIsEditingTimesheet, isEditingTimesheet, timesheetID, onClose, refetch, personalId);

        const formatDate = (dateString: any) => {
            if (!dateString) return '';

            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            return `${year}-${month}-${day}`;
        };

        useEffect(() => {
            if (initialData) {
                setTimesheetFormData(initialData);
                bindSchedules();
            }
        }, [initialData]);

        const bindSchedules = async () => {
            if (initialData.timeSheetDate) {
                const scheduleData = await getSchedularDataForPersonDate(personalId, initialData.timeSheetDate)
                setSchedules(scheduleData)

                const reverseSiteTypeMapping: Record<number, string> = { 0: "Before", 1: "During", 2: "After" };
                const selectedSiteType = reverseSiteTypeMapping[initialData.type];
                const sites = Array.from(
                    new Set(
                        scheduleData
                            .filter((x: any) => x.siteType === selectedSiteType)
                            .map((x: any) => JSON.stringify({
                                siteID: x.siteID,
                                fullName: `${x.siteName} (${x.distName})`
                            }))
                    )
                ).map((site: any) => JSON.parse(site)); // Convert back to objects

                setDistrictSite((prevState: any) => ({
                    ...prevState,
                    siteData: sites,
                }));

            }
        }

        useEffect(() => {
            if (isEditingTimesheet) {
                setIsEditingTimesheet(true);
            }
        }, [isEditingTimesheet]);

        useEffect(() => {
            const fetchSiteAndDistrictData = async () => {
                try {
                    const [districtDataResponse] = await Promise.all([fetchAllDistrict()]);
                    const districts = districtDataResponse.data;
                    const data = districts.filter((x: any) => x.districtId === timesheetFormData.districtID);

                    if (data[0]?.districtId) {
                        //const response = await getSiteDataByDistrictId(data[0]?.districtId, 0);
                        setDistrictSite((prevState: any) => ({ ...prevState, districtSchoolData: districts }));
                        // setDistrictSite((prevState: any) => ({ ...prevState, siteData: response, districtSchoolData: districts }));
                    } else {
                        console.warn("District not found based on distNum");
                    }
                } catch (error) {
                    console.error("Error fetching district or site data:", error);
                }
            };

            if (timesheetFormData.districtID) {
                fetchSiteAndDistrictData();
            }
        }, [timesheetFormData.districtID]);

        useEffect(() => {
            const fetchInitialData = async () => {
                try {
                    const [districtDataResponse] = await Promise.all([
                        fetchAllDistrict()
                    ]);
                    const positionsData = await fetchLookup();
                    setPosition(positionsData?.data)

                    setDistrictSite((prevState: any) => ({
                        ...prevState,
                        districtSchoolData: districtDataResponse?.data,
                    }));
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchInitialData();
        }, []);

        const handleClose = () => {
            onClose()
        }

        useEffect(() => {
            if (schedules?.length) {
                // Define the siteTypeMapping with appropriate mappings
                const siteTypeMapping: Record<string, number> = { "Before": 0, "During": 1, "After": 2 };

                // Extract unique `siteType` values and filter out deleted records, then map to objects with labels and numeric values
                const siteTypeOptions = Array.from(
                    new Set(
                        schedules
                            .filter(schedule => schedule.siteType && !schedule.deletedDate) // Exclude deleted records
                            .map(schedule => schedule.siteType) // Map to siteType values
                    )
                ).map(siteType => ({
                    label: siteType,
                    value: siteTypeMapping[siteType as string] ?? null
                }));

                setSiteTypes(siteTypeOptions);

            }
            else {
                setSiteTypes([])
            }
        }, [schedules]);

        // Update sites dropdown based on selected schedule (siteType)
        const handleScheduleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedSiteTypeValue = parseInt(e.target.value);
            if (!schedules?.length || isNaN(selectedSiteTypeValue)) return;

            // Reverse mapping to get the string site type from the numeric value
            const reverseSiteTypeMapping: Record<number, string> = { 0: "Before", 1: "During", 2: "After" };
            const selectedSiteType = reverseSiteTypeMapping[selectedSiteTypeValue];

            const sites = Array.from(
                new Set(
                    schedules
                        .filter((x: any) => x.siteType === selectedSiteType)
                        .map((x: any) => JSON.stringify({
                            siteID: x.siteID,
                            fullName: `${x.siteName} (${x.distName})`
                        })) // Convert objects to strings to ensure unique comparison in the Set
                )
            ).map((site: any) => JSON.parse(site)); // Parse back to objects

            setDistrictSite((prevState: any) => ({
                ...prevState,
                siteData: sites,
            }));

            setTimesheetFormData((state) => ({
                ...state,
                type: selectedSiteTypeValue // Store the numeric value in `type`
            }));
        };

        console.log('schedules from api', schedules);
        console.log('timesheetFormData', timesheetFormData);

        return (
            <div className={`modal fade show timesheetModal editAsignment align-items-lg-start overflow-auto align-items-md-start align-items-start justify-content-center`}
                id="Filter" aria-labelledby="FilterLabel" aria-hidden="true">
                <div className="modal-dialog w-100">
                    <div className="modal-content p-4">
                        <div className="modal-body p-lg-2 p-md-2 p-0">
                            <div className="formCard mt-0 p-0 border-0">
                                <div className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-4 mb-md-3 mb-3">
                                    <h3 className="text-nowrap formTitle m-0">{isEditingTimesheet ? 'Update Timesheet' : 'Timesheet'}</h3>
                                    <hr className="w-100" />
                                    <div className="editForm" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose} style={{ cursor: 'pointer' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                            <path d="M19 5.5L5 19.5M19 19.5L5 5.5" stroke="black" stroke-width="2" stroke-linecap="round"></path>
                                        </svg>
                                    </div>
                                </div>
                                <form className="DistrictForm">
                                    <div className="mb-3 row g-lg-4 g-md-4 g-3">
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <label className="form-label mb-2">Date :</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="timeSheetDate"
                                                    name="timeSheetDate"
                                                    value={formatDate(timesheetFormData.timeSheetDate)}
                                                    onChange={(e) => {
                                                        handleChange(e)
                                                    }}
                                                    max={new Date().toISOString().split("T")[0]}
                                                    disabled={isEditingTimesheet}
                                                />
                                                {errors?.timeSheetDate && (
                                                    <div className="text-danger">
                                                        {errors?.timeSheetDate?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="mb-0 w-100">
                                                <label className="form-label mb-2">Schedule :</label>
                                                <select
                                                    className="form-select"
                                                    name="districtID"
                                                    value={timesheetFormData.type}
                                                    onChange={handleScheduleChange}
                                                    disabled={isEditingTimesheet || !timesheetFormData.timeSheetDate}
                                                >
                                                    <option value="">Select Site Type</option>
                                                    {siteTypes?.length && siteTypes.map((siteType: any) => (
                                                        <option key={siteType.value} value={siteType.value}>
                                                            {siteType.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="mb-3">
                                                <label className="form-label mb-2">Districts :</label>
                                                <select
                                                    className="form-select"
                                                    name="districtID"
                                                    value={timesheetFormData.districtID}
                                                    onChange={(e) => { handleChange(e); }}
                                                >
                                                    <option value=""> Select Districts</option>
                                                    {districtSite.districtSchoolData.map((report: any) => (
                                                        <option key={report.districtId} value={report.districtId}>
                                                            {report.distNam}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors?.districtID && (
                                                    <div className="text-danger">
                                                        {errors?.districtID?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div> */}
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="mb-0 w-100">
                                                <label className="form-label mb-2">Sites :</label>
                                                <select
                                                    className="form-select"
                                                    name="siteID"
                                                    value={timesheetFormData.siteID}
                                                    onChange={(e) => { handleChange(e); }}
                                                    disabled={isEditingTimesheet || !timesheetFormData.timeSheetDate}
                                                >
                                                    <option value=""> Select Sites</option>
                                                    {districtSite.siteData?.map((site: any) => (
                                                        <option key={site.siteID} value={site.siteID}>
                                                            {site.fullName}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors?.siteID && (
                                                    <div className="text-danger">
                                                        {errors?.siteID?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <label className="form-label mb-2">Position :</label>
                                                <select
                                                    className="form-select"
                                                    name="position"
                                                    value={timesheetFormData.position}
                                                    disabled={true}
                                                    onChange={(e) => {
                                                        handleChange(e)
                                                    }}
                                                //disabled={isEditingTimesheet}
                                                >
                                                    <option value=""> Select Position</option>
                                                    {position?.map((report: any) => (
                                                        <option key={report.positionId} value={report.position}>
                                                            {report.position}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors?.position && (
                                                    <div className="text-danger">
                                                        {errors?.position?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <label className="form-label mb-2">Time In :</label>
                                                <input
                                                    type="time"
                                                    className="form-control"
                                                    id="timeIn"
                                                    name="timeIn"
                                                    disabled={!!timesheetFormData?.paycode}
                                                    value={timesheetFormData.timeIn}
                                                    onChange={(e) => {
                                                        handleChange(e)
                                                    }}
                                                />
                                                {errors?.timeIn && (
                                                    <div className="text-danger">
                                                        {errors?.timeIn?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <label className="form-label mb-2">Time Out :</label>
                                                <input
                                                    type="time"
                                                    className="form-control"
                                                    id="timeOut"
                                                    name="timeOut"
                                                    disabled={!!timesheetFormData?.paycode}
                                                    value={timesheetFormData.timeOut}
                                                    onChange={(e) => {
                                                        handleChange(e)
                                                    }}
                                                />
                                                {errors?.timeOut && (
                                                    <div className="text-danger">
                                                        {errors?.timeOut?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {/* <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <label className="form-label mb-2">Lunch In :</label>
                                                <input
                                                    type="time"
                                                    className="form-control"
                                                    id="lunchIn"
                                                    name="lunchIn"
                                                    value={timesheetFormData.lunchIn}
                                                    onChange={(e) => {
                                                        handleChange(e)
                                                    }}
                                                />
                                                {errors?.lunchIn && (
                                                    <div className="text-danger">
                                                        {errors?.lunchIn?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <label className="form-label mb-2">Lunch Out :</label>
                                                <input
                                                    type="time"
                                                    className="form-control"
                                                    id="lunchOut"
                                                    name="lunchOut"
                                                    value={timesheetFormData.lunchOut}
                                                    onChange={(e) => {
                                                        handleChange(e)
                                                    }}
                                                />
                                                {errors?.lunchOut && (
                                                    <div className="text-danger">
                                                        {errors?.lunchOut?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div> */}

                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <label className="form-label mb-2">Additional Start :</label>
                                                <input
                                                    type="time"
                                                    className="form-control"
                                                    id="additionalStart"
                                                    name="additionalStart"
                                                    value={timesheetFormData.additionalStart}
                                                    onChange={(e) => {
                                                        handleChange(e)
                                                    }}
                                                />
                                                {errors?.additionalStart && (
                                                    <div className="text-danger">
                                                        {errors?.additionalStart?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <label className="form-label mb-2">Additional Stop :</label>
                                                <input
                                                    type="time"
                                                    className="form-control"
                                                    id="additionalStop"
                                                    name="additionalStop"
                                                    value={timesheetFormData.additionalStop}
                                                    onChange={(e) => {
                                                        handleChange(e)
                                                    }}
                                                />
                                                {errors?.additionalStop && (
                                                    <div className="text-danger">
                                                        {errors?.additionalStop?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {timesheetFormData?.paycode && (
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                                <div className="mb-0 w-100">
                                                    <label className="form-label mb-2">Paycode :</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="paycode"
                                                        name="paycode"
                                                        disabled={!!timesheetFormData?.paycode}
                                                        value={timesheetFormData.paycode}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="d-flex align-items-center justify-content-end gap-lg-4 gap-md-3 gap-3">
                                        <button type='button' onClick={handleClose} className="btn btn-transparent ps-3 pe-4">
                                            Cancel
                                        </button>

                                        {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1" &&
                                            <button type='button' onClick={handleSubmit} className="btn btn-primary ps-3 pe-4" style={{ cursor: 'pointer' }}>
                                                {loading ? (
                                                    <span className="btnloader loader"></span>
                                                ) : (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="me-2" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <path d="M13.8001 19.5514H19.8001M4.2002 19.5514L8.56618 18.6717C8.79796 18.625 9.01077 18.5109 9.17791 18.3437L18.9516 8.56461C19.4202 8.09576 19.4199 7.33577 18.9509 6.86731L16.8805 4.79923C16.4117 4.33097 15.6521 4.33129 15.1837 4.79995L5.40896 14.58C5.24214 14.7469 5.12824 14.9593 5.0815 15.1906L4.2002 19.5514Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                        <span>{isEditingTimesheet ? 'Save Changes' : 'Submit'}</span>
                                                    </>
                                                )}
                                            </button>
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

export default PersonalTimesheetModal;
