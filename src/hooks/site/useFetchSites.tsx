import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { fetchSites } from '../../apis/sitesApi';
import { ISiteTable } from '../../interface/Sites';

export const useFetchSites = (
  searchQuery: string,
  currentPage: number,
  itemsPerPage: number
) => {
  return useQuery<{ data: ISiteTable[]; totalItems: number }, Error>(
    ['sites', searchQuery, currentPage],
    () => fetchSites(searchQuery, currentPage, itemsPerPage),
    {
      keepPreviousData: true,
      onError: (error) => {
        toast.error(error.message || 'An unexpected error occurred while fetching sites.');
      },
    }
  );
};
