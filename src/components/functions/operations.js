import firebase from "firebase/app";
import {
  addItem,
  deleteItem,
  setVendorID,
  setitem,
  searchList,
  filterList,
} from "../../redux";

const db = firebase.firestore().collection("PRODUCTS");
const reserveDB = firebase.firestore().collection("RESERVED");
const event = new Date();

class Operations {
  toggleCart = (item, cart, dispatch) => {
    try {
      const added = cart.find((p) => p.productID === item.productID);
      if (!added) {
        dispatch(addItem(item));
        console.log(item);
      } else {
        dispatch(deleteItem(item));
        console.log(item);
      }
    } catch (error) {
      console.log(error);
    }
  };

  reserveProduct = (item, reserved) => {
    if (reserved === false) {
      db.doc(item.productID).set({ isReserved: true }, { merge: true });
      reserveDB.doc(item.productID).set({
        productID: item.productID,
        image: item.image,
        price: item.price,
        productName: item.productName,
        isReserved: true,
        startDate: Date.now(),
        expiryDate: event.setHours(72),
      });
    } else {
      db.doc(item.productID).set({ isReserved: false }, { merge: true });
      reserveDB.doc(item.productID).delete();
    }
  };

  getTotal = (cart) => {
    return cart
      .reduce((acc, item) => {
        return acc + item.price;
      }, 0)
      .toFixed(2);
  };

  getVendorName = (item, vendors) => {
    let currentID = item.vendorID;

    if (currentID) {
      let filter = vendors.find(({ uid }) => uid === currentID);

      return filter.displayName;
    }
  };
}

Operations.shared = new Operations();
export default Operations;
