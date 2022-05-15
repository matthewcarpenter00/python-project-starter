import { useState, useEffect } from "react";

export const useOrderProduct = () => {
  const [product, setProduct] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");

  const [totalOrderAmount, setTotalOrderAmount] = useState(0);
  useEffect(() => {
    const currentTotalOrderPrice = calculateOrderTotalPrice(orderProducts);
    setTotalOrderAmount(currentTotalOrderPrice);
  }, [orderProducts]);

  const calculateOrderTotalPrice = (orderProducts) => {
    let totalPrice = orderProducts.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0);

    return totalPrice;
  };

  return {
    orderProducts,
    product,
    quantity,
    price,
    notes,
    totalOrderAmount,
    setTotalOrderAmount,
    setProduct,
    setOrderProducts,
    setQuantity,
    setPrice,
    setNotes,
  };
};
