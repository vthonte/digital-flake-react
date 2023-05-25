import React from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { orderList } from 'data/ecommerce/orderList';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import CardDropdown from 'components/common/CardDropdown';
import SoftBadge from 'components/common/SoftBadge';
import classNames from 'classnames';
// import { Link } from 'react-router-dom';
import ProductTableHeader from './ProductTableHeader';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import { getToken } from 'components/utilities/Utils';


const Product = () => {



  const columns = [
    {
      accessor: 'id',
      Header: 'Id',
      headerProps: { className: 'pe-1' },
      cellProps: {
        className: 'py-2'
      }
    },
    {
      accessor: 'name',
      Header: 'Name',
      headerProps: { className: 'pe-1' },
      cellProps: {
        className: 'py-2'
      },
    },
    {
      accessor: 'packsize',
      Header: 'Pack Size',
      headerProps: { className: 'pe-3' }
    },
    {
      accessor: 'category',
      Header: 'Category',
      headerProps: { className: 'pe-5' }
    },
    {
      accessor: 'mrp',
      Header: 'MRP',
      headerProps: {
        className: 'text-end'
      },
      cellProps: {
        className: 'text-end fs-0 fw-medium py-2'
      },
      // Cell: rowData => `$${rowData.row.original.amount}`
    },
    {
      accessor: 'productImage',
      Header: 'Image',
      Cell: rowData => {
        const { productImage } = rowData.row.original;
        return (
          <>
            {productImage}
          </>
        );
      }
    },
    {
      accessor: 'status',
      Header: 'Status',
      headerProps: {
        className: 'text-center'
      },
      cellProps: {
        className: 'fs-0'
      },
      Cell: rowData => {
        const { status } = rowData.row.original;
        return (
          <SoftBadge
            pill
            bg={classNames({
              success: status === 'Active',
              warning: status === 'Inactive',

            })}
            className="d-block"
          >
            {status === 'Active' && 'Active'}
            {status === 'Inactive' && 'Inactive'}
          </SoftBadge>
        );
      }
    },
    {
      accessor: 'none',
      Header: '',
      disableSortBy: true,
      cellProps: {
        className: 'text-end'
      },
      Cell: (rowData) => {
        const { id } = rowData.row.original;
        return (
          <div>
            <FontAwesomeIcon icon="trash" onClick={() => handleShow(id)} />
          </div>
        );
      }
    }
  ];










  const [show, setShow] = useState(false);
  const [toDelete, setToDelete] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setToDelete(id);
    setShow(true);
  };

  const deleteFunction = () => {

    axios.delete(process.env.REACT_APP_SERVER_HOST + "/product/" + toDelete,
      { headers: { 'x-access-token': getToken() } }).then((response) => {
        console.log(response.data);
        // setProductList(response.data);
        getDataList();
        handleClose();
      }).catch((err) => {
        console.log(err);
        handleClose();
      });
  };

  const [productList, setProductList] = useState([]);

  const getDataList = () => {


    axios.post(process.env.REACT_APP_SERVER_HOST + "/product/", {},
      { headers: { 'x-access-token': getToken() } }).then((response) => {
        // console.log(response.data);
        setProductList(response.data);

      }).catch((err) => {
        console.log(err);
      });
  }


  useEffect(() => {

    getDataList();

  }, [])


  return (
    <AdvanceTableWrapper
      columns={columns}
      data={productList}
      // selection
      sortable
      pagination
      perPage={10}
    >
      <Card className="mb-3">
        <Card.Header>
          <ProductTableHeader table />
        </Card.Header>
        <Card.Body className="p-0">
          <AdvanceTable
            table
            headerClassName="bg-200 text-900 text-nowrap align-middle"
            rowClassName="align-middle white-space-nowrap"
            tableProps={{
              size: 'sm',
              striped: true,
              className: 'fs--1 mb-0 overflow-hidden'
            }}
          />
        </Card.Body>
        <Card.Footer>
          <AdvanceTablePagination table />
        </Card.Footer>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete this record?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={() => { deleteFunction() }}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </AdvanceTableWrapper>
  );
};

export default Product;
