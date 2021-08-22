import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase/app";
import Merchants from "./../../lib/merchants.json";

// Inntial states
const initialState = {
  currentMerchant: [],
  merchants: [],
  merchantID: "",
  selectedMerchant: "",
};

// Get vendor data
export const fetchMerchant = createAsyncThunk(
  "prodSlice/fetchMerchant",
  async (merchantID) => {
    const getMerchant = firebase
      .firestore()
      .collection("VENDORS")
      .get()
      .then((querySnapshot) => {
        const data = [];
        console.log("FETCHED_ID", merchantID);
        querySnapshot.forEach((doc) => {
          if (doc.id === merchantID) {
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
    const merchant = await getMerchant;
    return merchant;
  }
);

// Get merchants
export const fetchMerchants = createAsyncThunk(
  "prodSlice/fetchMerchants",
  async () => {
    const getMerchants = firebase
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
    const merchants = await getMerchants;
    return merchants;
  }
);

export const merchantSlice = createSlice({
  name: "merchants",
  initialState,
  reducers: {
    setMerchantID: (state, action) => {
      state.merchantID = action.payload;
    },
  },
  extraReducers: {
    [fetchMerchant.fulfilled]: (state, action) => {
      state.currentMerchant = action.payload;
      console.log("MERCHANT: ", action.payload);
    },
    [fetchMerchants.fulfilled]: (state, action) => {
      state.merchants = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMerchantID } = merchantSlice.actions;

export const selectMerchants = (state) => state.merchants;

export default merchantSlice.reducer;
