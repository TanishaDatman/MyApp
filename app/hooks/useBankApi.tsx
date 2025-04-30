import { useState } from "react";
import { Platform } from "react-native";

// 👇 Incoming details structure
export interface BankDetails {
  accountHolderName: string;
  sortCode: string;
  accountNumber: string;
  confirmAccountNumber: string;
  flag?: number; // optional
}

// 👇 Final payload structure to send to the API (camelCase as per BE)
export interface BankPayload {
  accountHolderName: string;
  sortCode: string;
  accountNumber: string;
  confirmAccountNumber: string;
  flag: number;
}

const BASE_URL =
  Platform.OS === "web"
    ? "http://localhost:3000"
    : "hhttps://a3e1-49-249-92-34.ngrok-free.app";

export const useBankApi = () => {
  const [loading, setLoading] = useState(false);

  const postBankDetails = async (details: BankDetails) => {
    try {
      setLoading(true);

      console.log('Submitting bank details:', details);

      // ✅ Validate if account number and confirm account number match
      if (details.accountNumber !== details.confirmAccountNumber) {
        throw new Error("Account numbers do not match");
      }

      // 🔥 Prepare the payload (match the BE structure)
      const payload: BankPayload = {
        accountHolderName: details.accountHolderName,
        sortCode: details.sortCode,
        accountNumber: details.accountNumber,
        confirmAccountNumber: details.confirmAccountNumber,
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
