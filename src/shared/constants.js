import { Dimensions } from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export const TITLES = {
  login: "Sign in",
  register: "Sign up",
  confirm: "Confirm user",
  forget: "Forget password",
  newPassword: "New password",
};

export const MESSAGES = {
  forget: "Forget password ?",
  register: "Create an account",
  already: "Already a member ?",
};

export const BUTTONS = {
  login: "Sign in",
  logout: "Sing out",
  code: "Send code",
  confirm: "Confirm",
  send: "Send code",
  register: "Register",
  resend: "Resend code",
  cart: "Add to cart",
  pay: "Pay",
  proceed: "Proceed",
  buy: "Buy Now",
  checkout: "Checkout",
};

export const PLACEHOLDERS = {
  username: "Username",
  fullname: "Full Name",
  password: "Password",
  confirmPassword: "Password",
  code: "Confirmation code",
  oldPassword: "Old password",
  newPassword: "New password",
  email: "Email",
  phone: "260999000000",
  address: "Address",
};

export const ROUTES = {
  auth: "Auth",
  app: "App",
  home: "Home",
  loader: "Loading",
  profile: "Profile",
  register: "Register",
  login: "Login",
  explore: "Explore",
  settings: "Settings",
  filterResult: "FilteredProducts",
  cart: "Cart",
  checkout: "Checkout",
  map: "Map",
  productDetails: "ProductDetails",
  editProfile: "UpdateProfile",
  vendor: "VendorInfo",
  transactions: "Transactions",
  transactionDetails: "TransactionDetails",
  summary: "Summary",
  payment: "Payment",
  reserved: "ReservedProducts",
  reviews: "Reviews",
};

export const IMAGES = {
  bmwEngine: require("./../../img/bmw-engine.png"),
  boschDoubleIriduimSparkPlug: require("./../../img/bosch-double-iridium-spark-plug.png"),
  engineValveSprings: require("./../../img/engine-valve-springs.png"),
  exhaustValveKit: require("./../../img/supertech-inconel-exhaust-valve-kit.png"),
  boschSparkPlug: require("./../../img/bosch-spark-plug.png"),
  headlights: require("./../../img/custom-headlights.png"),
  notAvailable: require("./../../img/not-available.jpg"),
  carburator: require("./../../img/Carburetor-Dellorto.png"),
  toyotaCorollaHeadlight03_08: require("./../../img/03-08-toyota-corolla-euro-style-crystal-headlights.png"),
  falconWilwoodDiscBrake: require("./../../img/xr-xt-xw-xy-falcon-wilwood-355mm-6-piston-disc-brake.png"),
  fordInjector: require("./../../img/2003-2007-ford-industrial-injector.png"),
  tempAvatar: require("./../../img/tempAvatar.jpg"),

  // ICONS
  engineIcon: require("./../../img/car-engine.png"),
  brakesIcon: require("./../../img/disc-brake.png"),
  headlightIcon: require("./../../img/headlights-icon.png"),
  wireIcon: require("./../../img/wire.png"),
  tyreIcon: require("./../../img/tyre.png"),
  batteryIcon: require("./../../img/accumulator.png"),

  // LOGO
  logo: require("./../../img/artboard.png"),
};

export const SIZES = {
  // global SIZES
  base: 4,
  radius: 8,
  padding: 12,
  font: 14,
  cardWidth: 160,
  cardHeight: 219,

  // font SIZES
  navTitle: 24,
  h1: 24,
  h2: 22,
  h3: 18,
  h4: 16,
  h5: 14,
  h6: 12,
  body1: 24,
  body2: 20,
  body3: 18,
  body4: 16,
  body5: 14,
  body6: 12,
  body7: 10,
  body8: 8,

  // app dimensions
  WIDTH,
  HEIGHT,
};

export const FONTS = {
  navTitle: { fontFamily: "KoHo-Bold", fontSize: SIZES.navTitle },
  largeTitleBold: { fontFamily: "KoHo-SemiBold", fontSize: SIZES.h2 },
  h1: { fontFamily: "KoHo-SemiBold", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "KoHo-SemiBold", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "KoHo-SemiBold", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "KoHo-SemiBold", fontSize: SIZES.h4, lineHeight: 22 },
  h5: { fontFamily: "KoHo-SemiBold", fontSize: SIZES.h5, lineHeight: 22 },
  body1: {
    fontFamily: "KoHo-Regular",
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: "KoHo-Regular",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: "KoHo-Regular",
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: "KoHo-Regular",
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: "KoHo-Regular",
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
  body6: {
    fontFamily: "KoHo-Regular",
    fontSize: SIZES.body6,
    lineHeight: 22,
  },
  body7: {
    fontFamily: "KoHo-Regular",
    fontSize: SIZES.body7,
  },
  body8: {
    fontFamily: "KoHo-Regular",
    fontSize: SIZES.body8,
  },
};
