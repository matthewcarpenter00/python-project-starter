export const createOrderItemDto = (orderId, orderItems) => {
  return orderItems.map(({ id, notes, quantity }) => ({
    orderId: parseInt(orderId),
    productId: parseInt(id),
    quantity: parseInt(quantity),
    notes,
  }));
};
