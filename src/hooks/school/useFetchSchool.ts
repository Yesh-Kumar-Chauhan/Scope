import { DistrictTableType } from '../../types/district-type';
import { useQuery } from 'react-query';
import { fetchSchools } from '../../apis/schoolApi';
import { toast } from 'react-toastify';
import { ISchool, ISchoolTable } from '../../interface/School';

export const useFetchSchool = (searchQuery: string, currentPage: number, itemsPerPage: number) => {
  return useQuery<{ data: ISchool[]; totalItems: number }, Error>(
      ['schools', searchQuery, currentPage],
      () => fetchSchools(searchQuery, currentPage, itemsPerPage),
      {
        keepPreviousData: true,
        onError: (error) => {
          toast.error(error.message || 'An unexpected error occurred while fetching schools.');
        },
      }
    );
  };

