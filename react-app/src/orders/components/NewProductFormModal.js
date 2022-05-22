import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";

import { Button, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Select from "react-select";

import axios from "axios";
import { productSelectOptions } from "../../adapters/productAdapter";
import { useOrderProduct } from "../../hooks/useOrderProduct";
import { Table } from "react-bootstrap";
import { createOrderItemDto } from "../../adapters/orderItemsAdapter";

export const NewProductFormModal = ({ showModal, onHide, orderDetails }) => {
  const history = useHistory();
  const {
    product,
    quantity,
    price,
    notes,
    setProduct,
    setQuantity,
    setPrice,
    setNotes,
  } = useOrderProduct();
  const [products, setProducts] = useState([]);

  const [newProducts, setNewProducts] = useState([]);

  const getProducts = () => {
    axios(`${process.env.REACT_APP_API_URL}/products`).then((res) => {
      const productOptions = productSelectOptions(res.data);
      setProducts(productOptions);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setPrice(product.value?.price);
  }, [product, setPrice]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setNewProducts([
        ...newProducts,
        {
          id: product.value.id,
          name: product.label,
          quantity,
          price,
          notes,
        },
      ]);
      setQuantity("");
      setPrice("");
      setNotes("");
      setProduct([]);
    }
  };

  const editOrder = async (orderPayload) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/orders/${orderDetails?.order.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return ["An error occurred. Please try again."];
    }
  };

  const calculateOrderTotalPrice = (orderProducts) => {
    let totalPrice = orderProducts.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0);

    return totalPrice;
  };

  const calculateNewTotal = () => {
    const newProductsTotalPrice = calculateOrderTotalPrice(newProducts);
    const total =
      newProductsTotalPrice + parseFloat(orderDetails?.order?.totalAmount);
    return total;
  };

  const handleAddProducts = async () => {
    const orderItemsDto = createOrderItemDto(
      orderDetails?.order?.id,
      newProducts
    );
    for (let i = 0; i < orderItemsDto.length; i++) {
      createOrderItem(orderItemsDto[i]);
    }
    const totalAmount = calculateNewTotal();
    await editOrder({ totalAmount: totalAmount });
    onHide();
    history.go(0);
  };

  const createOrderItem = async (orderItem) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/order-items`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderItem),
      }
    );

    if (response.ok) {
      const data = await response.json();
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
    <Modal size='lg' show={showModal} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id='example-modal-sizes-title-lg'>
          Add Products to an existing order
        </Modal.Title>
      </Modal.Header>
      <Modal.Body onKeyPress={handleKeyPress}>
        <Row>
          <Col>
            <Select
              defaultValue={product}
              onChange={setProduct}
              options={products}
            />
          </Col>
          <Col>
            <Form.Control
              type='text'
              placeholder='qty'
              value={quantity || ""}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Control type='text' placeholder='$0' value={price || ""} />
          </Col>
          <Col>
            <Form.Control
              type='text'
              placeholder='Notes'
              value={notes || ""}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Table striped bordered hover responsive='lg' className='table'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Product</th>
                <th scope='col'>Qty</th>
                <th scope='col'>Rate</th>
                <th scope='col'>Notes</th>
              </tr>
            </thead>
            <tbody>
              {newProducts.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product?.name}</td>
                  <td>{product.quantity}</td>
                  <td>${product.price}</td>
                  <td>{product.notes}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleAddProducts()}>Add to order</Button>
      </Modal.Footer>
    </Modal>
  );
};
