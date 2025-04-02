import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import {  fetchWaiver } from '../../../apis/personnelApi';
import {IWaiverTable} from '../../../interface/Personnel'

interface WaiverResponse {
    data: IWaiverTable[];
    totalItems: number;
}

export const useFetchWaiver = (
  // searchQuery: string, 
  // currentPage: number,
  // itemsPerPage: number,
  personalId: number
) => {
  return useQuery<WaiverResponse, Error>(
    ['waiver', personalId], 
    () => fetchWaiver(personalId),
    {
      keepPreviousData: true,
      onError: (error) => {
        toast.error(error.message || 'An unexpected error occurred while fetching Waiver Sent.');
      },
    }
  );
};
