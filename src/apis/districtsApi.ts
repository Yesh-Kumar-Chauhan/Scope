import axiosInstance from '../utils/axiosConfig';
import { DistrictTableType } from '../types/district-type';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export const fetchDistricts = async (
  searchQuery: string,
  currentPage: number,
  itemsPerPage: number
): Promise<{ data: DistrictTableType[]; totalItems: number }> => {
  try {
    const response = await axiosInstance.get('/District', {
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
    let errorMessage = 'An unexpected error occurred while fetching districts.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw error;
  }
};
export const fetchAllDistrict = async (
 
): Promise<{ data: DistrictTableType[]; totalItems: number }> => {
  try {
    const response = await axiosInstance.get('/District');

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return {
      data: response.data.data,
      totalItems: response.data.totalItems,
    };
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while fetching districts.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw error;
  }
};

export const getDistricDataById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/District/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to retrieve site district');
    }
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while editing the district.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw error;
  }
};

export const createDistrict = async (
  formData: any,
) => {
  try {
    const response = await axiosInstance.post('/District', formData);
    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while submitting district data.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw error;
  }
};

export const updateDistrict = async (
  formData: any,
) => {
  try {
    const response = await axiosInstance.put(`/District/${formData.districtId}`, formData);
    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while submitting district data.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw error;
  }
};

export const deleteDistrict = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/District/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete District');
    }

    toast.success(response.data.message || 'District deleted successfully');
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while deleting the District.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};