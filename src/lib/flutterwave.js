import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import Button from "@material-ui/core/Button";
import { MDBBtn } from "mdb-react-ui-kit";

import Operations from "./../components/functions/operations";
import { selectCart } from "./../redux/reducers/CartSlice";
import useStyles from "./../css/style";
import "./../css/App.css";

const FlutterwaveBtn = () => {
  const cart = useSelector(selectCart);
  const total = Operations.shared.getTotal(cart);

  const config = {
    public_key: process.env.REACT_APP_FLW_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: total,
    currency: "ZMK",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "user@gmail.com",
      phonenumber: "07064586146",
      name: "app tester",
    },
    customizations: {
      title: "PEZA",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <Button
      fullWidth
      variant="contained"
      color="secondary"
      style={{ background: "#00675b", marginBottom: 10 }}
      onClick={() => {
        handleFlutterPayment({
          callback: (response) => {
            console.log(response);
            closePaymentModal(); // this will close the modal programmatically
          },
          onClose: () => {},
        });
      }}
    >
      Payment with Flutterwave
    </Button>
  );
};

export default FlutterwaveBtn;
