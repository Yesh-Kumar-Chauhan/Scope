import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { fetchAllSites } from '../../apis/sitesApi';
import { ISite, ISiteTable } from '../../interface/Sites';
import { getLookUpPositions, getSitesByType } from '../../apis/personnelApi';

// Define the props interface including `isEditing`
interface ScheduleDataModalProps {
    initialData?: any;
    onClose: () => void;
    isEditing?: boolean; // Add `isEditing` to props
}

const ScheduleDataModal: React.FC<ScheduleDataModalProps> = ({ initialData = {}, onClose, isEditing = false }) => {
    const [formData, setFormData] = useState(initialData)
    const [sites, setSites] = useState<any>([]);
    const [allSites, setAllSites] = useState<any>([]);
    const [position, setPosition] = useState<any>([]);
    const [positionsData, setPositionsData] = useState<any>({});


    useEffect(() => {
        const fetchPositions = async () => {
            try {
                const positionsData = await getLookUpPositions();
                const sitesTypesData = await getSitesByType();
                const combinedData = {
                    positions: positionsData,
                    sitesTypes: sitesTypesData
                };
                // Set the combined data into state
                setPositionsData(combinedData);
            } catch (error) {
                console.error("Error fetching positions:", error);
            }
        };

        fetchPositions();
        fetchSites()

    }, []);

    useEffect(() => {
        if (initialData.siteType == 'Before') {
            if (initialData?.personnelFormData && allSites.length) {
                const siteNumber = initialData?.personnelFormData?.sitE_NUM_B
                const siteName = initialData?.personnelFormData?.sitE_NAM_B
                // initialData. = ''
                const updatedInitialData = {
                    ...initialData,
                    siteID: allSites.find((x: { siteNumber: any; }) => x.siteNumber == siteNumber)?.siteID,
                    position: initialData?.personnelFormData?.sitE_POS_B
                };
                setFormData(updatedInitialData);
            }
            setSites(positionsData?.sitesTypes?.data?.beforeSites)
            setPosition(positionsData?.positions?.data?.beforePositions)

        } else if (initialData.siteType == 'During') {
            if (initialData?.personnelFormData && allSites.length) {
                const siteNumber = initialData?.personnelFormData?.sitE_NUM_D
                const siteName = initialData?.personnelFormData?.sitE_NAM_D
                const updatedInitialData = {
                    ...initialData,
                    siteID: allSites.find((x: { siteNumber: any; }) => x.siteNumber == siteNumber)?.siteID,
                    position: initialData?.personnelFormData?.sitE_POS_D
                };
                setFormData(updatedInitialData);
            }

            setSites(positionsData?.sitesTypes?.data?.duringSites)
            setPosition(positionsData?.positions?.data?.duringPositions)


        } else if (initialData.siteType == 'After') {
            if (initialData?.personnelFormData && allSites.length) {
                const siteNumber = initialData?.personnelFormData?.sitE_NUM_A
                const siteName = initialData?.personnelFormData?.sitE_NAM_A

                const updatedInitialData = {
                    ...initialData,
                    siteID: allSites.find((x: any) => x.siteNumber == siteNumber)?.siteID,
                    position: initialData?.personnelFormData?.sitE_POS_A
                };
                setFormData(updatedInitialData);
            }
            setSites(positionsData?.sitesTypes?.data?.afterSites)
            setPosition(positionsData?.positions?.data?.afterPositions)

        }

    }, [initialData.siteType, positionsData, allSites]);

    const fetchSites = async () => {
        const response = await fetchAllSites()
        if (!response?.data?.length) return;
        setAllSites(response?.data)
    }

    const formatDate = (dateString: any) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };
    return (
        <div className={`modal fade show afterSchool timesheetModal editAsignment align-items-lg-center overflow-auto align-items-md-center align-items-start justify-content-center`}
            id="Filter" aria-labelledby="FilterLabel" aria-hidden="true">
            <div className="modal-dialog w-100">
                <div className="modal-content p-4">
                    <div className="modal-body p-lg-2 p-md-2 p-0">
                        <div className="formCard mt-0 p-0 border-0">
                            <div className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-4 mb-md-3 mb-3">
                                <h3 className="text-nowrap formTitle m-0">{initialData?.siteType ? `${initialData?.siteType} School` : 'Schedule Detail'}</h3>
                                <hr className="w-100" />
                                <div className="editForm" data-bs-dismiss="modal" aria-label="Close" onClick={onClose} style={{ cursor: 'pointer' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                        <path d="M19 5.5L5 19.5M19 19.5L5 5.5" stroke="black" stroke-width="2" stroke-linecap="round"></path>
                                    </svg>
                                </div>
                            </div>
                            <form className="DistrictForm">
                                <div className="row g-lg-4 g-md-4 g-3">
                                    <div className='col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-4 modalBorder border-end'>
                                        <div className='row g-lg-4 g-md-4 g-3'>
                                            <div className="col-12">
                                                <div className="w-100 m-0">
                                                    <label className="form-label mb-2">Site :</label>
                                                    <select
                                                        className="form-select"
                                                        id="siteID"
                                                        name="siteID"
                                                        // onChange={handleChange}
                                                        disabled={true}
                                                        value={formData.siteID}
                                                    >
                                                        <option >Select Sites</option>
                                                        {sites?.map((sites: any) => (
                                                            <option key={sites.siteID} value={sites.siteID}>
                                                                {sites.siteName}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="w-100 m-0">
                                                    <label className="form-label mb-2">Position :</label>
                                                    <select
                                                        className="form-select"
                                                        id="siteID"
                                                        name="siteID"
                                                        // onChange={handleChange}
                                                        disabled={true}
                                                        value={formData.position}
                                                    >
                                                        <option >Select Option</option>
                                                        {position?.map((position: any) => (
                                                            <option key={position.positionId} value={position.position}>
                                                                {position.position}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="w-100 m-0">
                                                    <label className="form-label mb-2">Date:</label>
                                                    <input disabled={true} type="date" className="form-control" id="date"
                                                        name="date"
                                                        value={formatDate(formData.date)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="m-0 w-100">
                                                    <label className="form-label mb-2"> Times In:</label>
                                                    <input disabled={true} type="time" className="form-control" id="timeIn"
                                                        name="timeIn"
                                                        value={formData.timeIn}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="mb-0 w-100">
                                                    <label className="form-label mb-2">Times Out:</label>
                                                    <input disabled={true} type="time" className="form-control" id="timeOut"
                                                        name="timeOut"
                                                        value={formData.timeOut}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-6 col-md-6 col-sm-12 col-12 ps-lg-4'>
                                        <div className='row g-lg-4 g-md-4 g-3'>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="mb-0">
                                                    <label className="form-label mb-2">Additional Start :</label>
                                                    <input disabled={true} type="time" className="form-control" id="timeIn"
                                                        name="timeIn"
                                                        value={formData.additionalStart}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="mb-0">
                                                    <label className="form-label mb-2">Additional Stop :</label>
                                                    <input disabled={true} type="time" className="form-control" id="timeOut"
                                                        name="timeOut"
                                                        value={formData.additionalStop}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="mb-0">
                                                    <label className="form-label mb-2">Lunch In :</label>
                                                    <input disabled={true} type="time" className="form-control" id="timeIn"
                                                        name="timeIn"
                                                        value={formData.lunchIn}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="mb-0">
                                                    <label className="form-label mb-2">Lunch Out :</label>
                                                    <input disabled={true} type="time" className="form-control" id="timeOut"
                                                        name="timeOut"
                                                        value={formData.lunchOut}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="mb-0">
                                                    <label className="form-label mb-2">Notes :</label>

                                                    <textarea disabled={true} className='w-100' id="notes" value={formData.notes}
                                                        name="notes" style={{ minHeight: '150px' }}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="d-flex align-items-center justify-content-end gap-lg-4 gap-md-3 gap-3">

                                        <button type='button' onClick={handleClose} className="btn btn-transparent ps-3 pe-4">
                                            Cancel
                                        </button>
                                        <button type='button' onClick={handleSubmit} className="btn btn-primary ps-3 pe-4" style={{ cursor: 'pointer' }}>
                                            {loading ? (
                                                <span className="btnloader loader"></span>
                                            ) : (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="me-2" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path d="M13.8001 19.5514H19.8001M4.2002 19.5514L8.56618 18.6717C8.79796 18.625 9.01077 18.5109 9.17791 18.3437L18.9516 8.56461C19.4202 8.09576 19.4199 7.33577 18.9509 6.86731L16.8805 4.79923C16.4117 4.33097 15.6521 4.33129 15.1837 4.79995L5.40896 14.58C5.24214 14.7469 5.12824 14.9593 5.0815 15.1906L4.2002 19.5514Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </svg>
                                                    <span>{isEditingSchedular ? 'Edit' : 'Submit'}</span>
                                                </>
                                            )}
                                        </button>
                                    </div> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScheduleDataModal