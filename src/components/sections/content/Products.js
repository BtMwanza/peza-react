import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

import useStyles from "./../../../css/style";
import "./../../../css/App.css";
import {
  addItem,
  deleteItem,
  setmerchantID,
  setCurrentProduct,
  setUser,
} from "./../../../redux";
import { selectCart } from "./../../../redux/reducers/CartSlice";
import { selectProducts } from "./../../../redux/reducers/ProductSlice";
import { fetchMerchant } from "./../../../redux/reducers/MerchantSlice";

import SideBar from "./SideBar";
import Categories from "./Categories";
import Pagination from "../navigation/Pagination";

function Explore() {
  const cart = useSelector(selectCart);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { products } = useSelector(selectProducts);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [productPerPage] = React.useState(16);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Categories />
        </Grid>

        {/* Sidebar grid */}
        <Grid item xs={12} md={3} sm={6}>
          <Paper>
            <SideBar />
          </Paper>
        </Grid>

        {/* Products grid */}
        <Grid container item xs={12} md={9} spacing={0}>
          {currentProducts.map((item) => {
            const { image, productName, price, category, year, productID } =
              item;
            return (
              <Grid item xs={12} md={3} sm={6} lg={3}>
                <Paper
                  className="card-background shadow hover-zoom"
                  key={productID}
                >
                  <Grid
                    item
                    xs
                    direction="column"
                    style={{
                      backgroundColor: "#d1f2eb",
                      minHeight: 210,
                    }}
                  >
                    <Link to={`/product/${productID}`}>
                      <div
                        className={classes.image2}
                        onClick={() => {
                          dispatch(setCurrentProduct(item));
                          dispatch(fetchMerchant(item.merchantID));
                        }}
                      >
                        <img
                          className={classes.imgFit}
                          alt={productName}
                          src={image}
                        />
                      </div>
                      {year !== "" ? (
                        <Chip label={year} size="small" color="secondary" />
                      ) : (
                        <div></div>
                      )}
                    </Link>
                  </Grid>

                  <Grid item xs container direction="column">
                    <Grid item xs className={classes.detailsGrid}>
                      <Typography variant="subtitle2" className="title">
                        {productName}
                      </Typography>
                      <Typography variant="caption">{category}</Typography>
                      <Typography variant="subtitle2" gutterBottom>
                        K{price}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      style={{
                        backgroundColor: "#bfc9ca",
                      }}
                    ></Grid>
                  </Grid>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={12}>
          <Pagination
            productsPerPage={productPerPage}
            totalProducts={products.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Explore;
