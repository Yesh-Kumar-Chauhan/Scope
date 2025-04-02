import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { fetchStatus } from '../../apis/statusApi';

export const useFetchStatus = (
  searchQuery: string,
  currentPage: number,
  itemsPerPage: number,
) => {
  return useQuery<{ data: any[]; totalItems: number }, Error>(
    ['status', searchQuery, currentPage],
    () => fetchStatus(searchQuery, currentPage, itemsPerPage),
    {
      keepPreviousData: true,
      onError: (error) => {
        toast.error(error.message || 'An unexpected error occurred while fetching sites.');
      },
    }
  );
};
