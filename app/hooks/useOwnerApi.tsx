import { useState } from 'react';
import { Platform } from 'react-native';


export interface OwnerDetails {
  title: string;
  firstName: string;
  lastName: string;
  dob: string;
  nationality: string;
  email?: string;
  phone?: string;
  postCode?: string;
  houseNo?: string;
  street?: string;
  city?: string;
  county?: string;
  country?: string;
  flag?: string; 
}


export interface OwnerPayload {
  title: string;
  first_name: string;
  last_name: string;
  dob: string;
  nationality: string;
  emailId?: string;
  phnno?: string;
  postcode?: string;
  houseno?: string;
  street?: string;
  town_city?: string;
  county?: string;
  country?: string;
  flag: number;
}

const BASE_URL =
  Platform.OS === 'web'
    ? 'http://localhost:3000'
    : 'https://a3e1-49-249-92-34.ngrok-free.app';

export const useOwnerApi = () => {
  const [loading, setLoading] = useState(false);

  const postOwnerDetails = async (details: OwnerDetails) => {
    try {
      setLoading(true);
      console.log('Submitting owner details:inside hook===>', details);


      const payload: OwnerPayload = {
        title: details.title,
        first_name: details.firstName,
        last_name: details.lastName,
        dob: details.dob,
        nationality: details.nationality,
        emailId: details.email,
        phnno: details.phone,
        postcode: details.postCode,
        houseno: details.houseNo,
        street: details.street,
        town_city: details.city,
        county: details.county,
        country: details.country,
        flag: 1, // always sending '1' here
      };

      const response = await fetch(`${BASE_URL}/dev/api/business-details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit owner details');
      }

      return data;
    } catch (error) {
      console.error('Error submitting owner details:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getOwnerDetails = async (id: string | number) => {
    try {
      setLoading(true);
      console.log('Fetching owner details for ID:', id);

      const response = await fetch(`${BASE_URL}/dev/api/business-details/${id}`, {
        method: 'GET',
      });

      const data = await response.json();
      console.log('Fetched data:', data);

      if (!response.ok) {
        throw new Error('Failed to fetch owner details');
      }

      return data;
    } catch (error) {
      console.error('Error fetching owner details:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    postOwnerDetails,
    getOwnerDetails,
    loading,
  };
};
