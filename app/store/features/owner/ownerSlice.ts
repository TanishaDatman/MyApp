import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  owner: {
    title: '',
    firstName: '',
    lastName: '',
    dob: '',
    nationality: '',
  },
  contact: {
    email: '',
    phone: '',
  },
  address: {
    postCode: '',
    houseNo: '',
    street: '',
    city: '',
    county: '',
    country: '',
  },
  image: {
    path: '',
  },
};

const ownerSlice = createSlice({
  name: 'owner',
  initialState,
  reducers: {
    setOwnerDetails(state, action: PayloadAction<typeof state.owner>) {
      state.owner = action.payload;
    },
    setContactDetails(state, action: PayloadAction<typeof state.contact>) {
      state.contact = action.payload;
    },
    setAddressDetails(state, action: PayloadAction<typeof state.address>) {
      state.address = action.payload;
    },
    setImg(state, action: PayloadAction<{ path: string }>) {
      state.image = action.payload;
    },
  },
});

export const {
  setOwnerDetails,
  setContactDetails,
  setAddressDetails,
  setImg,
} = ownerSlice.actions;

export default ownerSlice.reducer;
