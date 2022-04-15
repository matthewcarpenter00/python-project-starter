import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useHistory } from "react-router";
import PropTypes from "prop-types";
import { useState } from "react";

import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
// import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";


export const DashboardProducts = ({ user, userId }) => {
  const params = useParams();
  const history = useHistory();

  let { id } = useParams;
  const [products, setProducts] = useState([]);
  

	// fetch products
	// useEffect(() => {
	// 	fetch("https://stepsolution-api.herokuapp.com/products")
	// 	.then((response) => response.json())
	// 	.then((products) => setProducts(products));
	// });

  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios("https://stepsolution-api.herokuapp.com/products").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };  

  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "tierLevel",
      text: "Tier",
      sort: true,
    },
    {
      dataField: "description",
      text: "Description",
      sort: true,
    },
    {
      dataField: "price",
      text: "Price",
      sort: true,
    },
    // {
    //   dataField: "type",
    //   text: "Type",
    //   sort: true,
    // },
  ];



  return (
    <>
      <div className='w-100 d-flex p-4'>
        <div className='w-100 h-100 p-2 rounded-3'>
          <div className='dashboard-page'>
            {/* title section */}
            <Container>
              <Row>
                <Col sm='9'>
                  <h1>Products</h1>
                </Col>

                {/* <Col>
                  <Button
                    onClick={() => {
                      history.push(`/profile/user/${userId}/addproduct`);
                    }}
                    variant='dark'
                    className='mb-3 float-right'
                  >
                    + add product
                  </Button>
                </Col> */}
              </Row>
            </Container>

            {/* Dashboard content */}

            <div className='container'>
              
                <Container>
                  <div className='h-100 p-5 bg-light border rounded-3'>
                    <BootstrapTable
              
                      keyField='id'
                      data={data}
                      columns={columns}
                      striped
                      hover
                      condensed
                      pagination={paginationFactory()}
                      // filter={filterFactory()}
                    />
                  </div>
                </Container>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

DashboardProducts.propTypes = {
  user: PropTypes.object,
  userId: PropTypes.string,
};
