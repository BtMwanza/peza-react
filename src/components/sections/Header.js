import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Masonry from "react-masonry-css";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import Carousel from "react-material-ui-carousel";

import useStyles from "./../../css/style";
import "./../../css/App.css";
import HEADER1 from "./../../assets/img/julian-hochgesang-1PsOu8gyZIQ-unsplash.jpg";
import HEADER2 from "./../../assets/img/ciel-cheng-LzCjv1fsCk8-unsplash.jpg";
import HEADER3 from "./../../assets/img/kool-c-GUkCocksjK8-unsplash.jpg";
import HEADER4 from "./../../assets/img/robert-laursoo-WHPOFFzY9gU-unsplash.jpg";
import HEADER5 from "./../../assets/img/arteum-ro-KiTalJFRkcg-unsplash.jpg";
import HEADER6 from "./../../assets/img/sergio-rota-WpacMzph6vQ-unsplash.jpg";
import HEADER7 from "./../../assets/img/wade-lambert-1JMDhJB3F3Y-unsplash.jpg";
import HEADER8 from "./../../assets/img/joshua-naidoo-oNnl9IYzbug-unsplash.jpg";

function Header() {
  const classes = useStyles();
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      image: HEADER5,
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      image: HEADER6,
    },
    {
      name: "Random Name #3",
      description: "Hello World!",
      image: HEADER7,
    },
    {
      name: "Random Name #3",
      description: "Hello World!",
      image: HEADER8,
    },
  ];

  var items2 = [
    {
      name: "Random Name #1",
      image: HEADER1,
    },
    {
      name: "Random Name #2",
      image: HEADER2,
    },
    {
      name: "Random Name #3",
      image: HEADER3,
    },
    {
      name: "Random Name #4",
      image: HEADER4,
    },
  ];

  return (
    <Grid container spacing={0}>
      <Grid container item xs={12} sm={12} md={9}>
        <Grid item xs={12}>
          <Paper className={classes.paperHeader}>
            <Carousel indicators={false} animation="slide" autoPlay={true}>
              {items2.map((item, i) => {
                const { image } = item;
                return (
                  <div
                    className="p-5 text-center bg-image"
                    style={{
                      backgroundImage: `url(` + image + `)`,
                      height: 535,
                    }}
                    key={image}
                  >
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                    >
                      <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-white">
                          <Typography variant="h3">Heading </Typography>
                          <Typography variant="h6">Subheading</Typography>

                          <a
                            className="btn btn-outline-light btn-lg"
                            href="#!"
                            role="button"
                          >
                            Call to action
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </Paper>
        </Grid>
      </Grid>

      <Grid container item xs md={3} sm={12}>
        <Grid item xs={12}>
          <Carousel indicators={false} animation="fade" autoPlay={true}>
            {items.map((item, i) => {
              const { image, name, description } = item;
              return (
                <Paper className={classes.paperHeader}>
                  <div
                    className="p-5 text-center bg-image"
                    style={{
                      backgroundImage: `url(` + image + `)`,
                      height: 250,
                      objectFit: "contain",
                    }}
                    key={image}
                  >
                    <div className="text-white">
                      <h2>{name}</h2>
                      <p>{description}</p>
                    </div>

                    <a
                      className="btn btn-outline-light btn-lg"
                      href="#!"
                      role="button"
                    >
                      Check it out!
                    </a>
                  </div>
                </Paper>
              );
            })}
          </Carousel>
        </Grid>
        <Grid item xs={12}>
          <Carousel indicators={false} animation="fade" autoPlay={true}>
            {items.map((item, i) => {
              const { image, name, description } = item;
              return (
                <Paper className={classes.paperHeader}>
                  <div
                    className="p-5 text-center bg-image"
                    style={{
                      backgroundImage: `url(` + image + `)`,
                      height: 250,
                      objectFit: "contain",
                    }}
                    key={image}
                  >
                    <div className="text-white">
                      <h2>{name}</h2>
                      <p>{description}</p>
                    </div>

                    <a
                      className="btn btn-outline-light btn-lg"
                      href="#!"
                      role="button"
                    >
                      Check it out!
                    </a>
                  </div>
                </Paper>
              );
            })}
          </Carousel>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Header;
