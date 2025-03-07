import React, { useState } from 'react';
import { Container, Form, Row, Col, Card, Button } from 'react-bootstrap';

const GlassesForm = () => {
  const [formData, setFormData] = useState({
    frameColor: '',
    condition: 'new',
    lensType: '',
    rightEye: {
      sphere: '',
      cylinder: '',
      axis: ''
    },
    leftEye: {
      sphere: '',
      cylinder: '',
      axis: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to an API
  };

  return (
    <Container className="my-4">
      <Card>
        <Card.Header as="h4">Glasses Information Form</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {/* Frame Information */}
            <Row className="mb-4">
              <Col>
                <h5>Frame Information</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Frame Color</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="frameColor"
                    value={formData.frameColor}
                    onChange={handleChange}
                    placeholder="e.g., Black, Tortoise, Gold"
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Condition</Form.Label>
                  <Form.Select 
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    required
                  >
                    <option value="new">New</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col>
                <h5>Lens Information</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Lens Type</Form.Label>
                  <Form.Select 
                    name="lensType"
                    value={formData.lensType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select lens type</option>
                    <option value="single-vision">Single Vision</option>
                    <option value="bifocal">Bifocal</option>
                    <option value="progressive">Progressive</option>
                    <option value="reading">Reading</option>
                    <option value="sunglasses">Sunglasses</option>
                    <option value="transition">Transition</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            {/* Prescription Information */}
            <h5>Prescription Details</h5>
            
            {/* Right Eye */}
            <Row className="mb-3">
              <Col>
                <Card className="p-3">
                  <h6>Right Eye (OD)</h6>
                  <Row>
                    <Col>
                      <Form.Group className="mb-2">
                        <Form.Label>Sphere (SPH)</Form.Label>
                        <Form.Control 
                          type="number" 
                          step="0.25" 
                          name="rightEye.sphere"
                          value={formData.rightEye.sphere}
                          onChange={handleChange}
                          placeholder="-2.00"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-2">
                        <Form.Label>Cylinder (CYL)</Form.Label>
                        <Form.Control 
                          type="number" 
                          step="0.25" 
                          name="rightEye.cylinder"
                          value={formData.rightEye.cylinder}
                          onChange={handleChange}
                          placeholder="-0.75"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-2">
                        <Form.Label>Axis</Form.Label>
                        <Form.Control 
                          type="number" 
                          min="1" 
                          max="180" 
                          name="rightEye.axis"
                          value={formData.rightEye.axis}
                          onChange={handleChange}
                          placeholder="90"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            
            {/* Left Eye */}
            <Row className="mb-4">
              <Col>
                <Card className="p-3">
                  <h6>Left Eye (OS)</h6>
                  <Row>
                    <Col>
                      <Form.Group className="mb-2">
                        <Form.Label>Sphere (SPH)</Form.Label>
                        <Form.Control 
                          type="number" 
                          step="0.25" 
                          name="leftEye.sphere"
                          value={formData.leftEye.sphere}
                          onChange={handleChange}
                          placeholder="-2.25"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-2">
                        <Form.Label>Cylinder (CYL)</Form.Label>
                        <Form.Control 
                          type="number" 
                          step="0.25" 
                          name="leftEye.cylinder"
                          value={formData.leftEye.cylinder}
                          onChange={handleChange}
                          placeholder="-1.00"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-2">
                        <Form.Label>Axis</Form.Label>
                        <Form.Control 
                          type="number" 
                          min="1" 
                          max="180" 
                          name="leftEye.axis"
                          value={formData.leftEye.axis}
                          onChange={handleChange}
                          placeholder="85"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Button variant="secondary" className="me-md-2">Clear</Button>
              <Button variant="primary" type="submit">Submit</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default GlassesForm;