import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { fetchPersonnels } from '../../apis/personnelApi';
import { ISiteTable } from '../../interface/Sites';
import {IPersonnel} from '../../interface/Personnel'
export const useFetchPersonnel = (
  searchQuery: string,
  currentPage: number,
  itemsPerPage: number
) => {
  return useQuery<{ data: IPersonnel[]; totalItems: number }, Error>(
    ['sites', searchQuery, currentPage],
    () => fetchPersonnels(searchQuery, currentPage, itemsPerPage),
    {
      keepPreviousData: true,
      onError: (error) => {
        toast.error(error.message || 'An unexpected error occurred while fetching sites.');
      },
    }
  );
};
