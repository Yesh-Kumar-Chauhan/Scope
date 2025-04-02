import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { fetchSchedular } from '../../../apis/personnelApi';
import { ISchedularTable } from '../../../interface/Personnel';
export const useFetchSchedular = (
  searchQuery: string,
  currentPage: number,
  itemsPerPage: number,
  personalId: number
) => {
  return useQuery<{ data: ISchedularTable[]; totalItems: number }, Error>(
    ['schedular', searchQuery, currentPage],
    () => fetchSchedular(personalId),
    {
      keepPreviousData: true,
      onError: (error) => {
        toast.error(error.message || 'An unexpected error occurred while fetching sites.');
      },
    }
  );
};