import axiosInstance from '../utils/axiosConfig';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { ISite, ISiteTable } from '../interface/Sites';

export const fetchSites = async (
  searchQuery: string,
  currentPage: number,
  itemsPerPage: number
): Promise<{ data: ISiteTable[]; totalItems: number }> => {
  try {
    const response = await axiosInstance.get('/Site', {
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

export const fetchAllSites = async (
 
): Promise<{ data: ISiteTable[]; totalItems: number }> => {
  try {
    const response = await axiosInstance.get('/Site');

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return {
      data: response.data.data,
      totalItems: response.data.totalItems,
    };
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while fetching Site.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw error;
  }
};

export const getSiteDataById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/Site/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to retrieve site data');
    }
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while retrieving the site data.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const createSite = async (siteData: Partial<ISite>) => {
  try {
    const response = await axiosInstance.post(`/Site`, siteData);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update site');
    }

    toast.success(response.data.message || 'Site created successfully');
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while updating the site.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const updateSite = async (id: number, siteData: Partial<ISite>) => {
  try {
    const response = await axiosInstance.put(`/Site/${id}`, siteData);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update site');
    }

    toast.success(response.data.message || 'Site updated successfully');
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while updating the site.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const deleteSite = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/Site/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete site');
    }

    toast.success(response.data.message || 'Site deleted successfully');
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while deleting the site.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const getSiteDataByOperation = async (keyword: any, operation: number) => {
  try {
    const response = await axiosInstance.get(`/Site/operation`, {
      params: {
        keyword: keyword,
        operation: operation,
      },
    });
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to retrieve site data');
    }
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while retrieving the site data.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const getSiteDataByDistrictId = async (id: any, operation: number) => {
  try {
    const response = await axiosInstance.get(`/Site/district`, {
      params: {
        districtId: id,
        operation: operation,
      },
    });
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to retrieve site data');
    }
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while retrieving the site data.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};