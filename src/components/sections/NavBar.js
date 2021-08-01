import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBCollapse,
  MDBBadge,
} from "mdb-react-ui-kit";

import { selectCart } from "./../../redux/reducers/CartSlice";
import { fetchVendor } from "./../../redux/reducers/VendorSlice";
import { fetchCurrentUser } from "./../../redux/reducers/AuthSlice";
import { selectProducts } from "./../../redux/reducers/ProductSlice";
import Operations from "../functions/operations";
import useStyles from "./../../css/style";
import "./../../css/App.css";
import {
  filterList,
  searchList,
  fetchData,
  setVendorID,
  setCurrentProduct,
} from "./../../redux";

function NavBar() {
  const cart = useSelector(selectCart);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { products, selectedCategory, categories, mainList, searchText } =
    useSelector(selectProducts);
  const [showBasic, setShowBasic] = useState(false);

  return (
    <MDBNavbar expand="lg" dark bgColor="dark">
      <MDBContainer fluid>
        <MDBNavbarBrand href="/">PEZA</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current="page" href="/">
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink href="/explore">Explore</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              {/* <MDBNavbarLink
                disabled
                href="/reserved_products"
                tabIndex={-1}
                aria-disabled="true"
              >
                Reserved
              </MDBNavbarLink> */}
              <MDBNavbarLink href="/reserved_products">Reserved</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/auth">Auth</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link">
                  Dropdown
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <MDBDropdownLink>Action</MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink>Another action</MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink>Something else here</MDBDropdownLink>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <MDBNavbarItem className="d-flex w-auto">
            <MDBNavbarLink href="/cart">
              <FiShoppingCart size={25} color="#00675b" />
              <MDBBadge notification pill color="danger" size="md">
                {cart.length}
              </MDBBadge>
            </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem className="d-flex w-auto">
            <MDBNavbarLink href="/cart">
              <FiUser size={25} color="#00675b" />
            </MDBNavbarLink>
          </MDBNavbarItem>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default NavBar;
