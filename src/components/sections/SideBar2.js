import React from "react";
import { useSelector, useDispatch } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import ButtonBase from "@material-ui/core/ButtonBase";
import { MDBInput, MDBInputGroup } from "mdb-react-ui-kit";

import { selectCart } from "./../../redux/reducers/CartSlice";
import { selectSellers } from "./../../redux/reducers/VendorSlice";
import { selectProducts } from "./../../redux/reducers/ProductSlice";
import Operations from "../functions/operations";
import useStyles from "./../../css/style";
import "./../../css/App.css";
import Cars from "./../../lib/cars.json";
import {
  filterList,
  searchList,
  fetchData,
  setVendorID,
  setCurrentProduct,
} from "./../../redux";

function SideBar() {
  const cart = useSelector(selectCart);
  const { vendors } = useSelector(selectSellers);
  const { products, amounts, mainList } = useSelector(selectProducts);
  const classes = useStyles();
  const dispatch = useDispatch();
  var minAmount = Number.POSITIVE_INFINITY;
  var maxAmount = Number.NEGATIVE_INFINITY;
  const [range, setRange] = React.useState([0, 20000]);
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(20000);
  const [make, setMake] = React.useState("");
  const [model, setModel] = React.useState("");
  const [openMake, setOpenMake] = React.useState(false);
  const [openModel, setOpenModel] = React.useState(false);
  const [minRange, maxRange] = range;

  const handleMakeChange = (event) => {
    setMake(event.target.value);
    console.log("MAKE: ", event.target.value);
  };

  const handleModelChange = (event) => {
    setModel(event.target.value);
    console.log("MODEL: ", event.target.value);
  };

  const handleMakeOpen = () => {
    setOpenMake(true);
  };

  const handleModelOpen = () => {
    setOpenModel(true);
  };

  const handleMakeClose = () => {
    setOpenMake(false);
  };

  const handleModelClose = () => {
    setOpenModel(false);
  };

  const onPriceRangeChange = (event, newValue) => {
    setRange(newValue);
  };

  function valuetext(range) {
    return `K${range}`;
  }

  function minMaxPrices() {
    var temp;

    for (var i = products.length - 1; i >= 0; i--) {
      temp = products[i].price;
      if (temp < minAmount) minAmount = temp;
      if (temp > maxAmount) maxAmount = temp;
    }
  }
  React.useEffect(() => {
    minMaxPrices();
    setMinPrice(minAmount);
    setMaxPrice(maxAmount);
  }, []);

  return (
    <>
      <section
        style={{ padding: "20px", borderColor: "black", borderWidth: "2px" }}
      >
        {/* Card */}
        <div className="mb-3">
          <h3>Filters</h3>
          <div className="pt-4">
            <Typography id="range-slider" gutterBottom>
              Price range
            </Typography>
            <Slider
              value={range}
              min={minPrice}
              max={maxPrice}
              onChange={onPriceRangeChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
            />

            <MDBInputGroup>
              <MDBInput
                value={"K" + minRange}
                size="sm"
                className={classes.priceForm}
              />
              <MDBInput
                value={"K" + maxRange}
                size="sm"
                className={classes.priceForm}
              />
            </MDBInputGroup>

            <FormControl className={classes.formControl}>
              <InputLabel id="make-controlled-open-select-label">
                Select make
              </InputLabel>
              <Select
                labelId="make-controlled-open-select-label"
                id="make-controlled-open-select"
                name="make"
                open={openMake}
                onClose={handleMakeClose}
                onOpen={handleMakeOpen}
                value={make}
                onChange={handleMakeChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Cars.map((item) => (
                  <MenuItem key={item.value} value={item.title}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel id="model-controlled-open-select-label">
                Select model
              </InputLabel>
              <Select
                labelId="model-controlled-open-select-label"
                id="model-controlled-open-select"
                name="model"
                open={openModel}
                onClose={handleModelClose}
                onOpen={handleModelOpen}
                value={model}
                onChange={handleModelChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Cars.map((item) =>
                  item.models.map((car) => (
                    <MenuItem key={car.value} value={car.title}>
                      {car.title}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </div>
        </div>
        {/* Card */}
      </section>
    </>
  );
}

export default SideBar;
