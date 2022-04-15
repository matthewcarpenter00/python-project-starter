import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { useState } from "react";
import { useHistory } from "react-router";
import Select from "react-select";

// redux and custom hook imports
import { useForm } from "../../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { setCustomer } from "../../../store/orders";
import { createCustomerDto } from "../../../adapters/customerAdapter";

export const DashboardAddCustomer = ({ user, userId }) => {
  const history = useHistory();

  // hooks and redux
  const customer = useSelector((state) => state.orders.customer);
  const dispatch = useDispatch();
  const [formValues, handleInputChange, reset] = useForm(customer);
  const [validated, setValidated] = useState(false);
  const [tierLevel, setTierLevel] = useState(null);
  const [state, setState] = useState(null);

  // data
  const {
   name,
   phone,
   email,
   company,
   address,
   address2,
   city,
   zipCode
  } = formValues;

  const tierLevels = [
    { value: "1", label: "A" },
    { value: "2", label: "B" },
    { value: "3", label: "C" },
	  { value: "3", label: "D" },
	  { value: "3", label: "E" },
  ];
  const states = [
    { value: "FL", label: "FL" },
    { value: "GA", label: "GA" },
  ];

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    // validations
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      createCustomer({
        ...formValues,
        tierLevel: tierLevel.value,
        state: state.value,
      });
      reset();
      history.push("/profile/user/undefined/customers");
    }
    setValidated(true);
  };

  // async function to create customer
  const createCustomer = async (customer) => {
    const dto = createCustomerDto(customer);
    const response = await fetch(
      "https://stepsolution-api.herokuapp.com/customers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dto),
      }
    );

    if (response.ok) {
      const data = await response.json();
      // call redux dispatch, it set customer also in store
      dispatch(setCustomer(dto));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

  return (
    <>
      <div className='w-100 d-flex p-4'>
        <div className='w-100 p-2 rounded-3'>
          <div className='dashboard-page'>
            {/* Dashboard title area */}
            <Container>
              <Row>
                <Col>
                  <h2>new customer</h2>
                </Col>
                <Col md='auto'>
                  <Button
                    onClick={() => {
                      history.push(`/profile/user/${userId}/customers`);
                    }}
                    variant='dark'
                    className='mb-3'
                  >
                    all customers
                  </Button>
                </Col>
              </Row>
            </Container>

            {/* Dashboard content */}
            <Form
              className='h-100 p-5 border rounded-3'
              onSubmit={handleSubmit}
              validated={validated}
            >
              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formOrderID'>
                  <Form.Label>Customer ID</Form.Label>
				  {/* como hacemos aqui para mostrar el proximo id disponible para el nuevo customer */}
                  <Form.Control plaintext readOnly defaultValue='001' />
                </Form.Group>
              </Row>

              <Row className='mb-3'>
                <Form.Group controlId='formJobName'>
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    required
                    minLength='2'
                    type='text'
                    placeholder='Company Name'
                    value={company}
                    name='company'
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} controlId='formTierLevel'>
                  <Form.Label>Tier Level</Form.Label>
                  <Select
                    defaultValue={tierLevel}
                    onChange={setTierLevel}
                    options={tierLevels}
                  />
                </Form.Group>
              </Row>

              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formTierLevel'>
                  <Form.Label>Contact Name</Form.Label>
                  <Form.Control
                    required
                    minLength='2'
                    type='text'
                    placeholder='Contact Name'
                    value={name}
                    name='fullName'
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Row>

              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formTierLevel'>
                  <Form.Label>Telephone</Form.Label>
                  <Form.Control
                    required
                    minLength='2'
                    pattern='((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}'
                    type='text'
                    placeholder='305-111-2222'
                    value={phone}
                    name='phone'
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Row>
              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formTierLevel'>
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    required
                    type='email'
                    placeholder='Email'
                    value={email}
                    name='email'
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Row>
              <Form.Group className='mb-3' controlId='formGridAddress1'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  required
                  type='text'
                  placeholder='Address'
                  value={address}
                  name='address'
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formGridAddress2'>
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  placeholder='Apartment, studio, or floor'
                  required
                  type='text'
                  value={address2}
                  name='address2'
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formGridCity'>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    value={city}
                    name='city'
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='formGridState'>
                  <Form.Label>State</Form.Label>
                  <Select
                    defaultValue={state}
                    onChange={setState}
                    options={states}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='formGridZip'>
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    value={zipCode}
                    name='zipCode'
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Row>

              <Row>
                <Col md='auto'>
                  <Button variant='secondary' type='button'>
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button variant='success' type='submit'>
                    Add Customer
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

DashboardAddCustomer.propTypes = {
  user: PropTypes.object,
  userId: PropTypes.string,
};
