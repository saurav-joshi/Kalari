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

const DataPipelineScreen = (props) => {
    console.log(props.location.state.p2)
    const [modalShow, setModalShow] = useState(false);
    const [fileUpload, setFileUpload] = useState(false);
    const [ociStream, setOciStream] = useState(false);
    const [textBox, setTextBox] = useState(false);
    const [pageBtnStatus, setPageBtnStatus] = useState('disabled')
    const [srcDetailsMsg, setSrcDetailsMsg] = useState(' ')
    const [srcDetailsFlag, setSrcDetailsFlag] = useState(false)
    const [streamName, setStreamName] = useState('');
    const [partitionCnt, setPartitionCnt] = useState(0);

    //const [adwRadioSelect, setAdwRadioSelect] = useState(false);
    const history = useHistory();

    const handleModalSubmit = () => {
        setSrcDetailsFlag(true)
        setPageBtnStatus('')
        setModalShow(false)

    }
    const handleModalData = (sName, pCount) => {
        console.log(sName);
        console.log(pCount)
        setStreamName(sName)
        setPartitionCnt(pCount)

    }

    const handleSelect = (e) => {

        history.push({ pathname: "/sink", state: { userocid: props.location.state.userocid, treeselection: props.location.state.treeselection, serverusername: props.location.state.serverusername, ipaddress: props.location.state.ipaddress, privatekey: props.location.state.privatekey, srctype: props.location.state.srctype, dataset: props.location.state.dataset, source: props.location.state.source, userdata: props.location.state.userdata, stream: streamName, partitions: partitionCnt } })
    }
    const handleHomeClick = () => {
        history.push({ pathname: "/home", state: { userocid: props.location.state.userocid } })
    }

    const handleDataLakeSelect = (e) => {

        history.push({ pathname: "/datalake", state: { userocid: props.location.state.userocid, dataset: props.location.state.dataset } })


    }
    const divStyle = {
        //backgroundImage: 'url(https://cdn.app.compendium.com/uploads/user/e7c690e8-6ff9-102a-ac6d-e4aebca50425/5bbf683c-1969-4f37-a771-4c954b1bed36/File/795bc39175b182390ccda11799435ed0/1600x600_blog_cloud_infrastructure.jpg)',
        //backgroundImage: 'url(https://www.stockvault.net/data/2017/08/08/237936/preview16.jpg)',
        //backgroundImage: 'url(https://www.ecommercejuice.com/wp-content/uploads/2018/02/Java-Cloud-Technology-667x400.png)',
        backgroundImage: 'url(https://www.oracle.com/a/ocom/img/social-og-oracle-cloud-platform.jpg)',
        height: '70vh',
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
                <h1 className="header"><b>Choose your data traffic carrier</b></h1>
                <br />
                <br />
                <br />
                <div class="col-md-12 text-center">
                    <Button variant="light" size="sm" onClick={() => { setSrcDetailsFlag(false); setSrcDetailsMsg("You've selected OCI Streaming Service. Click Next"); setTextBox(false); setFileUpload(false); setOciStream(true); setModalShow(true) }}>
                        <Image src="images/oracle_cloud.png" roundedCircle />
                        <br />
                        OCI Streaming Service
                    </Button>
                    {'   '}
                    <Button variant="light" size="sm" onClick={() => { setSrcDetailsFlag(false); setSrcDetailsMsg("You've selected File upload. Click Next"); setTextBox(false); setFileUpload(false); setModalShow(false) }} disabled>
                        <Image src="images/work_in_progress.jpg" roundedCircle />
                        <br />
                        Other Service
                    </Button>

                    <br />
                    <br />
                    {srcDetailsFlag ? srcDetailsMsg : null}

                    <br />
                    <br />
                    <Button variant="primary" size="lg" onClick={history.goBack}>
                        Prev
      </Button>
                    {'   '}
                    <Button variant="primary" size="lg" onClick={handleSelect} disabled={pageBtnStatus}>
                        Next
      </Button>
                </div>
                <CenteredModal
                    flagOciStream={ociStream}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onSubmit={handleModalSubmit}
                    modalData={handleModalData}
                />
            </Jumbotron>
        </>
    );
}

export default DataPipelineScreen;