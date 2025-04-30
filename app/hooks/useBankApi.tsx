import { useState } from "react";
import { Platform } from "react-native";


export interface BankDetails {
  accountHolderName: string;
  sortCode: string;
  accountNumber: string;
  confirmAccountNumber: string;
  document?: {
    name: string;
    type: string;
  };
  flag?: number; // optional
}


export interface BankPayload {
  accountHolderName: string;
  sortCode: string;
  accountNumber: string;
  confirmAccountNumber: string;
  documentName?:string;
  documentType?:string;
  flag: number;
}

const BASE_URL =
  Platform.OS === "web"
    ? "http://localhost:3000"
    : "https://a3e1-49-249-92-34.ngrok-free.app";

export const useBankApi = () => {
  const [loading, setLoading] = useState(false);

  const postBankDetails = async (details: BankDetails) => {
    try {
      setLoading(true);

      console.log('Submitting bank details:', details);

 
      if (details.accountNumber !== details.confirmAccountNumber) {
        throw new Error("Account numbers do not match");
      }

      const payload: BankPayload = {
        accountHolderName: details.accountHolderName,
        sortCode: details.sortCode,
        accountNumber: details.accountNumber,
        confirmAccountNumber: details.confirmAccountNumber,
        documentName:details?.document?.name,
        documentType:details.document?.type,
        flag: details.flag ?? 1, // Default to 1 if flag is not provided
      };

      console.log("Payload sending to BE:", payload);

      // Sending request to BE (POST)
      const response = await fetch(`${BASE_URL}/dev/api/bank-details`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Response:', data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit bank details");
      }

      return data;
    } catch (error) {
      console.error("Error submitting bank details:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getBankDetails = async (id: string | number) => {
    try {
      setLoading(true);

      console.log('Fetching bank details for ID:', id);

      const response = await fetch(`${BASE_URL}/dev/api/bank-details/${id}`);
      const data = await response.json();
      console.log('Fetched data:', data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch bank details");
      }

      return data;
    } catch (error) {
      console.error("Error fetching bank details:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    postBankDetails,
    getBankDetails,
    loading,
  };
};
