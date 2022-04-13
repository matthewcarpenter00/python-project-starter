import React, { useState } from "react";
import "../order-styles.css";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { FormInputCard } from "../components/FormInputCard";
import { ContactFormTitle } from "../components/ContactFormTitle";
import { useHistory } from "react-router-dom";

const bodyTxt = "Roundtrip shipping $30";

const deliveryOptions = [
  { id: 1, name: "Step Solution - $30" },
  { id: 2, name: "Client - Free" },
  { id: 3, name: "Rush 24 hour by Step Solution - $90" },
];

export const DeliveryForm = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push({
      pathname: "/order-review",
      state: selectedOption,
    });
  };

  const changeList = (id, checked) => {
    const selected = deliveryOptions.find((option) => option.id === id);
    setSelectedOption(selected.name);
  };
  return (
    <Container fluid>
      <Row>
        <Col />
        <Col xs={6}>
        <h1 className='border-bottom px-4'>Select Fullfilment</h1>
          <Form autoComplete='off' onSubmit={handleSubmit}>
            <FormInputCard inputLabel='Pick Up / Drop Off by'>
              {deliveryOptions.map(({ id, name }) => (
                <div key={id}>
                  <Form.Check type='radio' id={id}>
                    <Form.Check.Input
                      type='radio'
                      name='delivery'
                      value={id}
                      onChange={() => changeList(id)}
                    />
                    <Form.Check.Label htmlFor={name}>{name}</Form.Check.Label>
                  </Form.Check>
                </div>
              ))}
            </FormInputCard>
          </Form>
        </Col>
        <Col />
      </Row>
      <Row className='mb-4'>
        <Col className='text-center'>
          <Button onClick={handleSubmit} variant='dark'>
            Review Order
          </Button>
        </Col>
      </Row>
      <Row className='mb-4'>
        <Col>
          <Button
            onClick={() => history.push("/product-order/vinyl01")}
            variant='secondary'
            className='float-end'
          >
            Back to Product Details
          </Button>
        </Col>
        <Col xs={6} />
        <Col />
      </Row>
    </Container>
  );
};
