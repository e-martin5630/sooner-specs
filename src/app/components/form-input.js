

import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import db, { storage } from "../../../firebase/firebaseDB";
import { Container, Form, Row, Col, Card, Button, Stack } from 'react-bootstrap';
import FormGroup, { FormText, FormSelect, FormNumber, FormImage, FormCheckbox } from './form-cpt.js';

const imageStorageRef = ref(storage, 'images/glasses/');

// Form selections and initial state
const conditionSelections = ["Poor", "Average", "Good", "Excellent"];
const lensTypeSelections = [ 
    { key: "monofocal", label: "Monofocal"},
    { key: "bifocal", label: "Bifocal"},
    { key: "progressive", label: "Progressive"},
    { key: "trifocal", label: "Trifocal"},
];
const initialGlassesObject = {
    frameColor: '',
    condition: '',
    lensType: '',
    rightEye: {
        sphere: '',
        cylinder: '',
        axis: '',
        add: ''
    },
    leftEye: {
        sphere: '',
        cylinder: '',
        axis: '',
        add: ''
    }
};

export default function GlassesInputForm() {
    const [glassesForm, setGlassesForm] = useState(initialGlassesObject);

    const handleGlassesForm = async (e) => {
        e.preventDefault();
        const target = e.target;
        const glassesUUID = crypto.randomUUID();
        var hasImage = false;
        try {
            if (target.lensImage.files[0].size > 0) {
                var imageID = glassesUUID + "_image";
                const imageRef = ref(imageStorageRef, imageID);
                await uploadBytes(imageRef, target.lensImage.files[0]).then((snapshot) => {
                    console.log("Image uploaded successfully: ", imageID);
                    hasImage = true;    
                });
            }
        } 
        catch (e) {
            console.error("Error uploading image: ", e);
        }


        const updatedForm = {
            uuid: glassesUUID,
            hasImage: hasImage,
            frameColor: target.frameColor.value,
            condition: target.condition.value,
            lensType: glassesForm.lensType,
            rightEye: {
                sphere: target.rightSPH.value,
                cylinder: target.rightCYL.value,
                axis: target.rightAxis.value,
                add: target.rightADD.value
            },
            leftEye: {
                sphere: target.leftSPH.value,
                cylinder: target.leftCYL.value,
                axis: target.leftAxis.value,
                add: target.leftADD.value
            }
        };
        console.log(updatedForm);
        setGlassesForm(updatedForm);

        try {
            const docRef = await addDoc(collection(db, "glasses"), updatedForm);
            
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const handleLensTypeChange = (e) => {
        setGlassesForm({ ...glassesForm, lensType: e.target.id });
    };

    return (
        <Container className="my-4">
            <Card className="mx-auto">
                <Card.Header as="h4">Glasses Donation Form</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleGlassesForm} method="POST">
                        <Row className="mb-4 justify-content-between">
                            <Col className="mt-2" md={6} >
                                <h5>Frame Information</h5>
                                <FormGroup label="Frame Color" controlId="frameColor" formItem={<FormText />} />
                                <FormGroup label="Condition" controlId="condition" formItem={<FormSelect selections={conditionSelections} />} />
                            </Col>
                            <Col className="mt-2" md={5} >
                                <h5>Lens Information</h5>
                                <FormGroup label="Lens Type" controlId="lensType" 
                                    formItem={<FormCheckbox selectionsWithLabels={lensTypeSelections} onChange={handleLensTypeChange} name="lensType" type="radio" />} 
                                />
                                <FormGroup label="Upload Image (Optional)" controlId="lensImage" formItem={<FormImage />} />
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
                                            <FormGroup label="ADD" controlId="leftADD" formItem={<FormNumber />} />

                                        </Stack>
                                    </Stack>
                                </Card.Body>
                            </Card>
                        </Row>
                        <Row className="px-4 mb-3">
                            <Card>
                                <Card.Body className="d-flex justify-content-start">
                                    <Stack>
                                        <h6 className="">Right Eye (OD)</h6>
                                        <Stack direction="horizontal" className="me-auto" gap={3}>
                                            <FormGroup label="Sphere (SPH)" controlId="rightSPH" formItem={<FormNumber />} />
                                            <FormGroup label="Cylinder (CYL)" controlId="rightCYL" formItem={<FormNumber />} />
                                            <FormGroup label="Axis" controlId="rightAxis" formItem={<FormNumber />} />
                                            <FormGroup label="ADD" controlId="rightADD" formItem={<FormNumber />} />
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