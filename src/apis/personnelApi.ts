import axiosInstance from '../utils/axiosConfig';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { IPersonnel, ITimesheetTable, ITimesheetForm, ICalendar, ISchedularTable, ICertificateTable, ICertificateForm, IAttendanceTable, IAttendanceForm, IWaiverForm, IWaiverTable, IDirector } from '../interface/Personnel';

export const fetchPersonnels = async (
  searchQuery: string,
  currentPage: number,
  itemsPerPage: number
): Promise<{ data: IPersonnel[]; totalItems: number }> => {
  try {
    const response = await axiosInstance.get('/Personel', {
      params: {
        search: searchQuery,
        page: currentPage,
        pageSize: itemsPerPage,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch Personel');
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
export const fetchPersonnelSearch = async (
  searchQuery: string,
  operation: number,
  currentPage: number,
  itemsPerPage: number
): Promise<{ data: IPersonnel[]; totalItems: number }> => {
  try {
    const response = await axiosInstance.get('/Personel/search', {
      params: {
        keyword: searchQuery,
        operation: operation,
        page: currentPage,
        pageSize: itemsPerPage,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch Personel');
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

export const getPersonnelDataById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/Personel/${id}`);

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

export const createPersonnel = async (personnelData: Partial<IPersonnel>) => {
  try {
    const response = await axiosInstance.post(`/Personel`, personnelData);
    // if (!response.data.success) {
    //   throw new Error(response.data.message || 'Failed to update site');
    // }
    toast.success(response.data.message || 'Personel created successfully');
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while updating the Personel.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};


export const updatePersonnel = async (id: number, PersonnelData: Partial<IPersonnel>) => {
  try {
    const response = await axiosInstance.put(`/Personel/${id}`, PersonnelData);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update site');
    }

    toast.success(response.data.message || 'Personnel updated successfully');
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while updating the Personel.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};


export const deletePersonnel = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/Personel/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete Personnel');
    }

    toast.success(response.data.message || 'Personnel deleted successfully');
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while deleting the Personnel.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const getLookUpPositions = async () => {
  try {
    const response = await axiosInstance.get(`/Lookup/GetPositions`);
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
export const getReport = async () => {
  try {
    const response = await axiosInstance.get(`/Report`);
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
export const getSitesByType = async () => {
  try {
    const response = await axiosInstance.get(`/Lookup/GetSitesByType`);
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

export const fetchLookup = async (
): Promise<{ data: ITimesheetTable[]; totalItems: number }> => {
  try {
    const response = await axiosInstance.get('/Lookup');

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


export const fetchTimesheet = async (
  personalId: number
): Promise<{ data: ITimesheetTable[]; totalItems: number }> => {
  try {
    // const response = await axiosInstance.get(`/Personel/timesheets-personal?personId=${personalId}`);
    const response = await axiosInstance.get(`/Personel/timesheets-personal`, {
      params: {
        personId: personalId,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch Personel');
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


export const fetchTimesheetWithDateRange = async (
  personalId: number,startDate:any,endDate:any
): Promise<{ data: ITimesheetTable[]; totalItems: number }> => {
  try {
    const response = await axiosInstance.get(`/Personel/timesheets-personal`, {
      params: {
        personId: personalId,
        startDate:startDate,
        endDate:endDate,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch Personel');
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


export const fetchTimesheetSitePersonal = async (
  siteId: any,distNumber:any,startDate:any,endDate:any
): Promise<{ data: any[]; totalItems: number }> => {
  try {
    const response = await axiosInstance.get(`/Personel/timesheets-site-personel`, {
      params: {
        siteId: siteId,
        distNumber:distNumber,
        startDate:startDate,
        endDate:endDate,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch Personel');
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


export const createTimeSheetForm = async (timeSheetData: Partial<ITimesheetForm>) => {
  try {
    const response = await axiosInstance.post('/Personel/timesheets', timeSheetData);
    // if (!response.data.success) {
    //   throw new Error(response.data.message || 'Failed to update site');
    // }
    toast.success(response.data.message || 'Personel Timesheet created successfully');
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while updating the Personel Timesheet.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};


export const getTimesheetFormData = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/Personel/timesheets/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return {
      data: response.data.data,
      totalItems: response.data.totalItems,
    };
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while fetching Personel Timesheet.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw error;
  }
};


export const updateTimeSheetForm = async (id: number, timesheetData: Partial<ITimesheetForm>) => {
  try {
    const response = await axiosInstance.put(`Personel/timesheets/${id}`, timesheetData);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update Personel Timesheet');
    }

    toast.success(response.data.message || 'Personel Timesheet updated successfully');
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while updating the Personel Timesheet.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const bulkUpdateTimeSheetForm = async (timesheetData: any) => {
  try {
    const response = await axiosInstance.post('Personel/timesheets/bulk', timesheetData );
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update Personel Timesheets');
    }

    toast.success(response.data.message || 'Personel Timesheets updated successfully');
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while updating the Personel Timesheets.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const deleteTimesheet = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/Personel/timesheets/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete Personel Timesheet');
    }

    toast.success(response.data.message || 'Personel Timesheet deleted successfully');
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while deleting the Personel Timesheet.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

// Schedular API's

export const fetchSchedular = async (
  personalId: number,
): Promise<{ data: ISchedularTable[]; totalItems: number }> => {
  try {
    const response = await axiosInstance.get(`/Schedules/GetScheduleByPerson/${personalId}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch Schedular');
    }

    return {
      data: response.data.data,
      totalItems: response.data.totalItems,
    };
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while fetching Schedular.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};


export const createSchedularForm = async (scheduleData: Partial<ICalendar>) => {
  try {
    const response = await axiosInstance.post('/Schedules', scheduleData);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update site');
    }
    toast.success(response.data.message || 'Personel Schedules created successfully');
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while updating the Personel Schedules.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    // toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const createAdditionalSchedularForm = async (scheduleData: Partial<ICalendar>) => {
  try {
    const response = await axiosInstance.post('/Schedules/Additional', scheduleData);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update site');
    }
    toast.success(response.data.message || 'Personel Schedules created successfully');
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while updating the Personel Schedules.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    // toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};


export const getSchedularData = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/Schedules/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return {
      data: response.data.data,
      totalItems: response.data.totalItems,
    };
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while fetching Schedule.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw error;
  }
};

export const getSchedularDataForPersonDate = async (personId: number, date: string) => {
  try {

    const response = await axiosInstance.get(`Personel/timesheets-personal-schedule?personId=${personId}&date=${date}`);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.data ;
    
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while fetching Schedule.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw error;
  }
};


export const updateSchedularForm = async (id: number, scheduleData: Partial<ITimesheetForm>) => {
  try {
    const response = await axiosInstance.put(`/Schedules/${id}`, scheduleData);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update Schedule');
    }

    toast.success(response.data.message || 'Schedule updated successfully');
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while updating the Schedule.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    // toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const deleteSchedular = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/Schedules/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete Schedule');
    }

    toast.success(response.data.message || 'Schedule deleted successfully');
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while deleting the Schedule.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const getScheduleByPersonAndDateRange = async (personId: number, startDate: string, endDate: string) => {
  try {
    const response = await axiosInstance.get(`/Schedules/GetScheduleByPerson/${personId}/${startDate}/${endDate}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to retrieve schedule data');
    }
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while retrieving the schedule data.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    }
    else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const importSchedule = async (file: string | Blob) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosInstance.post(`/Schedules/import`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to import schedule data');
    }

    return response.data.data;
  } catch (error : unknown) {
    let errorMessage = 'An unexpected error occurred while importing the schedule data.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    }
    else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    throw new Error(errorMessage);
  }
};

export const fetchCertificate = async (
  personalId: number,
): Promise<{ data: ICertificateTable[]; totalItems: number }> => {
  try {
    const response = await axiosInstance.get(`/Personel/person-certificate/${personalId}`);
    // const response = await axiosInstance.get(`/Personel/person-certificate`, {
    //   params: {
    //     personId: personalId,
    //   },
    // });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch Certiacates');
    }

    return {
      data: response.data.data,
      totalItems: response.data.totalItems,
    };
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while fetching Certiacates.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};


export const createCertificateForm = async (certificateData: Partial<ICertificateForm>) => {
  try {
    const response = await axiosInstance.post('/Personel/certificate', certificateData);
    // if (!response.data.success) {
    //   throw new Error(response.data.message || 'Failed to update site');
    // }
    toast.success(response.data.message || 'Personel Certificate created successfully');
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while updating the Personel Certificate.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};


export const getCertificateFormData = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/Personel/certificate/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return {
      data: response.data.data,
      totalItems: response.data.totalItems,
    };
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while fetching Personel Certificate.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw error;
  }
};


export const updateCertificateForm = async (id: number, certificateData: Partial<ICertificateForm>) => {
  try {
    const response = await axiosInstance.put(`Personel/certificate/${id}`, certificateData);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update Personel Certificate');
    }

    toast.success(response.data.message || 'Personel Certificate updated successfully');
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while updating the Personel Certificate.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const deleteCertificate = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/Personel/certificate/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete Personel Certificate');
    }

    toast.success(response.data.message || 'Personel Certificate deleted successfully');
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while deleting the Personel Certificate.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const getCertificateTypeData = async () => {
  try {
    const response = await axiosInstance.get('/Personel/certificate-types');

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return {
      data: response.data.data,
      totalItems: response.data.totalItems,
    };
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while fetching Personel Certificate.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw error;
  }
};


//Attandance
export const fetchAttandance = async (
  personalId: number,
): Promise<{ data: IAttendanceTable[]; totalItems: number }> => {
  try {
    const response = await axiosInstance.get(`/Personel/person-attendance/${personalId}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch attendance');
    }

    return {
      data: response.data.data,
      totalItems: response.data.totalItems,
    };
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while fetching attendance.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};



export const getAbsenceData = async () => {
  try {
    const response = await axiosInstance.get('/Personel/absences');

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return {
      data: response.data.data,
      totalItems: response.data.totalItems,
    };
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while fetching Personel absences.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw error;
  }
};

export const getAbsenceReasonData = async () => {
  try {
    const response = await axiosInstance.get('/Personel/absence-reasons');

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return {
      data: response.data.data,
      totalItems: response.data.totalItems,
    };
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while fetching Personel absences-reasons.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw error;
  }
};

export const createAttendanceForm = async (attendanceData: Partial<IAttendanceForm>) => {
  try {
    const response = await axiosInstance.post('/Personel/attendance', attendanceData);
    // if (!response.data.success) {
    //   throw new Error(response.data.message || 'Failed to update site');
    // }
    toast.success(response.data.message || 'Personel Attendance created successfully');
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while updating the Personel Attendance.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};


export const getAttendanceFormData = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/Personel/attendance/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return {
      data: response.data.data,
      totalItems: response.data.totalItems,
    };
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while fetching Personel Attendance.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw error;
  }
};


export const updateAttendanceForm = async (id: number, attendanceData: Partial<IAttendanceForm>) => {
  try {
    const response = await axiosInstance.put(`Personel/attendance/${id}`, attendanceData);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update Personel Attendance');
    }

    toast.success(response.data.message || 'Personel Attendance updated successfully');
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while updating the Personel Attendance.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const deleteAttendance = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/Personel/attendance/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete Personel Attendance');
    }

    toast.success(response.data.message || 'Personel Attendance deleted successfully');
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while deleting the Personel Attendance.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const fetchWaiver = async (
  personalId: number,
): Promise<{ data: IWaiverTable[]; totalItems: number }> => {
  try {
    const response = await axiosInstance.get(`/Personel/staff-waivers/${personalId}`);
    // const response = await axiosInstance.get(`/Personel/person-waiver`, {
    //   params: {
    //     personId: personalId,
    //   },
    // });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch Waiver');
    }

    return {
      data: response.data.data,
      totalItems: response.data.totalItems,
    };
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while fetching Waiver sent.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};


export const createWaiverForm = async (waiverData: Partial<IWaiverForm>) => {
  try {
    const response = await axiosInstance.post('/Personel/waiver', waiverData);
    // if (!response.data.success) {
    //   throw new Error(response.data.message || 'Failed to update site');
    // }
    toast.success(response.data.message || 'Personel Waiver created successfully');
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while updating the Personel Waiver.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};


export const getWaiverFormData = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/Personel/waiver/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return {
      data: response.data.data,
      totalItems: response.data.totalItems,
    };
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while fetching Personel Waiver.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw error;
  }
};


export const updateWaiverForm = async (id: number, waiverData: Partial<IWaiverForm>) => {
  try {
    const response = await axiosInstance.put(`Personel/waiver/${id}`, waiverData);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update Personel waiver');
    }

    toast.success(response.data.message || 'Personel waiver updated successfully');
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while updating the Personel waiver.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const deleteWaiver = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/Personel/waiver/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete Personel Waiver');
    }

    toast.success(response.data.message || 'Personel Waiver deleted successfully');
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while deleting the Personel Waiver.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const fetchWaiverRecieved = async (
  personalId: number,
): Promise<{ data: any[]; totalItems: number }> => {
  try {
    const response = await axiosInstance.get(`/Personel/staff-waivers-received/${personalId}`);
    // const response = await axiosInstance.get(`/Personel/person-waiver`, {
    //   params: {
    //     personId: personalId,
    //   },
    // });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch Waiver Received');
    }

    return {
      data: response.data.data,
      totalItems: response.data.totalItems,
    };
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while fetching Waiver Received.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};


export const updateWaiverRecievedForm = async (waiverRecieveData: Partial<any>) => {
  try {
    const response = await axiosInstance.put(`Personel/waiver-received/bulk-update`, waiverRecieveData);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update Personel Waiver recieved');
    }

    toast.success(response.data.message || 'Personel Waiver recieved updated successfully');
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while updating the Personel Waiver recieved.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

//MultiDirectorSites
export const fetchMultiSiteDirector = async (
  personalId: number,
): Promise<{ data: any[]; totalItems: number }> => {
  try {
    const response = await axiosInstance.get(`/Personel/person-directors/${personalId}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch directors');
    }
    return {
      data: response.data.data,
      totalItems: response.data.totalItems,
    };
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while fetching directors.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};


export const createMultiSiteDirectorForm = async (directorData: Partial<IDirector>) => {
  try {
    const response = await axiosInstance.post('/Personel/director', directorData);
    toast.success(response.data.message || 'Personel director created successfully');
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while updating the Personel director.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};


export const updateMultiSiteDirectorForm = async (id: number, directorData: Partial<IDirector>) => {
  try {
    const response = await axiosInstance.put(`Personel/director/${id}`, directorData);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update Personel director');
    }
    toast.success(response.data.message || 'Personel director updated successfully');
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while updating the Personel director.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};


//map data 
export const getMapData = async () => {
  try {
    const currentDate = new Date().toISOString().split('T')[0];
    const response = await axiosInstance.get(`/Personel/timesheets-site-schedule?date=${currentDate}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to retrieve site data');
    }

    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while retrieving the timesheets-site-schedule data.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};