import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";

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
  setVendorID,
  setCurrentProduct,
  setSimilarProducts,
} from "./../../redux";

function ImageSection() {
  const cart = useSelector(selectCart);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showBasic, setShowBasic] = React.useState(false);
  const { products, selectedCategory, categories, mainList } =
    useSelector(selectProducts);

  return (
    <div className={classes.imageRoot}>
      <ImageList className={classes.imageList} cols={5}>
        {products.map((item) => {
          const { image, productName } = item;
          return (
            <ImageListItem key={image}>
              <img src={image} alt={productName} />
              <ImageListItemBar
                title={productName}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <IconButton aria-label={`star ${productName}`}>
                    <StarBorderIcon className={classes.title} />
                  </IconButton>
                }
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    </div>
  );
}

export default ImageSection;
