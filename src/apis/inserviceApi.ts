import axiosInstance from '../utils/axiosConfig';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { IInserviceTable } from '../interface/Inservice';

export const fetchInservices = async (
  searchQuery: string,
  currentPage: number,
  itemsPerPage: number
): Promise<{ data: IInserviceTable[]; totalItems: number }> => {
  try {
    const response = await axiosInstance.get('/Personel', {
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


export const getInServiceDataById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/Inservice/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to retrieve site Inservice');
    }
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while editing the Inservice.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw error;
  }
};

export const createInService = async (inserviceFormData: any) => {
  try {
    const response = await axiosInstance.post('/Inservice', inserviceFormData);
    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while submitting Inservice data.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw error;
  }
};
export const createWorkShopInServiceForm = async (inserviceWorkShopFormData: any) => {
  try {
    const response = await axiosInstance.post('/Inservice/bulk-create-inservices', inserviceWorkShopFormData);
    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while submitting InserviceWorkShopForm data.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw error;
  }

}

export const updateInService = async (inserviceFormData: any) => {
  try {
    const response = await axiosInstance.put(`/Inservice/${inserviceFormData.inserviceID}`, inserviceFormData);
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

export const deleteInService = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/Inservice/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete Inservice');
    }

    toast.success(response.data.message || 'Inservice deleted successfully');
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while deleting the Inservice.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const getInServiceDataByPersonnelIds = async (id: any, operation: number) => {
  try {
    const response = await axiosInstance.get(`/Inservice/inservice-select`, {
      params: {
        personId: id,
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

export const getInserviceTopics = async () => {
  try {
    const response = await axiosInstance.get(`/Inservice/topics`);
    return response.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while fetching the positions.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
  }
};
export const getInserviceWorkshops = async () => {
  try {
    const response = await axiosInstance.get(`/Inservice/workshops`);
    return response.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while fetching the positions.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
  }
};

export const getPersonnelData = async () => {
  try {
    const response = await axiosInstance.get(`/Personel/search`, {
      params: {
        operation: 2,
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