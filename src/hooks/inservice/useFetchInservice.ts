import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { fetchInservices } from '../../apis/inserviceApi';
import { IInserviceTable } from '../../interface/Inservice';

export const useFetchInservice = (
  searchQuery: string,
  currentPage: number,
  itemsPerPage: number
) => {
  return useQuery<{ data: IInserviceTable[]; totalItems: number }, Error>(
    ['inservice', searchQuery, currentPage],
    () => fetchInservices(searchQuery, currentPage, itemsPerPage),
    {
      keepPreviousData: true,
      onError: (error) => {
        toast.error(error.message || 'An unexpected error occurred while fetching sites.');
      },
    }
  );
};
