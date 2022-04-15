import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { useState } from "react";
import { useHistory } from "react-router";

// redux and custom hook imports
import { useForm } from "../../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { setCustomer } from "../../../store/orders";
import { createCustomerDto } from "../../../adapters/customerAdapter";

export const DashboardCustomerDetails = ({ user, userId }) => {
  const params = useParams();
  const history = useHistory();
  let { id: customerEmail } = useParams();

  // hooks and redux
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [customer, setCustomer] = useState(null);

  const fetchCustomer = async (customerEmail) => {
    const response = await fetch(
      `https://stepsolution-api.herokuapp.com/customers/${customerEmail}`
    );

    if (response.ok) {
      const customer = await response.json();
      setCustomer(customer);
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

  useEffect(() => {
    fetchCustomer(customerEmail);
  }, []);

  return (
    <>
      <div className='w-100 d-flex p-4'>
        <div className='w-100 p-2 rounded-3'>
          <div className='dashboard-page'>
            {/* Dashboard title area */}
            <Container>
              <Row>
                <Col>
                  <h2>customer profile</h2>
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
                <Col md='auto'>
                  <Button
                    onClick={() => {
                      history.push(`/profile/user/${userId}/addcustomer`);
                    }}
                    variant='dark'
                    className='mb-3'
                  >
                    + add customer
                  </Button>
                </Col>
              </Row>
            </Container>

            {/* Dashboard content */}
            <Form className='h-100 p-5 border rounded-3' validated={validated}>
              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formOrderID'>
                  <Form.Label>Customer ID</Form.Label>
                  <Form.Control plaintext readOnly defaultValue='001' />
                </Form.Group>
              </Row>

              <Row className='mb-3'>
                <Form.Group controlId='formJobName'>
                  <Form.Label>Company</Form.Label>
                  <Form.Control type='text' placeholder='JDA Flooring' />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} controlId='formTierLevel'>
                  <Form.Label>Tier Level</Form.Label>
                  <Form.Select aria-label='SelectRoute'>
                    <option>Select</option>
                    <option value='1'>A</option>
                    <option value='2'>B</option>
                    <option value='3'>C</option>
                    <option value='1'>D</option>
                    <option value='2'>E</option>
                  </Form.Select>
                </Form.Group>
              </Row>

              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formTierLevel'>
                  <Form.Label>Contact Name</Form.Label>
                  <Form.Control type='text' value={customer?.name} />
                </Form.Group>
              </Row>

              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formTierLevel'>
                  <Form.Label>Telephone</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='305-305-3051'
                    value={customer?.phoneNumber}
                  />
                </Form.Group>
              </Row>
              <Row className='mb-3'>
                <Form.Group
                  as={Col}
                  controlId='formTierLevel'
                  value={customer?.tierLevel}
                >
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='jdaflooring@gmail.com'
                  />
                </Form.Group>
              </Row>
              <Form.Group className='mb-3' controlId='formGridAddress1'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  placeholder='1234 Main St'
                  value={customer?.address}
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formGridAddress2'>
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  placeholder='Apartment, studio, or floor'
                  value={customer?.address2}
                />
              </Form.Group>

              <Row className='mb-3'>
                <Form.Group
                  as={Col}
                  controlId='formGridCity'
                  value={customer?.city}
                >
                  <Form.Label>City</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId='formGridState'>
                  <Form.Label>State</Form.Label>
                  <Form.Select defaultValue='Choose...'>
                    <option>Choose...</option>
                    <option>...</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId='formGridZip'
                  value={customer?.zipCode}
                >
                  <Form.Label>Zip</Form.Label>
                  <Form.Control />
                </Form.Group>
              </Row>

              <Row>
                <Col md='auto'>
                  <Button variant='danger' type='submit'>
                    Delete Customer
                  </Button>
                </Col>
                <Col>
                  <Button variant='success' type='submit'>
                    Update Customer
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

DashboardCustomerDetails.propTypes = {
  user: PropTypes.object,
  userId: PropTypes.string,
};
