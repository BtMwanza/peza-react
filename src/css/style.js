import { alpha, makeStyles } from "@material-ui/core/styles";

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
  // Prominent navbar
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navTitle: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    flexDirection: "row",
  },
  navLink: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    flexDirection: "row",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },

  // Drawer
  list: {
    width: 250,
  },
  listItem: { color: "#ffffff" },
  fullList: {
    width: "auto",
    backgroundColor: "blue",
  },
  // End Drawer

  icon: {
    marginRight: "20px",
  },
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

  // Product Display
  root2: {
    flexGrow: 1,
  },
  paper2: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: "none",
    color: theme.palette.text.secondary,
  },

  // Product Image
  image2: {
    width: "100%",
    height: 180,
    borderColor: "#000000",
    borderWidth: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  imgFit: {
    margin: "auto",
    display: "block",
    maxWidth: "80%",
    maxHeight: "80%",
    //objectFit: "contain",
  },
  detailsGrid: {
    padding: theme.spacing(1),
  },
  categoryRoot: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  cartImage: {
    width: 128,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  cartImg: {
    margin: "auto",
    display: "block",
    maxWidth: "80%",
    maxHeight: "80%",
  },
}));

export default useStyles;
