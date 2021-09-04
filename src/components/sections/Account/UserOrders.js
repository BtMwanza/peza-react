import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import moment from "moment";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import DeleteIcon from "@material-ui/icons/Delete";
import FolderIcon from "@material-ui/icons/Folder";

import useStyles from "../../../css/style";
import "./../../../css/App.css";
import { selectProducts } from "./../../../redux/reducers/ProductSlice";
import { setCurrentTransaction } from "./../../../redux";

function UserOrders(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { children, value, index, ...other } = props;
  const { transactions, currentTransaction } = useSelector(selectProducts);
  const delivery = "K0.00";
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, item, index) => {
    setSelectedIndex(index);
    dispatch(setCurrentTransaction(item));
  };

  return (
    <Container
      className={classes.container}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Grid container>
        <Grid item>
          <Typography variant="h5">My Orders</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Orders Information</Typography>
          <hr />
        </Grid>

        <Grid container item>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper2}>
              <List className={classes.listRoot}>
                {transactions.map((item, index) => {
                  const { txnRef, date } = item;
                  return (
                    <ListItem
                      button
                      selected={selectedIndex === index}
                      onClick={(event) =>
                        handleListItemClick(event, item, index)
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>

                      <ListItemText
                        primary={txnRef}
                        secondary={moment(date).format("lll")}
                      />

                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid xs={12}>
              <Typography variant="h6" className="text-center">
                Transaction/{currentTransaction.txnRef}
              </Typography>
            </Grid>
            {currentTransaction !== {} && (
              <div>
                <Grid className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  <Typography>Name</Typography>
                  <Typography>{currentTransaction.customer.name}</Typography>
                </Grid>
                <Grid className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  <Typography>Phone</Typography>
                  <Typography>
                    {currentTransaction.customer.phoneNumber}
                  </Typography>
                </Grid>
                <Grid className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  <Typography>Date</Typography>
                  <Typography>
                    {moment(currentTransaction.date).format("lll")}
                  </Typography>
                </Grid>
                <Grid className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  <Typography>Total</Typography>
                  <Typography>K{currentTransaction.totalPrice}</Typography>
                </Grid>
                <Grid className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  <Typography>Delivery</Typography>
                  <Typography>{delivery}</Typography>
                </Grid>
                <Grid className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  <Typography>
                    {currentTransaction.cartRecord.length}
                    Items bought
                  </Typography>
                </Grid>

                {currentTransaction.cartRecord.map((item) => {
                  const { productID, productName, price } = item;
                  return (
                    <Grid
                      key={productID}
                      className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"
                    >
                      <Typography variant="subtitle2">{productName}</Typography>
                      <Typography variant="subtitle2">
                        K{price.toFixed(2)}
                      </Typography>
                    </Grid>
                  );
                })}
              </div>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserOrders;
