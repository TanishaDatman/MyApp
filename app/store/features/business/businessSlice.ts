import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  companywhat: '',
  businessType: '',
  contact: {
    email: '',
    phone: '',
    url: '',
  },
  address: {
    country: '',
    postCode: '',
    address1: '',
    address2: '',
    town: '',
    county: '',
  },
  documents: {
    utility: null,
    rental: null,
    rates: null,
  },
};

const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    setwhatbusiness(state, action: PayloadAction<string>) {
      state.companywhat = action.payload;
    },
    setBusinessType(state, action: PayloadAction<string>) {
      state.businessType = action.payload;
    },
    setCompanyDetails(state, action: PayloadAction<any>) {
      // Assuming this field was missed in initial state
      (state as any).company = action.payload;
    },
    setBusinessContact(state, action: PayloadAction<typeof state.contact>) {
      state.contact = action.payload;
    },
    setBusinessAddress(state, action: PayloadAction<typeof state.address>) {
      state.address = action.payload;
    },
    setBusinessDocuments(state, action: PayloadAction<Partial<typeof state.documents>>) {
      state.documents = { ...state.documents, ...action.payload };
    },
  },
});

export const {
  setwhatbusiness,
  setBusinessType,
  setCompanyDetails,
  setBusinessContact,
  setBusinessAddress,
  setBusinessDocuments,
} = businessSlice.actions;

export default businessSlice.reducer;
