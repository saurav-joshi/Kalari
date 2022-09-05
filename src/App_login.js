import React from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { Button, Alert, Row, Col } from 'react-bootstrap';
import LeftSide from "./LeftSide";
import Menu from "./Menu";
import RightSide from "./RightSide";
function App() {
    return (
        <div className="App">
            <Menu />
            <Row className="landing">
                <Col ><LeftSide /></Col>

                <Col ><RightSide /></Col>
            </Row>
        </div>
    );
}

export default App;