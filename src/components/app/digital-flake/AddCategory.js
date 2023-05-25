import React, { useState } from 'react';
import axios from "axios";
import { Card, Form, Row, Col, FloatingLabel, Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import { getToken } from 'components/utilities/Utils';

const AddCategory = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "",
  });
  const handleFormSubmit = async () => {

    axios.post(process.env.REACT_APP_SERVER_HOST + "/category/register", formData, { headers: { 'x-access-token': getToken() } })
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
      description: "",
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
              <FloatingLabel controlId="floatingInputGrid" label="Category Name">
                <Form.Control type="text" placeholder=""
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  value={formData.name} />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Description">
                <Form.Control type="text" placeholder=""
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  value={formData.description} />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel
                controlId="floatingSelectGrid"
                label="Status"
              >
                <Form.Select aria-label="Floating label select example"
                  onChange={(e) => setFormData({ ...formData, status: e.currentTarget.value })}
                  value={formData.status}>
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

export default AddCategory;
