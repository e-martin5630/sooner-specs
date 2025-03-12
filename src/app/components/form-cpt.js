import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
 
export function FormText() {
    return (
        <Form.Control type="text"  required />
    );
}

export function FormSelect({ selections }) {
    return (
        <Form.Select>
            {selections.map((selection, index) => (
                 <option key={index}>{selection}</option>
            ))}
        </Form.Select>
    );
}

export function FormCheckbox({ selectionsWithLabels, name, type, onChange }) {
    return (
        <div key={`default-${type}`} className="mb-3">
        {selectionsWithLabels.map(({key, label}) => (
            <Form.Check name={name} key={key} onChange={onChange} type={type} id={key} label={label} />
        ))}
        </div>
    );
}

export function FormNumber() {
    return (
        <Form.Control step="0.0001" type="number" />
    );
}

export function FormImage() {
    return (
        <Form.Control type="file" />
    );
}


export default function FormGroup({ label, controlId, formItem}) {
    return (
        <Form.Group className="mt-2" controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            {formItem}
        </Form.Group>
    )

}