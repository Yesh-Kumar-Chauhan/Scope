import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useModalCallback } from '../../contexts/ModalCallbackContext';
import { fetchLookup, createTimeSheetForm, updateTimeSheetForm, getLookUpPositions, getSitesByType, getCertificateTypeData, getAbsenceData, getAbsenceReasonData } from '../../apis/personnelApi';
import { getSiteDataByDistrictId, getSiteDataByOperation, fetchAllSites } from '../../apis/sitesApi';
import { ISchedularTable, IAttendanceForm } from '../../interface/Personnel';
import { fetchSchoolList } from '../../apis/schoolApi'
import { useAttandanceForm } from '../../hooks/personnel/attandance/useAttandanceForm'
import { ISchedularTimesheet } from '../../interface/scheduleTimesheet';
import { fetchAllDistrict } from '../../apis/districtsApi';
import { getUserData } from "../../utils/utils";

const AttandanceModal: React.FC<{
    initialData?: IAttendanceForm;
    onClose: () => void;
    isEditingTimesheet: boolean;
    setIsEditingTimesheet: React.Dispatch<React.SetStateAction<boolean>>;
    personalId: number;
    attendanceID: number;
    refetch: any;
    schedular: ISchedularTable
    setSites: any,
    sites: any,
    encodedSiteNumbers: string;
}>
    = ({ initialData = {} as IAttendanceForm, onClose, isEditingTimesheet, setIsEditingTimesheet, personalId, attendanceID, refetch, schedular, encodedSiteNumbers }) => {

        const [sites, setSites] = useState<any>([]);
        const [position, setPosition] = useState<any>([]);
        const [absences, setAbsences] = useState<any>([]);
        const [absenceReasons, setAbsenceReasons] = useState<any>([]);
        const userData = getUserData();

        const {
            attendanceFormData,
            setAttendanceFormData,
            handleChange,
            handleSubmit,
            errors,
            setErrors,
            loading,
            setDistrictSite,
            districtSite,
            schedules,
            setSchedules
        } = useAttandanceForm(initialData, setIsEditingTimesheet, isEditingTimesheet, attendanceID, onClose, refetch, personalId, sites, setSites);

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
                setAttendanceFormData(initialData);
            }
        }, [initialData]);

        useEffect(() => {
            if (isEditingTimesheet) {
                setIsEditingTimesheet(true);
            }
        }, [isEditingTimesheet]);

        // useEffect(() => {
        //     const fetchInitialData = async () => {
        //         try {
        //             const [absenceDataResponse, absenceReasonDataResponse, siteData] = await Promise.all([
        //                 getAbsenceData(),
        //                 getAbsenceReasonData(),
        //                 // getSiteDataByOperation(255, 0),
        //                 getSiteDataByOperation(encodedSiteNumbers, 0),
        //             ]);

        //             setAbsences(absenceDataResponse?.data);
        //             setAbsenceReasons(absenceReasonDataResponse?.data);
        //             setSites(siteData);
        //         } catch (error) {
        //             console.error("Error fetching data:", error);
        //         }
        //     };

        //     fetchInitialData();
        // }, []);
        useEffect(() => {
            const fetchInitialData = async () => {
                try {
                    const [absenceDataResponse, absenceReasonDataResponse] = await Promise.all([
                        getAbsenceData(),
                        getAbsenceReasonData(),
                        // fetchAllSites()
                    ]);
                    setAbsences(absenceDataResponse?.data);
                    setAbsenceReasons(absenceReasonDataResponse?.data);
                    // setSites(allSites.data);
                    // if (encodedSiteNumbers) {
                    //     const siteData = await getSiteDataByOperation(encodedSiteNumbers, 0);
                    //     setSites(siteData);
                    // } else {
                    //     setSites([]); 
                    // }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchInitialData();
        }, []);
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const allSitesResponse = await fetchAllSites(); // Assuming fetchAllSites() returns { data, totalItems }
                    const allSites = allSitesResponse.data; // Access the 'data' property
                    if (schedules?.length && allSites?.length) {
                        const matchingSites = schedules.map((schedule: any) => {
                            const matchingSite = allSites.find((site: any) => site.siteID === schedule.siteID)

                            if (matchingSite) {
                                return {
                                    ...matchingSite,
                                    scheduleId: schedule.id, // Or whichever field is correct
                                };
                            }

                            // If no matching site is found, you can return null or undefined and filter them out later
                            return null;
                        }).filter((site: any) => site !== null); // Remove any nulls if no match was found
                        setSites(matchingSites?.length ? matchingSites : []);
                    } else {
                        setSites([]);
                    }
                } catch (error) {
                    console.error("Error fetching sites:", error);
                    setSites([]);
                }
            };
            fetchData();
        }, [schedules]);



        const handleClose = () => {
            onClose()
        }
        const handleSiteChange = (e: any) => {
            const selectedSite = sites.find((site: any) => site.siteNumber === e.target.value);
            setAttendanceFormData(prevData => ({
                ...prevData,
                siteNumber: selectedSite.siteNumber,
                siteName: selectedSite.siteName
            }));
        };

        return (
            <div className={`modal fade show timesheetModal editAsignment align-items-lg-start overflow-auto align-items-md-start align-items-start justify-content-center`}
                id="Filter" aria-labelledby="FilterLabel" aria-hidden="true">
                <div className="modal-dialog w-100">
                    <div className="modal-content p-4">
                        <div className="modal-body p-lg-2 p-md-2 p-0">
                            <div className="formCard mt-0 p-0 border-0">
                                <div className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-4 mb-md-3 mb-3">
                                    <h3 className="text-nowrap formTitle m-0">{isEditingTimesheet ? 'Edit Attendance' : 'Attendance'}</h3>
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
                                                    id="date"
                                                    name="date"
                                                    value={formatDate(attendanceFormData.date)}
                                                    max={new Date().toISOString().split("T")[0]}
                                                    onChange={(e) => {
                                                        handleChange(e)
                                                    }}
                                                />
                                                {errors?.date && (
                                                    <div className="text-danger">
                                                        {errors?.date?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="mb-0">
                                                <label className="form-label mb-2">Sites Name:</label>
                                                <select
                                                    className="form-select"
                                                    name="siteNumber"
                                                    //   value={attendanceFormData.siteNumber}
                                                    value={`${attendanceFormData.siteNumber}|${attendanceFormData.scheduleId || ''}`}
                                                    onChange={(e) => {
                                                        handleChange(e); // Call the existing handler
                                                    }}
                                                    disabled={sites.length === 0}
                                                >
                                                    <option value=""> Sites Name</option>
                                                    {sites?.map((site: any) => {
                                                        const matchingSchedule = schedules?.find(
                                                            (schedule: any) => schedule.id === site.scheduleId
                                                        );
                                                        const isAdditional = matchingSchedule?.paycode ? true : false;
                                                        return (
                                                            <option key={`${site.siteID}-${site.scheduleId}`}
                                                                value={`${site.siteNumber}|${site.scheduleId}`}>
                                                                {site.siteName} {isAdditional ? '(Additional)' : ''}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                                {errors?.siteNumber && (
                                                    <div className="text-danger">
                                                        {errors?.siteNumber?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="mb-0">
                                                <label className="form-label mb-2">Absent :</label>
                                                <select
                                                    className="form-select"
                                                    name="fraction"
                                                    value={attendanceFormData.fraction}
                                                    onChange={(e) => { handleChange(e); }}
                                                >
                                                    <option value=""> Select Absent</option>
                                                    {absences.map((absences: any) => (
                                                        <option key={absences.absentName} value={absences.absentName}>
                                                            {absences.absentName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                            <div className="mb-0 w-100">
                                                <label className="form-label mb-2">Reason :</label>
                                                <select
                                                    className="form-select"
                                                    name="reasonID"
                                                    value={attendanceFormData.reasonID}
                                                    onChange={(e) => {
                                                        handleChange(e)
                                                    }}
                                                >
                                                    <option value=""> Select Reason</option>
                                                    {absenceReasons?.map((id: any) => (
                                                        <option key={id.id} value={id.id}>
                                                            {id.reason}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors?.reasonID && (
                                                    <div className="text-danger">
                                                        {errors?.reasonID?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                            <div className="d-flex checked align-items-center gap-2">
                                                <div className="inputDesign position-relative">
                                                    <input
                                                        type="checkbox"
                                                        id="paid"
                                                        name="paid"
                                                        checked={attendanceFormData.paid}
                                                        onChange={(e) => {
                                                            handleChange(e)
                                                        }}
                                                    />
                                                    {errors?.paid && (
                                                        <div className="text-danger">
                                                            {errors?.paid?._errors[0]}
                                                        </div>
                                                    )}
                                                    <div className="checked">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                            <path d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                    <div className="Unchecked">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                            <path d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <label className="form-label m-0" style={{ fontWeight: attendanceFormData.paid ? 'bold' : 'normal' }}>Paid</label>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                            <div className="d-flex checked align-items-center gap-2">
                                                <div className="inputDesign position-relative">
                                                    <input
                                                        type="checkbox"
                                                        id="charged"
                                                        name="charged"
                                                        checked={attendanceFormData.charged}
                                                        onChange={(e) => {
                                                            handleChange(e)
                                                        }}
                                                    />
                                                    {errors?.charged && (
                                                        <div className="text-danger">
                                                            {errors?.charged?._errors[0]}
                                                        </div>
                                                    )}
                                                    <div className="checked">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                            <path d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                    <div className="Unchecked">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                            <path d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <label className="form-label m-0" style={{ fontWeight: attendanceFormData.charged ? 'bold' : 'normal' }}>Charged</label>
                                            </div>
                                        </div>

                                        <div className='col-12'>
                                            <div className="mb-0 w-100">
                                                <label className="form-label mb-2">Notes :</label>
                                                <textarea className='w-100' rows={12} id="reason"
                                                    name="reason"
                                                    value={attendanceFormData.reason}
                                                    onChange={(e) => handleChange(e)} ></textarea>
                                                {errors?.reason && (
                                                    <div className="text-danger">
                                                        {errors?.reason?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-end gap-lg-4 gap-md-3 gap-3">
                                        <button type='button' onClick={handleClose} className="btn btn-transparent ps-3 pe-4">
                                            Cancel
                                        </button>
                                        {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" && userData.role !== "Scope.StudentService_PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1AND2" &&
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

export default AttandanceModal;
