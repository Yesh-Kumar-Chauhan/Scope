import axiosInstance from '../utils/axiosConfig';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { IWorkshop, IWorkshopTable } from '../interface/Workshop';

export const fetchWorkshop = async (
  searchQuery: string,
  currentPage: number,
  itemsPerPage: number
): Promise<{ data: IWorkshopTable[]; totalItems: number }> => {
  try {
    const response = await axiosInstance.get('/Workshop', {
      params: {
        search: searchQuery,
        page: currentPage,
        pageSize: itemsPerPage,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch workshops');
    }

    return {
      data: response.data.data,
      totalItems: response.data.totalItems,
    };
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while fetching workshops.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const getWorkshopDataById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/Workshop/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to retrieve Workshop data');
    }

    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while retrieving the Workshop data.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};


export const createWorkshop = async (workshopFormData: any) => {
  try {
    const response = await axiosInstance.post('/Workshop', workshopFormData);
    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while submitting workshop data.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw error;
  }
};


export const updateWorkshop = async (id: number, workshopData: Partial<IWorkshop>) => {
  try {
    const response = await axiosInstance.put(`/Workshop/${id}`, workshopData);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update workshop');
    }

    toast.success(response.data.message || 'workshop updated successfully');
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while updating the workshop.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const deleteWorkshop = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/Workshop/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete workshop');
    }

    toast.success(response.data.message || 'workshop deleted successfully');
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while deleting the workshop.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};