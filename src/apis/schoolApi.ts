import axiosInstance from '../utils/axiosConfig';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { ISchool } from '../interface/School'
export const fetchSchools = async (
    searchQuery: string,
    currentPage: number,
    itemsPerPage: number
): Promise<{ data: ISchool[]; totalItems: number }> => {
    try {
        const response = await axiosInstance.get('/School', {
            params: {
                search: searchQuery,
                page: currentPage,
                pageSize: itemsPerPage,
            },
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        return {
            data: response.data.data,
            totalItems: response.data.totalItems,
        };
    } catch (error) {
        let errorMessage = 'An unexpected error occurred while fetching School.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        toast.error(errorMessage);
        throw error;
    }
};


export const getSchoolDataById = async (id: number) => {
    try {
        const response = await axiosInstance.get(`/School/${id}`);
        if (!response.data.success) {
            throw new Error(response.data.message || 'Failed to retrieve site School');
          }
          return response.data.data;
    } catch (error: unknown) {
        let errorMessage = 'An unexpected error occurred while editing the School.';
        if (error instanceof AxiosError) {
            errorMessage = error.response?.data?.message || errorMessage;
        } else if (error instanceof Error) {
            errorMessage = error.message || errorMessage;
        }
        toast.error(errorMessage);
        throw error;
    }
};

export const createSchool = async (schoolFormData: ISchool) => {
    try {
        const response = await axiosInstance.post('/School', schoolFormData);
        if (response.data.success) {
            toast.success(response.data.message);
            return response.data.data;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        let errorMessage = 'An unexpected error occurred while submitting School data.';
        if (error instanceof AxiosError) {
            errorMessage = error.response?.data?.message || errorMessage;
        } else if (error instanceof Error) {
            errorMessage = error.message || errorMessage;
        }
        toast.error(errorMessage);
        throw error;
    }
};

export const updateSchool = async ( schoolFormData: ISchool,) => {
    try {
        const response = await axiosInstance.put(`/School/${schoolFormData.schoolID}`, schoolFormData);
        if (response.data.success) {
            toast.success(response.data.message);
            return response.data.data;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        let errorMessage = 'An unexpected error occurred while updating School data.';
        if (error instanceof AxiosError) {
            errorMessage = error.response?.data?.message || errorMessage;
        } else if (error instanceof Error) {
            errorMessage = error.message || errorMessage;
        }
        toast.error(errorMessage);
        throw error;
    }
};


export const fetchSchoolList = async (): Promise<{ data: ISchool[]; totalItems: number }> => {
    try {
        const response = await axiosInstance.get('/School');

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        return {
            data: response.data.data,
            totalItems: response.data.totalItems,
        };
    } catch (error) {
        let errorMessage = 'An unexpected error occurred while fetching School.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        toast.error(errorMessage);
        throw error;
    }
};

export const deleteSchool = async (id: number) => {
    try {
      const response = await axiosInstance.delete(`/School/${id}`);
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to delete School');
      }
  
      toast.success(response.data.message || 'School deleted successfully');
    } catch (error: unknown) {
      let errorMessage = 'An unexpected error occurred while deleting the School.';
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      }
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };