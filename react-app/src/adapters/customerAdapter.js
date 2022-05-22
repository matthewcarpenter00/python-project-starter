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
    quickbooksId: customer.quickBooksId,
  };
};

export const customerSelectOptions = (customers) => {
  return customers.map((customer) => ({
    value: customer,
    label: customer.company,
  }));
};

export const editCustomerDto = (customer) => {
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

export const createQuickbooksCustomerDto = (customer) => {
  return {
    PrimaryEmailAddr: {
      Address: customer.email,
    },
    DisplayName: customer.name,
    PrimaryPhone: {
      FreeFormNumber: customer.phone,
    },
    CompanyName: customer.company,
    BillAddr: {
      CountrySubDivisionCode: customer.state,
      City: customer.city,
      PostalCode: customer.zipCode,
      Line1: customer.address,
    },
    GivenName: customer.name,
  };
};
