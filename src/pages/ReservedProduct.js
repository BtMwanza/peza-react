import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiLock, FiUnlock, FiShoppingBag, FiCreditCard } from "react-icons/fi";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import firebase from "firebase/app";

import { selectCart } from "./../redux/reducers/CartSlice";
import useStyles from "./../css/style";
import "./../css/App.css";
import Operations from "../components/functions/operations";
import { filterList, searchList, setCurrentProduct } from "./../redux";
import { selectProducts } from "./../redux/reducers/ProductSlice";
import { selectMerchants } from "./../redux/reducers/MerchantSlice";
import { Footer, Pagination } from "./../components";

function ReservedProduct() {
  const cart = useSelector(selectCart);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { products, reservedProducts } = useSelector(selectProducts);
  const db = firebase.firestore().collection("PRODUCTS");
  const reserveDB = firebase.firestore().collection("RESERVED");
  var count = 0;
  const event = new Date();
  const [progress, setProgress] = React.useState(0);
  const [text, setText] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [productPerPage] = React.useState(15);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const breakpointColumnsObj = {
    default: 5,
    1100: 3,
    700: 2,
    500: 2,
  };
  const startDate = Date.now();
  const expiryDate = event.setHours(72);

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "searchInput") {
      setText(value);
      dispatch(searchList(value));
      console.log("TEXT: ", value);
    }
  };

  function countDown(params) {
    setProgress(() => {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
      const diff = expiryDate - startDate;
      console.log("START DATE: ", startDate);
      console.log("END DATE: ", expiryDate);
      console.log("Diff: ", diff);
      console.log("Days: ", Math.floor(diff / day));
      console.log("Hours: ", Math.floor((diff % day) / hour));
      console.log("Minutes: ", Math.floor((diff % hour) / minute));
      console.log("Seconds: ", (diff % minute) / second);
      return Math.floor((diff % hour) / minute);
    });
  }

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(() => {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const diff = expiryDate - startDate;

        console.log("START DATE: ", startDate);
        console.log("END DATE: ", expiryDate);
        console.log("Diff: ", diff);
        console.log("Days: ", Math.floor(diff / day));
        console.log("Hours: ", Math.floor((diff % day) / hour));
        console.log("Minutes: ", Math.floor((diff % hour) / minute));
        console.log("Seconds: ", Math.floor((diff % minute) / second));
        return Math.floor((diff % minute) / second);
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <main>
      <Container className={classes.container}>
        <Grid item xs={12}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {currentProducts.map((item) => {
              const { productID, productName, image, price } = item;
              return (
                <Card key={productID} className="shadow hover-zoom">
                  <Grid
                    item
                    xs
                    direction="column"
                    style={{
                      backgroundColor: "#d1f2eb",
                      minHeight: 110,
                    }}
                  >
                    <div className={classes.img_box}>
                      <img className={classes.img} src={image} />
                    </div>
                    <hr style={{ color: "transparent" }} />
                  </Grid>
                  <Grid>
                    <Typography
                      variant="subtitle2"
                      className="text-center title"
                      gutterBottom
                    >
                      {productName}
                    </Typography>

                    <Typography variant="subtitle1" className="text-center">
                      K{price.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <LinearProgress variant="determinate" value={progress} />
                  </Grid>

                  <CardActions
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton>
                      <FiUnlock color="#00675b" size={20} />
                    </IconButton>
                    <IconButton>
                      <FiCreditCard color="#00675b" size={20} />
                    </IconButton>
                    <IconButton>
                      <FiShoppingBag color="#00675b" size={20} />
                    </IconButton>
                  </CardActions>
                </Card>
              );
            })}
          </Masonry>
        </Grid>

        <Grid item xs={12}>
          <Pagination
            productsPerPage={productPerPage}
            totalProducts={products.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </Grid>
      </Container>
      <Footer />
    </main>
  );
}

export default ReservedProduct;
