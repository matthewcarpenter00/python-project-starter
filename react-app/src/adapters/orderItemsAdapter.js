export const createOrderItemDto = (orderId, orderItems) => {
  console.log(orderItems);
  return orderItems.map(({ id, notes, quantity }) => ({
    orderId: parseInt(orderId),
    productId: parseInt(id),
    quantity: parseInt(quantity),
    notes,
  }));
};
