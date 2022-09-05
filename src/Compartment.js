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
import { HouseDoorFill, PersonCircle } from 'react-bootstrap-icons';
import TreeItem from '@material-ui/lab/TreeItem';
import FolderIcon from '@material-ui/icons/Folder';
import { Container as MaterialUIContainer } from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TreeView from '@material-ui/lab/TreeView';
import Card from 'react-bootstrap/Card'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

export const Compartment = (props) => {
  const [modalShow, setModalShow] = useState(false);
  //const [createFlag, setCreateFlag] = useState(false);
  //const [consumeFlag, setConsumeFlag] = useState(false);
  const [datasetSelected, setDatasetSelected] = useState('Pick an option');
  const [sourceTypeSelected, setSourceTypeSelected] = useState(false);
  const [pageBtnStatus, setPageBtnStatus] = useState('disabled')
  const [datasetBtnStatus, setDatasetBtnStatus] = useState('')
  const [logsVariant, setLogsVariant] = useState('light')
  const [citibikeVariant, setCitibikeVariant] = useState('light')
  const [twitterVariant, setTwitterVariant] = useState('light')
  const [stataVariant, setStataVariant] = useState('light')
  const [compJsonData, setCompJsonData] = useState(null)
  const [datalakeVariant, setDatalakeVariant] = useState('light')
  const [dataredactionVariant, setDataredactionVariant] = useState('light')
  const [newCompFlag, setNewCompFlag] = useState(false)
  const [newCompName, setNewCompName] = useState('')
  const [clickedTreeComp, setClickedTreeComp] = useState('')
  const [clickedCompartmentID, setClickedCompartmentID] = useState('')
  const [msg, setMsg] = useState('')
  const history = useHistory();


  const handleNextClick = (e) => {
    console.log(e);
    console.log(props.location.state.userocid)
    getCompartmentID(props.location.state.userocid, clickedTreeComp)
    console.log(clickedCompartmentID)

    //history.push({ pathname: "/compartment", state: { userocid: props.location.state.userocid, treeselection: props.location.state.treeselection, serverusername: props.location.state.serverusername, ipaddress: props.location.state.ipaddress, privatekey: props.location.state.privatekey, srctype: props.location.state.srctype, AdwUrl: createAdwUrl, dataset: props.location.state.dataset, source: props.location.state.source, userdata: props.location.state.userdata, sink: sinkType, stream: props.location.state.stream, partitions: props.location.state.partitions } })
    //history.push("/summary")
  }

  const useStyles = makeStyles({
    root: {
      height: 216,
      flexGrow: 1,
      maxWidth: 400,
    },
  });
  const classes = useStyles();
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

  const handleSelect = (e) => {
    console.log(e);
    console.log(e.target.value);
    setDatasetSelected(e)
    if (datalakeVariant === 'primary') {
      history.push({ pathname: "/datalake", state: { dataset: datasetSelected } })
    }
    else if (dataredactionVariant === 'primary') {
      history.push({ pathname: "/dataredaction", state: { dataset: datasetSelected } })
    }


  }

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
      console.log(response.data)
      //let dirData = response.data
      //console.log(dirData)

    }).catch(function (error) {

      console.log(error);
    });
  }

  async function listCompartments(userocid) {
    const formData = new FormData();
    //formData.append("sid", sid);
    formData.append("userocid", userocid);

    await axios({
      url: `http://144.24.132.94:8088/listcompartments/`,
      method: 'POST',
      data: formData,
      headers: {
        contentType: "multipart/form-data"
      }
    }).then(function (response) {

      if (response.data.statuscode === "success") {
        //console.log(response.data)
        setCompJsonData(response.data.apiData)
        //let dirData = response.data
        //console.log(dirData)
      }
      else if (response.data.statuscode === "error") {
        setPageBtnStatus("disabled")
        setMsg("We witnessed a failure")
        setMsg(response.data.message)
      }


    }).catch(function (error) {

      console.log(error);
    });
  }

  async function getCompartmentID(userocid, compartmentclicked) {
    const formData = new FormData();
    //formData.append("sid", sid);
    formData.append("userocid", userocid);
    formData.append("compartmentname", compartmentclicked);

    await axios({
      url: `http://144.24.132.94:8088/getcompartmentID/`,
      method: 'POST',
      data: formData,
      headers: {
        contentType: "multipart/form-data"
      }
    }).then(function (response) {
      if (response.data.statuscode === "success") {
        console.log(response.data.message)
        setClickedCompartmentID(response.data.message)
        //let dirData = response.data
        //console.log(dirData)
      }
      else if (response.data.statuscode === "error") {
        setPageBtnStatus("disabled")
        setMsg(response.data.message)

      }


    }).catch(function (error) {

      console.log(error);
    });
  }


  useEffect(() => {
    console.log("use effect here")
    generateUserConfig(props.location.state.userocid)
    console.log("9999999999")
    console.log(props.location.state.userocid)
    listCompartments(props.location.state.userocid)

  }, []);

  const dirData = {
    'id': 402, 'name': 'root', 'children': [{ 'id': 598, 'name': 'IaaSimov', 'children': [{ 'id': 955, 'name': 'ADB', 'children': [{ 'id': 576, 'name': 'A', 'children': [{ 'id': 959, 'name': 'B', 'children': [{ 'id': 493, 'name': 'C' }] }] }, { 'id': 3, 'name': 'A-sibling' }, { 'id': 767, 'name': 'aaa' }, { 'id': 656, 'name': 'testnov9' }] }] }, { 'id': 690, 'name': 'ManagedCompartmentForPaaS' }]
  }

  const handleTreeClick = (e) => {
    console.log("Tree click ....")
    console.log(e)

    setClickedTreeComp(e)

  }

  const renderTree = (nodes) => (

    < TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} onClick={() => { handleTreeClick(nodes.name) }}>
      { Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem >
  );


  const FileSystemNavigator = (dirData) => {
    let str = JSON.stringify(dirData)
    let jsonObj = JSON.parse(str)
    console.log(jsonObj)
    //console.log(dirData)

    return (
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={['root']}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTree(jsonObj)}
      </TreeView>
    );
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

  const handleExistComp = () => {
    setNewCompFlag(false)
  }

  const handleNewComp = () => {

    setNewCompFlag(true)
  }

  const handleCompName = (e) => {
    console.log(e.target.value)
    setNewCompName(e.target.value)
  }
  const handleHomeClick = () => {
    history.push({ pathname: "/home", state: { userocid: props.location.state.userocid } })
  }

  const handleDataLakeSelect = (e) => {

    history.push({ pathname: "/datalake", state: { userocid: props.location.state.userocid, dataset: props.location.state.dataset } })


  }

  return (
    <>
      <Image src="images/generic_theme.png" fluid />
      <Navbar bg="light" variant="light">
        {/*<Navbar.Brand href="/"><HouseDoorFill color="black" size={30} /></Navbar.Brand>*/}
        <Nav.Link to={'/home'} onClick={handleHomeClick} ><HouseDoorFill color="black" size={30} /></Nav.Link>

        <Nav className="mr-auto">
          <Nav.Link onClick={handleDataLakeSelect}>Data Lake</Nav.Link>
          <Nav.Link >Data Redaction</Nav.Link>
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

      <Jumbotron fluid>
        {sourceTypeSelected}


        <div className="col-md-12 text-center">
          <br />
          <br />
          <Form>
            <Form.Label>Select an option from below to deploy your resources</Form.Label>
            <Form.Check
              type="radio"
              label="Existing compartment" onClick={handleExistComp} checked={newCompFlag ? false : true} />

            <br />
            <Form.Check
              type="radio"
              label="Create a new compartment" onClick={handleNewComp} checked={newCompFlag ? true : false} />
            <br />

            <br />
            <CssBaseline />
            {newCompFlag ?
              <Form.Group>
                <Form.Control type="text" placeholder="Compartment Name" onChange={handleCompName} />
                <Form.Text className="text-muted">
                  Enter a name for the compartment that you wish to create
          </Form.Text>
              </Form.Group> : null}
            <Card style={{ width: '18rem' }}>
              <Card.Body>

                {console.log(compJsonData)}
                {compJsonData !== null ? FileSystemNavigator(compJsonData) : null}
              </Card.Body>
            </Card>


            <br />
            <br />

          </Form>
          <Button variant="outline-primary" size="lg" onClick={history.goBack} >
            Prev
      </Button>
          {'  '}
          <Button variant="outline-primary" size="lg" onClick={handleNextClick} disabled={clickedTreeComp !== '' ? false : true}>
            Next
      </Button>
          <br />
          {msg}
        </div>
      </Jumbotron>
      {(clickedCompartmentID !== '' && newCompFlag) ? history.push({ pathname: "/summary", state: { noSql: props.location.state.noSql, objStoreNameChecked: props.location.state.objStoreNameChecked, sinkObjStore: props.location.state.sinkObjStore, newcompartmentname: newCompName, parentcompartmentID: clickedCompartmentID, userocid: props.location.state.userocid, treeselection: props.location.state.treeselection, serverusername: props.location.state.serverusername, ipaddress: props.location.state.ipaddress, privatekey: props.location.state.privatekey, srctype: props.location.state.srctype, AdwUrl: props.location.state.AdwUrl, dataset: props.location.state.dataset, source: props.location.state.source, userdata: props.location.state.userdata, sink: props.location.state.sink, stream: props.location.state.stream, partitions: props.location.state.partitions } }) : null}
      {(clickedCompartmentID !== '' && !newCompFlag) ? history.push({ pathname: "/summary", state: { noSql: props.location.state.noSql, objStoreNameChecked: props.location.state.objStoreNameChecked, sinkObjStore: props.location.state.sinkObjStore, newcompartmentname: newCompName, parentcompartmentID: '', compartmentID: clickedCompartmentID, userocid: props.location.state.userocid, treeselection: props.location.state.treeselection, serverusername: props.location.state.serverusername, ipaddress: props.location.state.ipaddress, privatekey: props.location.state.privatekey, srctype: props.location.state.srctype, AdwUrl: props.location.state.AdwUrl, dataset: props.location.state.dataset, source: props.location.state.source, userdata: props.location.state.userdata, sink: props.location.state.sink, stream: props.location.state.stream, partitions: props.location.state.partitions } }) : null}
    </>
  );

}

export default Compartment;