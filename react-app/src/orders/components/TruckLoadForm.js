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
import filterFactory, {
  selectFilter, Comparator
} from "react-bootstrap-table2-filter";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

export const TruckLoadForm = () => {
  
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios(`${process.env.REACT_APP_API_URL}/orders`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };

  const selectOptions = {
    south: "South",
    north: "North",
    orlando: "Orlando",
    pickup: "Pick Up",
  };

  const selectStatus = {
    ready: "Ready",
    roduction: "In Production",
    completed: "Completed",
  };

  const dateFormatter=(data,row)=>{
    return<>{new Date(
      data
    ).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })}</>
  }

  const columns = [
    {
      dataField: "id",
      text: "Order ID",
      sort: true,
    },
    {
      dataField: "createdAt",
      text: "Date",
      sort: true,
    },
    {
      dataField: "customer.company",
      text: "Company",
      sort: true,
    },
    {
      dataField: "invoiceNumber",
      text: "Invoice #",
      sort: true,
    },
    {
      dataField: "shippingRoute",
      text: "Route",
      sort: true,
      filter: selectFilter({
        options: selectOptions,
        comparator: Comparator.LIKE
      }),
    },
    {
      dataField: "orderStatus",
      text: "Status",
      sort: true,
      formatter: dateFormatter,
      filter: selectFilter({
        options: selectStatus,
        comparator: Comparator.LIKE
      }),
    },
  ];

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    // hideSelectColumn: true,
    bgColor: '#55D6BE'
  };

  return (
    <>
    
        {/* <div className='w-100 h-100 p-2 rounded-3'> */}
          <div className='p-3' ref={componentRef}>
            <div>
              <Row className='justify-content-between'>
                <Col>
                  <img
                    alt=''
                    src='/./../Step-Solution-Logo-Dark.png'
                    width='330'
                    height='auto'
                    className='d-inline-block align-center'
                  />{" "}
                </Col>

                <Col>
                  <h1 className='text-end align-text-bottom'>
                    <strong>Truck</strong>Load
                  </h1>
                </Col>
              </Row>
            </div>

            {/* Dashboard content */}

            <div>
              <div className=''>
                <BootstrapTable
                  keyField='id'
                  data={data}
                  columns={columns}
                  selectRow={ selectRow }
                  striped
                  hover
                  condensed
                  pagination={paginationFactory()}
                  filter={filterFactory()}
                ></BootstrapTable>
              </div>
            </div>
          </div>
          <Container>
            <Col className='mb-5 text-center'>
              <Button
                onClick={handlePrint}
                variant="primary" type='submit' className="printer-btn shadow col-6"
              >
                print this view
              </Button>
            </Col>
          </Container>
        {/* </div> */}
 
    </>
  );
};

TruckLoadForm.propTypes = {
  user: PropTypes.object,
  userId: PropTypes.string,
};
