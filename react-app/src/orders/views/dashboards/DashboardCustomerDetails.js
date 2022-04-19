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
      // `${process.env.REACT_APP_API_URL}/customers/${customerEmail}`
      `https://stepsolutionapi.herokuapp.com/customers/${customerEmail}`
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
                <Form.Group as={Col} controlId='formCustomerId'>
                  <Form.Label>Customer ID</Form.Label>
                  <Form.Control type='text' readOnly value={customer?.id} />
                </Form.Group>

                <Form.Group as={Col} controlId='formCompany'>
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    type='text'
                    readOnly
                    value={customer?.company}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='formTierLevel'>
                  <Form.Label>Tier Level</Form.Label>
                  <Form.Control
                    type='text'
                    readOnly
                    value={customer?.tierLevel}
                  />
                </Form.Group>
              </Row>

              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formContactName'>
                  <Form.Label>Contact Name</Form.Label>
                  <Form.Control type='text' readOnly value={customer?.name} />
                </Form.Group>

                <Form.Group as={Col} controlId='formTelephone'>
                  <Form.Label>Telephone</Form.Label>
                  <Form.Control type='text' readOnly value={customer?.phone} />
                </Form.Group>

                <Form.Group as={Col} controlId='formEmail'>
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control readOnly type='email' value={customer?.email} />
                </Form.Group>
              </Row>
              <Form.Group className='mb-3' controlId='formGridAddress1'>
                <Form.Label>Address</Form.Label>
                <Form.Control readOnly type='text' value={customer?.address} />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formGridAddress2'>
                <Form.Label>Address 2</Form.Label>
                <Form.Control readOnly type='text' value={customer?.address2} />
              </Form.Group>

              <Row className='mb-5'>
                <Form.Group as={Col} controlId='formGridCity'>
                  <Form.Label>City</Form.Label>
                  <Form.Control readOnly type='text' value={customer?.city} />
                </Form.Group>

                <Form.Group as={Col} controlId='formGridState'>
                  <Form.Label>State</Form.Label>
                  <Form.Control readOnly type='text' value={customer?.state} />
                </Form.Group>

                <Form.Group as={Col} controlId='formGridZip'>
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    readOnly
                    type='text'
                    value={customer?.zipCode}
                  />
                </Form.Group>
              </Row>

              <Row>
                <Col md='auto'>
                  <Button variant='danger' type='submit'>
                    Delete Customer
                  </Button>
                </Col>
                <Col>
                  <Button disabled variant='dark' type='submit'>
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
