import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  nav_root: {
    flexGrow: 1,
  },
  root: {
    width: 300,
  },
  container: {
    background: "#ffffdf",
    flex: 1,
  },
  icon: {
    marginRight: "20px",
  },
  button: {},
  paper: {
    width: 160,
    height: 219,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  img_box: {
    height: 100,
    width: "100%",
    objectFit: "contain",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
  img_details: {
    height: 400,
    width: "100%",
    objectFit: "contain",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  nav_left: {
    position: "absolute",
    borderRadius: theme.shape.borderRadius,
    right: 0,
    marginRight: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(1),
      width: "auto",
    },
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    marginBottom: theme.spacing(4),
    width: "100%",
    minWidth: 150,
  },
  priceForm: {
    maxWidth: 100,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  root2: {
    flexGrow: 1,
  },
  paper2: {
    width: 160,
    height: 220,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  mediaContainer: {
    height: 100,
    width: "100%",
    objectFit: "contain",
    alignItems: "center",
    justifyContent: "center",
  },
  media: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
  card: {
    width: 160,
    padding: theme.spacing(1),
    margin: theme.spacing(0.2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  btns: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export default useStyles;
