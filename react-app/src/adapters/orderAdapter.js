export const createOrderDto = (order) => {
  return {
    docNumber: order.poName,
    totalAmount: order.totalOrderAmount,
    invoiceNumber: parseInt(order.invoiceNumber),
    poName: order.poName,
    shippingRoute: order.route.value,
    orderStatus: order.orderStatus.value,
    staffId: 1,
    customerId: order.customer.value.id,
  };
};
