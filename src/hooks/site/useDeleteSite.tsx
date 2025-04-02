import { useState } from 'react';
import {deleteSite} from '../../apis/sitesApi'

export const useDeleteSite = () => {
  const [loading, setLoading] = useState(false);

   const deleteSiteData = async (id: number, refetch: any): Promise<boolean> => {
    setLoading(true); 
    try {
        await deleteSite(id); 
        refetch(); 
        return true; 
      } catch (error) {
        console.error('Failed to delete workshop:', error);
        return false; 
      } finally {
        setLoading(false); 
      }
  };
  return { deleteSiteData, loading };
};
