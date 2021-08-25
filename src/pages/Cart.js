import React from "react";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase/app";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import {
  FiChevronDown,
  FiChevronUp,
  FiLock,
  FiUnlock,
  FiTrash2,
  FiTruck,
} from "react-icons/fi";

import { deleteItem, selectCart } from "./../redux/reducers/CartSlice";
import useStyles from "./../css/style";
import "./../css/App.css";
import Operations from "../components/functions/operations";
import { fetchData } from "./../redux";
import { selectProducts } from "./../redux/reducers/ProductSlice";
import { selectMerchants } from "./../redux/reducers/MerchantSlice";
import FlutterwaveBtn from "./../lib/flutterwave";
import Fire from "./../lib/firebaseConfig";

function Cart(props) {
  const { history, name, location } = props;
  const cart = useSelector(selectCart);
  const { merchants } = useSelector(selectMerchants);
  const classes = useStyles();
  const dispatch = useDispatch();
  const total = Operations.shared.getTotal(cart);

  return (
    <Container className={classes.container}>
      <Grid container>
        <Grid item xs={12} sm={9} md={9}>
          {cart.length === 0 ? (
            <Paper className={classes.paper2}>
              <Typography className="text-center">
                Your cart is empty, please add some items
              </Typography>
            </Paper>
          ) : (
            <Paper className={classes.paper2}>
              {cart.map((item, index) => {
                const { productName, image, category, price } = item;
                let vendor = Operations.shared.getVendorName(item, merchants);
                return (
                  <Grid container>
                    <Grid item>
                      <div className={classes.cartImage}>
                        <img
                          className={classes.cartImg}
                          alt="complex"
                          src={image}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom variant="subtitle1">
                            {productName}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            {category}
                          </Typography>
                          <Typography variant="subtitle2" color="textSecondary">
                            Sold By: {vendor}
                          </Typography>
                        </Grid>
                        <Grid item xs>
                          <ButtonGroup
                            variant="text"
                            color="primary"
                            aria-label="text primary button group"
                          >
                            <Button>
                              Delete
                              <FiTrash2
                                size={20}
                                onClick={() => dispatch(deleteItem(index))}
                              />
                            </Button>
                            {item.isReserved === undefined || false ? (
                              <Button>
                                Reserve item
                                <FiLock size={20} />
                              </Button>
                            ) : (
                              <Button>
                                Unreserve item
                                <FiLock size={20} />
                              </Button>
                            )}
                          </ButtonGroup>
                        </Grid>
                        <Grid xs>
                          <Chip
                            label={"Delivery" && <FiTruck />}
                            color="secondary"
                          />
                        </Grid>
                        <Divider style={{ marginBottom: 20 }} />
                      </Grid>

                      <Grid item>
                        <Typography variant="subtitle1">
                          K{price.toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Paper>
          )}

          <Grid item xs={12} sm={9} md={9}>
            <Paper className={classes.paper2} elevation={0}>
              <p className="text-primary mb-0">
                <i className="fas fa-info-circle mr-1"></i> Do not delay the
                purchase, adding items to your cart does not mean booking them.
              </p>

              <div className="mb-3">
                <div className="pt-4">
                  <h5 className="mb-4">Expected delivery</h5>

                  <p className="mb-0"> Thu., 12.03. - Mon., 16.03.</p>
                </div>
              </div>

              <div className="mb-3">
                <div class="pt-4">
                  <h5 class="mb-4">We accept</h5>

                  <img
                    class="mx-0"
                    width="45px"
                    src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                    alt="Visa"
                  />
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={12} md={3} sm={6}>
          <Paper className={classes.paper2}>
            <Grid
              container
              className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"
            >
              <Typography>Items({cart.length})</Typography>
              <Typography>K{total}</Typography>
            </Grid>
            <Grid
              container
              className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"
            >
              <Typography>Delivery</Typography>
              <Typography>{}</Typography>
            </Grid>
            <Divider />
            <Grid
              container
              className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"
            >
              <Typography variant="subtitle2">Subtotal</Typography>
              <Typography variant="subtitle2" gutterBottom>
                K{total}
              </Typography>
            </Grid>
            <Grid container>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                style={{ background: "#00675b", marginBottom: 10 }}
                onClick={() => {
                  Fire.shared.subscribeToAuthChanges() !== null
                    ? history.push("/auth")
                    : history.push("/checkout");
                }}
              >
                go to checkout
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Cart;
