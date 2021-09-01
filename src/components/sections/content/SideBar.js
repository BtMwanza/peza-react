import React from "react";
import { useSelector, useDispatch } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { MDBInput, MDBInputGroup } from "mdb-react-ui-kit";

import { selectCart } from "./../../../redux/reducers/CartSlice";
import { selectMerchants } from "./../../../redux/reducers/MerchantSlice";
import { selectProducts } from "./../../../redux/reducers/ProductSlice";
import useStyles from "./../../../css/style";
import "./../../../css/App.css";
import Cars from "./../../../lib/cars.json";
import Merchants from "./../../../lib/merchants.json";
import {
  filterList,
  searchList,
  setMerchantID,
  setCurrentProduct,
  filterMerchants,
  filterMake,
  filterModel,
  filterPrice,
} from "./../../../redux";

function SideBar() {
  const cart = useSelector(selectCart);
  const { merchants } = useSelector(selectMerchants);
  const { products, amounts, mainList } = useSelector(selectProducts);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [text, setText] = React.useState("");
  var minAmount = Number.POSITIVE_INFINITY;
  var maxAmount = Number.NEGATIVE_INFINITY;
  const [range, setRange] = React.useState([0, 20000]);
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(20000);
  const [make, setMake] = React.useState("");
  const [model, setModel] = React.useState("");
  const [merchant, setMerchant] = React.useState("");
  const [openMake, setOpenMake] = React.useState(false);
  const [openModel, setOpenModel] = React.useState(false);
  const [openMerchant, setOpenMerchant] = React.useState(false);
  const [minRange, maxRange] = range;

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "searchInput") {
      setText(value);
      dispatch(searchList(value));
      console.log("TEXT: ", value);
    }
  };

  const handleMakeChange = (event) => {
    setMake(event.target.value);
  };

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const handleMerchantChange = (event) => {
    setMerchant(event.target.value);
  };

  const handleMakeOpen = () => {
    setOpenMake(true);
  };

  const handleModelOpen = () => {
    setOpenModel(true);
  };

  const handleMerchantOpen = () => {
    setOpenMerchant(true);
  };

  const handleMakeClose = () => {
    setOpenMake(false);
  };

  const handleModelClose = () => {
    setOpenModel(false);
  };

  const handleMerchantClose = () => {
    setOpenMerchant(false);
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
          <div>
            <div className={classes.search}>
              <InputBase
                fullWidth
                name="searchInput"
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                value={text}
                onChange={onChangeHandler}
              />
            </div>
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

            <FormControl className={classes.formControl}>
              <InputLabel id="model-controlled-open-select-label">
                Select merchant
              </InputLabel>
              <Select
                labelId="model-controlled-open-select-label"
                id="model-controlled-open-select"
                name="model"
                open={openMerchant}
                onClose={handleMerchantClose}
                onOpen={handleMerchantOpen}
                value={merchant}
                onChange={handleMerchantChange}
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                {Merchants.map((item) => {
                  const { idx, title, id } = item;
                  return (
                    <MenuItem
                      onClick={() => dispatch(filterMerchants(id))}
                      key={idx}
                      value={title}
                    >
                      {title}
                    </MenuItem>
                  );
                })}
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
