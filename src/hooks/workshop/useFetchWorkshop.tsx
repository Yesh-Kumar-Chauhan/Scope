import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { fetchWorkshop } from '../../apis/workshopApi';
import { IWorkshopTable } from '../../interface/Workshop';

export const useFetchWorkshop = (
  searchQuery: string,
  currentPage: number,
  itemsPerPage: number
) => {
  return useQuery<{ data: IWorkshopTable[]; totalItems: number }, Error>(
    ['workshop', searchQuery, currentPage],
    () => fetchWorkshop(searchQuery, currentPage, itemsPerPage),
    {
      keepPreviousData: true,
      onError: (error) => {
        toast.error(error.message || 'An unexpected error occurred while fetching workshops.');
      },
    }
  );
};
