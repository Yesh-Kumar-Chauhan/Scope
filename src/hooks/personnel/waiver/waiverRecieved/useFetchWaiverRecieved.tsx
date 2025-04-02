import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import {  fetchWaiverRecieved } from '../../../../apis/personnelApi';
import { IWaiverTable } from '../../../../interface/Personnel';

interface WaiverReceivedResponse {
    data: IWaiverTable[];
    totalItems: number;
}

export const useFetchWaiverRecieved = (
  // searchQuery: string, 
  // currentPage: number,
  // itemsPerPage: number,
  personalId: number
) => {
  return useQuery<WaiverReceivedResponse, Error>(
    ['waiverReceived', personalId],
    () => fetchWaiverRecieved(personalId),
    {
      keepPreviousData: true,
      onError: (error) => {
        toast.error(error.message || 'An unexpected error occurred while fetching sites.');
      },
    }
  );
};
