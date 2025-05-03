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
  document: {
    name: '',
    type:'',
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
    setBusinessDocument(state, action: PayloadAction<{ name: string,type:string }>) {
      state.document = action.payload;
    },
    setAllBusinessDetails(state, action: PayloadAction<{
      companywhat: string;
      businessType: string;
      contact: typeof state.contact;
      address: typeof state.address;
      document: typeof state.document;
    }>) {
      state.companywhat = action.payload.companywhat;
      state.businessType = action.payload.businessType;
      state.contact = action.payload.contact;
      state.address = action.payload.address;
      state.document = action.payload.document;
    },
  },
});

export const {
  setwhatbusiness,
  setBusinessType,
  setCompanyDetails,
  setBusinessContact,
  setBusinessAddress,
  setBusinessDocument,
  setAllBusinessDetails
} = businessSlice.actions;

export default businessSlice.reducer;
