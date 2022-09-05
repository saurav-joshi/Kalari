import React, { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import './App.css';
import Carousel from 'react-bootstrap/Carousel'
import { useHistory } from "react-router-dom";
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'
import { Navbar, Nav, FormControl } from 'react-bootstrap'
import { HouseDoorFill, LayoutThreeColumns } from 'react-bootstrap-icons';
import Spinner from 'react-bootstrap/Spinner'


const Columns = (props) => {
    const [tblData, setTblData] = useState(null)
    const [msg, setMsg] = useState('');
    const [userSubmit, setUserSubmit] = useState(false);
    const [selectedCols, setSelectedCols] = useState([])
    const [adminUrl, setAdminUrl] = useState('');
    const [guestUrl, setGuestUrl] = useState('');
    const [populateLinks, setPopulateLinks] = useState('');
    let obj = null
    const history = useHistory();

    //console.log(props.location.state.colsData)
    /*async function fetchAdwTbls(sid_p, user_p, pwd_p, wallet_p) {
        const formData = new FormData();
        formData.append("sid", sid_p);
        formData.append("user", user_p);
        formData.append("pwd", pwd_p);
        formData.append("wallet", wallet_p)

        
        //contentType = "multipart/form-data"
        await axios({
            url: `http://144.24.132.94:8083/fetchAdwTbls/`,
            method: 'POST',
            data: formData,
            headers: {
                contentType: "multipart/form-data"
            }
        }).then(function (response) {
            setTblData(response.data);
            console.log(tblData)
        }).catch(function (error) {
            console.log("0000000000000")
            console.log(error);
        });


    }*/

    const handleClick = (e) => {
        console.log("yesssssss****")
        setMsg('')
        const formData = new FormData();
        console.log(selectedCols)
        setUserSubmit(true)
        //formData.append("colsName", e.target.value);
        formData.append("colsName", selectedCols);
        formData.append("tblName", props.location.state.tblName);
        formData.append("policy", props.location.state.policy);
        formData.append("adwDbNameRedn", props.location.state.adwDBName);
        formData.append("parentSchema", props.location.state.parentSchema);
        formData.append("childSchema", props.location.state.childSchema);
        formData.append("childSchemaPwd", props.location.state.childSchemaPwd);
        formData.append("pwd", props.location.state.pwd);
        //formData.append("sid", props.location.state.sid);



        axios({
            url: `http://144.24.132.94:8083/redactCols/`,
            method: 'POST',
            data: formData,
            headers: {
                contentType: "multipart/form-data"
            }
        }).then(function (response) {
            setTimeout(() => {
                if (response.data.statuscode === "success") {
                    setMsg(response.data.message)
                    setUserSubmit(false)
                    setAdminUrl(response.data.adminUrl);
                    setGuestUrl(response.data.guestUrl);
                    setPopulateLinks(true)
                }
                else if (response.data.statuscode === "error") {
                    setMsg(response.data.message)
                    setUserSubmit(false)
                    setPopulateLinks(false)
                }
            }, 3000);


            //history.push({ pathname: "/showcolumns", state: {sid: props.location.state.sid, policy: props.location.state.policyName, parentSchema: props.location.state.parentSchema, pwd: props.location.state.password, childSchema: props.location.state.childSchema, tblName: props.location.state.tblName, colsData: ColsData } })
        }).catch(function (error) {

            console.log(error);
        });
    }

    const handleInputChange = (event) => {
        const target = event.target;
        var value = target.value;

        if (target.checked) {
            //this.state.hobbies[value] = value;  
            console.log(value)
            setSelectedCols(selectedCols.concat(value))
        } else {
            //this.state.hobbies.splice(value, 1);
            console.log("else")
            //selectedCols.splice(value, 1)
            setSelectedCols(selectedCols.filter(item => item !== value))
        }

    }

    const temp = (jsonData) => {
        let str = JSON.stringify(jsonData)
        let jsonObj = JSON.parse(str)
        const colsList = []

        for (var i = 0; i < Object.keys(jsonObj).length; i++) {
            colsList.push(<><Form.Check type='checkbox' label={jsonObj[i].column_name} value={jsonObj[i].column_name} onChange={handleInputChange} /><br /></>)
        }
        return (<Form className='form-checkbox'>
            {colsList}
        </Form>)

    }
    const handleDataLakeSelect = (e) => {

        history.push({ pathname: "/datalake", state: { userocid: props.location.state.userocid } })


    }
    const handleHomeClick = () => {
        history.push({ pathname: "/home", state: { userocid: props.location.state.userocid } })
    }
    return (
        < Container className="p-3" >
            <Image src="images/generic_theme.png" fluid />
            <Navbar bg="light" variant="light">
                {/*<Navbar.Brand href="/"><HouseDoorFill color="black" size={30} /></Navbar.Brand>*/}
                <Nav.Link to={'/home'} onClick={handleHomeClick} ><HouseDoorFill color="black" size={30} /></Nav.Link>

                <Nav className="mr-auto">
                    <Nav.Link onClick={handleDataLakeSelect}>Data Lake</Nav.Link>
                    <Nav.Link href="dataredaction">Data Redaction</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-primary">Search</Button>
                </Form>
            </Navbar>
            <Jumbotron fluid>
                <h2 className="header">Select one or more columns to redact</h2>
                <br />
                <div class="col-md-12 text-center">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {
                            temp(props.location.state.colsData)

                        }
                    </div>
                    <br />
                    <Button variant="outline-primary" size="lg" onClick={history.goBack} >
                        Prev
                </Button>
                    {'   '}
                    <Button variant="outline-primary" size="lg" onClick={handleClick} >
                        Submit
          </Button>
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
                        <><p><h6><i>Click on the below ADW links to view redacted data.</i></h6></p>
                            {adminUrl !== '' ? <a href={adminUrl} target="_blank">Admin ADB </a> : null}
                            <br />
                            {guestUrl !== '' ? <a href={guestUrl} target="_blank">Guest ADB</a> : null}
                            <br /></> : null
                    }
                </div>




            </Jumbotron>
        </Container >
    );

}

export default Columns;