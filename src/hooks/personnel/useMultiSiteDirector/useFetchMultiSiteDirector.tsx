import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import {  fetchMultiSiteDirector } from '../../../apis/personnelApi';
export const useFetchMultiSiteDirector = (
  personalId: number
) => {
  return useQuery<{ data: any[]; totalItems: number }, Error>(
    ['sites'],
    () => fetchMultiSiteDirector(personalId),
    {
      keepPreviousData: true,
      onError: (error) => {
        toast.error(error.message || 'An unexpected error occurred while fetching sites.');
      },
    }
  );
};