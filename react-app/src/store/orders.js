// constants
const SET_CUSTOMER = "orders/SET_CUSTOMER";
const ADD_CUSTOMER = "orders/ADD_CUSTOMER";
// const EDIT_CUSTOMER = "orders/EDIT_CUSTOMER";
const SET_ORDER_DETAILS = "orders/SET_ORDER_DETAILS";
const SET_ORDER_CART = "orders/SET_ORDER_CART";

export const setCustomer = (customer) => ({
  type: SET_CUSTOMER,
  payload: customer,
});

export const addCustomer = (customer) => ({
  type: ADD_CUSTOMER,
  payload: customer,
});

// export const editCustomer = (customer) => ({
//   type: EDIT_CUSTOMER,
//   payload: customer,
// });

export const setOrderDetails = (orderDetails) => ({
  type: SET_ORDER_DETAILS,
  payload: orderDetails,
});

export const setOrderCart = (product) => ({
  type: SET_ORDER_CART,
  payload: product,
});

const initialState = {
  customers: [],
  customer: {
    fullName: "",
    company: "",
    email: "",
    phoneNumber: "",
    address: "",
    address2: "",
    zipCode: "",
    tierLevel: "",
    state: "",
    city: "",
  },
  orderDetails: {
    product: "",
    notes: "",
    quantity: "",
    poJobName: "",
  },
  orderCart: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CUSTOMER:
      return { ...state, customer: action.payload };
    case SET_ORDER_DETAILS:
      return { ...state, orderDetails: action.payload };
    case SET_ORDER_CART:
      return { ...state, orderCart: [...state.orderCart, action.payload] };
    default:
      return state;
  }
}
