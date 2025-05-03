import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  accountHolderName: '',
  sortCode: '',
  accountNumber: '',
  confirmAccountNumber: '',
  document: {
    name: '',
    type:'',
  },
};

const bankSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {
    setBankDetails(
      state,
      action: PayloadAction<{
        accountHolderName: string;
        sortCode: string;
        accountNumber: string;
        confirmAccountNumber: string;
      }>
    ) {
      Object.assign(state, action.payload);
    },
    setBankDocument(state, action: PayloadAction<{ name: string,type:string }>) {
      state.document = action.payload;
    },
    setAllBankDetails(state, action: PayloadAction<{
      accountHolderName: string;
      sortCode: string;
      accountNumber: string;
      confirmAccountNumber: string;
      document: typeof state.document;
    }>) {
      state.accountHolderName = action.payload.accountHolderName;
      state.sortCode = action.payload.sortCode;
      state.accountNumber = action.payload.accountNumber;
      state.confirmAccountNumber = action.payload.confirmAccountNumber;
      state.document = action.payload.document;
    },
  },
});

export const {
  setBankDetails,
  setBankDocument,
  setAllBankDetails,
} = bankSlice.actions;

export default bankSlice.reducer;
