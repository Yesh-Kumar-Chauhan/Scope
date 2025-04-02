import { DistrictTableType } from '../../types/district-type';
import { useQuery } from 'react-query';
import { fetchClosings } from '../../apis/closingApi';
import { toast } from 'react-toastify';
import {IClosingTable} from '../../interface/Closing'

export const useFetchClosing = (districtId: number, currentPage: number, itemsPerPage: number) => {
  return useQuery<{ data: IClosingTable[]; totalItems: number }, Error>(
      ['closing', districtId, currentPage],
      () => fetchClosings(districtId, currentPage, itemsPerPage),
      {
        keepPreviousData: true,
        onError: (error) => {
          toast.error(error.message || 'An unexpected error occurred while fetching districts.');
        },
      }
    );
  };

