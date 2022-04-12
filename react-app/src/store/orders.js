// constants
const SET_CUSTOMER = "session/SET_CUSTOMER";

export const setCustomer = (customer) => ({
  type: SET_CUSTOMER,
  payload: customer,
});

export const setOrderDetails = (orderDetails) => ({
  type: SET_ORDER_DETAILS,
  payload: orderDetails,
});

export const setOrderCart = (product) => ({
  type: SET_ORDER_CART,
  payload: product,
});

const initialState = {
  customer: {
    fullName: "",
    company: "",
    tierLevel: "",
    email: "",
    phoneNumber: "",
    address: "",
    unit: "",
    zipCode: "",
  },
  orderDetails: {
    product: "",
    notes: "",
    quantity: "",
    poJobName: "",
  },
  orderCart: [],
};
// (add customer page)

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CUSTOMER:
      return { customer: action.payload };
    default:
      return state;
  }
}
