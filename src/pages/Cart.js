import React from "react";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase/app";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import {
  FiChevronDown,
  FiChevronUp,
  FiLock,
  FiUnlock,
  FiTrash2,
} from "react-icons/fi";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBBtnGroup,
  MDBBadge,
  MDBCollapse,
  MDBInput,
} from "mdb-react-ui-kit";

import { deleteItem, selectCart } from "./../redux/reducers/CartSlice";
import useStyles from "./../css/style";
import "./../css/App.css";
import Operations from "../components/functions/operations";
import { fetchData } from "./../redux";
import { selectProducts } from "./../redux/reducers/ProductSlice";
import { selectSellers } from "./../redux/reducers/VendorSlice";
import FlutterwaveBtn from "./../lib/flutterwave";

function Cart() {
  const cart = useSelector(selectCart);
  const { vendors } = useSelector(selectSellers);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { products, selectedCategory, categories, mainList } =
    useSelector(selectProducts);
  const db = firebase.firestore().collection("PRODUCTS");
  const [showShow, setShowShow] = React.useState(false);
  const [data, setData] = React.useState({
    products: [],
  });
  const total = Operations.shared.getTotal(cart);

  const toggleShow = () => setShowShow(!showShow);

  return (
    <section style={{ margin: "40px" }}>
      <div className="row">
        {/* Cart */}
        <div className="col-lg-8">
          {/* Card */}
          <div className="mb-3">
            <div className="pt-4 wish-list">
              {cart.map((item, index) => {
                let vendor = Operations.shared.getVendorName(item, vendors);
                return (
                  <div>
                    {item.sold === true ? (
                      <MDBRow className="row mb-4 bg-image">
                        <MDBCol className="col-md-5 col-lg-3 col-xl-3">
                          <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                            <div className={classes.img_box}>
                              <MDBCardImage
                                src={item.image}
                                className="img-fluid img"
                                className={classes.img}
                                alt={item.productName}
                              />
                            </div>
                          </div>
                        </MDBCol>

                        <MDBCol className="col-md-7 col-lg-9 col-xl-9">
                          <div>
                            <div className="d-flex justify-content-between">
                              <div>
                                <h5>{item.productName}</h5>
                                <p className="mb-3 text-muted text-uppercase small">
                                  {item.category}
                                </p>
                                <p className="mb-2 text-muted text-uppercase small">
                                  Color: blue
                                </p>
                                <p className="mb-3 text-muted text-uppercase small">
                                  Sold By: {item.vendorID}
                                </p>
                              </div>
                              <div>
                                <div className="def-number-input number-input safari_only mb-0 w-100">
                                  <MDBBtn onclick="">
                                    <FiChevronDown />
                                  </MDBBtn>
                                  <MDBInput
                                    className="quantity"
                                    min="1"
                                    size="sm"
                                    name="quantity"
                                    value="1"
                                    type="number"
                                  />
                                  <MDBBtn onclick="">
                                    <FiChevronUp />
                                  </MDBBtn>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <MDBBtn
                                  tag="a"
                                  color="none"
                                  type="button"
                                  className="mx-2 text-uppercase"
                                  onClick={() => dispatch(deleteItem(item))}
                                >
                                  <FiTrash2 /> Remove item
                                </MDBBtn>
                                {item.isReserved === undefined || false ? (
                                  <MDBBtn
                                    tag="a"
                                    color="none"
                                    type="button"
                                    className="mx-2 text-uppercase"
                                  >
                                    <FiLock /> Item is reserved
                                  </MDBBtn>
                                ) : (
                                  <MDBBtn
                                    tag="a"
                                    color="none"
                                    type="button"
                                    className="mx-2 text-uppercase"
                                  >
                                    <FiUnlock /> Move to reserve list
                                  </MDBBtn>
                                )}
                              </div>
                              <p className="mb-0">
                                <span>
                                  <strong id="summary">
                                    K{item.price.toFixed(2)}
                                  </strong>
                                </span>
                              </p>
                            </div>
                          </div>
                        </MDBCol>
                        <hr className="mb-4"></hr>
                        <div
                          className="d-flex mask align-items-center"
                          style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
                        >
                          <h1 className="text-white text-center">SOLD</h1>
                        </div>
                      </MDBRow>
                    ) : (
                      <MDBRow className=" mb-4">
                        <MDBCol className="col-md-3 col-lg-3 col-xl-3">
                          <div class="view zoom overlay z-depth-1 rounded mb-2 mb-md-0">
                            <div className={classes.img_box}>
                              <MDBCardImage
                                src={item.image}
                                className="img-fluid img"
                                className={classes.img}
                                alt={item.productName}
                              />
                            </div>
                          </div>
                        </MDBCol>

                        <MDBCol className="col-md-9 col-lg-9 col-xl-9 ">
                          <div>
                            <div className="d-flex justify-content-between">
                              <div>
                                <h5 style={{ width: "360px" }}>
                                  {item.productName}
                                </h5>
                                <p className="mb-3 text-muted  small">
                                  {item.category}
                                </p>

                                <p className="mb-3 text-muted  small">
                                  Sold By: {vendor}
                                </p>
                              </div>
                              <div>
                                <div className="def-number-input number-input safari_only mb-0 w-100">
                                  <MDBBtn onclick="">
                                    <FiChevronUp />
                                  </MDBBtn>
                                  <MDBInput
                                    className="quantity"
                                    size="sm"
                                    name="quantity"
                                    value={item.currentQuantity}
                                    style={{ width: "50px" }}
                                  />

                                  <MDBBtn onclick="">
                                    <FiChevronDown />
                                  </MDBBtn>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <MDBBtn
                                  tag="a"
                                  color="none"
                                  type="button"
                                  className="mx-0 text-uppercase"
                                  onClick={() => dispatch(deleteItem(item))}
                                >
                                  <FiTrash2 size={20} />
                                </MDBBtn>
                                {item.isReserved === undefined || false ? (
                                  <MDBBtn
                                    tag="a"
                                    color="none"
                                    type="button"
                                    className="mx-2 text-uppercase"
                                  >
                                    <FiLock size={20} />
                                  </MDBBtn>
                                ) : (
                                  <MDBBtn
                                    tag="a"
                                    color="none"
                                    type="button"
                                    className="mx-2 text-uppercase"
                                  >
                                    <FiUnlock size={20} />
                                  </MDBBtn>
                                )}
                              </div>
                              <p className="mb-0">
                                <span>
                                  <strong id="summary">
                                    K{item.price.toFixed(2)}
                                  </strong>
                                </span>
                              </p>
                            </div>
                          </div>
                        </MDBCol>
                        <hr className="mb-4"></hr>
                      </MDBRow>
                    )}
                  </div>
                );
              })}

              {/* End cart */}

              <p className="text-primary mb-0">
                <i className="fas fa-info-circle mr-1"></i> Do not delay the
                purchase, adding items to your cart does not mean booking them.
              </p>
            </div>
          </div>

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
              <img
                class="mx-2"
                width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                alt="American Express"
              />
              <img
                class="mx-2"
                width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                alt="Mastercard"
              />
              <img
                class="mx-2"
                width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                alt="PayPal acceptance mark"
              />
            </div>
          </div>
        </div>

        {/*  Right Column*/}
        <div className="col-lg-4">
          {/* Card */}
          <div className="mb-3">
            <div className="pt-4">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Items({cart.length})<span>K{total}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Delivery
                  <span>K{}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Subtotal</strong>
                  </div>
                  <span>
                    <strong>K{total}</strong>
                  </span>
                </li>
              </ul>

              <MDBBtn type="button" className="btn btn-primary btn-block mb-4">
                go to checkout
              </MDBBtn>

              <FlutterwaveBtn />
            </div>
          </div>
          {/* Card */}

          {/* Card */}
          <div className="mb-3">
            <div className="pt-4">
              <p className="dark-grey-text d-flex justify-content-between">
                Add a discount code (optional)
                <MDBBtn tag="a" onClick={toggleShow}>
                  <i className="fas fa-chevron-down pt-1"></i>
                </MDBBtn>
              </p>

              <MDBCollapse show={showShow}>
                <form className="md-form md-outline mb-0">
                  <input
                    type="text"
                    id="discount-code"
                    className="form-control font-weight-light"
                    placeholder="Enter discount code"
                  />
                </form>
              </MDBCollapse>
            </div>
          </div>
          {/* Card */}
        </div>
        {/* Grid column */}
      </div>
    </section>
  );
}

export default Cart;
