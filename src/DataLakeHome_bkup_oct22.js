import React, { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import './App.css';
import Carousel from 'react-bootstrap/Carousel'
import { useHistory } from "react-router-dom";
import Image from 'react-bootstrap/Image'
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap'
import { HouseDoorFill } from 'react-bootstrap-icons';

export const DataLakeHome = () => {
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
  const history = useHistory();


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

  const handleSelect = (e) => {
    console.log(e);
    setDatasetSelected(e)

    history.push({ pathname: "/source", state: { dataset: datasetSelected } })
  }



  const handleModalSubmit = () => {
    //setStreamBtnStatus('disabled')
    setDatasetBtnStatus('disabled')
    setSourceTypeSelected(true)
    setModalShow(false)

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
  return (
    < Container className="p-3" >

      <Image src="images/generic_theme.png" fluid />
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/"><HouseDoorFill color="black" size={30} /></Navbar.Brand>

        <Nav className="mr-auto">
          <Nav.Link href="datalake">Data Lake</Nav.Link>
          <Nav.Link href="dataredaction">Data Redaction</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-primary">Search</Button>
        </Form>
      </Navbar>
      <Jumbotron fluid>

        <h1 className="header">OCI Streaming Service - Demo/Stub</h1>
        <br />
        <br />
        <h2 className="header">Pick your data source</h2>
        <br />
        <div class="col-md-12 text-center">
          <Button variant={logsVariant} size="sm" onClick={() => { handleDataSelect("logs") }} disabled>
            <Image src="images/logs.png" roundedCircle />
            <br />
            Logs Data
          </Button>
          {'   '}
          <Button variant={twitterVariant} size="sm" onClick={() => { handleDataSelect("twitter") }} disabled>
            <Image src="images/twitter.png" roundedCircle />
            <br />
            Twitter Data
          </Button>
          {'   '}
          <Button variant={citibikeVariant} size="sm" onClick={() => { handleDataSelect("citibike") }} disabled>
            <Image src="images/citibike_data.png" roundedCircle />
            <br />
            Citi Bike Trip Data
          </Button>
          {'   '}
          <Button variant={stataVariant} size="sm" onClick={() => { handleDataSelect("stata") }}>
            <Image src="images/stata.png" roundedCircle />
            <br />
            Stata Data
          </Button>
          <br />
          <br />
          <Button variant="outline-primary" size="lg" onClick={handleSelect} disabled={pageBtnStatus}>
            Next
      </Button>


        </div>


      </Jumbotron>
    </Container >
  );

}

export default DataLakeHome;