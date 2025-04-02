import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import {  fetchAttandance } from '../../../apis/personnelApi';
import {IAttendanceTable} from '../../../interface/Personnel'
export const useFetchAttandance = (
  // searchQuery: string, 
  // currentPage: number,
  // itemsPerPage: number,
  personalId: number
) => {
  return useQuery<{ data: IAttendanceTable[]; totalItems: number }, Error>(
    ['sites'],
    () => fetchAttandance(personalId),
    {
      keepPreviousData: true,
      onError: (error) => {
        toast.error(error.message || 'An unexpected error occurred while fetching sites.');
      },
    }
  );
};
