import axiosInstance from '../utils/axiosConfig';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import {IClosing,IClosingTable} from '../interface/Closing'

export const fetchClosings = async (
  districtId: number,
  currentPage: number,
  itemsPerPage: number
): Promise<{ data: IClosingTable[]; totalItems: number }> => {
  try {
    const response = await axiosInstance.get(`/Closing/${districtId}/closings`, {
      params: {
        districtId: districtId,
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
export const fetchClosingStatus = async () => {
  try {
    const response = await axiosInstance.get(`/Status`);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return {
      data: response.data.data,
      totalItems: response.data.totalItems,
    };
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while fetching Closing.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw error;
  }
};

export const getClosingDataById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/Closing/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to retrieve site Closing');
    }
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while editing the Closing.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw error;
  }
};

export const createClosing = async ( formData: IClosing) => {
  try {
    const response = await axiosInstance.post('/Closing', formData);
    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while submitting Closing data.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw error;
  }
};
export const updateClosing = async ( formData: IClosing) => {
  try {
    const response = await axiosInstance.put(`/Closing/${formData.closingID}`, formData);
    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while Updating Closing data.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw error;
  }
};

export const deleteClosing = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/Closing/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete Closing');
    }

    toast.success(response.data.message || 'Closing deleted successfully');
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while deleting the Closing.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};