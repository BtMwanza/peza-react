import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";

function firestoreRef() {
  return firebase.firestore().collection("USER");
}

export const fetchCurrentUser = createAsyncThunk(
  "authSlice/fetchCurrentUser",
  async () => {
    const uid = firebase.auth().currentUser.uid;
    const getUser = firestoreRef.get().then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        if (doc.id === uid) {
          data.push({
            key: doc.data().uid,
            uid: doc.data().uid,
            displayName: doc.data().displayName,
            email: doc.data().email,
            avatar: doc.data().avatar,
            phoneNumber: doc.data().phoneNumber,
          });
        }
        console.log("AUTH_REDUCER: ", data);
      });
      return data;
    });
    const user = await getUser;
    return user;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: [],
    isLoggedIn: false,
    isLoading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      //  console.log("CURRENT_USER: ", action.payload);
    },
    setAuthState: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchCurrentUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      // console.log('TEST: ', state.currentUser);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuthState, setUser } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
