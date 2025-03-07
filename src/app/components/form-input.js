import React, { useState } from 'react';
import { Container, Form, Row, Col, Card, Button, Stack } from 'react-bootstrap';
import FormGroup, { FormText, FormSelect, FormNumber, FormImage, FormCheckbox} from './form-cpt.js';

const conditionSelections = ["Poor", "Average", "Good", "Excellent"];
const lensTypeSelections = [ 
    { key: "monofocal", label: "Monofocal"},
    { key: "bifocal", label: "Bifocal"},
    { key: "progressive", label: "Progressive"},
    { key: "trifocal", label: "Trifocal"},
];

export default function GlassesInputForm() {


    return (
        <Container className="my-4">
            <Card className="mx-auto">
                <Card.Header as="h4">Glasses Donation Form</Card.Header>
                <Card.Body>
                    <Form>
                        <Row className="mb-4 justify-content-between">
                            <Col className="mt-2" md={6} >
                                <h5>Frame Information</h5>
                                <FormGroup label="Frame Color" controlId="frameColor" formItem={<FormText />} />
                                <FormGroup label="Condition" controlId="condition" formItem={<FormSelect selections={conditionSelections} />} />
                            </Col>
                            <Col className="mt-2" md={5} >
                                <h5>Lens Information</h5>
                                <FormGroup label="Lens Type" controlId="lensType" 
                                    formItem={<FormCheckbox selectionsWithLabels={lensTypeSelections} name="lensGroup" type="radio" />} 
                                />
                            </Col>
                        </Row>
                        <h5>Prescription Details</h5>      
                        <Row className="px-4 mb-3">
                            <Card>
                                <Card.Body className="d-flex justify-content-start">
                                    <Stack>
                                        <h6 className="">Left Eye (OS)</h6>
                                        <Stack direction="horizontal" className="me-auto" gap={3}>
                                            <FormGroup label="Sphere (SPH)" controlId="leftSPH" formItem={<FormNumber />} />
                                            <FormGroup label="Cylinder (CYL)" controlId="leftCYL" formItem={<FormNumber />} />
                                            <FormGroup label="Axis" controlId="leftAxis" formItem={<FormNumber />} />
                                        </Stack>
                                    </Stack>
                                </Card.Body>
                            </Card>
                        </Row>
                        <Row className="px-4 mb-3">
                            <Card>
                                <Card.Body className="d-flex justify-content-start">
                                    <Stack>
                                        <h6 className="">Right Eye (OS)</h6>
                                        <Stack direction="horizontal" className="me-auto" gap={3}>
                                            <FormGroup label="Sphere (SPH)" controlId="rightSPH" formItem={<FormNumber />} />
                                            <FormGroup label="Cylinder (CYL)" controlId="rightCYL" formItem={<FormNumber />} />
                                            <FormGroup label="Axis" controlId="rightAxis" formItem={<FormNumber />} />
                                        </Stack>
                                    </Stack>
                                </Card.Body>
                            </Card>
                        </Row>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <Button variant="secondary" className="me-md-2">Clear</Button>
                            <Button variant="primary" type="submit">Submit</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}