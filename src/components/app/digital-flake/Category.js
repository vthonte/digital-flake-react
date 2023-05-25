import React, { useState, useEffect } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import { getToken } from 'components/utilities/Utils';
import axios from 'axios';

import SoftBadge from 'components/common/SoftBadge';
import classNames from 'classnames';

import CategoryTableHeader from './CategoryTableHeader';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Category = () => {



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
      accessor: 'description',
      Header: 'Description',
      headerProps: { className: 'pe-7' }
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


  const [categoryList, setcategoryList] = useState([]);



  const deleteFunction = () => {

    axios.delete(process.env.REACT_APP_SERVER_HOST + "/category/" + toDelete,
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


  const getDataList = () => {
    axios.post(process.env.REACT_APP_SERVER_HOST + "/category/",
      {},
      { headers: { 'x-access-token': getToken() } }).then((response) => {
        console.log(response.data);
        setcategoryList(response.data);
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
      data={categoryList}
      // selection
      sortable
      pagination
      perPage={10}
    >
      <Card className="mb-3">
        <Card.Header>
          <CategoryTableHeader table />
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

export default Category;
