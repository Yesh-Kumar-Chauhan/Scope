import { DistrictTableType } from '../../types/district-type';
import { useQuery } from 'react-query';
import { fetchDistricts } from '../../apis/districtsApi';
import { toast } from 'react-toastify';

export const useFetchDistricts = (searchQuery: string, currentPage: number, itemsPerPage: number) => {
  return useQuery<{ data: DistrictTableType[]; totalItems: number }, Error>(
      ['districts', searchQuery, currentPage],
      () => fetchDistricts(searchQuery, currentPage, itemsPerPage),
      {
        keepPreviousData: true,
        onError: (error) => {
          toast.error(error.message || 'An unexpected error occurred while fetching districts.');
        },
      }
    );
  };

