import { toast } from "react-toastify";
import { useState } from "react";
import { AxiosError } from "axios";
import { createSite, updateSite } from "../../apis/sitesApi"; // Assuming these functions are defined
import { ISite } from "../../interface/Sites";
import { siteFormSchema } from "../../schemas/site";
import { z } from "zod";

type SiteFormInputs = z.infer<typeof siteFormSchema>;

export const useSiteForm = (
    initialFormData: ISite,
    isEditing: boolean,
    setIsEditing: (isEditing: boolean) => void,
) => {
    const [siteFormData, setSiteFormData] = useState<ISite>(initialFormData);
    const [errors, setErrors] = useState<z.ZodFormattedError<SiteFormInputs, string> | null>(null);
    const [loading, setLoading] = useState(false);

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    //     // const { name, value, checked } = e.target;
    //     // setSiteFormData((prevData) => ({
    //     //     ...prevData,
    //     //     [name]: ["siteNumber", "full", "min", "daily", "ampm"].includes(name) ? parseInt(value, 10) : value,
    //     // }));

    //     const { name, value, checked, type } = e.target;

    //     setSiteFormData((prevData) => ({
    //         ...prevData,
    //         [name]: type === 'checkbox' ? checked : ["siteNumber", "full", "min", "daily", "ampm"].includes(name) ? parseInt(value, 10) : value,
    //     }));
    // };

    const numberFields = [
        "siteNumber", "full", "min", "daily", "ampm", 
        "caP1", "caP2", "caP3", "caP4", 
        "ascaP1", "ascaP2", "ascaP3", "ascaP4",
        "capacity", "siteCapacity", 
        "priority", "enrollment", "visitId", 
        "waitListCount", "pcAmount","type"
    ];
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
    
        // Handle checkbox separately
        if (type === 'checkbox') {
            const isChecked = (e.target as HTMLInputElement).checked;
            setSiteFormData((prevData) => ({
                ...prevData,
                [name]: isChecked,
            }));
        } 
        // Handle number fields separately
        else if (numberFields.includes(name)) {
            setSiteFormData((prevData) => ({
                ...prevData,
                [name]: value === '' ? null : parseInt(value, 10),  // Convert to number or set to null if empty
            }));
        }
        else if (type === 'date') {
            setSiteFormData((prevData) => ({
                ...prevData,
                [name]: value === '' ? null : value,  // Set to null if empty, otherwise use the date value
            }));
        }
        // Handle other input types
        else {
            setSiteFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    

    const handleSubmit = async () => {
        // e.preventDefault();
        try {
            setLoading(true);
            if (isEditing) {
                await updateSite(siteFormData.siteID, siteFormData); // Assuming updateSite is the API call for updating a site
            } else {
                await createSite(siteFormData); // Assuming createSite is the API call for creating a site
            }

            setSiteFormData(initialFormData); // Reset form to initial state
            setIsEditing(false); // Exit editing mode
            setErrors(null); // Clear errors
            setLoading(false); // Stop loading state

        } catch (error) {
            console.log('error while creating sites');

            let errorMessage = 'An unexpected error occurred while submitting site data.';
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message || errorMessage;
            }
            console.error('An error occurred while submitting site data:', error);
            toast.error(errorMessage);
            setLoading(false); // Stop loading state
        }
    };

    const resetForm = () => {
        setSiteFormData(initialFormData);
        setErrors(null);
    };

    return {
        siteFormData,
        handleChange,
        handleSubmit,
        resetForm,
        setSiteFormData,
        errors,
        setErrors,
        loading,
    };
};
