import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import './App.css';
import Image from 'react-bootstrap/Image'
import Jumbotron from 'react-bootstrap/Jumbotron';
import { useHistory } from "react-router-dom";
import CenteredModal from './CustomModal.js'
import { ArrowRight } from 'react-bootstrap-icons';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap'
import { HouseDoorFill, PersonCircle } from 'react-bootstrap-icons';
import axios from 'axios'

const SourceScreen = (props) => {
    console.log(props.location.state.userocid)
    const [modalShow, setModalShow] = useState(false);
    const [fileUpload, setFileUpload] = useState(false);
    //const [fileUpload, setFileUpload] = useState(false);
    const [textBox, setTextBox] = useState(false);
    const [serverBox, setServerBox] = useState(false);
    const [pageBtnStatus, setPageBtnStatus] = useState('disabled')
    const [srcDetailsMsg, setSrcDetailsMsg] = useState(' ')
    const [srcDetailsFlag, setSrcDetailsFlag] = useState(false)
    const [srcType, setSrcType] = useState(false)
    const [treeFolder, setTreeFolder] = useState(false);
    const [folderData, setFolderData] = useState(null)
    //const [file, setFile] = useState(false)
    //const [objStoreName, setObjStoreName] = useState(' ')
    const [userInfo, setUserInfo] = useState(null)
    const [serverUser, setServerUser] = useState('');
    const [IPaddress, setIPaddress] = useState('');
    const [privateKey, setPrivateKey] = useState(null);
    const [treeSelection, setTreeselection] = useState('');

    //const [adwRadioSelect, setAdwRadioSelect] = useState(false);
    const history = useHistory();

    const handleModalSubmit = () => {
        setSrcDetailsFlag(true)
        setPageBtnStatus('')
        setModalShow(false)

    }
    const handleModalData = (t) => {
        console.log(t)

    }

    const handleFileUpload = (file) => {
        setUserInfo(file)

    }

    const handleHomeClick = () => {
        history.push({ pathname: "/home", state: { userocid: props.location.state.userocid } })
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
            if (response.data.statuscode === "success") {
                setSrcDetailsMsg(response.data.message)
            }
            else if (response.data.statuscode === "error") {
                setPageBtnStatus("disabled")
                setSrcDetailsMsg(response.data.message)
            }
            //let dirData = response.data
            //console.log(dirData)

        }).catch(function (error) {

            console.log(error);
        });
    }

    const handleObjStoreName = (objStoreName) => {
        console.log(objStoreName)
        setUserInfo(objStoreName)
        getBucketStatus(objStoreName)



    }
    const handleSecureConnect = (folderData, username, ipaddress, privatekey) => {
        console.log("in handle secure connect")
        console.log(folderData)
        setServerUser(username)
        setIPaddress(ipaddress)
        setPrivateKey(privatekey)
        setModalShow(true)
        setTreeFolder(true)
        setServerBox(false)
        setFolderData(folderData)



    }

    const handleTreeFileFolder = (selection) => {
        console.log("in source")
        console.log(selection)
        setTreeselection(selection)

    }

    const handleSelect = (e) => {
        console.log(e);
        history.push({ pathname: "/datapipeline", state: { userocid: props.location.state.userocid, treeselection: treeSelection, serverusername: serverUser, ipaddress: IPaddress, privatekey: privateKey, srctype: srcType, dataset: props.location.state.dataset, source: srcType, userdata: userInfo } })
    }

    const handleDataLakeSelect = (e) => {

        history.push({ pathname: "/datalake", state: { userocid: props.location.state.userocid, dataset: props.location.state.dataset } })


    }
    const handleDataRedactSelect = (e) => {

        history.push({ pathname: "/dataredaction", state: { userocid: props.location.state.userocid } })


    }

    const divStyle = {
        backgroundImage: 'url(https://image.freepik.com/free-vector/abstract-molecules-soft-grey-background-molecular-structures-dna-strand-neural-network-genetic-engineering-scientific-technological-concept_120542-498.jpg)',
        //backgroundImage: 'url(https://www.oracle.com/a/ocom/img/cw22-event-list.jpg)',
        height: '70vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'stretch',
    };

    return (
        <>
            <Image src="images/generic_theme.png" fluid />
            <Navbar bg="light" variant="light">
                {/*<Navbar.Brand href="/"><HouseDoorFill color="black" size={30} /></Navbar.Brand>*/}
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
                <h1 className="header"><b>Select your input data</b></h1>
                <br />
                <br />
                <br />
                <div class="col-md-12 text-center">
                    <Button variant="light" size="sm" onClick={() => { setTreeFolder(false); setPageBtnStatus(''); setSrcType("sample"); setSrcDetailsFlag(true); setSrcDetailsMsg("You've selected a Sample File"); }} >
                        <Image src="images/sample.png" roundedCircle />
                        <br />
                        Preloaded Sample Data
                    </Button>
                    {'   '}
                    <Button variant="light" size="sm" onClick={() => { setTreeFolder(false); setSrcDetailsFlag(false); setSrcType("secure_connect"); setSrcDetailsMsg("You've selected secure connect. Click Next"); setServerBox(true); setTextBox(false); setFileUpload(false); setModalShow(true) }} >
                        <Image src="images/server.png" roundedCircle />
                        <br />
                        Secure Connect
                    </Button>
                    {'   '}
                    <Button variant="light" size="sm" onClick={() => { setTreeFolder(false); setSrcDetailsFlag(false); setSrcType("file_input"); setSrcDetailsMsg("You've selected File upload. Click Next"); setServerBox(false); setTextBox(false); setFileUpload(true); setModalShow(true) }} >
                        <Image src="images/upload.png" roundedCircle />
                        <br />
                        Upload a file
                    </Button>
                    {'   '}
                    <Button variant="light" size="sm" onClick={() => { setTreeFolder(false); setSrcDetailsFlag(false); setSrcType("obj_store"); /*setSrcDetailsMsg("You've selected Object Storage. Click Next");*/ setServerBox(false); setTextBox(true); setFileUpload(false); setModalShow(true) }} >
                        <Image src="images/objStore.png" roundedCircle />
                        <br />
                        Object Storage
                    </Button>
                    <br />
                    <br />
                    {srcDetailsFlag ? srcDetailsMsg : null}

                    <br />
                    <br />
                    <Button variant="outline-primary" size="lg" onClick={history.goBack}>
                        Prev
      </Button>
                    {'   '}
                    <Button variant="outline-primary" size="lg" onClick={handleSelect} disabled={pageBtnStatus}>
                        Next
      </Button>
                </div>
                <CenteredModal
                    flagUploadFile={fileUpload}
                    flagObjStore={textBox}
                    flagSecureConnect={serverBox}
                    flagTreeFolder={treeFolder}
                    folderData={folderData}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onSubmit={handleModalSubmit}
                    modalData={handleModalData}
                    newFileUpload={handleFileUpload}
                    newObjStoreName={handleObjStoreName}
                    newSecureConnect={handleSecureConnect}
                    newSelectFileFolder={handleTreeFileFolder}
                    userocid={props.location.state.userocid}
                    datasetName={props.location.state.dataset}
                />
            </Jumbotron>
        </>
    );
}

export default SourceScreen;