export const createCustomerDto = (customer) => {
  return {
    name: customer.fullName,
    phone: customer.phone,
    email: customer.email,
    tierLevel: customer.tierLevel,
    company: customer.company,
    address: customer.address,
    address2: customer.address2,
    city: customer.city,
    state: customer.state,
    zipCode: parseInt(customer.zipCode),
  };
};

export const customerSelectOptions = (customers) => {
  return customers.map((customer) => ({
    value: customer,
    label: customer.name,
  }));
};
