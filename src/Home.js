import React, { useState, useEffect } from 'react';
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
import { HouseDoorFill, PersonCircle, EmojiSmileFill } from 'react-bootstrap-icons';
import axios from 'axios'

export const Home = (props) => {
  console.log(props.location.state.userocid)
  const [modalShow, setModalShow] = useState(false);
  //const [createFlag, setCreateFlag] = useState(false);
  //const [consumeFlag, setConsumeFlag] = useState(false);
  const [datasetSelected, setDatasetSelected] = useState('Select a compartment');
  const [sourceTypeSelected, setSourceTypeSelected] = useState(false);
  const [pageBtnStatus, setPageBtnStatus] = useState('disabled')
  const [datasetBtnStatus, setDatasetBtnStatus] = useState('')
  const [logsVariant, setLogsVariant] = useState('light')
  const [citibikeVariant, setCitibikeVariant] = useState('light')
  const [twitterVariant, setTwitterVariant] = useState('light')
  const [stataVariant, setStataVariant] = useState('light')

  const [datalakeVariant, setDatalakeVariant] = useState('light')
  const [dataredactionVariant, setDataredactionVariant] = useState('light')
  const [msg, setMsg] = useState('');
  const [username, setUsername] = useState('');
  const history = useHistory();


  const handleDataSelect = (e) => {
    console.log(e);
    setDatasetSelected(e)
    if (e === 'data_lake') {
      setDatalakeVariant("primary")
      setDataredactionVariant("light")
    }
    else if (e === "data_redaction") {
      setDatalakeVariant("light")
      setDataredactionVariant("primary")
    }
    setPageBtnStatus('')
  }

  /*const handleSelect = (e) => {
    console.log(e);
    console.log(e.target.value);
    setDatasetSelected(e)
    if (datalakeVariant === 'primary') {
      //console.log(props.location.state.userocid)
      history.push({ pathname: "/datalake", state: { userocid: props.location.state.userocid, dataset: datasetSelected } })
    }
    else if (dataredactionVariant === 'primary') {
      history.push({ pathname: "/dataredaction", state: { userocid: props.location.state.userocid, dataset: datasetSelected } })
    }


  }*/


  const handleDataLakeSelect = (e) => {

    history.push({ pathname: "/datalake", state: { userocid: props.location.state.userocid, dataset: datasetSelected } })


  }

  const handleDataRedactSelect = (e) => {

    history.push({ pathname: "/dataredaction", state: { userocid: props.location.state.userocid, dataset: datasetSelected } })


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

  const handleIconClick = (e) => {
    console.log("Yayayayayay")
  }
  /*return (
    < Container className="p-3" >
      <Image src="images/main_theme.png" fluid />
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


        <h1 className="header">Oracle Cloud Infrastructure - Demo/Stub</h1>
        <br />
        <br />
        <h2 className="header">Pick your category</h2>
        <br />
        <div class="col-md-12 text-center">
          <Button variant={datalakeVariant} size="lg" onClick={() => { handleDataSelect("data_lake") }} >
            <Image src="images/data_lake.png" roundedCircle />
            <br />
            <br />
            Data Lake
          </Button>
          {'   '}
          <Button variant={dataredactionVariant} size="lg" onClick={() => { handleDataSelect("data_redaction") }} >
            <Image src="images/redaction.png" roundedCircle />
            <br />
            <br />
            Data Redaction
          </Button>
          {'   '}

          <br />
          <br />
          <Button variant="outline-primary" size="lg" onClick={handleSelect} disabled={pageBtnStatus}>
            Next
      </Button>


        </div>


      </Jumbotron>
    </Container >
  );*/

  async function generateUserConfig(userocid) {
    const formData = new FormData();
    //formData.append("sid", sid);
    formData.append("userocid", userocid);

    await axios({
      url: `http://144.24.132.94:8088/generateuserconfig/`,
      method: 'POST',
      data: formData,
      headers: {
        contentType: "multipart/form-data"
      }
    }).then(function (response) {
      console.log(response.data.message)
      if (response.data.statuscode === "error") {
        setMsg(response.data.message)

      }
      //let dirData = response.data
      //console.log(dirData)

    }).catch(function (error) {

      console.log(error);
    });
  }

  useEffect(() => {
    console.log("use effect here")
    let email = props.location.state.loginUser
    if (email !== "" && email !== undefined) {
      let username = email.substring(0, email.lastIndexOf("@"));
      /*if (username === "jbulan") {
        setUsername("Joseph")
      } else if (username === "saurav.joshi") {
        setUsername("Saurav Joshi")
      } else {
        setUsername(username.replace('.', ' ').toUpperCase())
      }*/
      setUsername(username.replace('.', ' ').toUpperCase())
    }

    generateUserConfig(props.location.state.userocid)
  }, []);
  const handleHomeClick = () => {
    history.push({ pathname: "/home", state: { userocid: props.location.state.userocid } })
  }

  const divStyle = {
    backgroundImage: 'url(https://thumbs.gfycat.com/BoldRelievedChickadee-size_restricted.gif)',
    height: '50vh',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <>

      <Image src="images/generic_theme.png" fluid />
      <Navbar bg="light" variant="light">
        {/*<Navbar.Brand href="/home"><HouseDoorFill color="black" size={30} /></Navbar.Brand>*/}
        <Nav.Link to={'/home'} onClick={handleHomeClick} ><HouseDoorFill color="black" size={30} /></Nav.Link>

        <Nav className="mr-auto">
          {/*<Nav.Link href="datalake">Data Lake</Nav.Link>*/}
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

        <div className="col-md-12 text-center" >
          <br />
          <br />
          <h1 className="header"><b>Welcome {username} ! </b><EmojiSmileFill color="black" size={40} /></h1>
          <br />
          <p><b>Data Lake: </b> Build a data lake on the go!</p>
          <p><b>Data Redaction: </b> Perform redaction operation on any dataset.</p>
          <p>Go ahead and give it a try!!</p>
          <br />
          <br />
          {msg}

        </div>

      </Jumbotron>
    </>
  );

}

