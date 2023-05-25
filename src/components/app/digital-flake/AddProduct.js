import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { Card, Row, Col, FloatingLabel, Form, Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import { getToken } from 'components/utilities/Utils';


const AddProduct = () => {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    packSize: "",
    mrp: "",
    productImage: "",
    status: "",
  });

  const [categoryList, setcategoryList] = useState([]);

  useEffect(() => {
    axios.post(process.env.REACT_APP_SERVER_HOST + "/category/", {}
      , { headers: { 'x-access-token': getToken() } }).then((response) => {
        console.log(response.data);
        setcategoryList(response.data);
      }).catch((err) => {
        console.log(err);
      });

  }, [])



  const handleFormSubmit = async (e) => {

    axios.post(process.env.REACT_APP_SERVER_HOST + "/product/register", formData, { headers: { 'x-access-token': getToken() } })
      .then((response) => {
        console.log(response.data);
        if (response) {
          alert("data submitted successfully!");
        } else {
          alert("Something went wrong");
        }

      }).catch((err) => {
        console.log(err);
      });





    setFormData({
      name: "",
      category: "",
      packSize: "",
      mrp: "",
      productImage: "",
      status: "",
    });
    navigate(-1);
  }


  return (

    <Card className="mb-3">
      <Card.Header>
      </Card.Header>
      <Card.Body className="p-2">

        <div>
          <Row className="g-2">
            <Col md>
              <FloatingLabel
                controlId="floatingSelectGrid"
                label="Category"
              >
                <Form.Select aria-label="Floating label select example"
                  onChange={(e) => {
                    console.log(e.target, e.currentTarget);
                    setFormData({ ...formData, categoryId: e.currentTarget.value })
                  }}
                  value={formData.categoryId}
                >
                  <option value="">Select</option>
                  {
                    categoryList.map((item, i) => <option value={item.id} key={i}>{item.name}</option>)
                  }
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Product Name">
                <Form.Control type="text" placeholder=""
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  value={formData.name}
                />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Pack Size">
                <Form.Control type="text" placeholder=""
                  onChange={(e) => setFormData({ ...formData, packSize: e.target.value })}
                  value={formData.packSize}
                />
              </FloatingLabel>
            </Col>

          </Row>
          <Row className="g-2">
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="MRP">
                <Form.Control type="text" placeholder=""
                  onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                  value={formData.mrp}
                />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Product Image">
                <Form.Control type="text" placeholder=""
                  onChange={(e) => setFormData({ ...formData, productImage: e.target.value })}
                  value={formData.productImage}
                />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel
                controlId="floatingSelectGrid"
                label="Status"
              >
                <Form.Select aria-label="Floating label select example"
                  onChange={(e) => setFormData({ ...formData, status: e.currentTarget.value })}
                  value={formData.status}
                >
                  <option value="">Select</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
        </div>

      </Card.Body>
      <Card.Footer>
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>Cancel</Button>
        <Button onClick={handleFormSubmit}>Save</Button>
      </Card.Footer>
    </Card>
  );
};

export default AddProduct;
