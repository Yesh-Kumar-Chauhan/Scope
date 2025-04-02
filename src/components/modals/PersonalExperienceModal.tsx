import React, { useEffect, useState } from 'react'
import { fetchSchedular } from '../../apis/personnelApi';
import moment from 'moment';
import { IPersonnel } from '../../interface/Personnel';
import { formatTime } from '../../utils/utils';
import { useModalCallback } from '../../contexts/ModalCallbackContext';

interface Position {
    id: number;
    positionId: number;
    position: string;
    type: string;
}

interface PersonalExperienceModalProps {
    initialData?: any;
    onClose: () => void;
    isEditing?: boolean; // Add `isEditing` to props
    personnelFormData: any;
    setPersonnelFormData: any;
    handleChange: any;
    errors: any;
    positionsData: any;
}

const PersonalExperienceModal: React.FC<PersonalExperienceModalProps> = ({ initialData = {}, onClose, isEditing = false, personnelFormData, handleChange, errors, positionsData, setPersonnelFormData }) => {
    const [experienceFormData, setExperienceFormData] = useState<any>(personnelFormData || {});
    const [selectedSiteTypeValue, setSelectedSiteTypeValue] = useState('beforeSchool');
    const [loading, setLoading] = useState(false);
    const { getCallback } = useModalCallback();

    const handleTypeChange = (event: any) => {
        setSelectedSiteTypeValue(event.target.value); // Update selected value based on dropdown selection
    };

    const formatDate = (dateString: any) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const numberFields = [
        "facilityID", "sitE_NUM_B", "allottedb", "sitE_NUM_D",
        "allottedd", "allotteda", "type", "stafF_ID", "sitE_NUM_A",
        "paY_RATE_B", "seP_PAY_RATE_B", "jaN_PAY_RATE_B", "salarY_B",
        "maX_HRS_B", "paY_RATE_D", "seP_PAY_RATE_D", "jaN_PAY_RATE_D",
        "salarY_D", "maX_HRS_D", "paY_RATE_A", "seP_PAY_RATE_A", "jaN_PAY_RATE_A",
        "salarY_A", "maX_HRS_A", "daysoff", "maX_ADD_B", "maX_ADD_D", "maX_ADD_A", "daysused",
        "perC_B", "perC_D", "perC_A", "", "", "", "", "", ""
    ];
    const handleChangeExperience = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (name.startsWith("sitE_NAM")) {
            const suffix = name.split('_').pop();
            const siteNumberField = `sitE_NUM_${suffix}`;
            const selectedSite = positionsData?.sitesTypes?.data?.beforeSites?.find(
                (site: any) => site.siteName === value
            ) || positionsData?.sitesTypes?.data?.duringSites?.find(
                (site: any) => site.siteName === value
            ) || positionsData?.sitesTypes?.data?.afterSites?.find(
                (site: any) => site.siteName === value
            );
            setExperienceFormData((prevData: any) => ({
                ...prevData,
                [name]: value, // Update the site name field
                [siteNumberField]: selectedSite ? selectedSite.siteNumber : 0,
            }));
        } else if (type === 'checkbox') {
            const isChecked = (e.target as HTMLInputElement).checked;
            setExperienceFormData((prevData: any) => ({
                ...prevData,
                [name]: isChecked,
            }));
        } else if (numberFields.includes(name)) {
            setExperienceFormData((prevData: any) => ({
                ...prevData,
                [name]: value === '' ? null : parseInt(value, 10),
            }));
        } else {
            setExperienceFormData((prevData: any) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const onSubmit = getCallback();
        if (onSubmit) {
            try {
                setLoading(true);
                setPersonnelFormData(experienceFormData)
                // await onSubmit(experienceFormData);
            } catch (error) {
                console.error('Error submitting form:', error);
            } finally {
                setLoading(false);
            }
        }
        onClose();
    };

    const renderForm = () => {
        switch (selectedSiteTypeValue) {
            case 'beforeSchool':
                return (
                    <>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                            <label className="form-label mb-2">Before Site :</label>
                            <select
                                className="form-select  fw-normal"
                                id="sitE_NAM_B"
                                name="sitE_NAM_B"
                                onChange={handleChangeExperience}
                                value={experienceFormData.sitE_NAM_B}
                            >
                                <option value="">Select Sites</option>
                                {positionsData?.sitesTypes?.data?.beforeSites?.map((sites: any) => (
                                    <option key={sites.siteNumber} value={sites.siteName}>
                                        {sites.siteName}
                                    </option>
                                ))}
                            </select>
                            {errors?.sitE_NAM_B && (
                                <div className="text-danger">
                                    {errors?.sitE_NAM_B?._errors[0]}
                                </div>
                            )}
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                            <label className="form-label mb-2">Before Position :</label>
                            <select
                                className="form-select fw-normal"
                                id="sitE_POS_B"
                                name="sitE_POS_B"
                                onChange={handleChangeExperience}
                                value={experienceFormData.sitE_POS_B}
                            >
                                <option value="">Select Position</option>
                                {positionsData?.positions?.data?.beforePositions?.map((position: any) => (
                                    <option key={position.positionId} value={position.position}>
                                        {position.position}
                                    </option>
                                ))}
                            </select>
                            {errors?.sitE_POS_B && (
                                <div className="text-danger">
                                    {errors?.sitE_POS_B?._errors[0]}
                                </div>
                            )}
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                            <label className="form-label mb-2">Effective Date: :</label>
                            <input type="date" className="form-control fw-normal" id="effectiveDateBefore" name="effectiveDateBefore"
                                value={formatDate(experienceFormData.effectiveDateBefore)} onChange={handleChangeExperience} />
                            {errors?.effectiveDateBefore && (
                                <div className="text-danger">
                                    {errors?.effectiveDateBefore?._errors[0]}
                                </div>
                            )}
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className='row g-2'>
                                <div className='col'>
                                    <label className="form-label text-center w-100 mb-2">MON</label>
                                    <div className='d-flex align-items-center schedule flex-column gap-2'>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_2264" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_2264)">
                                                    <path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V15H4V18H20V6H4V9H2V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM11.5 16.5L10.1 15.05L12.175 13H2V11H12.175L10.1 8.95L11.5 7.5L16 12L11.5 16.5Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control" id="moN_1_E" name="moN_1_E"
                                                value={experienceFormData.moN_1_E ? formatTime(experienceFormData.moN_1_E) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.moN_1_E && (
                                                <div className="text-danger">
                                                    {errors?.moN_1_E?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_4916" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_4916)">
                                                    <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control" id="moN_1_B" name="moN_1_B"
                                                value={experienceFormData.moN_1_B ? formatTime(experienceFormData.moN_1_B) : ""}

                                                onChange={handleChangeExperience} />
                                            {errors?.moN_1_B && (
                                                <div className="text-danger">
                                                    {errors?.moN_1_B?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <label className="form-label text-center w-100 mb-2">TUE</label>
                                    <div className='d-flex align-items-center schedule flex-column gap-2'>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_2264" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_2264)">
                                                    <path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V15H4V18H20V6H4V9H2V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM11.5 16.5L10.1 15.05L12.175 13H2V11H12.175L10.1 8.95L11.5 7.5L16 12L11.5 16.5Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control" id="tuE_1_B" name="tuE_1_B"
                                                value={experienceFormData.tuE_1_B ? formatTime(experienceFormData.tuE_1_B) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.tuE_1_B && (
                                                <div className="text-danger">
                                                    {errors?.tuE_1_B?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_4916" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_4916)">
                                                    <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control" id="tuE_1_E" name="tuE_1_E"
                                                value={experienceFormData.tuE_1_E ? formatTime(experienceFormData.tuE_1_E) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.tuE_1_E && (
                                                <div className="text-danger">
                                                    {errors?.tuE_1_E?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <label className="form-label text-center w-100 mb-2">WED</label>
                                    <div className='d-flex align-items-center schedule flex-column gap-2'>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_2264" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_2264)">
                                                    <path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V15H4V18H20V6H4V9H2V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM11.5 16.5L10.1 15.05L12.175 13H2V11H12.175L10.1 8.95L11.5 7.5L16 12L11.5 16.5Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control" id="weD_1_B" name="weD_1_B"
                                                value={experienceFormData.weD_1_B ? formatTime(experienceFormData.weD_1_B) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.weD_1_B && (
                                                <div className="text-danger">
                                                    {errors?.weD_1_B?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_4916" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_4916)">
                                                    <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control" id="weD_1_E" name="weD_1_E"
                                                value={experienceFormData.weD_1_E ? formatTime(experienceFormData.weD_1_E) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.weD_1_E && (
                                                <div className="text-danger">
                                                    {errors?.weD_1_E?._errors[0]}
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                                <div className='col'>
                                    <label className="form-label text-center w-100 mb-2">THU</label>
                                    <div className='d-flex align-items-center schedule flex-column gap-2'>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_2264" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_2264)">
                                                    <path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V15H4V18H20V6H4V9H2V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM11.5 16.5L10.1 15.05L12.175 13H2V11H12.175L10.1 8.95L11.5 7.5L16 12L11.5 16.5Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control" id="thU_1_B" name="thU_1_B"
                                                value={experienceFormData.thU_1_B ? formatTime(experienceFormData.thU_1_B) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.thU_1_B && (
                                                <div className="text-danger">
                                                    {errors?.thU_1_B?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_4916" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_4916)">
                                                    <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control" id="thU_1_E" name="thU_1_E"
                                                value={experienceFormData.thU_1_E ? formatTime(experienceFormData.thU_1_E) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.thU_1_E && (
                                                <div className="text-danger">
                                                    {errors?.thU_1_E?._errors[0]}
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                                <div className='col'>
                                    <label className="form-label text-center w-100 mb-2">FRI</label>
                                    <div className='d-flex align-items-center schedule flex-column gap-2'>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_2264" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_2264)">
                                                    <path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V15H4V18H20V6H4V9H2V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM11.5 16.5L10.1 15.05L12.175 13H2V11H12.175L10.1 8.95L11.5 7.5L16 12L11.5 16.5Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control" id="frI_1_B" name="frI_1_B"
                                                value={experienceFormData.frI_1_B ? formatTime(experienceFormData.frI_1_B) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.frI_1_B && (
                                                <div className="text-danger">
                                                    {errors?.frI_1_B?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_4916" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_4916)">
                                                    <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control" id="frI_1_E" name="frI_1_E"
                                                value={experienceFormData.frI_1_E ? formatTime(experienceFormData.frI_1_E) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.frI_1_E && (
                                                <div className="text-danger">
                                                    {errors?.frI_1_E?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <ul className='d-flex align-items-center flex-column gap-2'>
                                <li className='d-flex align-items-center justify-content-between gap-3 w-100'>
                                </li>
                                <li className='d-flex align-items-center justify-content-between gap-3 w-100'>

                                </li>
                                <li className='d-flex align-items-center justify-content-between gap-3 w-100'>

                                </li>
                                <li className='d-flex align-items-center justify-content-between gap-3 w-100'>

                                </li>
                                <li className='d-flex align-items-center justify-content-between gap-3 w-100'>

                                </li>
                            </ul> */}
                        </div>
                    </>
                );
            case 'afterSchool':
                return (
                    <>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                            <label className="form-label mb-2"> After Site :</label>
                            <select
                                className="form-select  fw-normal"
                                id="sitE_NAM_A"
                                name="sitE_NAM_A"
                                onChange={handleChangeExperience}
                                value={experienceFormData.sitE_NAM_A}
                            >
                                <option value="">Select Sites</option>
                                {positionsData?.sitesTypes?.data?.afterSites?.map((sites: any) => (
                                    <option key={sites.siteNumber} value={sites.siteName}>
                                        {sites.siteName}
                                    </option>
                                ))}
                            </select>
                            {errors?.sitE_NAM_A && (
                                <div className="text-danger">
                                    {errors?.sitE_NAM_A?._errors[0]}
                                </div>
                            )}
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                            <label className="form-label mb-2">After Position :</label>
                            <select
                                className="form-select fw-normal"
                                id="sitE_POS_A"
                                name="sitE_POS_A"
                                onChange={handleChangeExperience}
                                value={experienceFormData.sitE_POS_A}
                            >
                                <option value="">Select Position</option>
                                {positionsData?.positions?.data?.afterPositions?.map((position: any) => (
                                    <option key={position.positionId} value={position.position}>
                                        {position.position}
                                    </option>
                                ))}
                            </select>
                            {errors?.sitE_POS_A && (
                                <div className="text-danger">
                                    {errors?.sitE_POS_A?._errors[0]}
                                </div>
                            )}
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                            <label className="form-label mb-2">Effective Date: :</label>
                            <input type="date" className="form-control fw-normal" id="effectiveDateAfter" name="effectiveDateAfter" value={formatDate(experienceFormData.effectiveDateAfter)} onChange={handleChangeExperience} />
                            {errors?.effectiveDateAfter && (
                                <div className="text-danger">
                                    {errors?.effectiveDateAfter?._errors[0]}
                                </div>
                            )}
                        </div>



                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className='row g-2'>
                                <div className='col'>
                                    <label className="form-label text-center w-100 mb-2">MON</label>

                                    <div className='d-flex align-items-center schedule flex-column gap-3'>

                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_2264" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_2264)">
                                                    <path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V15H4V18H20V6H4V9H2V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM11.5 16.5L10.1 15.05L12.175 13H2V11H12.175L10.1 8.95L11.5 7.5L16 12L11.5 16.5Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control  fw-normal" id="moN_3_B" name="moN_3_B"
                                                value={experienceFormData.moN_3_B ? formatTime(experienceFormData.moN_3_B) : ""}

                                                onChange={handleChangeExperience} />
                                            {errors?.moN_3_B && (
                                                <div className="text-danger">
                                                    {errors?.moN_3_B?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_4916" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_4916)">
                                                    <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control  fw-normal" id="moN_3_E" name="moN_3_E"
                                                value={experienceFormData.moN_3_E ? formatTime(experienceFormData.moN_3_E) : ""}

                                                onChange={handleChangeExperience} />
                                            {errors?.moN_3_E && (
                                                <div className="text-danger">
                                                    {errors?.moN_3_E?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <label className="form-label text-center w-100 mb-2">TUE</label>
                                    <div className='d-flex align-items-center schedule flex-column gap-3'>

                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_2264" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_2264)">
                                                    <path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V15H4V18H20V6H4V9H2V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM11.5 16.5L10.1 15.05L12.175 13H2V11H12.175L10.1 8.95L11.5 7.5L16 12L11.5 16.5Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control  fw-normal" id="tuE_3_B" name="tuE_3_B"
                                                value={experienceFormData.tuE_3_B ? formatTime(experienceFormData.tuE_3_B) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.tuE_3_B && (
                                                <div className="text-danger">
                                                    {errors?.tuE_3_B?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_4916" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_4916)">
                                                    <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control  fw-normal" id="tuE_3_E" name="tuE_3_E"
                                                value={experienceFormData.tuE_3_E ? formatTime(experienceFormData.tuE_3_E) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.tuE_3_E && (
                                                <div className="text-danger">
                                                    {errors?.tuE_3_E?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <label className="form-label text-center w-100 mb-2">WED</label>
                                    <div className='d-flex align-items-center schedule flex-column gap-3'>

                                        <div>

                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_2264" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_2264)">
                                                    <path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V15H4V18H20V6H4V9H2V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM11.5 16.5L10.1 15.05L12.175 13H2V11H12.175L10.1 8.95L11.5 7.5L16 12L11.5 16.5Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control  fw-normal" id="weD_3_B" name="weD_3_B"
                                                value={experienceFormData.weD_3_B ? formatTime(experienceFormData.weD_3_B) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.weD_3_B && (
                                                <div className="text-danger">
                                                    {errors?.weD_3_B?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_4916" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_4916)">
                                                    <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control  fw-normal" id="weD_3_E" name="weD_3_E"
                                                value={experienceFormData.weD_3_E ? formatTime(experienceFormData.weD_3_E) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.weD_3_E && (
                                                <div className="text-danger">
                                                    {errors?.weD_3_E?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <label className="form-label text-center w-100 mb-2">THU</label>
                                    <div className='d-flex align-items-center schedule flex-column gap-3'>

                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_2264" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_2264)">
                                                    <path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V15H4V18H20V6H4V9H2V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM11.5 16.5L10.1 15.05L12.175 13H2V11H12.175L10.1 8.95L11.5 7.5L16 12L11.5 16.5Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control  fw-normal" id="thU_3_B" name="thU_3_B"
                                                value={experienceFormData.thU_3_B ? formatTime(experienceFormData.thU_3_B) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.thU_3_B && (
                                                <div className="text-danger">
                                                    {errors?.thU_3_B?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_4916" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_4916)">
                                                    <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control  fw-normal" id="thU_3_E" name="thU_3_E"
                                                value={experienceFormData.thU_3_E ? formatTime(experienceFormData.thU_3_E) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.thU_3_E && (
                                                <div className="text-danger">
                                                    {errors?.thU_3_E?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <label className="form-label text-center w-100 mb-2">FRI</label>
                                    <div className='d-flex align-items-center schedule flex-column gap-3'>

                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_2264" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_2264)">
                                                    <path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V15H4V18H20V6H4V9H2V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM11.5 16.5L10.1 15.05L12.175 13H2V11H12.175L10.1 8.95L11.5 7.5L16 12L11.5 16.5Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control  fw-normal" id="frI_3_B" name="frI_3_B"
                                                value={experienceFormData.frI_3_B ? formatTime(experienceFormData.frI_3_B) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.frI_3_B && (
                                                <div className="text-danger">
                                                    {errors?.frI_3_B?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_4916" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_4916)">
                                                    <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control  fw-normal" id="frI_3_E" name="frI_3_E"
                                                value={experienceFormData.frI_3_E ? formatTime(experienceFormData.frI_3_E) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.frI_3_E && (
                                                <div className="text-danger">
                                                    {errors?.frI_3_E?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                );
            case 'duringSchool':
                return (
                    <>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                            <label className="form-label mb-2">During Site :</label>
                            <select
                                className="form-select  fw-normal"
                                id="sitE_NAM_D"
                                name="sitE_NAM_D"
                                onChange={handleChangeExperience}
                                value={experienceFormData.sitE_NAM_D}
                            >
                                <option value="">Select Sites</option>
                                {positionsData?.sitesTypes?.data?.duringSites?.map((sites: any) => (
                                    <option key={sites.siteNumber} value={sites.siteName}>
                                        {sites.siteName}
                                    </option>
                                ))}
                            </select>
                            {errors?.sitE_NAM_D && (
                                <div className="text-danger">
                                    {errors?.sitE_NAM_D?._errors[0]}
                                </div>
                            )}
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                            <label className="form-label mb-2">During Position :</label>
                            <select
                                className="form-select fw-normal"
                                id="sitE_POS_D"
                                name="sitE_POS_D"
                                onChange={handleChangeExperience}
                                value={experienceFormData.sitE_POS_D}
                            >
                                <option value="">Select Position</option>
                                {positionsData?.positions?.data?.duringPositions?.map((position: any) => (
                                    <option key={position.positionId} value={position.position}>
                                        {position.position}
                                    </option>
                                ))}
                            </select>
                            {errors?.sitE_POS_D && (
                                <div className="text-danger">
                                    {errors?.SsitE_POS_D._errors[0]}
                                </div>
                            )}
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                            <label className="form-label mb-2">Effective Date:</label>
                            <input type="date" className="form-control fw-normal" id="effectiveDateDuring" name="effectiveDateDuring"
                                value={formatDate(experienceFormData.effectiveDateDuring)}
                                onChange={handleChangeExperience} />
                            {errors?.effectiveDateDuring && (
                                <div className="text-danger">
                                    {errors?.effectiveDateDuring?._errors[0]}
                                </div>
                            )}
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className='row g-2'>
                                <div className='col'>
                                    <label className="form-label text-center w-100 mb-2">MON</label>

                                    <div className='d-flex align-items-center schedule  flex-column gap-3'>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_2264" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_2264)">
                                                    <path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V15H4V18H20V6H4V9H2V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM11.5 16.5L10.1 15.05L12.175 13H2V11H12.175L10.1 8.95L11.5 7.5L16 12L11.5 16.5Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control  fw-normal" id="moN_2_B" name="moN_2_B"
                                                value={experienceFormData.moN_2_B ? formatTime(experienceFormData.moN_2_B) : ""}

                                                onChange={handleChangeExperience} />
                                            {errors?.moN_2_B && (
                                                <div className="text-danger">
                                                    {errors?.moN_2_B?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_4916" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_4916)">
                                                    <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control" id="moN_2_E" name="moN_2_E"
                                                value={experienceFormData.moN_2_E ? formatTime(experienceFormData.moN_2_E) : ""}

                                                onChange={handleChangeExperience} />
                                            {errors?.moN_2_E && (
                                                <div className="text-danger">
                                                    {errors?.moN_2_E?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <label className="form-label text-center w-100 mb-2">TUE</label>
                                    <div className='d-flex align-items-center schedule  flex-column gap-3'>

                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_2264" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_2264)">
                                                    <path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V15H4V18H20V6H4V9H2V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM11.5 16.5L10.1 15.05L12.175 13H2V11H12.175L10.1 8.95L11.5 7.5L16 12L11.5 16.5Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control" id="tuE_2_B" name="tuE_2_B"
                                                value={experienceFormData.tuE_2_B ? formatTime(experienceFormData.tuE_2_B) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.tuE_2_B && (
                                                <div className="text-danger">
                                                    {errors?.tuE_2_B?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div>

                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_4916" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_4916)">
                                                    <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control" id="tuE_2_E" name="tuE_2_E"
                                                value={experienceFormData.tuE_2_E ? formatTime(experienceFormData.tuE_2_E) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.tuE_2_E && (
                                                <div className="text-danger">
                                                    {errors?.tuE_2_E?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <label className="form-label text-center w-100 mb-2">WED</label>
                                    <div className='d-flex align-items-center schedule  flex-column gap-3'>

                                        <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <mask id="mask0_960_2264" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                <rect width="24" height="24" fill="#D9D9D9" />
                                            </mask>
                                            <g mask="url(#mask0_960_2264)">
                                                <path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V15H4V18H20V6H4V9H2V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM11.5 16.5L10.1 15.05L12.175 13H2V11H12.175L10.1 8.95L11.5 7.5L16 12L11.5 16.5Z" fill="#023047" />
                                            </g>
                                        </svg>
                                            <input type="time" className="form-control" id="weD_2_B" name="weD_2_B"
                                                value={experienceFormData.weD_2_B ? formatTime(experienceFormData.weD_2_B) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.weD_2_B && (
                                                <div className="text-danger">
                                                    {errors?.weD_2_B?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_4916" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_4916)">
                                                    <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control" id="weD_2_E" name="weD_2_E"
                                                value={experienceFormData.weD_2_E ? formatTime(experienceFormData.weD_2_E) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.weD_2_E && (
                                                <div className="text-danger">
                                                    {errors?.weD_2_E?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <label className="form-label text-center w-100 mb-2">THU</label>
                                    <div className='d-flex align-items-center schedule  flex-column gap-3'>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_2264" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_2264)">
                                                    <path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V15H4V18H20V6H4V9H2V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM11.5 16.5L10.1 15.05L12.175 13H2V11H12.175L10.1 8.95L11.5 7.5L16 12L11.5 16.5Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control" id="thU_2_B" name="thU_2_B"
                                                value={experienceFormData.thU_2_B ? formatTime(experienceFormData.thU_2_B) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.thU_2_B && (
                                                <div className="text-danger">
                                                    {errors?.thU_2_B?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_4916" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_4916)">
                                                    <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control" id="thU_2_E" name="thU_2_E"
                                                value={experienceFormData.thU_2_E ? formatTime(experienceFormData.thU_2_E) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.thU_2_E && (
                                                <div className="text-danger">
                                                    {errors?.thU_2_E?._errors[0]}
                                                </div>
                                            )}
                                        </div>


                                    </div>
                                </div>
                                <div className='col'>
                                    <label className="form-label text-center w-100 mb-2">FRI</label>
                                    <div className='d-flex align-items-center schedule  flex-column gap-3'>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_2264" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_2264)">
                                                    <path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V15H4V18H20V6H4V9H2V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM11.5 16.5L10.1 15.05L12.175 13H2V11H12.175L10.1 8.95L11.5 7.5L16 12L11.5 16.5Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control" id="frI_2_B" name="frI_2_B"
                                                value={experienceFormData.frI_2_B ? formatTime(experienceFormData.frI_2_B) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.frI_2_B && (
                                                <div className="text-danger">
                                                    {errors?.frI_2_B?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <mask id="mask0_960_4916" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_960_4916)">
                                                    <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z" fill="#023047" />
                                                </g>
                                            </svg>
                                            <input type="time" className="form-control" id="frI_2_E" name="frI_2_E"
                                                value={experienceFormData.frI_2_E ? formatTime(experienceFormData.frI_2_E) : ""}
                                                onChange={handleChangeExperience} />
                                            {errors?.frI_2_E && (
                                                <div className="text-danger">
                                                    {errors?.frI_2_E?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };
    return (
        <div className={`modal fade show afterSchool adddExpiranceModal timesheetModal editAsignment align-items-lg-center overflow-auto align-items-md-center align-items-start justify-content-center`}
            id="Filter" aria-labelledby="FilterLabel" aria-hidden="true">
            <div className="modal-dialog w-100">
                <div className="modal-content p-4">
                    <div className="modal-body p-lg-2 p-md-2 p-0">
                        <div className="formCard mt-0 p-0 border-0">
                            <div className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-4 mb-md-3 mb-3">
                                <h3 className="text-nowrap formTitle m-0">Experience</h3>
                                <hr className="w-100" />
                                <div className="editForm" data-bs-dismiss="modal" aria-label="Close" onClick={onClose} style={{ cursor: 'pointer' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                        <path d="M19 5.5L5 19.5M19 19.5L5 5.5" stroke="black" stroke-width="2" stroke-linecap="round"></path>
                                    </svg>
                                </div>
                            </div>
                            <form className="DistrictForm">
                                <div className='row DistrictForm'>
                                    <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                                        <label className="form-label mb-2">Type :</label>
                                        <select
                                            className="form-select fw-normal"
                                            id="sitE_NAM_B"
                                            name="sitE_NAM_B"
                                            onChange={handleTypeChange}
                                            value={selectedSiteTypeValue}
                                        >
                                            <option value="beforeSchool">Before School</option>
                                            <option value="duringSchool">During School</option>
                                            <option value="afterSchool">After School</option>
                                        </select>

                                    </div>
                                    {renderForm()}

                                    <div className='col-12 d-flex align-items-center justify-content-end gap-3 mt-4 pt-2'>
                                        <button
                                            type="button"
                                            className="btn btn-outline d-flex align-items-center gap-2 ps-3 pe-4"
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary d-flex align-items-center gap-2 ps-3 pe-4"
                                            onClick={handleSubmit}
                                        >
                                            {loading ? (
                                                <span className="btnloader loader"></span>
                                            ) : (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path d="M13.8001 19.5516H19.8001M4.2002 19.5516L8.56618 18.6719C8.79796 18.6252 9.01077 18.511 9.17791 18.3438L18.9516 8.56477C19.4202 8.09591 19.4199 7.33592 18.9509 6.86746L16.8805 4.79939C16.4117 4.33112 15.6521 4.33144 15.1837 4.8001L5.40896 14.5802C5.24214 14.7471 5.12824 14.9594 5.0815 15.1907L4.2002 19.5516Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                    <span> Update</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default PersonalExperienceModal