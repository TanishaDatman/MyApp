import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  accountHolderName: '',
  sortCode: '',
  accountNumber: '',
  confirmAccountNumber: '',
  statement: null as any,
  cheque: null as any,
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
    setBankStatement(state, action: PayloadAction<any>) {
      state.statement = action.payload;
    },
    setVoidCheque(state, action: PayloadAction<any>) {
      state.cheque = action.payload;
    },
  },
});

export const {
  setBankDetails,
  setBankStatement,
  setVoidCheque,
} = bankSlice.actions;

export default bankSlice.reducer;
