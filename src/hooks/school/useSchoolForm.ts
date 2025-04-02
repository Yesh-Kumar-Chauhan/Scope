import React, { useState } from 'react'
import { ISchool } from '../../interface/School';
import { z } from "zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { schoolFormSchema } from '../../schemas/school'
import { getSiteDataByDistrictId } from '../../apis/sitesApi';
import { createSchool, updateSchool } from '../../apis/schoolApi';
import {schoolsFormDataModal} from './../../data/schoolFormData'
interface SchoolState {
    districtSchoolData: any[];
    schoolData: any[];
    siteData: any[];
    loading: boolean;
    page: number;
    hasMore: boolean;
}

export const useSchoolForm = (
    refetch: () => void,
    isEditing: boolean,
    setIsEditing: (isEditing: boolean) => void,
    setCurrentPage: any
    // positionsData: any
) => {
  
    const [schoolFormData, setSchoolFormData] = useState<ISchool>(schoolsFormDataModal);
    const [errors, setErrors] = useState<z.ZodIssue[]>([]);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState<SchoolState>({
        districtSchoolData: [],
        schoolData: [],
        siteData: [],
        loading: false,
        page: 1,
        hasMore: true,
    });
    // const [positionsData, setPositionsData] = useState({});

    const handleChange = async(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const isChecked = (e.target as HTMLInputElement).checked;
            setSchoolFormData((prevData: any) => ({
                ...prevData,
                [name]: isChecked,
            }));
        } 
        else if (name === 'districtId' && value) {
            try {
                const response = await getSiteDataByDistrictId(value,0);
                setState((prevState: any) => ({ ...prevState, siteData: response }));
                const selectedDistrict = state.districtSchoolData.find((district: any) => district.districtId == value);
                setSchoolFormData((prevData: any) => ({
                    ...prevData,
                    districtId: parseInt(value),
                    distNum: selectedDistrict ? selectedDistrict.distNum.toString() : '',
                    distNam: selectedDistrict ? selectedDistrict.distNam : '',
                
                }));
            } catch (error) {
                console.error("Error fetching site data:", error);
            }
        }
        else if (name === 'siteNum' && value) {
            const selectedSite = state.siteData.find((site: any) => site.siteNumber == value);
            setSchoolFormData((prevData: ISchool) => ({
                ...prevData,
                siteNum: value,
                siteNam: selectedSite ? selectedSite.fullName : '',
            }));
        }
        else {
            setSchoolFormData((prevData: any) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const validationResult = schoolFormSchema.safeParse(schoolFormData);
        if (!validationResult.success) {
            setErrors(validationResult.error.issues);
            return;
        }
        try {
            setLoading(true);
            if (isEditing)
                await updateSchool(schoolFormData);
            else
                await createSchool(schoolFormData);

            setSchoolFormData(schoolsFormDataModal);
            setCurrentPage(1);
            refetch();
            setIsEditing(false);
            setErrors([]);
            setLoading(false);

        } catch (error) {
            let errorMessage = 'An unexpected error occurred while submitting district data.';
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message || errorMessage;
            }
            console.error('An error occurred while submitting district data:', error);
            toast.error(errorMessage);
        }
    };

    const resetForm = () => {
        setSchoolFormData(schoolsFormDataModal);
    };

    return {
        schoolFormData,
        handleChange,
        handleSubmit,
        resetForm,
        setSchoolFormData,
        errors,
        setErrors,
        loading,
        setState,
        state,
    }
}
