import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import '../globals.css';

export function Header({ page, setPage }) {

    return (
        <header className="h-100 app-header d-flex flex-column justify-content-center align-items-center">
            <div>
                <h1 className="pt-4 fst-italic">Glasses Inventory Site</h1>
            </div>
            <div className="mb-2">
                <Nav fill className="justify-content-center" variant="underline" activeKey={page} onSelect={(selectedKey) => setPage(selectedKey)} >
                    <Nav.Item>
                        <Nav.Link className="text-white" eventKey="home">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="text-white" eventKey="donate">Donate</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="text-white" eventKey="browse">Browse</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        </header>
    );
};