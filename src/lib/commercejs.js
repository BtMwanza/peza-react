import Commerce from "@chec/commerce.js";

export const btCommerce = new Commerce(process.env.REACT_APP_COMMERCE_API_KEY);
export const ltCommerce = new Commerce(process.env.REACT_APP_LT_AUTO_PARTS_API_KEY);

