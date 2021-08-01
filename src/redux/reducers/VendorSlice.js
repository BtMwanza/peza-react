import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase/app";

// Inntial states
const initialState = {
  currentVendor: [],
  vendors: [],
  vendorID: "",
};

// Get vendor data
export const fetchVendor = createAsyncThunk(
  "prodSlice/fetchVendor",
  async (vendorID) => {
    const getVendor = firebase
      .firestore()
      .collection("VENDORS")
      .get()
      .then((querySnapshot) => {
        const data = [];
        console.log("FETCHED_ID", vendorID);
        querySnapshot.forEach((doc) => {
          if (doc.id === vendorID) {
            data.push({
              key: doc.id,
              uid: doc.id,
              displayName: doc.data().name,
              address: doc.data().address,
              aboutUs: doc.data().aboutUs,
              email: doc.data().email,
              avatar: doc.data().avatar,
              phoneNumber: doc.data().phoneNumber,
              location: doc.data().location,
            });
          }
        });
        return data;
      });
    const vendor = await getVendor;
    return vendor;
  }
);

// Get vendors
export const fetchVendors = createAsyncThunk(
  "prodSlice/fetchVendors",
  async () => {
    const getVendor = firebase
      .firestore()
      .collection("VENDORS")
      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({
            key: doc.id,
            uid: doc.id,
            displayName: doc.data().name,
            address: doc.data().address,
            aboutUs: doc.data().aboutUs,
            email: doc.data().email,
            avatar: doc.data().avatar,
            phoneNumber: doc.data().phoneNumber,
            location: doc.data().location,
          });
        });
        return data;
      });
    const vendors = await getVendor;
    return vendors;
  }
);

export const vendorSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {
    setVendorID: (state, action) => {
      state.vendorID = action.payload;
    },
  },
  extraReducers: {
    [fetchVendor.fulfilled]: (state, action) => {
      state.currentVendor = action.payload;
      console.log("VENDOR: ", action.payload);
    },
    [fetchVendors.fulfilled]: (state, action) => {
      state.vendors = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setVendorID } = vendorSlice.actions;

export const selectSellers = (state) => state.sellers;

export default vendorSlice.reducer;
