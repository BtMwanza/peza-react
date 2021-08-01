import React from "react";
import { useSelector, useDispatch } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import {
  MDBRange,
  MDBCheckbox,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBInputGroup,
} from "mdb-react-ui-kit";

import { selectCart } from "./../../redux/reducers/CartSlice";
import { selectSellers } from "./../../redux/reducers/VendorSlice";
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
  var cars = [
    {
      idx: 0,
      make: "BMW",
      models: [
        { key: "0", model: "X1" },
        { key: "1", model: "X2" },
        { key: "2", model: "X3" },
        { key: "3", model: "X3 M" },
        { key: "4", model: "X4" },
        { key: "5", model: "X4 M" },
        { key: "6", model: "X5" },
        { key: "7", model: "X5 M" },
        { key: "8", model: "X6" },
        { key: "9", model: "X6 M" },
        { key: "10", model: "X7" },
        { key: "11", model: "3 Series" },
        { key: "12", model: "5 Series" },
        { key: "13", model: "7 Series" },
        { key: "14", model: "M3" },
        { key: "15", model: "M5" },
        { key: "16", model: "i3" },
        { key: "17", model: "2 Series Gran Coupe" },
        { key: "18", model: "BMW 4 Series Coupe" },
        { key: "19", model: "4 Series Gran Coupe" },
        { key: "20", model: "8 Series Coupe" },
        { key: "21", model: "8 Series Gran Coupe" },
        { key: "22", model: "M2 Competition Coupe" },
        { key: "23", model: "M4 Coupe" },
        { key: "24", model: "M8 Competition Coupe" },
        { key: "25", model: "M8 Competition Gran Coupe" },
      ],
    },
    {
      idx: 1,
      make: "Toyota",
      models: [
        { key: "0", model: "Corolla" },
        { key: "1", model: "Corolla Hybrid" },
        { key: "2", model: "Corolla Hatchback" },
        { key: "3", model: "Prius" },
        { key: "4", model: "Prius Prime" },
        { key: "5", model: "Camry" },
        { key: "6", model: "Camry Hybrid" },
        { key: "7", model: "Avalon" },
        { key: "8", model: "Avalon Hybrid" },
        { key: "9", model: "Mirai" },
        { key: "10", model: "86" },
        { key: "11", model: "GR Supra" },
      ],
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "make") {
      setMake(value);
      console.log("MAKE: ", value);
    } else if (name === "model") {
      setModel(value);
      console.log("MODEL: ", value);
    }
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
    console.log("CARS: ", cars);
  }, []);

  return (
    <>
      <section
        className="col-lg-3"
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

            <h5>Vehicle</h5>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">
                Select make
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                name="make"
                open={openMake}
                onClose={handleMakeClose}
                onOpen={handleMakeOpen}
                value={make}
                onChange={(event) => handleChange(event)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {cars.map((item) => (
                  <MenuItem
                    key={(item) => item.idx.toString()}
                    value={item.make}
                  >
                    {item.make}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">
                Select model
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                name="model"
                open={openModel}
                onClose={handleModelClose}
                onOpen={handleModelOpen}
                value={model}
                onChange={(event) => handleChange(event)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {cars.map((item) => (
                  <div>
                    {item.models.map((car) => (
                      <MenuItem key={(car) => car.key} value={car.model}>
                        {car.model}
                      </MenuItem>
                    ))}
                  </div>
                ))}
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
