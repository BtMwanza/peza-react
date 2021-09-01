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
  save: "Save",
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
  bmwEngine: `require("./../assets/img/bmw-engine.png").default`,
  boschDoubleIriduimSparkPlug:
    require("./../assets/img/bosch-double-iridium-spark-plug.png").default,
  engineValveSprings: require("./../assets/img/engine-valve-springs.png")
    .default,
  exhaustValveKit:
    require("./../assets/img/supertech-inconel-exhaust-valve-kit.png").default,
  boschSparkPlug: require("./../assets/img/bosch-spark-plug.png").default,
  headlights: require("./../assets/img/custom-headlights.png").default,
  notAvailable: require("./../assets/img/not-available.jpg").default,
  carburator: require("./../assets/img/Carburetor-Dellorto.png").default,
  toyotaCorollaHeadlight03_08:
    require("./../assets/img/03-08-toyota-corolla-euro-style-crystal-headlights.png")
      .default,
  falconWilwoodDiscBrake:
    require("./../assets/img/xr-xt-xw-xy-falcon-wilwood-355mm-6-piston-disc-brake.png")
      .default,
  fordInjector:
    require("./../assets/img/2003-2007-ford-industrial-injector.png").default,
  tempAvatar: require("./../assets/img/tempAvatar.jpg").default,

  // ICONS
  engineIcon: "./../assets/img/car-engine.png",
  brakesIcon: "./../assets/img/disc-brake.png",
  headlightIcon: "./../assets/img/headlights-icon.png",
  wireIcon: "./../assets/img/wire.png",
  tyreIcon: "./../assets/img/tyre.png",
  batteryIcon: "./../assets/img/accumulator.png",

  // LOGO
  logo: require("./../assets/img/artboard.png").default,
  header: require("./../assets/img/julian-hochgesang-1PsOu8gyZIQ-unsplash.jpg")
    .default,
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
