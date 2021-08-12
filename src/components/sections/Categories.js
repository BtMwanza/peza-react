import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

import { selectProducts } from "./../../redux/reducers/ProductSlice";
import useStyles from "./../../css/style";
import "./../../css/App.css";
import { filterList } from "./../../redux";
import ProductCategories from "./../../lib/categories.json";

function Categories() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector(selectProducts);

  return (
    <div className={classes.categoryRoot}>
      {ProductCategories.map((item, index) => {
        const { category, icon } = item;
        return (
          <Chip
            style={{
              opacity: index === selectedCategory ? 1 : 0.5,
              fontWeight: 500,
              fontSize: 13,
              margin: 3,
              backgroundColor: "#00675b",
            }}
            color="primary"
            avatar={<Avatar alt={category} src={icon} />}
            label={category}
            onClick={() => {
              dispatch(filterList(index));
            }}
          ></Chip>
        );
      })}
    </div>
  );
}

export default Categories;
