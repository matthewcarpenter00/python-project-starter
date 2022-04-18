export const createOrderItemDto = (orderId, orderItems) => {
  return orderItems.map(({ id, notes, quantity }) => ({
    orderId: orderId,
    productId: id,
    quantity: parseInt(quantity),
    notes,
  }));
};
