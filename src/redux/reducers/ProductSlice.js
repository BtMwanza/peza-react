import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";

const db = firebase.firestore().collection("PRODUCTS");

export const isEmpty = (param) => (!param ? true : false);
export const isTextContainSearchText = (text, searchText) =>
  text.indexOf(searchText) > -1;

export const isEmptyString = (p) => {
  if (isEmpty(p) || p.trim().length === 0) {
    return true;
  } else return false;
};

// Initial states
const initialState = {
  products: [],
  mainList: [],
  recentProducts: [],
  reservedProducts: [],
  categories: [
    { idx: 0, category: "All" },
    { idx: 1, category: "Engine & Emissions" },
    { idx: 2, category: "Lighting" },
    { idx: 3, category: "Brakes & Suspension" },
    { idx: 4, category: "Tyres & Rims" },
    { idx: 5, category: "Wiring" },
    { idx: 6, category: "Electrical" },
  ],
  viewed: [],
  transactions: [],
  amounts: [],
  popular: [],
  currentProduct: {},
  currentTransaction: {},
  isLoading: false,
  selectedCategory: 0,
  searchText: "",
};
// GET DATA FROM FIREBASE
// Get products from firebase

export const fetchProducts = createAsyncThunk(
  "prodSlice/fetchProducts",
  () =>
    new Promise((resolve, reject) => {
      const getProducts = db
        .where("isReserved" || "isSold", "!=", true)
        .onSnapshot(
          (snapshot) => {
            resolve(
              snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            );
          },
          (error) => {
            reject(error);
          }
        );
      initialState.products.push(getProducts);
    })
);

// Get recent products from firebase
export const fetchRecentProducts = createAsyncThunk(
  "prodSlice/fetchRecentProducts",
  async () => {
    const getRecentProducts = db
      .orderBy("createdAt", "asc")
      .limit(7)
      .get()
      .then((querySnapshot) => {
        const productList = [];
        querySnapshot.forEach((doc) => {
          productList.push({
            key: doc.id,
            productID: doc.id,
            currentQuantity: parseInt(doc.data().currentQuantity),
            vendorID: doc.data().vendor,
            productName: doc.data().productName,
            image: doc.data().image,
            price: parseFloat(doc.data().price),
            desc: doc.data().desc,
            category: doc.data().category,
            createdAt: doc.data().createdAt,
            isSold: doc.data().isSold,
            productCode: doc.data().productCode,
            brand: doc.data().brand,
            vin: doc.data().VIN,
            year: doc.data().year,
            make: doc.data().make,
            model: doc.data().model,
            extraInfo: doc.data().extraInfo,
          });
        });
        return productList;
      });

    const data = await getRecentProducts;
    return data;
  }
);

// Get popular products from firebase
export const fetchPopularProducts = createAsyncThunk(
  "prodSlice/fetchPopularProducts",
  async () => {
    const getProducts = firebase
      .firestore()
      .collection("POPULAR")
      .orderBy("count", "desc")
      .limit(10)
      .get()
      .then(
        (querySnapshot) => {
          const views = [];
          querySnapshot.forEach((doc) => {
            views.push({
              key: doc.id,
              count: doc.data().count,
              product: doc.data().product,
            });
          });
          return views;
        },
        (error) => {
          alert(error.message);
        }
      );

    const data = await getProducts;
    return data;
  }
);

// Fetch user transactions
export const fetchTransactions = createAsyncThunk(
  "prodSlice/fetchTransactions",
  async () => {
    var user = firebase.auth().currentUser;
    const gettransactions = firebase
      .firestore()
      .collection("TRANSACTIONS")
      .get()
      .then((querySnapshot) => {
        const records = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().userID === user.uid) {
            records.push({
              key: doc.id,
              txnRef: doc.data().txnRef,
              cartRecord: doc.data().cartRecord,
              userID: doc.data().userID,
              date: doc.data().date,
              customer: doc.data().customer,
              totalPrice: doc.data().totalPrice,
            });
          }
        });
        return records;
      });
    const transactions = await gettransactions;
    return transactions;
  }
);

export const productSlice = createSlice({
  name: "prodSlice",
  initialState,
  reducers: {
    fetchData: (state, action) => {
      state.isLoading = true;
      state.mainList = action.payload;
      state.products = action.payload;
    },
    filterList: (state, action) => {
      state.selectedCategory = action.payload;

      // Filter products based on selected category
      let current = state.categories.find(
        ({ idx }) => idx === state.selectedCategory
      );

      if (state.selectedCategory !== 0) {
        let filter = state.mainList.filter(
          ({ category }) => category === current.category
        );
        state.products = filter;
      } else {
        state.products = state.mainList;
      }
    },
    searchList: (state, action) => {
      state.searchText = action.payload;

      if (!isEmptyString(state.searchText)) {
        var searchText = state.searchText.toLowerCase();
        const r = state.mainList.filter(({ productName }) =>
          isTextContainSearchText(productName.toLowerCase(), searchText)
        );
        state.products = r;
      } else {
        state.products = state.mainList;
      }
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
      console.log("CURRENT: ", action.payload);
    },
    setCurrentTransaction: (state, action) => {
      state.currentTransaction = action.payload;
    },
    setAmounts: (state, action) => {
      state.amounts = action.payload;
    },
  },
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [fetchRecentProducts.fulfilled]: (state, action) => {
      state.recentProducts = action.payload;
    },
    [fetchTransactions.fulfilled]: (state, action) => {
      state.transactions = action.payload;
    },
    [fetchPopularProducts.fulfilled]: (state, action) => {
      state.popular = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchData,
  filterList,
  searchList,
  setCurrentProduct,
  setCurrentTransaction,
  setAmounts,
} = productSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectProducts = (state) => state.prodSlice;

export default productSlice.reducer;