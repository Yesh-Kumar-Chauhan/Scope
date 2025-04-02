import { useState } from 'react';
import {deleteCertificate} from '../../../apis/personnelApi'

export const useDeleteCertificate = () => {
  const [loading, setLoading] = useState(false);

  const deleteCertificateData = async (id: number, refetch: any): Promise<boolean> => {
    setLoading(true); 
    try {
        await deleteCertificate(id); 
        refetch(); 
        return true; 
      } catch (error) {
        console.error('Failed to delete workshop:', error);
        return false; 
      } finally {
        setLoading(false); 
      }
  };

  return { deleteCertificateData, loading };
};
