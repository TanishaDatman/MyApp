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
  },
});

export const {
  setBankDetails,
  setBankDocument
} = bankSlice.actions;

export default bankSlice.reducer;
