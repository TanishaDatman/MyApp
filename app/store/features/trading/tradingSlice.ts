import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  tradingName: '',
  isSameAsRegistered: true,
  address: {
    postCode: '',
    addressLine1: '',
    addressLine2: '',
    townCity: '',
    county: '',
    country: '',
  },
};

const tradingSlice = createSlice({
  name: 'trading',
  initialState,
  reducers: {
    setTradingName(state, action: PayloadAction<string>) {
      state.tradingName = action.payload;
    },
    setSameAsRegistered(state, action: PayloadAction<boolean>) {
      state.isSameAsRegistered = action.payload;
    },
    setTradingAddress(state, action: PayloadAction<typeof state.address>) {
      state.address = { ...state.address, ...action.payload };
    },
  },
});

export const {
  setTradingName,
  setSameAsRegistered,
  setTradingAddress,
} = tradingSlice.actions;

export default tradingSlice.reducer;
