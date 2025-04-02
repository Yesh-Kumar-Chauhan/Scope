import { toast } from "react-toastify";
import { useState } from "react";
import { AxiosError } from "axios";
import { z } from "zod";
import { personnelFormSchema } from '../../schemas/personnel'
import { IPersonnel } from "../../interface/Personnel";
import { createPersonnel, updatePersonnel } from '../../apis/personnelApi'
type PersonnelFormInputs = z.infer<typeof personnelFormSchema>;

export const usePersonnelForm = (
    initialFormData: IPersonnel,
    isEditing: boolean,
    setIsEditing: (isEditing: boolean) => void,
    positionsData: any
) => {
    const [personnelFormData, setPersonnelFormData] = useState<IPersonnel>(initialFormData);
    const [errors, setErrors] = useState<z.ZodFormattedError<PersonnelFormInputs, string> | null>(null);
    const [loading, setLoading] = useState(false);

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    //     const { name, value, type } = e.target;

    //     // Handle checkbox separately
    //     if (type === 'checkbox') {
    //         const isChecked = (e.target as HTMLInputElement).checked;
    //         setPersonnelFormData((prevData:any) => ({
    //             ...prevData,
    //             [name]: isChecked,
    //         }));
    //     }
    //     else {
    //         setPersonnelFormData((prevData:any) => ({
    //             ...prevData,
    //             [name]: value,
    //         }));
    //     }
    // };

    const numberFields = [
        "facilityID", "sitE_NUM_B", "allottedb", "sitE_NUM_D",
        "allottedd", "allotteda", "type", "stafF_ID", "sitE_NUM_A",
        "paY_RATE_B", "seP_PAY_RATE_B", "jaN_PAY_RATE_B", "salarY_B",
        "maX_HRS_B", "paY_RATE_D", "seP_PAY_RATE_D", "jaN_PAY_RATE_D",
        "salarY_D", "maX_HRS_D", "paY_RATE_A", "seP_PAY_RATE_A", "jaN_PAY_RATE_A",
        "salarY_A", "maX_HRS_A", "daysoff", "maX_ADD_B", "maX_ADD_D", "maX_ADD_A", "daysused",
        "perC_B", "perC_D", "perC_A", "allottedb", "allottedd", "allotteda", "", "", ""
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
            setPersonnelFormData((prevData: any) => ({
                ...prevData,
                [name]: value, // Update the site name field
                [siteNumberField]: selectedSite ? selectedSite.siteNumber : 0,
            }));
        } else if (type === 'checkbox') {
            const isChecked = (e.target as HTMLInputElement).checked;
            setPersonnelFormData((prevData: any) => ({
                ...prevData,
                [name]: isChecked,
            }));
        }
        else if (type === 'radio') {
            // Handle radio button logic
            setPersonnelFormData((prevData: any) => ({
                ...prevData,
                [name]: value, // Only one radio button in the group can be checked, so just set the value
            }));
        } else if (numberFields.includes(name)) {
            setPersonnelFormData((prevData) => ({
                ...prevData,
                [name]: value === '' ? null : parseInt(value, 10),
            }));
        } else if (type === 'date') {
            setPersonnelFormData((prevData: any) => ({
                ...prevData,
                [name]: value === '' ? null : value,
            }));
        }  else {
            setPersonnelFormData((prevData: any) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (isEditing) {
                await updatePersonnel(personnelFormData.personalID, personnelFormData); // Assuming updateSite is the API call for updating a site
            } else {
                await createPersonnel(personnelFormData);
            }
            setPersonnelFormData(initialFormData);
            setIsEditing(false);
            setErrors(null);
            setLoading(false);

        } catch (error) {
            console.log('error while creating personnel');
            let errorMessage = 'An unexpected error occurred while submitting site data.';
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message || errorMessage;
            }
            console.error('An error occurred while submitting site data:', error);
            toast.error(errorMessage);
            setLoading(false);
        }
    };

    const resetForm = () => {
        setPersonnelFormData(initialFormData);
        // setErrors(null);
    };

    return {
        personnelFormData,
        handleChange,
        handleSubmit,
        resetForm,
        setPersonnelFormData,
        errors,
        setErrors,
        loading,
        setLoading,
    };
};
