// import { useState } from 'react';
// import { Platform } from 'react-native';

// // Dynamic base URL
// const BASE_URL =
//   Platform.OS === 'web'
//     ? 'http://localhost:3000'
//     : 'https://85f4-49-249-92-34.ngrok-free.app';

// export interface CompanyDetails {
//   companyType: string;
//   organizationtype: string;
//   companyregisternumber: string;
//   bussinessLegalname: string;
//   email: string;
//   phoneno: string;
//   url: string;
//   postcode: string;
//   address_line_1: string;
//   address_line_2: string;
//   town: string;
//   county: string;
//   country: string;
//   document?: any; // file (optional)
// }

// export const useCompanyApi = () => {
//   const [loading, setLoading] = useState(false);

//   const postCompanyDetails = async (details: any) => {
//     try {
//       setLoading(true);

//       console.log("detiallll......",details)

//       const formData = new FormData();
//       formData.append('companyType', details.companyWhat);
//       formData.append('organizationtype', details?.orgType);
//       formData.append('companyregisternumber', details.companyNumber);
//       formData.append('bussinessLegalname', details.legalName);
//       formData.append('email', details.email);
//       formData.append('phoneno', details.phone);
//       formData.append('url', details.url);
//       formData.append('postcode', details.postCode);
//       formData.append('address_line_1', details?.address1);
//       formData.append('address_line_2', details?.address2);
//       formData.append('town', details.town);
//       formData.append('county', details.county);
//       formData.append('country', details.country);

//       if (details.document) {
//         formData.append('document', details.document); // 👈 make sure it's a File/Blob
//       }

//       const response = await fetch(`${BASE_URL}/dev/api/company-details`, {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();
//       console.log("data inside hook",data)

//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to submit company details');
//       }

//       return data;
//     } catch (error) {
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getCompanyDetails = async (id: any) => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${BASE_URL}/dev/api/company-details/${id}`);

//       const data = await response.json();
// console.log("Inside hook get company detaiks..........",data)

//       if (!response.ok) throw new Error(data.message || 'Failed to fetch company details');

//       return data;
//     } catch (error) {
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     postCompanyDetails,
//     getCompanyDetails,
//     loading,
//   };
// };


import { useState } from 'react';
import { Platform } from 'react-native';

// 👇 Incoming details structure
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

// 👇 Final payload structure to send
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
    : 'https://85f4-49-249-92-34.ngrok-free.app';

export const useCompanyApi = () => {
  const [loading, setLoading] = useState(false);

  const postCompanyDetails = async (details: IncomingCompanyDetails) => {
    try {
      setLoading(true);
      console.log('Submitting company details:', details);

      // 🔥 Mapping incoming details properly
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
