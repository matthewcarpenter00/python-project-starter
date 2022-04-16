export const createCustomerDto = (customer) => {
  return {
    name: customer.fullName,
    phone: customer.phoneNumber,
    email: customer.email,
    tierLevel: customer.tierLevel,
    company: customer.company,
    address: customer.address,
    address2: customer.address2,
    city: customer.city,
    state: customer.state,
    zipCode: customer.zipCode
  };
};
