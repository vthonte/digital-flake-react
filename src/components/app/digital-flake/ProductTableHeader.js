import IconButton from 'components/common/IconButton';
import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const CustomersTableHeader = ({ selectedRowIds }) => {

  const navigate = useNavigate();

  function handleAddClick() {
    navigate("/digital-flake/add-product");
  }

  return (
    <Row className="flex-between-center">
      <Col xs={4} sm="auto" className="d-flex align-items-center pe-0">
        <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">Orders</h5>
      </Col>
      <Col xs={8} sm="auto" className="ms-auto text-end ps-0">

        <div id="orders-actions">
          <IconButton
            variant="falcon-default"
            size="sm"
            icon="plus"
            transform="shrink-3"
            onClick={handleAddClick}
          >
            <span className="d-none d-sm-inline-block ms-1">Add New</span>
          </IconButton>

        </div>
      </Col>
    </Row>
  );
};

CustomersTableHeader.propTypes = {
  selectedRowIds: PropTypes.object
};

export default CustomersTableHeader;
