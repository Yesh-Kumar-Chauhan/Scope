import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { fetchVisit } from '../../apis/visitApi';
import { IVisitTable } from '../../interface/Visits';

export const useFetchVisit = (
  searchQuery: string,
  currentPage: number,
  itemsPerPage: number,
  siteId:number
) => {
  return useQuery<{ data: IVisitTable[]; totalItems: number }, Error>(
    ['visits', searchQuery, currentPage],
    () => fetchVisit(searchQuery, currentPage, itemsPerPage,siteId),
    {
      keepPreviousData: true,
      onError: (error) => {
        toast.error(error.message || 'An unexpected error occurred while fetching sites.');
      },
    }
  );
};
