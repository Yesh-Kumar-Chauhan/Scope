import axiosInstance from '../utils/axiosConfig';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useState } from 'react';
import {IContact} from '../interface/Contact'

export const fetchContactBySiteId = async (
  searchQuery: string,
  currentPage: number,
  itemsPerPage: number,
  siteId:number
): Promise<{ data: any; totalItems: number }> => {
  try {
    const response = await axiosInstance.get(`/Contact/site/${siteId}`, {
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

export const getContactDataById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/Contact/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to retrieve site Contact');
    }
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while editing the Contact.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw error;
  }
};

export const createContactForm = async ( formData: IContact) => {
  try {
    const response = await axiosInstance.post('/Contact', formData);
    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while submitting Contact data.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw error;
  }
};

export const updateContactForm = async ( formData: IContact) => {
  try {
    const response = await axiosInstance.put(`/Contact/${formData.contactID}`, formData);
    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    let errorMessage = 'An unexpected error occurred while Updating Contact data.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    throw error;
  }
};

export const deleteContactAPI = async (id: number): Promise<any> => {
  try {
    const response = await axiosInstance.delete(`/Contact/${id}`);
    if (response.data.success) {
      toast.success(response.data.message);
      return true;
    } else {
      toast.error(response.data.message);
      return false;
    }
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred while deleting the Contact.';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }
    toast.error(errorMessage);
    return false;
  }
};