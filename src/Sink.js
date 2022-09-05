import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import './App.css';
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Jumbotron from 'react-bootstrap/Jumbotron';
import { useHistory } from "react-router-dom";
import CenteredModal from './CustomModal.js'
import axios from 'axios'
import { Navbar, Nav, FormControl } from 'react-bootstrap'
import { HouseDoorFill, PersonCircle } from 'react-bootstrap-icons';


const SinkScreen = (props) => {
    console.log(props.location.state.userocid)
    const [fileUpload, setFileUpload] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [textBox, setTextBox] = useState(false);
    const [adw, setAdw] = useState(false);
    const [noSql, setNoSql] = useState(false);
    const [pageBtnStatus, setPageBtnStatus] = useState('disabled')

    const [noSqlSinkIcon, setNoSqlSinkIcon] = useState('disabled')
    const [objStoreSinkIcon, setObjStoreSinkIcon] = useState('disabled')
    const [adwSinkIcon, setAdwSinkIcon] = useState('disabled')

    const [sampleRadioSelect, setSampleRadioSelect] = useState(false);
    const [fileRadioSelect, setFileRadioSelect] = useState(false);
    const [objStoreRadioSelect, setObjStoreRadioSelect] = useState(false);
    const [adwRadioSelect, setAdwRadioSelect] = useState(false);
    const [chkBox, setChkBox] = useState(true);
    const [radioBtnStatus, setRadioBtnStatus] = useState('');
    const [sinkType, setSinkType] = useState('');
    const [sinkDetailsMsg, setSinkDetailsMsg] = useState(' ')
    const [sinkDetailsFlag, setSinkDetailsFlag] = useState(false)
    const [createAdwDetails, setCreateAdwDetails] = useState(null)
    const history = useHistory();
    const [msg, setMsg] = useState('');
    const [compartmentID, setCompartmentID] = useState('');
    const [sinkObjStoreName, setSinkObjStoreName] = useState('');
    const [objStoreNameChecked, setObjStoreNameChecked] = useState(false);
    const [noSqlName, setNoSqlName] = useState('');


    const handleSelect = (e) => {
        console.log(e);
        console.log('userocid: ' + props.location.state.userocid)
        console.log('compId: ' + compartmentID)

        if (compartmentID !== '') {
            console.log('nosql: ' + noSqlName)
            history.push({ pathname: "/summary", state: { noSql: noSqlName, objStoreNameChecked: objStoreNameChecked, sinkObjStore: sinkObjStoreName, compartmentID: compartmentID, userocid: props.location.state.userocid, treeselection: props.location.state.treeselection, serverusername: props.location.state.serverusername, ipaddress: props.location.state.ipaddress, privatekey: props.location.state.privatekey, srctype: props.location.state.srctype, AdwUrl: createAdwDetails, dataset: props.location.state.dataset, source: props.location.state.source, userdata: props.location.state.userdata, sink: sinkType, stream: props.location.state.stream, partitions: props.location.state.partitions } })
        }
        else {
            console.log('nosql: ' + noSqlName)
            history.push({ pathname: "/compartment", state: { noSql: noSqlName, objStoreNameChecked: objStoreNameChecked, sinkObjStore: sinkObjStoreName, userocid: props.location.state.userocid, treeselection: props.location.state.treeselection, serverusername: props.location.state.serverusername, ipaddress: props.location.state.ipaddress, privatekey: props.location.state.privatekey, srctype: props.location.state.srctype, AdwUrl: createAdwDetails, dataset: props.location.state.dataset, source: props.location.state.source, userdata: props.location.state.userdata, sink: sinkType, stream: props.location.state.stream, partitions: props.location.state.partitions } })
        }
        //history.push({ pathname: "/summary", state: { userocid: props.location.state.userocid, treeselection: props.location.state.treeselection, serverusername: props.location.state.serverusername, ipaddress: props.location.state.ipaddress, privatekey: props.location.state.privatekey, srctype: props.location.state.srctype, AdwUrl: createAdwUrl, dataset: props.location.state.dataset, source: props.location.state.source, userdata: props.location.state.userdata, sink: sinkType, stream: props.location.state.stream, partitions: props.location.state.partitions } })
        //history.push({ pathname: "/compartment", state: { userocid: props.location.state.userocid, treeselection: props.location.state.treeselection, serverusername: props.location.state.serverusername, ipaddress: props.location.state.ipaddress, privatekey: props.location.state.privatekey, srctype: props.location.state.srctype, AdwUrl: createAdwUrl, dataset: props.location.state.dataset, source: props.location.state.source, userdata: props.location.state.userdata, sink: sinkType, stream: props.location.state.stream, partitions: props.location.state.partitions } })
        //history.push({ pathname: "/compartment", state: { userocid: props.location.state.userocid, treeselection: props.location.state.treeselection, serverusername: props.location.state.serverusername, ipaddress: props.location.state.ipaddress, privatekey: props.location.state.privatekey, srctype: props.location.state.srctype, AdwUrl: createAdwUrl, dataset: props.location.state.dataset, source: props.location.state.source, userdata: props.location.state.userdata, sink: sinkType, stream: props.location.state.stream, partitions: props.location.state.partitions } })
        //history.push("/summary")
    }

    async function getBucketStatus(bucketname) {
        const formData = new FormData();
        //formData.append("sid", sid);
        formData.append("userocid", props.location.state.userocid);
        formData.append("bucketname", bucketname);


        await axios({
            url: `http://144.24.132.94:8088/checkbucket/`,
            method: 'POST',
            data: formData,
            headers: {
                contentType: "multipart/form-data"
            }
        }).then(function (response) {
            setSinkDetailsMsg(response.data.message)
            if (response.data.statuscode === "error") {
                setPageBtnStatus("disabled")
            }
            else if (response.data.statuscode === "success") {
                setCompartmentID(response.data.compartment_id)
            }
            //let dirData = response.data
            //console.log(dirData)

        }).catch(function (error) {

            console.log(error);
        });
    }

    const handleObjStoreName = (objStoreName) => {
        console.log(objStoreName);
        if (!objStoreName.checked) {
            setSinkObjStoreName(objStoreName.bucket)
            getBucketStatus(objStoreName.bucket)
        }
        else {
            setSinkObjStoreName(objStoreName.bucket)
            setCompartmentID('')
            setObjStoreNameChecked(true)
        }

    }

    useEffect(() => {
        chkBox ? setRadioBtnStatus('') : setRadioBtnStatus("disabled")
        if (!chkBox) {
            setPageBtnStatus('')
        }
    }, [chkBox]);

    useEffect(() => {
        if (props.location.state.dataset === "logs") {
            setNoSqlSinkIcon('')
            setObjStoreSinkIcon('disabled')
            setAdwSinkIcon('disabled')

        }
        else if (props.location.state.dataset === "twitter") {
            setNoSqlSinkIcon('disabled')
            setObjStoreSinkIcon('')
            setAdwSinkIcon('')

        }
        else if (props.location.state.dataset === "citibike") {

            setNoSqlSinkIcon('disabled')
            setObjStoreSinkIcon('')
            setAdwSinkIcon('')
        }

    }, []);

    const handleCheckBox = (e) => {
        console.log(chkBox);
        chkBox ? setChkBox(false) : setChkBox(true)
    }

    const handleModalSubmit = () => {
        setSinkDetailsFlag(true)
        setPageBtnStatus('')
        setModalShow(false)

    }

    async function setADWCreds(adwocid, user, pwd, tblName, wallet, adwFlagType) {
        const formData = new FormData();
        console.log(adwFlagType)
        //formData.append("sid", sid);
        formData.append("user", user);
        formData.append("pwd", pwd);
        formData.append("tblName", tblName);
        formData.append("wallet", wallet)
        formData.append("adwocid", adwocid)
        formData.append("adwFlagType", adwFlagType)
        formData.append("userocid", props.location.state.userocid)

        /*await axios.get('http://144.24.132.94:8083/setUri/' + sid + '/' + user + '/' + pwd + '/' + tblName + '/' + wallet)
            .then(response => setMsg(response.data.message))*/
        //contentType = "multipart/form-data"
        await axios({
            url: `http://144.24.132.94:8083/setUri/`,
            method: 'POST',
            data: formData,
            headers: {
                contentType: "multipart/form-data"
            }
        }).then(function (response) {
            if (response.data.statuscode === "success") {
                //setMsg(response.data.message);
                setSinkDetailsMsg(response.data.message);
                setCompartmentID(response.data.adwcompid)
            }
            else if (response.data.statuscode === "error") {
                setMsg(response.data.message);
                setPageBtnStatus("disabled")
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    async function createADW(cpu, storage, dbName, displayName, password, adwFlagType) {
        setMsg("New ADW details entered. ")
        var adw_create_dict = { "cpu": cpu, "storage": storage, "dbName": dbName, "displayName": displayName, "adminPwd": password, "userocid": props.location.state.userocid }
        setCreateAdwDetails(adw_create_dict)
        //setCreateAdwUrl('http://144.24.132.94:8083/createADW/' + cpu + '/' + storage + '/' + dbName + '/' + displayName + "/" + password + "/" + tblName)
        /*setMsg("Creating new ADW .....")
        await axios.get('http://144.24.132.94:8083/createADW/' + cpu + '/' + storage + '/' + dbName + '/' + displayName + "/" + password + "/" + tblName)
            .then(response => setMsg(response.data.message))*/
    }

    const handleExistADWModalData = (adwocid, user, pwd, tblName, wallet, adwFlagType) => {

        setADWCreds(adwocid, user, pwd, tblName, wallet, adwFlagType)
        setCompartmentID(compartmentID)

    }
    const handleDefaultADWModalData = (adwocid, user, pwd, tblName, wallet, adwFlagType) => {

        setADWCreds(adwocid, user, pwd, tblName, wallet, adwFlagType)
        setCompartmentID(compartmentID)

    }


    const handleNewADWModalData = (cpu, storage, dbName, displayName, password) => {

        createADW(cpu, storage, dbName, displayName, password)
        setCompartmentID('')


    }
    const handleNoSql = (noSqlType) => {

        if (noSqlType === "solr") {
            setCompartmentID('')
            setNoSqlName(noSqlType)
            setSinkDetailsMsg("You've selected Solr. Click Next")

        }
        else if (noSqlType === "es") {
            setCompartmentID('')
            setNoSqlName(noSqlType)
            setSinkDetailsMsg("You've selected Elastic Search. Click Next")

        }
        else if (noSqlType === "solr_es") {
            setCompartmentID('')
            setNoSqlName(noSqlType)
            setSinkDetailsMsg("You've selected both Elastic Search & Solr. Click Next")
        }
    }

    const handleHomeClick = () => {
        history.push({ pathname: "/home", state: { userocid: props.location.state.userocid } })
    }

    const handleDataLakeSelect = (e) => {

        history.push({ pathname: "/datalake", state: { userocid: props.location.state.userocid, dataset: props.location.state.dataset } })


    }

    const divStyle = {
        backgroundImage: 'url(https://image.freepik.com/free-vector/abstract-cloud-technology-system-sci-fi-background_115579-782.jpg)',
        height: '65vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        //opacity: 0.5,
    };

    const handleDataRedactSelect = (e) => {

        history.push({ pathname: "/dataredaction", state: { userocid: props.location.state.userocid } })


    }

    return (
        <>
            <Image src="images/generic_theme.png" fluid />
            <Navbar bg="light" variant="light">
                {/*<Navbar.Brand href="/"><HouseDoorFill color="black" size={30} /></Navbar.Brand>*/}
                <Nav.Link href='/home' to={'/home'} onClick={handleHomeClick} ><HouseDoorFill color="black" size={30} /></Nav.Link>
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
                <h1 className="header">Select a destination for the input data</h1>
                <br />
                <br />
                <br />

                <div class="col-md-12 text-center">
                    <Button variant="light" size="sm" onClick={() => { setSinkType("obj_store"); setSinkDetailsFlag(false); setSinkDetailsMsg("You've selected Object Storage. Click Next"); setNoSql(false); setAdw(false); setTextBox(true); setFileUpload(false); setModalShow(true) }} disabled={objStoreSinkIcon}>
                        <Image src="images/objStore.png" roundedCircle />
                        <br />
                        Object Storage
                    </Button>
                    {'   '}
                    <Button variant="light" size="sm" onClick={() => { setSinkType("adw"); setSinkDetailsFlag(false); setSinkDetailsMsg("");/*setSinkDetailsMsg("You've selected ADW. Click Next");*/setNoSql(false); setAdw(true); setTextBox(false); setFileUpload(false); setModalShow(true) }} disabled={adwSinkIcon}>
                        <Image src="images/adb.png" roundedCircle />
                        <br />
                        ADW
                    </Button>

                    {'   '}
                    <Button variant="light" size="sm" onClick={() => { setSinkType("nosql"); setSinkDetailsFlag(false); setSinkDetailsMsg("");/*setSinkDetailsMsg("You've selected ADW. Click Next");*/ setNoSql(true); setAdw(false); setTextBox(false); setFileUpload(false); setModalShow(true) }} disabled={noSqlSinkIcon}>
                        <Image src="images/nosql.png" roundedCircle />
                        <br />
                        NoSQL
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
                    {msg !== '' ? msg + ' Click Next' : null}
                    {sinkDetailsMsg !== '' ? sinkDetailsMsg : null}
                </div>
                <CenteredModal
                    flagUploadFile={fileUpload}
                    //flagObjStore={textBox}
                    flagSinkObjStore={textBox}
                    flagADW={adw}
                    flagNoSql={noSql}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onSubmit={handleModalSubmit}
                    existAdwModalData={handleExistADWModalData}
                    defaultAdwModalData={handleDefaultADWModalData}
                    newAdwModalData={handleNewADWModalData}
                    newObjStoreName={handleObjStoreName}
                    userocid={props.location.state.userocid}
                    newNoSql={handleNoSql}
                />
            </Jumbotron>
        </>
    );
}

export default SinkScreen;