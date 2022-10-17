import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import './App.css';
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
//import FileSystemNavigator from './FileSystemNavigator';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import axios from 'axios'
//import FolderTreeModal from './FolderTreeModal.js'
import DoneAllIcon from '@material-ui/icons/DoneAll';
import FolderIcon from '@material-ui/icons/Folder';
import { Container as MaterialUIContainer } from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Compartment from './Compartment'
import Spinner from 'react-bootstrap/Spinner'

const CenteredModal = (props) => {
    console.log("loading.....")
    console.log(props.userGroupFlag)
    const [fileUpload, setFileUpload] = useState(false);
    const [textBox, setTextBox] = useState(false);
    const [adw, setAdw] = useState(false);
    const [streamName, setStreamName] = useState('demo-stream-01');
    const [partitionCnt, setPartitionCnt] = useState(1);
    const [clickedTreeComp, setClickedTreeComp] = useState('')
    const [sid, setSid] = useState('');
    const [user, setUser] = useState('admin');
    const [serverUser, setServerUser] = useState('');
    const [IPaddress, setIPaddress] = useState('');
    const [privateKey, setPrivateKey] = useState(null);
    const [password, setPassword] = useState('Adwdemodb1234#');
    const [tableName, setTableName] = useState('');
    const [ADWOcid, setADWOcid] = useState('ocid1.autonomousdatabase.oc1.ap-hyderabad-1.anuhsljrlxbsvtqawav7bk524hy5tsgh24nkucxrpsi7sgikc5qoovj7dpqq');
    const [wallet, setWallet] = useState(null);
    const [file, setFile] = useState(null);
    const [sampleRadioSelect, setSampleRadioSelect] = useState(false);
    const [fileRadioSelect, setFileRadioSelect] = useState(false);
    const [objStoreRadioSelect, setObjStoreRadioSelect] = useState(false);
    const [newAdwFlag, setNewAdwFlag] = useState(false);
    const [existAdwFlag, setExistAdwFlag] = useState(false);
    const [defaultAdwFlag, setDefaultAdwFlag] = useState(false);
    const [newBucketFlag, setNewBucketFlag] = useState(false);
    const [existBucketFlag, setExistBucketFlag] = useState(false);

    const [demoBucketFlag, setDemoBucketFlag] = useState(false);
    const [customBucketFlag, setCustomBucketFlag] = useState(false);


    const [cpu, setCpu] = useState(1)
    const [storage, setStorage] = useState(1)
    const [dbName, setDbName] = useState('testadwdb')
    const [displayName, setDisplayName] = useState('testadwdb')
    const [objStoreName, setObjStoreName] = useState('Select Bucket')
    const [sinkObjStoreName, setSinkObjStoreName] = useState('Select Bucket')

    const [objStoreChecked, setObjStoreChecked] = useState(false)
    const [objStoreUrl, setObjStoreUrl] = useState('')
    const [logsVariant, setLogsVariant] = useState('light')
    const [citibikeVariant, setCitibikeVariant] = useState('light')
    const [bankingDataVariant, setBankingDataVariant] = useState('light')
    const [twitterVariant, setTwitterVariant] = useState('light')
    const [stataVariant, setStataVariant] = useState('light')

    const [solrVariant, setSolrVariant] = useState('light')
    const [esVariant, setESVariant] = useState('light')
    const [solrEsVariant, setSolrEsVariant] = useState('light')

    const [datasetSelected, setDatasetSelected] = useState('Pick a data source');
    const [folderData, setFolderData] = useState(null);
    const [flagFolderData, setFlagFolderData] = useState(false);
    const [fileFolderSelect, setFileFolderSelect] = useState(false);
    const [compJsonData, setCompJsonData] = useState(null)
    const [openTreeModal, setOpenTreeModal] = React.useState(false);
    const [clickedCompartmentID, setClickedCompartmentID] = useState('')
    const [bucketsData, setBucketsData] = useState('')
    const [secureConnectMsg, setSecureConnectMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [noSqlType, setNoSqlType] = useState('')
    const [clickConnect, setClickConnect] = useState(false);
    const [pageBtnStatus, setPageBtnStatus] = useState('disabled')
    //const objStoreList = ["citibike-data", "logs_data"];
    const [objStoreList, setObjStoreList] = useState([]);
    //const sinkObjStoreList = ["sink-citibike", "sink-tweets-data"];
    const [sinkObjStoreList, setSinkObjStoreList] = useState([]);

    const bankingImageStyle = {
        padding: 10
      };

    const useStylesForComp = makeStyles({
        root: {
            height: 216,
            flexGrow: 1,
            maxWidth: 400,
        },
    });
    const classes = useStylesForComp();

    const handleOpenTreeModal = () => {
        setOpenTreeModal(true);
    };

    const handleCloseTreeModal = () => {
        setOpenTreeModal(false);
    };

    const handleDataSelect = (e) => {
        console.log(e);
        setDatasetSelected(e)
        if (e === 'logs') {
            setPageBtnStatus('')
            setLogsVariant("info")
            setTwitterVariant("light")
            setCitibikeVariant("light")
            setBankingDataVariant("light")
            setStataVariant("light")
        }
        else if (e === "twitter") {
            setPageBtnStatus('')
            setLogsVariant("light")
            setTwitterVariant("info")
            setCitibikeVariant("light")
            setBankingDataVariant("light")
            setStataVariant("light")
        }
        else if (e === "citibike") {
            setPageBtnStatus('')
            setLogsVariant("light")
            setTwitterVariant("light")
            setCitibikeVariant("info")
            setBankingDataVariant("light")
            setStataVariant("light")
        }
        else if (e === "bankingdata") {
            setPageBtnStatus('')
            setLogsVariant("light")
            setTwitterVariant("light")
            setCitibikeVariant("light")
            setBankingDataVariant("info")
            setStataVariant("light")
        }
        else if (e === "stata") {
            setPageBtnStatus('')
            setLogsVariant("light")
            setTwitterVariant("light")
            setCitibikeVariant("light")
            setBankingDataVariant("light")
            setStataVariant("info")
        }
        else if (e === "solr") {
            setPageBtnStatus('')
            setNoSqlType(e)
            setSolrEsVariant("light")
            setESVariant("light")
            setBankingDataVariant("light")
            setSolrVariant("info")
        }
        else if (e === "es") {
            setPageBtnStatus('')
            setNoSqlType(e)
            setSolrEsVariant("light")
            setESVariant("info")
            setBankingDataVariant("light")
            setSolrVariant("light")
        }
        else if (e === "solr_es") {
            setPageBtnStatus('')
            setNoSqlType(e)
            setSolrEsVariant("info")
            setBankingDataVariant("light")
            setESVariant("light")
            setSolrVariant("light")
        }

        //setPageBtnStatus('')
    }

    const handleCpu = (e) => {
        setCpu(e.target.value)
    }

    const handleStorage = (e) => {
        setStorage(e.target.value)
    }
    const handleDBName = (e) => {
        setDbName(e.target.value)
    }
    const handleDisplayName = (e) => {
        setDisplayName(e.target.value)
    }
    const handleObjStoreName = (e) => {
        setObjStoreName(e.target.value)
        setPageBtnStatus('')
    }

    const handleSrcObjStoreSelect = (eventKey, event) => {
        setObjStoreName(objStoreList[eventKey])
        setPageBtnStatus('')
    }
    const handleSinkObjStoreName = (e) => {
        setObjStoreChecked(true)
        setObjStoreName(e.target.value)
        setPageBtnStatus('')
    }

    const handleCheckBox = (e) => {
        console.log(e.target.value)
    }

    const handleObjStoreUrl = (e) => {
        setObjStoreUrl(e.target.value)
    }

    const handleSID = (e) => {
        //console.log(e.target.value)
        setSid(e.target.value)
    }
    const handleUser = (e) => {
        //console.log(e.target.value)
        setUser(e.target.value)
    }

    const handleServerUser = (e) => {
        //console.log(e.target.value)
        setServerUser(e.target.value)
    }

    const handleIPAddress = (e) => {
        //console.log(e.target.value)
        setIPaddress(e.target.value)
    }

    const handlePwd = (e) => {
        //console.log(e.target.value)
        setPassword(e.target.value)
        setPageBtnStatus('')
    }
    const handleTableName = (e) => {
        //console.log(e.target.value)
        setTableName(e.target.value)
    }
    const handleADWOcid = (e) => {
        //console.log(e.target.value)
        setADWOcid(e.target.value)
        setPageBtnStatus('')
    }

    const handleWallet = (e) => {
        console.log(e.target.files[0])
        setWallet(e.target.files[0])
    }

    const handlePrivateKey = (e) => {
        console.log(e.target.files[0])
        setPrivateKey(e.target.files[0])




    }

    async function getFolderData() {
        const formData = new FormData();
        //formData.append("sid", sid);
        formData.append("username", serverUser);
        formData.append("ipaddress", IPaddress);
        formData.append("privatekey", privateKey)

        await axios({
            url: `http://144.24.132.94:8087/getfiles/`,
            method: 'POST',
            data: formData,
            headers: {
                contentType: "multipart/form-data"
            }
        }).then(function (response) {
            if (response.data.statuscode === 'success') {
                setFolderData(response.data.apiData)
                setSecureConnectMsg(response.data.message)
                //setErrorMsg(response.data.errorMsg)
                setClickConnect(false)
                setPageBtnStatus('')
            }
            else if (response.data.statuscode === 'error') {
                //setPageBtnStatus('')
                setSecureConnectMsg(response.data.message)
            }
            //let dirData = response.data
            //console.log(dirData)

        }).catch(function (error) {

            console.log(error);
        });
    }

    const handleFolderData = () => {
        setFolderData(null)
        setErrorMsg('')
        setSecureConnectMsg('')
        setClickConnect(true)
        getFolderData()
        setFlagFolderData(true)



    }

    const handleFileUpload = (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0])
        setPageBtnStatus('')
    }


    const handleStreamName = (e) => {
        //console.log(e.target.value)
        setStreamName(e.target.value)
    }
    const handlePartitionCnt = (e) => {
        //console.log(e.target.value)
        setPartitionCnt(e.target.value)
        setPageBtnStatus('')
    }
    const handleADWSelect = (e) => {
        if (e.target.value === "existAdw") {
            setExistAdwFlag(true)
            setNewAdwFlag(false)
            setDefaultAdwFlag(false)
        }
        else if (e.target.value === "newAdw") {
            setNewAdwFlag(true)
            setExistAdwFlag(false)
            setDefaultAdwFlag(false)
        }
        else if (e.target.value === "defaultAdw") {
            setDefaultAdwFlag(true)
            setNewAdwFlag(false)
            setExistAdwFlag(false)
        }
    }

    const handleBucketTypeSelect = (e) => {

        if (e.target.value === "existBucket") {
            setExistBucketFlag(true)
            setNewBucketFlag(false)
        }
        else if (e.target.value === "newBucket") {
            setNewBucketFlag(true)
            setExistBucketFlag(false)
        }
    }
    const handleSrcBucketTypeSelect = (e) => {

        if (e.target.value === "demoBucket") {
            setDemoBucketFlag(true)
            setCustomBucketFlag(false)
            setObjStoreName('Select Bucket')
            setPageBtnStatus('disabled')
        }
        else if (e.target.value === "customBucket") {
            setCustomBucketFlag(true)
            setDemoBucketFlag(false)
        }
    }


    const handleSinkObjStoreSelect = (eventKey, e) => {
        setSinkObjStoreName(sinkObjStoreList[eventKey])
        setObjStoreName(sinkObjStoreList[eventKey])
        setPageBtnStatus('')
    }

    const handleRadioSelect = (e) => {
        console.log(e.target.value);
        if (e.target.value === "file") {
            setFileRadioSelect(true)
            setObjStoreRadioSelect(false)
            setSampleRadioSelect(false)
            setFileUpload(true);
            setTextBox(false);
            setAdw(false)
        }
        else if (e.target.value === "obj_store") {
            setFileRadioSelect(false)
            setObjStoreRadioSelect(true)
            setSampleRadioSelect(false)
            setFileUpload(false);
            setTextBox(true);
            setAdw(false)
        }
        else if (e.target.value === "sample") {
            setFileRadioSelect(false)
            setObjStoreRadioSelect(false)
            setSampleRadioSelect(true)
            setFileUpload(false);
            setTextBox(false);
            setAdw(false)
        }
        else if (e.target.value === "adw") {
            setFileRadioSelect(false)
            setObjStoreRadioSelect(false)
            setSampleRadioSelect(true)
            setFileUpload(false);
            setTextBox(false);
            setAdw(true)
        }
        //setDatasetSelected(e)
    }

    const handleTreeClick = (e) => {
        console.log("Tree click ....")
        console.log(e)
        setFileFolderSelect(e)
    }

    const handleModalSubmit = () => {

        if (props.flagADW) {
            props.onSubmit();
            if (existAdwFlag) {
                props.existAdwModalData(ADWOcid, user, password, tableName, wallet, "existAdwFlag")
            }
            else if (newAdwFlag) {
                props.newAdwModalData(cpu, storage, dbName, displayName, password, tableName, "newAdwFlag")
            }
            else if (defaultAdwFlag) {
                props.defaultAdwModalData(ADWOcid, user, password, tableName, wallet, "defaultAdwFlag")
            }

        }
        else if (props.flagObjStore) {
            props.onSubmit();
            props.newObjStoreName(objStoreName)

            //props.modalData(streamName, partitionCnt);
        }
        else if (props.flagSinkObjStore) {
            props.onSubmit();
            props.newObjStoreName({ "bucket": objStoreName, "checked": objStoreChecked })

            //props.modalData(streamName, partitionCnt);
        }
        else if (props.flagUploadFile) {
            props.onSubmit();
            props.newFileUpload(file)
        }
        /*else if (props.dataSourceType !== '') {
            props.onSubmit();
            props.callSetDataset(datasetSelected)
        }*/
        else if (props.flagOciStream) {
            props.onSubmit();
            props.modalData(streamName, partitionCnt);
        }
        else if (props.flagSecureConnect) {
            //handleFolderData()
            props.onSubmit();
            props.newSecureConnect(folderData, serverUser, IPaddress, privateKey)
        }
        else if (props.folderData) {
            props.onSubmit();
            props.newSelectFileFolder(fileFolderSelect)
        }
        else if (props.flagNoSql) {
            props.onSubmit();
            props.newNoSql(noSqlType)
        }
        else {

            props.onSubmit();
            props.callSetDataset(datasetSelected)

        }
    }
    const useStyles = makeStyles({
        root: {
            height: 110,
            flexGrow: 1,
            maxWidth: 400,
        },
    });

    const dirData = {
        children: [
            {
                children: [
                    {
                        id: 4,
                        name: "ILCS2016-18_HH.csv"
                    },
                    {
                        children: [
                            { id: 5, name: "abc.txt" }
                        ],
                        id: 2,
                        name: "test"
                    }
                ],
                id: 3,
                name: "K-Means"
            },

        ],
        id: 1,
        name: "ADB"
    }

    /*const renderTree = (nodes) => (

        < TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} onClick={() => { handleTreeClick(nodes.name) }}>
            { Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem >
    );*/


    const objStoreBucketNavigator = (jsonData) => {
        //let str = JSON.stringify(jsonData)
        //let jsonObj = JSON.parse(str)
        console.log(jsonData)
        //console.log(dirData)
        let str = JSON.stringify(jsonData)
        let jsonObj = JSON.parse(str)
        const bucketList = []

        for (var i = 0; i < jsonObj.length; i++) {
            bucketList.push(<Dropdown.Item eventKey={jsonObj}> {jsonObj}</Dropdown.Item>)
        }
        return (<DropdownButton id="dropdown-basic-button">
            {bucketList}
        </DropdownButton>)


        /*return (
            <DropdownButton id="dropdown-basic-button">
                <Dropdown.Item eventKey="Logs Data">Logs Data</Dropdown.Item>
                <Dropdown.Item eventKey="Twitter Data">Twitter Data</Dropdown.Item>
                <Dropdown.Item eventKey="Citibike Tripdata">Citibike Tripdata</Dropdown.Item>
            </DropdownButton>
        );*/
    }

    const renderTree = (nodes) => (

        < TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} onClick={() => { handleTreeClick(nodes.name) }}>
            { Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem >
    );


    const FileSystemNavigator = (jsonData) => {
        //let str = JSON.stringify(jsonData)
        //let jsonObj = JSON.parse(str)
        //console.log(jsonObj)
        //console.log(dirData)


        return (
            <TreeView

                defaultCollapseIcon={<FolderIcon />}
                defaultExpanded={['root']}
                defaultExpandIcon={<FolderIcon />}
            >
                {renderTree(jsonData)}
            </TreeView>
        );
    }

    /*const findDatasetNameToDisplay = () => {
        console.log("**** Find data ******")
        console.log(props.datasetName)

        if (props.datasetName === 'citibike') {
            return 'citibike-data'
        }
        else if (props.datasetName === 'logs') {
            return 'logs_data'
        }
    }*/

    useEffect(() => {
        console.log("**** Find data ******")
        console.log(props.datasetName)

        if (props.datasetName === 'citibike') {
            setObjStoreList(objStoreList => [...objStoreList, 'citibike-data']);
        }
        else if (props.datasetName === 'logs') {
            setObjStoreList(objStoreList => [...objStoreList, 'logs_data']);

        }
    }, []);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.flagObjStore ? "Object Storage" : null}
                    {props.flagSinkObjStore ? "Object Storage" : null}
                    {props.flagADW ? "Autonomous Data Warehouse" : null}
                    {props.flagNoSql ? "NoSQL Database" : null}
                    {props.flagUploadFile ? "File Upload" : null}
                    {props.flagOciStream ? "OCI Streaming" : null}
                    {props.flagSecureConnect ? "Server Details" : null}
                    {props.flagTreeFolder ? "Connected to server:" + IPaddress : null}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>


                {props.flagObjStore ? <>
                    <Button variant="outline-primary" value="demoBucket" onClick={handleSrcBucketTypeSelect}>


                        Demo Bucket
                        </Button>
                    {'   '}
                    <Button variant="outline-primary" value="customBucket" onClick={handleSrcBucketTypeSelect}>


                        Custom Bucket
                        </Button>
                    <br />
                    <br />
                    {demoBucketFlag ? <><Form.Group controlId="exampleForm.ControlTextarea1">
                        <br />
                        <DropdownButton id="dropdown-basic-button" title={objStoreName} onSelect={handleSrcObjStoreSelect}>
                            {objStoreList.map((opt, i) => (

                                <Dropdown.Item key={i} eventKey={i}>
                                    {opt}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </Form.Group>
                    </> : null}
                    {customBucketFlag ? <>{/*<Form.Label>Enter Bucket Name</Form.Label>*/}
                        <Form.Control as="textarea" rows="1" onChange={handleObjStoreName} placeholder="Enter Bucket Name" /> </> : null}
                </> : null}

                {'   '}

                {props.flagSinkObjStore ?
                    <>
                        <Button variant="outline-primary" value="existBucket" onClick={handleBucketTypeSelect}>


                            Existing Bucket
        </Button>
                        {'   '}
                        <Button variant="outline-primary" value="newBucket" onClick={handleBucketTypeSelect}>


                            Create a new Bucket
        </Button>
                        <br />
                        <br />
                        {existBucketFlag ? <><Form.Group controlId="exampleForm.ControlTextarea1">

                            <DropdownButton id="dropdown-basic-button" title={sinkObjStoreName} onSelect={handleSinkObjStoreSelect}>
                                {sinkObjStoreList.map((opt, i) => (
                                    <Dropdown.Item key={i} eventKey={i}>
                                        {opt}
                                    </Dropdown.Item>
                                ))}
                            </DropdownButton>


                        </Form.Group></> : null}
                        {newBucketFlag ? <><Form.Group controlId="exampleForm.ControlTextarea1">

                            <Form.Control as="textarea" rows="1" onChange={handleSinkObjStoreName} placeholder="Enter Bucket Name" />
                        </Form.Group></> : null}

                    </> : null}
                {/*<>
                    <br />
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        
                        <Form.Control as="textarea" rows="1" onChange={handleObjStoreName} placeholder="Enter Bucket Name" />
                        <br />
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Create a new bucket" checked={objStoreChecked} onChange={() => setObjStoreChecked(!objStoreChecked)} />
                        </Form.Group>
                        <br />

                    </Form.Group>

                </>*/}

                {'   '}

                {props.flagUploadFile ? <Form.Group >
                    <Form.Control
                        id="fileUpload"
                        type="file" onChange={handleFileUpload} />
                </Form.Group> : null}
                {'   '}

                {props.flagADW ? <>
                    <Button variant="outline-primary" value="defaultAdw" onClick={handleADWSelect}>


                        Default Demo ADW
                    </Button>
                    {'   '}
                    <Button variant="outline-primary" value="existAdw" onClick={handleADWSelect}>


                        Existing ADW
            </Button>
                    {'   '}
                    <Button variant="outline-primary" value="newAdw" onClick={handleADWSelect}>


                        Create a new ADW
            </Button>
                    <br />
                    <br />
                    {defaultAdwFlag ? <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>ADW DB Name</Form.Label>
                        <Form.Control as="textarea" rows="1" defaultValue="niadw" onChange={handleADWOcid} disabled />
                        <br />
                        <Form.Label>ADW OCID</Form.Label>
                        <Form.Control as="textarea" rows="1" defaultValue="ocid1.autonomousdatabase.oc1.ap-hyderabad-1.anuhsljrlxbsvtqawav7bk524hy5tsgh24nkucxrpsi7sgikc5qoovj7dpqq" onChange={handleADWOcid} disabled />
                        <br />
                        <Form.Label>Username</Form.Label>
                        <Form.Control as="textarea" rows="1" defaultValue="admin" onChange={handleUser} disabled />
                        <br />
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" defaultValue="Adwdemodb1234#" onChange={handlePwd} disabled />
                        <br />
                        <Form.Label><i>Please note the password - </i> 'Adwdemodb1234#'</Form.Label>
                    </Form.Group> : null}

                    {existAdwFlag ? <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>ADW OCID</Form.Label>
                        <Form.Control as="textarea" rows="1" onChange={handleADWOcid} />
                        <br />
                        <Form.Label>Username</Form.Label>
                        <Form.Control as="textarea" rows="1" onChange={handleUser} />
                        <br />
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={handlePwd} />
                        <br />
                        {/*<Form.Label>Table Name</Form.Label>
                        <Form.Control as="textarea" rows="1" onChange={handleTableName} />
                        <br />*/}
                        <Form.Label>Wallet File</Form.Label>
                        <Form.Control
                            id="fileUpload"
                            type="file" onChange={handleWallet} />


                    </Form.Group> : null}
                    {newAdwFlag ? <Form.Group controlId="exampleForm.ControlTextarea1">

                        <Form.Label>Total CPU cores</Form.Label>
                        <Form.Control as="textarea" rows="1" defaultValue="1" onChange={handleCpu} />
                        <br />
                        <Form.Label>Total Storage (TB)</Form.Label>
                        <Form.Control as="textarea" rows="1" defaultValue="1" onChange={handleStorage} />
                        <br />
                        <Form.Label>Database Name</Form.Label>
                        <Form.Control as="textarea" rows="1" defaultValue="testadwdb" onChange={handleDBName} />
                        <br />
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control as="textarea" rows="1" defaultValue="testadwdb" onChange={handleDisplayName} />
                        <br />
                        <Form.Label>Admin Password</Form.Label>
                        <Form.Control type="password" onChange={handlePwd} />
                        <br />
                        {/*<Form.Label>Table Name</Form.Label>
                        <Form.Control as="textarea" rows="1" onChange={handleTableName} />*/}
                        <br />
                    </Form.Group> : null}


                </> : null}
                {'   '}


                {props.flagOciStream ? <Form.Group controlId="exampleForm.ControlTextarea1">
                    <br />
                    <Form.Label>Enter Stream Name</Form.Label>
                    <Form.Control as="textarea" rows="1" name="stream_name" defaultValue="demo-stream-01" onChange={handleStreamName} />
                    <br />
                    <Form.Label>Enter number of partitions</Form.Label>
                    <Form.Control as="textarea" rows="1" defaultValue="1" name="partition_count" onChange={handlePartitionCnt} />
                </Form.Group> : null}
                {'   '}
                {props.dataSourceType === 'internal' ?
                    <><div class="col-md-12 text-center">
                        <Button size="sm" variant={logsVariant} onClick={() => { handleDataSelect("logs") }} disabled={props.userGroupFlag === "yes" ? "disabled" : ""} >
                            <Image src="images/logs.png" roundedCircle />
                            <br />
                            Logs Data
                        </Button>
                        {'   '}
                        {/*<Button size="sm" variant={stataVariant} onClick={() => { handleDataSelect("stata") }} disabled={props.userGroupFlag === "yes" ? "disabled" : ""}>*/}
                        <Button size="sm" variant={stataVariant} onClick={() => { handleDataSelect("stata") }} disabled>
                            <Image src="images/stata.png" roundedCircle />
                            <br />
                    Stata Data
                  </Button></div> </> : null}
                {props.dataSourceType === 'external' ? <><div className="col-md-12 text-center">
                    <Button size="sm" variant={twitterVariant} onClick={() => { handleDataSelect("twitter") }}>
                        <Image src="images/twitter.png" roundedCircle />
                        <br />
            Twitter Data
          </Button>
                    {'   '}
                    <Button size="sm" variant={citibikeVariant} onClick={() => { handleDataSelect("citibike") }}>
                        <Image src="images/citibike_data.png" roundedCircle />
                        <br />
            Citi Bike Trip Data
          </Button>

          {'   '}
                    <Button size="sm" variant={bankingDataVariant} onClick={() => { handleDataSelect("bankingdata") }}>
                        <Image style={bankingImageStyle} src="images/banking_data.jpg" width={140} height= {140}  roundedCircle />
                        <br />
           Banking Data
          </Button>


                    {'   '}</div></> : null}
                {props.flagNoSql ? <><div class="col-md-12 text-center">
                    <Button size="sm" variant={twitterVariant} onClick={() => { handleDataSelect("solr") }}>
                        <Image src="images/solr.png" roundedCircle />
                        <br />
            Apache Solr
          </Button>
                    {'   '}
                    <Button size="sm" variant={citibikeVariant} onClick={() => { handleDataSelect("es") }}>
                        <Image src="images/es.png" roundedCircle />
                        <br />
            Elastic Search
          </Button>
                    {'   '}<Button size="sm" variant={citibikeVariant} onClick={() => { handleDataSelect("solr_es") }}>
                        <Image src="images/solr_es.png" roundedCircle />
                        <br />
            Both
          </Button>
                    {'   '}</div></> : null}
                {'   '}

                <br />

                {props.flagSecureConnect ? <Form.Group controlId="exampleForm.ControlTextarea1">

                    <Form.Label>Username</Form.Label>
                    <Form.Control as="textarea" rows="1" onChange={handleServerUser} />
                    <br />
                    <Form.Label>IP Address</Form.Label>
                    <Form.Control as="textarea" rows="1" onChange={handleIPAddress} />
                    <br />
                    <Form.Label>Private Key File</Form.Label>
                    <Form.Control
                        id="fileUpload"
                        type="file" onChange={handlePrivateKey} />
                    <br />
                    <br />

                    <Button size="sm" variant="outline-primary" onClick={handleFolderData}>

                        Connect
                    </Button>


                    <br />
                    <br />
                    {console.log(folderData)}


                    {clickConnect
                        ? <>< Spinner animation="grow" role="status">
                            <span className="sr-only"></span>
                        </Spinner><br /><p><i>Connecting . . . </i></p></>
                        : null
                    }
                    {folderData !== null ? <> <DoneAllIcon style={{ fill: 'green' }} /> <p style={{ color: 'green' }}>{secureConnectMsg}</p></> : <><p style={{ color: 'red' }}>{secureConnectMsg}</p></>}


                </Form.Group> : null}

                {props.flagTreeFolder ? <><i>Click to expand</i><br /><br />
                    <CssBaseline />
                    <Container fixed>
                        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} >
                            {FileSystemNavigator(props.folderData)}
                        </Typography>
                    </Container></>
                    : null}
            </Modal.Body>
            <Modal.Footer>

                <Button onClick={handleModalSubmit} value="ok" disabled={props.flagOciStream || defaultAdwFlag ? '' : pageBtnStatus}>Ok</Button>
                <Button onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal >
    );
}
//
export default CenteredModal;