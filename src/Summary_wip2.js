import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner'
import Image from 'react-bootstrap/Image'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap'
import { CardChecklist, HouseDoorFill } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import { FileCheck } from 'react-bootstrap-icons'


const CenteredModal = (props) => {
    console.log("-------------------------------")
    /*console.log(props.location.state.dataset)
    console.log(props.location.state.source)
    console.log(props.location.state.sink)
    console.log(props.location.state.stream)
    console.log(props.location.state.partitions)
    console.log(props.location.state.tblName)*/
    console.log("newcomp: " + props.location.state.newcompartmentname)
    console.log("parent comp: " + props.location.state.parentcompartmentID)
    console.log("ObjStore: " + props.location.state.sinkObjStore)
    console.log("comp: " + props.location.state.compartmentID)
    console.log("ObjStore checked: " + props.location.state.objStoreNameChecked)

    console.log("-------------------------------")
    const history = useHistory();
    const [msg, setMsg] = useState('');
    const [adwMsg, setAdwMsg] = useState('');
    const [objStoreMsg, setObjStoreMsg] = useState('');
    const [streamMsg, setStreamMsg] = useState('');
    const [userSubmit, setUserSubmit] = useState(false);
    const [populateLinks, setPopulateLinks] = useState(false);
    const [compartmentID, setCompartmentID] = useState('');
    const [newCompName, setNewCompName] = useState('');
    const [objStoreChecked, setObjStoreChecked] = useState(false);
    const [stataChecked, setStataChecked] = useState(false);
    const [resourceStatus, setResourceStatus] = useState(false);



    async function getStataData() {
        setUserSubmit(true)


        if (props.location.state.AdwUrl !== '') {
            setMsg("Creating new ADW .....")
            console.log(props.location.state.AdwUrl)
            await axios.get(props.location.state.AdwUrl)
                .then(response => { setMsg(response.data.message); setPopulateLinks(false); })
        }

        if (props.location.state.serverusername !== '' && props.location.state.ipaddress !== '' && props.location.state.privatekey !== null) {
            setMsg("Reading files from secure server - " + props.location.state.ipaddress + " with username - " + props.location.state.serverusername)
            const formData = new FormData();
            //formData.append("sid", sid);
            formData.append("serverusername", props.location.state.serverusername);
            formData.append("ipaddress", props.location.state.ipaddress);
            formData.append("privatekey", props.location.state.privatekey)
            formData.append("treeselection", props.location.state.treeselection)

            await axios({
                url: `http://144.24.132.94:8087/downloadfiles/`,
                method: 'POST',
                data: formData,
                headers: {
                    contentType: "multipart/form-data"
                }
            }).then(function (response) {
                //setFolderData(response.data)
                //let dirData = response.data
                //console.log(dirData)
                setMsg(response.data)

            }).catch(function (error) {

                console.log(error);
            });
        }

        setMsg("Creating Stata data Stream. Please wait . . .")
        /*await axios.get('http://144.24.132.94:8082/create/' + props.location.state.stream + '/' + props.location.state.partitions)
            .then(response => { setMsg(response.data.message); setPopulateLinks(false); })*/
        const formData = new FormData();
        //formData.append("sid", sid);
        formData.append("userocid", props.location.state.userocid);
        //formData.append("compartmentID", props.location.state.compartmentid);
        setCompartmentID(props.location.state.compartmentID)
        console.log("compartmentID: " + compartmentID)
        formData.append("compartmentID", compartmentID);
        formData.append("dtype", props.location.state.srctype);
        formData.append("userinfo", props.location.state.userdata);
        formData.append("stream_name", props.location.state.stream);
        formData.append("partition_count", props.location.state.partitions);

        await axios({
            url: `http://144.24.132.94:8082/create/`,
            method: 'POST',
            data: formData,
            headers: {
                contentType: "multipart/form-data"
            }
        }).then(function (response) {
            setMsg(response.data.message);
        })
            .catch(function (error) {
                console.log(error);
            });

        setMsg("Reading the stata data from the stream. Please wait . . ")
        /*await axios.get('http://144.24.132.94:8082/consume/' + props.location.state.sink + '/' + props.location.state.stream + '/' + props.location.state.partitions + '/' + props.location.state.userocid + '/' + props.location.state.compartmentid)
            .then(response => {
                setMsg(response.data.message); setAdwMsg(response.data.adw); setStreamMsg(response.data.stream); setObjStoreMsg(response.data.objStore); setPopulateLinks(true);
            })*/

        const consumeFormData = new FormData();
        consumeFormData.append("userocid", props.location.state.userocid);
        //consumeFormData.append("compartmentID", props.location.state.compartmentid);
        setCompartmentID(props.location.state.compartmentID)
        console.log("compartmentID: " + compartmentID)
        consumeFormData.append("compartmentID", compartmentID);
        consumeFormData.append("dtype", props.location.state.sink);
        //formData.append("userinfo", props.location.state.userdata);
        consumeFormData.append("stream_name", props.location.state.stream);
        consumeFormData.append("partition_count", props.location.state.partitions);
        consumeFormData.append("obj_store_name", props.location.state.sinkObjStore);

        await axios({
            url: `http://144.24.132.94:8082/consume/`,
            method: 'POST',
            data: consumeFormData,
            headers: {
                contentType: "multipart/form-data"
            }
        }).then(function (response) {
            setMsg(response.data.message);
        })
            .catch(function (error) {
                console.log(error);
            });
        setUserSubmit(false)
    }

    async function getTwitterData() {
        setUserSubmit(true)
        setMsg("Creating Stream. Please wait . . .")
        await axios.get('http://144.24.132.94:5000/create')
            .then(response => setMsg(response.data.message))


        setMsg("Reading the tweets from the stream and writing it to object storage. Please wait . . .")
        await axios.get('http://144.24.132.94:5000/consumer')
            .then(response => setMsg(response.data.message))
        setUserSubmit(false)
    }



    useEffect(() => {
        console.log("i am here .... !!!! Stata")
        if (compartmentID !== "") {
            setMsg("Creating Stata data Stream. Please wait . . .")
            /*await axios.get('http://144.24.132.94:8082/create/' + props.location.state.stream + '/' + props.location.state.partitions)
                .then(response => { setMsg(response.data.message); setPopulateLinks(false); })*/

            const formData = new FormData();
            //formData.append("sid", sid);
            formData.append("userocid", props.location.state.userocid);
            //formData.append("compartmentID", props.location.state.compartmentid);
            setCompartmentID(props.location.state.compartmentID)
            console.log("compartmentID: " + compartmentID)
            formData.append("compartmentID", compartmentID);
            formData.append("dtype", props.location.state.srctype);
            formData.append("userinfo", props.location.state.userdata);
            formData.append("stream_name", props.location.state.stream);
            formData.append("partition_count", props.location.state.partitions);

            axios({
                url: `http://168.138.203.128:8082/create/`,
                method: 'POST',
                data: formData,
                headers: {
                    contentType: "multipart/form-data"
                }
            }).then(function (response) {
                setMsg(response.data.message);
            })
                .catch(function (error) {
                    console.log(error);
                });

            setMsg("Reading the stata data from the stream. Please wait . . ")
            /*await axios.get('http://144.24.132.94:8082/consume/' + props.location.state.sink + '/' + props.location.state.stream + '/' + props.location.state.partitions + '/' + props.location.state.userocid + '/' + props.location.state.compartmentid)
                .then(response => {
                    setMsg(response.data.message); setAdwMsg(response.data.adw); setStreamMsg(response.data.stream); setObjStoreMsg(response.data.objStore); setPopulateLinks(true);
                })*/

            const consumeFormData = new FormData();
            consumeFormData.append("userocid", props.location.state.userocid);
            //consumeFormData.append("compartmentID", props.location.state.compartmentid);
            setCompartmentID(props.location.state.compartmentID)
            console.log("compartmentID: " + compartmentID)
            consumeFormData.append("compartmentID", compartmentID);
            consumeFormData.append("dtype", props.location.state.sink);
            //formData.append("userinfo", props.location.state.userdata);
            consumeFormData.append("stream_name", props.location.state.stream);
            consumeFormData.append("partition_count", props.location.state.partitions);
            consumeFormData.append("obj_store_name", props.location.state.sinkObjStore);

            axios({
                url: `http://144.24.132.94:8082/consume/`,
                method: 'POST',
                data: consumeFormData,
                headers: {
                    contentType: "multipart/form-data"
                }
            }).then(function (response) {
                setMsg(response.data.message);
            })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [resourceStatus]);

    async function createCompartment() {
        setMsg("Creating new compartment. Please wait . . .")
        const FormData = require('form-data');
        const formData = new FormData();
        //formData.append("sid", sid);
        formData.append("comp_name", props.location.state.newcompartmentname);
        formData.append("comp_desc", props.location.state.newcompartmentname);
        formData.append("parentcompartmentID", props.location.state.parentcompartmentID)
        formData.append("userocid", props.location.state.userocid)

        await axios({
            url: `http://168.138.203.128:8088/createcompartment/`,
            method: 'POST',
            data: formData,
            headers: {
                contentType: "multipart/form-data"
            }
        }).then(function (response) {
            //setFolderData(response.data)
            //let dirData = response.data
            //console.log(dirData)
            //setMsg(response.data.message)
            //setMsg(response.data.compartmentID)
            setCompartmentID(response.data.compartmentID)
            /*console.log("Now here ...... *****" + props.location.state.objStoreNameChecked)
            if (props.location.state.objStoreNameChecked) {
                console.log("abcd : " + props.location.state.objStoreNameChecked)
                setObjStoreChecked(true)
 
            }*/
            setTimeout(() => {
                setMsg(response.data.message)




            }, 10000);



        }).catch(function (error) {

            console.log(error);
        });
    }

    const handleClick = (e) => {
        if (props.location.state.newcompartmentname !== '') {
            console.log(" in comp create **********")
            createCompartment()
        }

        if (props.location.state.objStoreNameChecked) {
            console.log(" in obj store *******")
            if (compartmentID !== "") {
                setMsg("Creating new object storage bucket. Please wait . . .")
                /*const objformData = new FormData();
                //formData.append("sid", sid);
                console.log("value for props comp: " + props.location.state.compartmentID)
    
                console.log("value for var comp: " + compartmentID)
                objformData.append("compartmentID", compartmentID);
                objformData.append("bucketname", props.location.state.sinkObjStore)
                objformData.append("userocid", props.location.state.userocid)
    
                axios({
                    url: `http://144.24.132.94:8088/createbucket/`,
                    method: 'POST',
                    data: objformData,
                    headers: {
                        contentType: "multipart/form-data"
                    }
                }).then(function (response) {
                    //setFolderData(response.data)
                    //let dirData = response.data
                    //console.log(dirData)
                    setMsg(response.data.message)
    
    
                }).catch(function (error) {
    
                    console.log(error);
                });*/

                var FormData = require('form-data');
                var data = new FormData();
                data.append('userocid', props.location.state.userocid);
                data.append('bucketname', props.location.state.sinkObjStore);
                data.append('compartmentID', compartmentID);

                var config = {
                    method: 'post',
                    url: 'http://168.138.203.128:8088/createbucket/',
                    headers: {
                        contentType: "multipart/form-data"
                    },
                    data: data
                };

                axios(config)
                    .then(function (response) {
                        setMsg(response.data.message)
                        setResourceStatus(true)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });


            }

        }

        /*else if (props.location.state.dataset === "stata") {
           setCompartmentID(props.location.state.compartmentID)
           //setCompartmentID("ocid1.compartment.oc1..aaaaaaaatdzw2jpi3wpgl4m4dxox6ef3o3elyser2o5qrm4twgkcjmeahzoq")
           setStataChecked(true)

       }*/



        /*if (props.location.state.objStoreNameChecked && props.location.state.compartmentID !== '') {
            setcompartmentID(props.location.state.compartmentID)
            setObjStoreChecked(props.location.state.objStoreNameChecked)
        }
    
        if (props.location.state.objStoreNameChecked && compartmentID !== '') {
            setObjStoreChecked(props.location.state.objStoreNameChecked)
        }*/

        /*setupOciInfra()
     
        if (props.location.state.dataset === "stata") {
            getStataData()
     
        }
        else if (props.location.state.dataset === "twitter") {
     
            getTwitterData()
        }*/
    }
    /*return (
        <>
            <Container className="center p-3">
                <Image src="images/generic_theme.png" fluid />
                <Card style={{ width: '10rem' }} className="mx-auto">
                    <Card.Img variant="top" src="https://www.freeiconspng.com/uploads/summary-icon-png-notebooks-may-just-be-the-4.png" />
                    <Card.Body>
                        <Card.Title>Summary</Card.Title>
                        <Card.Text>
     
                        </Card.Text>
                        <Button variant="outline-primary" size="lg" onClick={history.goBack}>
                            Prev
      </Button>
                        {'   '}
                        <Button variant="outline-primary">Go</Button>
                    </Card.Body>
                    < Spinner animation="grow" role="status" >
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </Card>
     
            </Container>
        </>
    )*/

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

                <div class="col-md-12 text-center">
                    <Card className="text-center">
                        <Card.Header>Details Review</Card.Header>
                        <Card.Body>
                            <Card.Title> <CardChecklist size={70} /></Card.Title>
                            <br />
                            <Card.Text>
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>Data</th>
                                            <td><i>{props.location.state.dataset} <FileCheck /></i></td>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>Input Type</th>
                                            <td><i> {props.location.state.source} <FileCheck /></i></td>
                                        </tr>
                                        <tr>
                                            <th>Destination Type</th>
                                            <td><i>{props.location.state.sink} <FileCheck /></i></td>
                                        </tr>
                                        <tr>
                                            <th>Stream Name</th>
                                            <td><i>{props.location.state.stream} <FileCheck /></i></td>
                                        </tr>
                                        <tr>
                                            <th>Partition Count</th>
                                            <td><i>{props.location.state.partitions} <FileCheck /></i></td>
                                        </tr>
                                    </tbody>
                                </Table>

                            </Card.Text>
                            <br />
                            <br />
                            <Button variant="outline-primary" size="lg" onClick={history.goBack} >
                                Prev
      </Button>
                            {'   '}
                            <Button variant="outline-primary" size="lg" onClick={handleClick} >
                                Submit
          </Button>
                        </Card.Body>
                        <Card.Footer className="text-muted"></Card.Footer>
                    </Card>

                    <br />
                    <br />
                    {userSubmit
                        ? <>< Spinner animation="grow" role="status">
                            <span className="sr-only"></span>
                        </Spinner></>
                        : null
                    }
                    <br />
                    {msg}
                    <br />
                    <br />
                    {populateLinks ?
                        <><p><i>Click on the below links to view further details</i></p>
                            <a href={streamMsg}>OCI Streaming </a>
                            <br />
                            <a href={objStoreMsg}>OCI Object Storage</a>
                            <br />
                            <a href={adwMsg}>Autonomous Data Warehouse</a></> : null}


                </div >


            </Jumbotron >
        </Container >
    );
}

export default CenteredModal;
