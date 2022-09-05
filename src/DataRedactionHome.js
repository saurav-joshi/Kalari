import React, { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import './App.css';
import Carousel from 'react-bootstrap/Carousel'
import { useHistory } from "react-router-dom";
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { Navbar, Nav, FormControl } from 'react-bootstrap'
import { HouseDoorFill, KeyFill, Wallet2, FilePersonFill, LockFill } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card'

export const DataRedactionHome = (props) => {
    const [modalShow, setModalShow] = useState(false);
    //const [createFlag, setCreateFlag] = useState(false);
    //const [consumeFlag, setConsumeFlag] = useState(false);
    const [datasetSelected, setDatasetSelected] = useState('Pick a data source');
    const [sourceTypeSelected, setSourceTypeSelected] = useState(false);
    const [pageBtnStatus, setPageBtnStatus] = useState('disabled')
    const [datasetBtnStatus, setDatasetBtnStatus] = useState('')
    const [logsVariant, setLogsVariant] = useState('light')
    const [citibikeVariant, setCitibikeVariant] = useState('light')
    const [twitterVariant, setTwitterVariant] = useState('light')
    const [stataVariant, setStataVariant] = useState('light')
    const [sid, setSid] = useState('');
    const [adwDbName, setAdwDbName] = useState('');
    const [parentSchema, setParentSchema] = useState('');
    const [childSchema, setChildSchema] = useState('');
    const [policyName, setPolicyName] = useState('');
    const [msg, setMsg] = useState('');
    const [password, setPassword] = useState('');
    const [childSchPassword, setChildSchPassword] = useState('');
    const [tableName, setTableName] = useState('');
    const [wallet, setWallet] = useState(null);
    const history = useHistory();
    const [tblData, setTblData] = useState(null);

    const handleDataSelect = (e) => {
        console.log(e);
        setDatasetSelected(e)
        if (e === 'logs') {
            setLogsVariant("info")
            setTwitterVariant("light")
            setCitibikeVariant("light")
            setStataVariant("light")
        }
        else if (e === "twitter") {
            setLogsVariant("light")
            setTwitterVariant("info")
            setCitibikeVariant("light")
            setStataVariant("light")
        }
        else if (e === "citibike") {
            setLogsVariant("light")
            setTwitterVariant("light")
            setCitibikeVariant("info")
            setStataVariant("light")
        }
        else if (e === "stata") {
            setLogsVariant("light")
            setTwitterVariant("light")
            setCitibikeVariant("light")
            setStataVariant("info")
        }
        setPageBtnStatus('')
    }



    const handleNext = () => {
        const formData = new FormData();
        //formData.append("sid", sid);
        formData.append("user", parentSchema);
        formData.append("pwd", password);
        formData.append("wallet", wallet)

        axios({
            url: `http://144.24.132.94:8083/fetchAdwTbls/`,
            method: 'POST',
            data: formData,
            headers: {
                contentType: "multipart/form-data"
            }
        }).then(function (response) {
            if (response.data.statuscode === 'success') {
                let tableData = response.data.apiData
                console.log(tableData)
                history.push({ pathname: "/showtables", state: { adwDBName: adwDbName, policy: policyName, parentSchema: parentSchema, pwd: password, childSchema: childSchema, childSchemaPwd: childSchPassword, tblData: tableData } })
            }
            else {
                setMsg(response.data.message)
            }
        }).catch(function (error) {

            console.log(error);
        });
        //history.push({ pathname: "/showtables", state: { sid: sid, user: user, pwd: password, wallet: wallet } })


    }



    const handleModalSubmit = () => {
        //setStreamBtnStatus('disabled')
        setDatasetBtnStatus('disabled')
        setSourceTypeSelected(true)
        setModalShow(false)

    }

    const handleSID = (e) => {
        //console.log(e.target.value)
        setSid(e.target.value)
    }

    const handleAdwDbName = (e) => {
        //console.log(e.target.value)
        setAdwDbName(e.target.value)
    }

    const handleParentSchema = (e) => {
        //console.log(e.target.value)
        setParentSchema(e.target.value)
    }

    const handleChildSchema = (e) => {
        //console.log(e.target.value)
        setChildSchema(e.target.value)
    }

    const handlePolicy = (e) => {
        //console.log(e.target.value)
        setPolicyName(e.target.value)
    }

    const handlePwd = (e) => {
        //console.log(e.target.value)
        setPassword(e.target.value)
    }

    const handleChildSchPwd = (e) => {
        //console.log(e.target.value)
        setChildSchPassword(e.target.value)
    }

    const handleWallet = (e) => {
        console.log(e.target.files[0])
        setWallet(e.target.files[0])
    }
    /*return (
      < Container className="p-3" >
        <Image src="images/main_theme.png" fluid />
        <Jumbotron fluid>
  
          <h1 className="header">OCI Streaming Service - Demo/Stub</h1>
          <br />
          <br />
          <br />
          <div class="col-md-12 text-center">
            <DropdownButton id="dropdown-basic-button" title={datasetSelected} onSelect={handleDataSelect} disabled={datasetBtnStatus}>
              <Dropdown.Item eventKey="Logs Data">Logs Data</Dropdown.Item>
              <Dropdown.Item eventKey="Twitter Data">Twitter Data</Dropdown.Item>
              <Dropdown.Item eventKey="Citibike Tripdata">Citibike Tripdata</Dropdown.Item>
              <Dropdown.Item eventKey="Stata Data">Stata Data</Dropdown.Item>
            </DropdownButton>
            <br />
            <br />
            <Button variant="outline-primary" size="lg" onClick={handleSelect} disabled={pageBtnStatus}>
              Next
        </Button>
  
  
          </div>
  
  
        </Jumbotron>
      </Container >
    );*/
    const handleHomeClick = () => {
        history.push({ pathname: "/home", state: { userocid: props.location.state.userocid } })
    }
    const handleDataLakeSelect = (e) => {

        history.push({ pathname: "/datalake", state: { userocid: props.location.state.userocid } })


    }

    return (
        <>
            <Image src="images/generic_theme.png" fluid />
            <Navbar bg="light" variant="light">
                {/*<Navbar.Brand href="/"><HouseDoorFill color="black" size={30} /></Navbar.Brand>*/}
                <Nav.Link to={'/home'} onClick={handleHomeClick} ><HouseDoorFill color="black" size={30} /></Nav.Link>
                <Nav className="mr-auto">
                    <Nav.Link onClick={handleDataLakeSelect}>Data Lake</Nav.Link>
                    <Nav.Link href="dataredaction">Data Redaction</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-primary">Search</Button>
                </Form>
            </Navbar>
            <Jumbotron fluid>

                <h2 className="header">Data Redaction </h2>
                <br />
                <div class="col-md-12 ">
                    <Card >
                        <div class="text-center">
                            <Card.Header>Input ADW Details</Card.Header>
                        </div>
                        <Card.Body>

                            <Card.Text>
                                <Form>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Col sm={10}>
                                                <br />
                                                <br />
                                                <Form.Label>DB Name (E.g: citibikedb)</Form.Label>
                                                <Form.Control as="textarea" rows="1" onChange={handleAdwDbName} />
                                                <br />
                                                <br />
                                                <Form.Label>DB/Schema Admin <FilePersonFill /></Form.Label>
                                                <Form.Control as="textarea" rows="1" onChange={handleParentSchema} />
                                                <br />
                                                <br />
                                                <Form.Label>Password <KeyFill /> </Form.Label>
                                                <Form.Control type="password" onChange={handlePwd} />
                                                <br />
                                                <br />
                                                <Form.Label>Wallet File <Wallet2 /></Form.Label>
                                                <Form.Control
                                                    id="fileUpload"
                                                    type="file" onChange={handleWallet} />
                                                <br />
                                                <br />
                                                <Form.Label>DB/Schema User <FilePersonFill /></Form.Label>
                                                <Form.Control as="textarea" rows="1" onChange={handleChildSchema} />
                                                <br />
                                                <br />
                                                <Form.Label>DB/Schema User Password <KeyFill /> </Form.Label>
                                                <Form.Control type="password" onChange={handleChildSchPwd} />
                                                <br />
                                                <br />
                                                <Form.Label>Redaction Policy Name <LockFill /></Form.Label>
                                                <Form.Control as="textarea" rows="1" onChange={handlePolicy} />
                                                <br />
                                                <br />
                                            </Col>
                                        </div>
                                    </Form.Group>

                                </Form>
                            </Card.Text>
                            <div class="col-md-12 text-center">
                                <Button variant="outline-primary" size="lg" onClick={handleNext}>Next</Button>
                            </div>

                        </Card.Body>

                    </Card>
                    <br />
                    <br />
                    {msg}
                </div>


            </Jumbotron>
        </>
    );

}

export default DataRedactionHome;