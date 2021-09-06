import firebase from "firebase/app";
import Fire from "./../../lib/firebaseConfig";
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
  toggleCart = (currentProduct, cart, dispatch) => {
    try {
      const added = cart.find((p) => p.productID === currentProduct.productID);
      if (!added) {
        dispatch(addItem(currentProduct));
        console.log("ADDED: ", cart);
      } else {
        dispatch(deleteItem({ id: currentProduct.productID }));
        console.log("DELETED: ", currentProduct.productID);
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

  getVendorName = (vendorID, merchants) => {
    let currentID = vendorID;

    if (currentID) {
      let filter = merchants.find(({ uid }) => uid === currentID);

      return filter.displayName;
    }
  };

  signIn = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email.trim(), password);
    } catch (error) {
      alert(error);
    }
  };

  signUp = (displayName, email, phoneNumber, password) => {
    try {
      Fire.shared.createUser(displayName, email, phoneNumber, password);
    } catch (error) {
      alert(error);
    }
  };

  onChangeUserInfo = (displayname, phoneNumber) => {
    try {
    } catch (error) {
      alert(error);
    }
  };

  onChangeEmail = (email, password) => {
    try {
      Fire.shared.updateEmail(email);
    } catch (error) {
      alert(error.message);
    }
  };

  onChangePassword = (password) => {
    try {
      Fire.shared.updatePassword(password);
    } catch (error) {
      alert(error.message);
    }
  };
}

Operations.shared = new Operations();
export default Operations;
