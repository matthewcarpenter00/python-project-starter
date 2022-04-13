<<<<<<< HEAD
import React from "react";
=======

import React, { useState } from "react";

>>>>>>> 9457272 (add customer page)
import { useHistory } from "react-router-dom";
import "../order-styles.css";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import { FormInputCard } from "../components/FormInputCard";
import { ContactFormTitle } from "../components/ContactFormTitle";
<<<<<<< HEAD

const initialForm = {
  fullName: "",
  company: "",
  email: "",
  phoneNumber: "",
  address: "",
};
=======
import { useDispatch, useSelector } from "react-redux";
import { setCustomer } from "../../store/orders";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
>>>>>>> 9457272 (add customer page)

const bodyTxt = `if this is your first time filling out an order on our new form please fill out your contact details so we can  update your profile.`;

export const ContactForm = () => {
<<<<<<< HEAD
  const history = useHistory();
  const [formValues, handleInputChange, reset] = useForm(initialForm);
  const { fullName, company, email, phoneNumber, address } = formValues;

  const handleSubmit = (event) => {
    event.preventDefault();
    reset();
  };
  return (
    <Container fluid>
      <Row>
        <Col />
        <Col xs={6}>
        <h1 className='border-bottom px-4'>Contact Details</h1>
          <Form onSubmit={handleSubmit}>
            <FormInputCard inputLabel='Full Name'>
              <Form.Control
=======
  const [address, setAddress] = useState(null);
  const history = useHistory();
  const customer = useSelector((state) => state.orders.customer);
  const dispatch = useDispatch();
  const [formValues, handleInputChange, reset] = useForm(customer);
  const [validated, setValidated] = useState(false);
  const { fullName, company, email, phoneNumber, unit, zipCode } = formValues;

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(form.checkValidity());
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      dispatch(setCustomer({ ...formValues, address }));
      reset();
      history.push("select-product");
    }
    setValidated(true);
  };
  return (
    <Container fluid>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col />
          <Col xs={6}>
            <ContactFormTitle title='Contact Details' bodyTxt={bodyTxt} />
            <FormInputCard inputLabel='Full Name'>
              <Form.Control
                required
                minLength='2'
>>>>>>> 9457272 (add customer page)
                className='custom-input'
                type='text'
                placeholder='Your answer'
                value={fullName}
                name='fullName'
                onChange={handleInputChange}
              />
<<<<<<< HEAD
            </FormInputCard>
            <FormInputCard inputLabel='Company'>
              <Form.Control
=======
              <Form.Control.Feedback type='invalid'>
                Must be min Two Characters Long or more.
              </Form.Control.Feedback>
            </FormInputCard>
            <FormInputCard inputLabel='Company'>
              <Form.Control
                required
                minLength='2'
>>>>>>> 9457272 (add customer page)
                className='custom-input'
                type='text'
                placeholder='Your answer'
                value={company}
                name='company'
                onChange={handleInputChange}
              />
<<<<<<< HEAD
            </FormInputCard>
            <FormInputCard inputLabel='Contact E-mail (if different)'>
              <Form.Control
                className='custom-input'
                type='text'
=======
              <Form.Control.Feedback type='invalid'>
                Must be min Two Characters Long or more.
              </Form.Control.Feedback>
            </FormInputCard>
            <FormInputCard inputLabel='Contact E-mail (if different)'>
              <Form.Control
                required
                className='custom-input'
                type='email'
>>>>>>> 9457272 (add customer page)
                placeholder='Your answer'
                value={email}
                name='email'
                onChange={handleInputChange}
              />
            </FormInputCard>
            <FormInputCard inputLabel='Phone Number'>
              <Form.Control
<<<<<<< HEAD
=======
                required
                minLength='2'
                pattern='((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}'
>>>>>>> 9457272 (add customer page)
                className='custom-input'
                type='text'
                placeholder='Your answer'
                value={phoneNumber}
                name='phoneNumber'
                onChange={handleInputChange}
              />
<<<<<<< HEAD
            </FormInputCard>
            <FormInputCard inputLabel='Address, City, State, Zip Code'>
              <Form.Control
                className='custom-input'
                type='text'
                placeholder='Your answer'
                value={address}
                name='address'
                onChange={handleInputChange}
              />
            </FormInputCard>
          </Form>
        </Col>
        <Col />
      </Row>
      <Row className='mb-4'>
        <Col>
          <Button
            onClick={() => history.push("new-order")}
            variant='secondary'
            className='float-end'
          >
            Back to start
          </Button>
        </Col>
        <Col xs={6} />
        <Col>
          <Button
            onClick={() => history.push("select-product")}
            variant='dark'
          >
            Next: Choose Products
          </Button>
        </Col>
      </Row>
=======
              <Form.Control.Feedback type='invalid'>
                Must be a valid phone number i.e 123-456-7890
              </Form.Control.Feedback>
            </FormInputCard>
            <FormInputCard inputLabel='Address, City, State, Zip Code'>
              <GooglePlacesAutocomplete
                apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                selectProps={{
                  address,
                  onChange: setAddress,
                  isClearable: true,
                }}
                onLoadFailed={(error) =>
                  console.error("Could not inject Google script", error)
                }
              />
            </FormInputCard>
            <FormInputCard inputLabel='Apartment, unit, suite, or floor #'>
              <Form.Control
                required
                minLength='2'
                className='custom-input'
                type='text'
                placeholder='Your answer'
                value={unit}
                name='unit'
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type='invalid'>
                Must be min Two Characters Long or more.
              </Form.Control.Feedback>
            </FormInputCard>
            <FormInputCard inputLabel='Zip Code'>
              <Form.Control
                required
                minLength='2'
                className='custom-input'
                type='text'
                placeholder='Your answer'
                value={zipCode}
                name='zipCode'
                onChange={handleInputChange}
              />
            </FormInputCard>
          </Col>
          <Col />
        </Row>
        <Row className='mb-4'>
          <Col>
            <Button
              onClick={() => history.push("/new-order")}
              variant='secondary'
              className='float-end'
            >
              Back to start
            </Button>
          </Col>
          <Col xs={6} />
          <Col>
            <Button type='submit' variant='secondary'>
              Next: Choose Products
            </Button>
          </Col>
        </Row>
      </Form>
>>>>>>> 9457272 (add customer page)
    </Container>
  );
};
