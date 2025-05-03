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
    setAllTradingDetails(state, action: PayloadAction<{
      tradingName: string;
      isSameAsRegistered: boolean;
      address: typeof state.address;
    }>) {
      state.tradingName = action.payload.tradingName;
      state.isSameAsRegistered = action.payload.isSameAsRegistered;
      state.address = action.payload.address;
    },
  },
});

export const {
  setTradingName,
  setSameAsRegistered,
  setTradingAddress,
  setAllTradingDetails,
} = tradingSlice.actions;

export default tradingSlice.reducer;
