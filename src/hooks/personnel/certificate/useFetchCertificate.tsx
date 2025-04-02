import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { fetchCertificate } from '../../../apis/personnelApi';
import {ICertificateTable} from '../../../interface/Personnel'
export const useFetchCertificate = (
  // searchQuery: string,
  // currentPage: number,
  // itemsPerPage: number,
  personalId: number
) => {
  return useQuery<{ data: ICertificateTable[]; totalItems: number }, Error>(
    ['sites'],
    () => fetchCertificate(personalId),
    {
      keepPreviousData: true,
      onError: (error) => {
        toast.error(error.message || 'An unexpected error occurred while fetching sites.');
      },
    }
  );
};
