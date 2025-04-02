import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { fetchTimesheet } from '../../../apis/personnelApi';
import {ITimesheetTable} from '../../../interface/Personnel'
export const useFetchTimesheet = (
  searchQuery: string,
  currentPage: number,
  itemsPerPage: number,
  personalId: number
) => {
  return useQuery<{ data: ITimesheetTable[]; totalItems: number }, Error>(
    ['sites', searchQuery, currentPage],
    () => fetchTimesheet(personalId),
    {
      keepPreviousData: true,
      onError: (error) => {
        toast.error(error.message || 'An unexpected error occurred while fetching sites.');
      },
    }
  );
};
