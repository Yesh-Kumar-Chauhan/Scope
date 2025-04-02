import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { fetchContactBySiteId } from '../../apis/contactApi';
import { IVisitTable } from '../../interface/Visits';

export const useFetchContact = (
  searchQuery: string,
  currentPage: number,
  itemsPerPage: number,
  siteId:number
) => {
  return useQuery<{ data: any[]; totalItems: number }, Error>(
    ['contacts', searchQuery, currentPage],
    () => fetchContactBySiteId(searchQuery, currentPage, itemsPerPage,siteId),
    {
      keepPreviousData: true,
      onError: (error) => {
        toast.error(error.message || 'An unexpected error occurred while fetching sites.');
      },
    }
  );
};
