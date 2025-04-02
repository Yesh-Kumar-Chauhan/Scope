import axiosInstance from '../utils/axiosConfig';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { IVisitTable ,IVisit} from '../interface/Visits';


export const fetchVisit = async (
  searchQuery: string,
  currentPage: number,
  itemsPerPage: number,
  siteId:number
): Promise<{ data: IVisitTable[]; totalItems: number }> => {
  try {
    const response = await axiosInstance.get(`/Visit/site/${siteId}`, {
      params: {
        search: searchQuery,
        page: currentPage,
        pageSize: itemsPerPage,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch sites');
    }

    return {
      data: response.data.data,
      totalItems: response.data.totalItems,
    };
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while fetching sites.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const getVisitDataById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/Visit/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to retrieve site Visit');
    }
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while editing the Visit.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw error;
  }
};

export const createVisitForm = async ( formData: IVisit) => {
  try {
    const response = await axiosInstance.post('/Visit', formData);
    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while submitting Visit data.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw error;
  }
};

export const updateVisitForm = async ( formData: IVisit) => {
  try {
    const response = await axiosInstance.put(`/Visit/${formData.visitID}`, formData);
    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while Updating Visit data.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw error;
  }
};

export const deleteVisit = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/Visit/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete Visit');
    }

    toast.success(response.data.message || 'Visit deleted successfully');
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while deleting the Visit.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};