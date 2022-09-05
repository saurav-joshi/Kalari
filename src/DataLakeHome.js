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
import { HouseDoorFill, PersonCircle } from 'react-bootstrap-icons';
import CenteredModal from './CustomModal.js'
import { Link } from 'react-router-dom';
import axios from 'axios'

export const DataLakeHome = (props) => {

  console.log(props.location.state.userocid)

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
  const [dataSource, setDataSource] = useState('')
  const [msg, setMsg] = useState('')
  const [userGroupExists, setUserGroupExists] = useState('yes')

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

  const handleSelect = () => {
    //console.log(e);
    //setDatasetSelected(e)

    if (datasetSelected === 'twitter') {
      history.push({ pathname: "/datapipeline", state: { userocid: props.location.state.userocid, srctype: '', dataset: datasetSelected, source: '', userdata: '' } })
    }
    else {
      history.push({ pathname: "/source", state: { userocid: props.location.state.userocid, dataset: datasetSelected } })
    }

  }



  const handleModalSubmit = () => {
    //setStreamBtnStatus('disabled')
    setDatasetBtnStatus('disabled')
    setSourceTypeSelected(true)
    setModalShow(false)


  }

  async function checkUserGroupExists(uocid) {
    console.log("Checking user group: " + uocid)
    const formData = new FormData();
    //formData.append("sid", sid);
    formData.append("userocid", uocid);

    await axios({
      url: `http://144.24.132.94:8088/checkusergroup/`,
      method: 'POST',
      data: formData,
      headers: {
        contentType: "multipart/form-data"
      }
    }).then(function (response) {
      let userGrpExists = response.data.message
      console.log("userGrpExists: " + userGrpExists)
      if (response.data.statuscode === "success") {
        setUserGroupExists(userGrpExists)
      }
      else if (response.data.statuscode === "error") {
        setMsg(response.data.message)
      }

    }).catch(function (error) {

      console.log(error);
    });
  }

  const handleDataSource = (type) => {
    if (type === "internal") {
      checkUserGroupExists(props.location.state.userocid)

    }
    setDataSource(type)

  }

  const handleModalData = (t) => {
    console.log(t)

  }

  const handleDataset = (t) => {
    setDatasetSelected(t)
    setMsg("You have selected " + t)
    setPageBtnStatus('')

  }

  const handleHomeClick = () => {
    history.push({ pathname: "/home", state: { userocid: props.location.state.userocid } })
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

  const handleDataLakeSelect = (e) => {

    history.push({ pathname: "/datalake", state: { userocid: props.location.state.userocid, dataset: props.location.state.dataset } })


  }

  const handleDataRedactSelect = (e) => {

    history.push({ pathname: "/dataredaction", state: { userocid: props.location.state.userocid, dataset: datasetSelected } })


  }

  const divStyle = {
    //backgroundImage: 'url(https://image.freepik.com/free-vector/abstract-molecules-soft-grey-background-molecular-structures-dna-strand-neural-network-genetic-engineering-scientific-technological-concept_120542-498.jpg)',
    backgroundImage: 'url(https://www.oracle.com/a/ocom/img/cw22-event-list.jpg)',
    height: '70vh',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'stretch',
  };

  return (
    <>
      <Image src="images/generic_theme.png" fluid />
      <Navbar bg="light" variant="light">
        {/*<Navbar.Brand href="/home" ><HouseDoorFill color="black" size={30} /></Navbar.Brand>*/}
        <Nav.Link to={'/home'} onClick={handleHomeClick} ><HouseDoorFill color="black" size={30} /></Nav.Link>

        <Nav className="mr-auto">
          <Nav.Link onClick={handleDataLakeSelect}>Data Lake</Nav.Link>
          {/*<Nav.Link >Data Redaction</Nav.Link>*/}
          <Nav.Link onClick={handleDataRedactSelect}>Data Redaction</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-primary">Search</Button>
        </Form>
        <PersonCircle color="black" size={30} />
        &nbsp;
        &nbsp;
        <a href="/">Logout</a>
      </Navbar>
      <Jumbotron fluid style={divStyle}>

        <h1 className="header"><b>Area51 in action!</b></h1>
        <br />
        <br />
        <h3 className="header"><i>Pick your data source</i></h3>
        <br />
        <div className="col-md-12 text-center">
          <Button variant={logsVariant} size="lg" onClick={() => { handleDataSource("external"); setModalShow(true) }} >
            <Image src="images/external_data.png" roundedCircle />
            <br />
            External Data
          </Button>
          {'   '}
          <Button variant={twitterVariant} size="lg" onClick={() => { handleDataSource("internal"); setModalShow(true) }} >
            <Image src="images/internal_data.jpg" roundedCircle />
            <br />
            Internal Data
          </Button>

          <br />
          <br />
          <Button variant="outline-primary" size="lg" onClick={history.goBack}>
            Prev
      </Button>
          {'   '}
          <Button variant="outline-primary" size="lg" onClick={handleSelect} disabled={pageBtnStatus}>
            Next
      </Button>
          <br />
          <br />
          {msg}


        </div>
        <CenteredModal

          show={modalShow}
          onHide={() => setModalShow(false)}
          onSubmit={handleModalSubmit}
          modalData={handleModalData}
          dataSourceType={dataSource}
          callSetDataset={handleDataset}
          userGroupFlag={userGroupExists}
        />

      </Jumbotron>
    </>
  );

}

export default DataLakeHome;