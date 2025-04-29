// import { useState } from 'react';
// import { Platform } from 'react-native';

// export interface OwnerDetails {
//   title: string;
//   firstName: string;
//   lastName: string;
//   dob: string;
//   nationality: string;
// }


// // const BASE_URL = 'https://fe67-49-249-92-34.ngrok-free.app';
// const BASE_URL =
//   Platform.OS === 'web'
//     ? 'http://localhost:3000'
//     : 'https://85f4-49-249-92-34.ngrok-free.app';

// export const useOwnerApi = () => {
//   const [loading, setLoading] = useState(false);

//   const postOwnerDetails = async (details: any) => {
//     try {
//       setLoading(true);
//       console.log("details---->",details)
//       const formData = new FormData();
//       formData.append('title', details.title);
//       formData.append('first_name', details.firstName);
//       formData.append('last_name', details.lastName);
//       formData.append('dob', details.dob);
//       formData.append('nationality', details.nationality);
  
//       // Add other details if needed
//       formData.append('emailId', details.email);
//       formData.append('phnno', details.phone);
//       formData.append('postcode', details.postCode);
//       formData.append('houseno', details.houseNo);
//       formData.append('street', details.street);
//       formData.append('town_city', details.city);
//       formData.append('county', details.county);
//       formData.append('country', details.country);
//       // formData.append('documentUrl', details.image);
//       formData.append('flag','1')
  
//       const response = await fetch(`${BASE_URL}/dev/api/business-details`, {
//         method: 'POST',
//         body: formData,
//       });
  
//       // Here, directly parse the JSON response
//       const data = await response.json();  // No need for JSON.parse(text) again
//       console.log('Raw response------>:', data);
  
//       if (!response.ok) throw new Error(data.message || 'Failed to submit details');
  
//       return data;
//     } catch (error) {
//       // console.error('Error submitting details:', error);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getOwnerDetails = async (id:any) => {
//     try {
//       setLoading(true);
//       console.log("Inside Owner get hook ")
//       const response = await fetch(`${BASE_URL}/dev/api/business-details/${id}`, { method: 'GET' });
//       const data = await response.json();
//       console.log("data in review is",data);
      
//       if (!response.ok) throw new Error('Failed to fetch details');

//       return data;
//     } catch (error) {
//       console.error('Error fetching details:', error);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     postOwnerDetails,
//     getOwnerDetails,
//     loading,
//   };
// };












// import { useState } from 'react';
// import { Platform } from 'react-native';

// export interface OwnerDetails {
//   title: string;
//   firstName: string;
//   lastName: string;
//   dob: string;
//   nationality: string;
//   email?: string;
//   phone?: string;
//   postCode?: string;
//   houseNo?: string;
//   street?: string;
//   city?: string;
//   county?: string;
//   country?: string;
//   flag?: string;
// }

// const BASE_URL =
//   Platform.OS === 'web'
//     ? 'http://localhost:3000'
//     : 'https://85f4-49-249-92-34.ngrok-free.app';

// export const useOwnerApi = () => {
//   const [loading, setLoading] = useState(false);

//   const postOwnerDetails = async (details: OwnerDetails) => {
//     try {
//       setLoading(true);
//       console.log('Submitting owner details:', details);

//       const payload = {
//         title: details.title,
//         first_name: details.firstName,
//         last_name: details.lastName,
//         dob: details.dob,
//         nationality: details.nationality,
//         emailId: details.email,
//         phnno: details.phone,
//         postcode: details.postCode,
//         houseno: details.houseNo,
//         street: details.street,
//         town_city: details.city,
//         county: details.county,
//         country: details.country,
//         flag:1, // Default flag to '1' if not provided
//       };

//       const response = await fetch(`${BASE_URL}/dev/api/business-details`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json', // Important for JSON POST
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();
//       console.log('Response:', data);

//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to submit owner details');
//       }

//       return data;
//     } catch (error) {
//       console.error('Error submitting owner details:', error);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getOwnerDetails = async (id: string | number) => {
//     try {
//       setLoading(true);
//       console.log('Fetching owner details for ID:', id);

//       const response = await fetch(`${BASE_URL}/dev/api/business-details/${id}`, {
//         method: 'GET',
//       });

//       const data = await response.json();
//       console.log('Fetched data:', data);

//       if (!response.ok) {
//         throw new Error('Failed to fetch owner details');
//       }

//       return data;
//     } catch (error) {
//       console.error('Error fetching owner details:', error);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     postOwnerDetails,
//     getOwnerDetails,
//     loading,
//   };
// };













import { useState } from 'react';
import { Platform } from 'react-native';

// 👇 Incoming details structure
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
  flag?: string; // optional
}

// 👇 Final payload structure to send to the API
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
    : 'https://85f4-49-249-92-34.ngrok-free.app';

export const useOwnerApi = () => {
  const [loading, setLoading] = useState(false);

  const postOwnerDetails = async (details: OwnerDetails) => {
    try {
      setLoading(true);
      console.log('Submitting owner details:', details);

      // 🔥 Type the payload correctly
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
