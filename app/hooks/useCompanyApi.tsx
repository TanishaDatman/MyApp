
import { useState } from 'react';
import { Platform } from 'react-native';


export interface IncomingCompanyDetails {
  address1: string;
  address2: string;
  businessType: string;
  companyWhat: string;
  companyNumber: string;
  country: string;
  county: string;
  email: string;
  legalName: string;
  orgType: string;
  phone: string;
  postCode: string;
  town: string;
  url: string;
}


export interface CompanyDetails {
  companyType: string;
  organizationtype: string;
  companyregisternumber: string;
  bussinessLegalname: string;
  email: string;
  phoneno: string;
  url: string;
  postcode: string;
  address_line_1: string;
  address_line_2: string;
  town: string;
  county: string;
  country: string;
  document?: any; // optional
  flag:number
}

const BASE_URL =
  Platform.OS === 'web'
    ? 'http://localhost:3000'
    : 'https://a3e1-49-249-92-34.ngrok-free.app';

export const useCompanyApi = () => {
  const [loading, setLoading] = useState(false);

  const postCompanyDetails = async (details: IncomingCompanyDetails) => {
    try {
      setLoading(true);
      console.log('Submitting company details:', details);

     
      const payload: CompanyDetails = {
        companyType: details.companyWhat || '',
        organizationtype: details.orgType || '',
        companyregisternumber: details.companyNumber || '',
        bussinessLegalname: details.legalName || '',
        email: details.email || '',
        phoneno: details.phone || '',
        url: details.url || '',
        postcode: details.postCode || '',
        address_line_1: details.address1 || '',
        address_line_2: details.address2 || '',
        town: details.town || '',
        county: details.county || '',
        country: details.country || '',
        flag:1
      };

      const response = await fetch(`${BASE_URL}/dev/api/company-details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit company details');
      }

      return data;
    } catch (error) {
      console.error('Error submitting company details:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getCompanyDetails = async (id: string | number) => {
    try {
      setLoading(true);
      console.log('Fetching company details for ID:', id);

      const response = await fetch(`${BASE_URL}/dev/api/company-details/${id}`, {
        method: 'GET',
      });

      const data = await response.json();
      console.log('Fetched company data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch company details');
      }

      return data;
    } catch (error) {
      console.error('Error fetching company details:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    postCompanyDetails,
    getCompanyDetails,
    loading,
  };
};
