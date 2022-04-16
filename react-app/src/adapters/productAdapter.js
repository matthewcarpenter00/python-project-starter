export const productSelectOptions = (products) => {
  return products.map((product) => ({
    value: product,
    label: product.name,
  }));
};
