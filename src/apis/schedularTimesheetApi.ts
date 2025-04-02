import axiosInstance from '../utils/axiosConfig';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { ISchedularTimesheet } from '../interface/scheduleTimesheet';

// Fetch schedular timesheets with pagination
export const fetchSchedularTimesheets = async (
  personId: number,
  currentPage: number,
  itemsPerPage: number
): Promise<{ data: ISchedularTimesheet[]; totalItems: number }> => {
  try {
    const response = await axiosInstance.get(`/SchedularTimesheet/${personId}/timesheets`, {
      params: {
        personId,
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
    let errorMessage = 'An unexpected error occurred while fetching schedular timesheets.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw error;
  }
};

// Fetch schedular timesheet by ID
export const getSchedularTimesheetById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/SchedularTimesheet/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to retrieve schedular timesheet');
    }
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while retrieving the schedular timesheet.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw error;
  }
};


export const fetchSchedularTimesheetsByScheduleId = async (
  scheduleId: number
): Promise<ISchedularTimesheet> => {
  try {
    const response = await axiosInstance.get(`/SchedularTimesheet/BySchedule/${scheduleId}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to retrieve schedular timesheets.');
    }

    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while fetching the schedular timesheets.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw error;
  }
};


export const fetchSchedularTimesheetsByPersonId = async (
  personId: number
): Promise<ISchedularTimesheet[]> => {
  try {
    const response = await axiosInstance.get(`/SchedularTimesheet/ByPerson/${personId}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to retrieve schedular timesheets.');
    }

    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while fetching the schedular timesheets.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw error;
  }
};

// Create a new schedular timesheet
export const createSchedularTimesheet = async (formData: ISchedularTimesheet) => {
  try {
    const response = await axiosInstance.post('/SchedularTimesheet', formData);
    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while submitting schedular timesheet data.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw error;
  }
};

// Update a schedular timesheet
export const updateSchedularTimesheet = async (formData: ISchedularTimesheet) => {
  try {
    const response = await axiosInstance.put(`/SchedularTimesheet/${formData.id}`, formData);
    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while updating the schedular timesheet.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw error;
  }
};

// Delete a schedular timesheet
export const deleteSchedularTimesheet = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/SchedularTimesheet/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete schedular timesheet');
    }

    toast.success(response.data.message || 'Schedular timesheet deleted successfully');
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while deleting the schedular timesheet.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};
export const deleteSchedules = async (personId: number) => {
  try {
    const response = await axiosInstance.delete(`/Schedules/ClearSchedule/${personId}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete schedules');
    }

    toast.success(response.data.message || 'schedules  deleted successfully');
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while deleting the schedules.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};
