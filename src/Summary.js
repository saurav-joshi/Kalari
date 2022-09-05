import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner'
import Image from 'react-bootstrap/Image'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap'
import { CardChecklist, HouseDoorFill, PersonCircle } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import { FileCheck } from 'react-bootstrap-icons'



const CenteredModal = (props) => {

    const handleDataRedactSelect = (e) => {

        history.push({ pathname: "/dataredaction", state: { userocid: props.location.state.userocid } })


    }
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
    console.log("AdWURL: " + props.location.state.AdwUrl)
    console.log("Source objstore: " + props.location.state.userdata)
    console.log("NoSql: " + props.location.state.noSql)

    console.log("-------------------------------")
    const history = useHistory();
    const [msg, setMsg] = useState('');

    const [solrMsg, setSolrMsg] = useState('');
    const [kibanaMsg, setKibanaMsg] = useState('');

    const [adwMsg, setAdwMsg] = useState('');
    const [objStoreMsg, setObjStoreMsg] = useState('');
    const [streamMsg, setStreamMsg] = useState('');
    const [userSubmit, setUserSubmit] = useState(false);
    const [populateLinks, setPopulateLinks] = useState(false);
    const [populateNoSqlLinks, setPopulateNoSqlLinks] = useState(false);
    const [compartmentID, setCompartmentID] = useState('');
    const [newCompName, setNewCompName] = useState('');
    const [objStoreChecked, setObjStoreChecked] = useState(false);
    const [stataChecked, setStataChecked] = useState(false);
    const [resourceStatus, setResourceStatus] = useState(false);
    const [createAdwFlag, setCreateAdwFlag] = useState(false);
    const [secureConnectFlag, setSecureConnectFlag] = useState(false);
    const [deleteFlag, setDeleteFlag] = useState('');
    const [streamCheckBox, setStreamCheckBox] = useState(false);
    const [objStoreCheckBox, setObjStoreCheckBox] = useState(false);
    const [adwCheckBox, setAdwCheckBox] = useState(false);
    const [deleteMsg, setDeleteMsg] = useState('');
    const [adwid, setAdwid] = useState('');



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
        console.log("i am here .... !!!! " + objStoreChecked)
        if (compartmentID !== "" && objStoreChecked && compartmentID !== "undefined") {



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
                url: 'http://144.24.132.94:8088/createbucket/',
                headers: {
                    contentType: "multipart/form-data"
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    setTimeout(() => {
                        if (response.data.statuscode === 'success') {
                            setMsg(response.data.message)
                            //29 Apr -Start
                            if (props.location.state.ipaddress !== '' && props.location.state.ipaddress !== undefined) {
                                setSecureConnectFlag(true)
                            } else {
                                setResourceStatus(true)
                            }

                            //setResourceStatus(true)
                            //29 Apr -End
                        }
                        else if (response.data.statuscode === 'error') {

                            setMsg(response.data.message)
                            setUserSubmit(false)
                        }

                    }, 3000);


                })
                .catch(function (error) {
                    console.log(error);
                });


        }
    }, [objStoreChecked]);

    useEffect(() => {
        console.log("i am here .... !!!! " + createAdwFlag)
        if (compartmentID !== "" && createAdwFlag && compartmentID !== "undefined") {



            setMsg("Creating new ADW .....")
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
            data.append('cpu', props.location.state.AdwUrl.cpu);
            data.append('storage', props.location.state.AdwUrl.storage);
            data.append('dbName', props.location.state.AdwUrl.dbName);
            data.append('displayName', props.location.state.AdwUrl.displayName);
            data.append('adminPwd', props.location.state.AdwUrl.adminPwd);
            data.append('userocid', props.location.state.userocid);
            console.log("in adw compid: " + compartmentID)
            console.log("in adw compid: " + props.location.state.AdwUrl.displayName)
            data.append('compartmentID', compartmentID);

            var config = {
                method: 'post',
                url: 'http://144.24.132.94:8083/createADW/',
                headers: {
                    contentType: "multipart/form-data"
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    setTimeout(() => {
                        if (response.data.statuscode === "success") {
                            setMsg(response.data.message)
                            setAdwid(response.data.apiData)
                            //29 Apr-Start
                            if (props.location.state.ipaddress !== '' && props.location.state.ipaddress !== undefined) {
                                setSecureConnectFlag(true)
                            } else {
                                setResourceStatus(true)
                            }
                            //setResourceStatus(true)
                            //29 Apr-End
                        }
                        else if (response.data.statuscode === "error") {
                            setMsg(response.data.message)
                            setUserSubmit(false)
                        }


                    }, 3000);


                })
                .catch(function (error) {
                    console.log(error);
                });


        }
    }, [createAdwFlag]);

    useEffect(() => {
        async function runStataData() {
            console.log("i am here .... !!!! Stata")
            if (compartmentID !== "") {

                /*await axios.get('http://144.24.132.94:8082/create/' + props.location.state.stream + '/' + props.location.state.partitions)
                    .then(response => { setMsg(response.data.message); setPopulateLinks(false); })*/
                const formData = new FormData();
                //formData.append("sid", sid);
                console.log("userocid: " + props.location.state.userocid)

                formData.append("userocid", props.location.state.userocid);
                //formData.append("compartmentID", props.location.state.compartmentid);
                //setCompartmentID(props.location.state.compartmentID)
                console.log("compartmentID: " + compartmentID)
                formData.append("compartmentID", compartmentID);
                formData.append("dtype", props.location.state.srctype);
                formData.append("userinfo", props.location.state.userdata);
                formData.append("stream_name", props.location.state.stream);
                formData.append("partition_count", props.location.state.partitions);
                let apiUrl = ""
                if (props.location.state.dataset === "stata") {
                    setMsg("Creating Stata data Stream. Please wait . . .")
                    apiUrl = "http://144.24.132.94:8082/create/"
                }
                else if (props.location.state.dataset === "twitter") {
                    setMsg("Creating Twitter data Stream. Please wait . . .")
                    apiUrl = "http://144.24.132.94:9091/create/"
                }
                else if (props.location.state.dataset === "citibike") {
                    setMsg("Creating Citibike data Stream. Please wait . . .")
                    apiUrl = "http://144.24.132.94:9095/create/"
                }
                else if (props.location.state.dataset === "logs") {
                    setMsg("Creating Logs data Stream. Please wait . . .")
                    apiUrl = "http://144.24.132.94:9098/create/"
                }

                await axios({
                    url: apiUrl,
                    method: 'POST',
                    data: formData,
                    headers: {
                        contentType: "multipart/form-data"
                    }
                }).then(function (response) {
                    if (response.data.statuscode === "success") {
                        setMsg(response.data.message);
                    }
                    else if (response.data.statuscode === "error") {
                        setMsg(response.data.message);
                        setUserSubmit(false)
                    }
                })
                    .catch(function (error) {
                        console.log(error);
                    });


                /*await axios.get('http://144.24.132.94:8082/consume/' + props.location.state.sink + '/' + props.location.state.stream + '/' + props.location.state.partitions + '/' + props.location.state.userocid + '/' + props.location.state.compartmentid)
                    .then(response => {
                        setMsg(response.data.message); setAdwMsg(response.data.adw); setStreamMsg(response.data.stream); setObjStoreMsg(response.data.objStore); setPopulateLinks(true);
                    })*/

                const consumeFormData = new FormData();
                console.log("userocid: " + props.location.state.userocid)

                consumeFormData.append("userocid", props.location.state.userocid);
                //consumeFormData.append("compartmentID", props.location.state.compartmentid);
                //setCompartmentID(props.location.state.compartmentID)
                console.log("compartmentID: " + compartmentID)
                consumeFormData.append("compartmentID", compartmentID);
                consumeFormData.append("dtype", props.location.state.sink);
                //formData.append("userinfo", props.location.state.userdata);
                consumeFormData.append("stream_name", props.location.state.stream);
                consumeFormData.append("partition_count", props.location.state.partitions);
                consumeFormData.append("obj_store_name", props.location.state.sinkObjStore);

                if (props.location.state.AdwUrl !== null) {
                    consumeFormData.append("adminPwd", props.location.state.AdwUrl.adminPwd);
                    consumeFormData.append("dbName", props.location.state.AdwUrl.dbName);
                    consumeFormData.append("adwType", "new");
                }
                else {
                    consumeFormData.append("adminPwd", "");
                    consumeFormData.append("dbName", "");
                    consumeFormData.append("adwType", "exist");
                }

                if (props.location.state.noSql !== null && props.location.state.noSql !== undefined && props.location.state.noSql !== '') {
                    consumeFormData.append("nosql", props.location.state.noSql);
                }

                apiUrl = ""
                if (props.location.state.dataset === "stata") {
                    setMsg("Reading the Stata data from the stream. Please wait . . ")
                    apiUrl = "http://144.24.132.94:8082/consume/"
                }
                else if (props.location.state.dataset === "twitter") {
                    setMsg("Reading the Twitter data from the stream. Please wait . . ")
                    apiUrl = "http://144.24.132.94:9091/consume/"
                }
                else if (props.location.state.dataset === "citibike") {
                    setMsg("Reading the Citibike data from the stream. Please wait . . ")
                    apiUrl = "http://144.24.132.94:9095/consume/"
                }
                else if (props.location.state.dataset === "logs") {
                    setMsg("Reading the Logs data from the stream. Please wait . . ")
                    apiUrl = "http://144.24.132.94:9098/consume/"
                }

                await axios({
                    url: apiUrl,
                    method: 'POST',
                    data: consumeFormData,
                    headers: {
                        contentType: "multipart/form-data"
                    }
                }).then(function (response) {
                    if (response.data.statuscode === "success" && props.location.state.dataset !== "logs") {
                        setMsg(response.data.message);
                        setUserSubmit(false)
                        setAdwMsg(response.data.adwUrl);
                        setStreamMsg(response.data.streamUrl);
                        setObjStoreMsg(response.data.objStoreUrl);
                        setPopulateLinks(true)
                    }
                    else if (response.data.statuscode === "success" && props.location.state.dataset === "logs") {
                        setMsg(response.data.message);
                        setUserSubmit(false)
                        setStreamMsg(response.data.streamUrl)
                        setSolrMsg(response.data.SolrUrl);
                        setKibanaMsg(response.data.KibanaUrl);
                        setPopulateNoSqlLinks(true)
                    }
                    else if (response.data.statuscode === "error") {
                        setUserSubmit(false)
                        setMsg(response.data.message);
                        setPopulateLinks(false)
                    }

                })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
        runStataData()

    }, [resourceStatus]);

    useEffect(() => {
        console.log("i am here secure server .... !!!! " + secureConnectFlag)
        if (secureConnectFlag && props.location.state.serverusername !== '' && props.location.state.ipaddress !== '' && props.location.state.privatekey !== null) {
            setMsg("Reading files from secure server - " + props.location.state.ipaddress + " with username - " + props.location.state.serverusername)
            const formData = new FormData();
            //formData.append("sid", sid);
            formData.append("serverusername", props.location.state.serverusername);
            formData.append("ipaddress", props.location.state.ipaddress);
            formData.append("privatekey", props.location.state.privatekey)
            formData.append("treeselection", props.location.state.treeselection)

            axios({
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
                setTimeout(() => {
                    if (response.data.statuscode === "success") {
                        setMsg(response.data.message)
                        setResourceStatus(true)
                    }
                    else if (response.data.statuscode === "error") {
                        setMsg(response.data.message)
                        setUserSubmit(false)
                    }


                }, 3000);


            }).catch(function (error) {

                console.log(error);
            });
        }
    }, [secureConnectFlag])


    const callApiNewCompartment = () => {
        setMsg("Creating new compartment. Please wait . . .")
        const formData = new FormData();
        //formData.append("sid", sid);
        formData.append("comp_name", props.location.state.newcompartmentname);
        formData.append("comp_desc", props.location.state.newcompartmentname);
        formData.append("parentcompartmentID", props.location.state.parentcompartmentID)
        formData.append("userocid", props.location.state.userocid)

        axios({
            url: `http://144.24.132.94:8088/createcompartment/`,
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
            //
            /*console.log("Now here ...... *****" + props.location.state.objStoreNameChecked)
            if (props.location.state.objStoreNameChecked) {
                console.log("abcd : " + props.location.state.objStoreNameChecked)
                setObjStoreChecked(true)

            }*/
            setTimeout(() => {
                if (response.data.statuscode === "success") {
                    setCompartmentID(response.data.compartmentID)

                    setMsg(response.data.message)
                    if (props.location.state.objStoreNameChecked) {
                        setObjStoreChecked(true)

                    }
                    else if (props.location.state.AdwUrl) {
                        setCreateAdwFlag(true)
                    }
                    else if (props.location.state.noSql !== '' && props.location.state.noSql !== undefined && props.location.state.noSql !== null) {
                        setResourceStatus(true)
                    }
                }
                else if (response.data.statuscode === "error") {
                    setMsg(response.data.message)
                    setUserSubmit(false)

                }
            }, 20000);



        }).catch(function (error) {

            console.log(error);
        });
    }



    const handleClick = (e) => {

        if (props.location.state.newcompartmentname !== '' && props.location.state.newcompartmentname !== undefined) {
            console.log("Heyyyyy")
            console.log(props.location.state.newcompartmentname)
            setUserSubmit(true)
            callApiNewCompartment()
        }
        else if (props.location.state.objStoreNameChecked) {
            setUserSubmit(true)
            setCompartmentID(props.location.state.compartmentID)
            //console.log("set compid: " + compartmentID)
            setObjStoreChecked(true)

        }
        else if (props.location.state.AdwUrl) {
            setUserSubmit(true)
            setCompartmentID(props.location.state.compartmentID)
            setCreateAdwFlag(true)
        }
        /*else if (props.location.state.ipaddress !== '' && props.location.state.newcompartmentname !== undefined) {
            setUserSubmit(true)
            setCompartmentID(props.location.state.compartmentID)
            setSecureConnectFlag(true)
        }
        ////
        */
        else if (props.location.state.ipaddress !== '' && props.location.state.ipaddress !== undefined) {
            console.log(props.location.state.ipaddress)
            setUserSubmit(true)
            setCompartmentID(props.location.state.compartmentID)
            setSecureConnectFlag(true)
        }
        else {
            setUserSubmit(true)
            setCompartmentID(props.location.state.compartmentID)
            setResourceStatus(true)

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

    const handleHomeClick = () => {
        history.push({ pathname: "/home", state: { userocid: props.location.state.userocid } })
    }

    const handleDataLakeSelect = (e) => {

        history.push({ pathname: "/datalake", state: { userocid: props.location.state.userocid, dataset: props.location.state.dataset } })


    }

    const handleDeleteResource = () => {
        setDeleteMsg("Deleting selected resource types. Please wait . . .")
        if (streamCheckBox) {
            console.log("Deleting stream...")

            const streamFormData = new FormData();
            //formData.append("sid", sid);
            streamFormData.append("userocid", props.location.state.userocid);
            streamFormData.append("stream_name", props.location.state.stream);
            streamFormData.append("compartmentID", compartmentID)

            axios({
                url: `http://144.24.132.94:8082/deleteStream/`,
                method: 'POST',
                data: streamFormData,
                headers: {
                    contentType: "multipart/form-data"
                }
            }).then(function (response) {

                if (response.data.statuscode === "success") {
                    setDeleteMsg(deleteMsg + ". " + response.data.message)
                }
                else if (response.data.statuscode === "error") {
                    setDeleteMsg(deleteMsg + ". " + response.data.message)
                }
            }).catch(function (error) {
                console.log(error);
            });
        }

        if (objStoreCheckBox && props.location.state.sinkObjStore != '') {
            console.log("Deleting objStore...")
            const objStoreFormData = new FormData();
            //formData.append("sid", sid);
            objStoreFormData.append("userocid", props.location.state.userocid);
            objStoreFormData.append("bucketname", props.location.state.sinkObjStore);
            objStoreFormData.append("compartmentID", compartmentID)
            axios({
                url: `http://144.24.132.94:8088/deletebucket/`,
                method: 'POST',
                data: objStoreFormData,
                headers: {
                    contentType: "multipart/form-data"
                }
            }).then(function (response) {

                if (response.data.statuscode === "success") {
                    setDeleteMsg(deleteMsg + ". " + response.data.message)
                }
                else if (response.data.statuscode === "error") {
                    setDeleteMsg(deleteMsg + ". " + response.data.message)
                }
            }).catch(function (error) {

                console.log(error);
            });

        }
        if (adwCheckBox && props.location.state.AdwUrl !== '') {
            console.log("Deleting ADW...")
            const adwFormData = new FormData();
            //formData.append("sid", sid);
            adwFormData.append("userocid", props.location.state.userocid);
            adwFormData.append("bucketname", props.location.state.sinkObjStore);
            adwFormData.append("compartmentID", compartmentID)
            axios({
                url: `http://144.24.132.94:8083/deleteADW/`,
                method: 'POST',
                data: adwFormData,
                headers: {
                    contentType: "multipart/form-data"
                }
            }).then(function (response) {

                if (response.data.statuscode === "success") {
                    setDeleteMsg(deleteMsg + ". " + response.data.message)

                }
                else if (response.data.statuscode === "error") {
                    setDeleteMsg(deleteMsg + ". " + response.data.message)

                }
            }).catch(function (error) {

                console.log(error);
            });
        }
    }

    const handleCheckboxClick = (value) => {
        if (value === "stream") {
            setStreamCheckBox(!streamCheckBox)
        }
        else if (value === "obj_store") {
            setObjStoreCheckBox(!objStoreCheckBox)
        }
        else if (value === "adw") {
            setAdwCheckBox(!adwCheckBox)
        }
    }


    return (

        < >
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
                        <><p><h6><i>1. Click on the below links to view further details</i></h6></p>
                            {streamMsg !== '' ? <a href={streamMsg}>OCI Streaming </a> : null}
                            <br />
                            {objStoreMsg !== '' ? <a href={objStoreMsg}>OCI Object Storage</a> : null}
                            <br />
                            {adwMsg !== '' ? <a href={adwMsg}>Autonomous Data Warehouse</a> : null}

                            <br />
                            <br />
                            <Form>
                                {/*<><h6><i>2. Select to delete OCI resources</i></h6>
                                    <div key="inline-checkbox" className="mb-3">
                                        <Form.Check inline label="Stream" type='checkbox' id="inline-checkbox-1" checked={streamCheckBox} onChange={() => handleCheckboxClick("stream")} />
                                        <Form.Check inline label="Object Storage" type='checkbox' id="inline-checkbox-2" checked={objStoreCheckBox} onChange={() => handleCheckboxClick("obj_store")} />
                                        <Form.Check inline label="ADW" type='checkbox' id="inline-checkbox-2" checked={adwCheckBox} onChange={() => handleCheckboxClick("adw")} />
                                        <br />
                                        <br />
                                        <Button variant="danger" onClick={handleDeleteResource}
                                            disabled={streamCheckBox || objStoreCheckBox || adwCheckBox ? "" : "disabled"}>Delete</Button>{' '}
                                        <br />
                                        {deleteMsg !== '' ? deleteMsg : null}
                                    </div></>
                                */}
                            </Form>
                        </> : null}


                    {populateNoSqlLinks ?
                        <><p><h6><i>1. Click on the below links to view further details</i></h6></p>
                            {streamMsg !== '' ? <a href={streamMsg}>OCI Streaming </a> : null}
                            <br />
                            {solrMsg !== '' ? <a href={solrMsg}>Apache Solr </a> : null}
                            <br />
                            {kibanaMsg !== '' ? <a href={kibanaMsg}>Elastic Kibana</a> : null}

                            <br />
                            <br />
                            <Form>
                                {/*<><h6><i>2. Select to delete OCI resources</i></h6>
                                    <div key="inline-checkbox" className="mb-3">
                                        <Form.Check inline label="Stream" type='checkbox' id="inline-checkbox-1" checked={streamCheckBox} onChange={() => handleCheckboxClick("stream")} />
                                        <Form.Check inline label="Object Storage" type='checkbox' id="inline-checkbox-2" checked={objStoreCheckBox} onChange={() => handleCheckboxClick("obj_store")} disabled />
                                        <Form.Check inline label="ADW" type='checkbox' id="inline-checkbox-2" checked={adwCheckBox} onChange={() => handleCheckboxClick("adw")} disabled />
                                        <br />
                                        <br />
                                        <Button variant="danger" onClick={handleDeleteResource}
                                            disabled={streamCheckBox || objStoreCheckBox || adwCheckBox ? "" : "disabled"}>Delete</Button>{' '}
                                        <br />
                                        {deleteMsg !== '' ? deleteMsg : null}
                                    </div></>
                                */}
                            </Form>
                        </> : null}
                </div >


            </Jumbotron >
        </>
    );
}

export default CenteredModal;
