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

const Columns = (props) => {
    const [tblData, setTblData] = useState(null)
    let obj = null
    console.log(props.location.state.colsData)
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
        const formData = new FormData();
        console.log(e.target.value)

        formData.append("colsName", e.target.value);
        formData.append("tblName", props.location.state.tblName);
        formData.append("policy", props.location.state.policy);
        formData.append("parentSchema", props.location.state.parentSchema);
        formData.append("childSchema", props.location.state.childSchema);
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
            let ColsData = response.data
            console.log(ColsData)
            //history.push({ pathname: "/showcolumns", state: {sid: props.location.state.sid, policy: props.location.state.policyName, parentSchema: props.location.state.parentSchema, pwd: props.location.state.password, childSchema: props.location.state.childSchema, tblName: props.location.state.tblName, colsData: ColsData } })
        }).catch(function (error) {

            console.log(error);
        });
    }
    const temp = (jsonData) => {
        let str = JSON.stringify(jsonData)
        let jsonObj = JSON.parse(str)
        const colsList = []

        for (var i = 0; i < Object.keys(jsonObj).length; i++) {
            colsList.push(<ListGroup.Item action value={jsonObj[i].column_name} onClick={handleClick}><LayoutThreeColumns />  {jsonObj[i].column_name}</ListGroup.Item>)
        }
        return (<ListGroup>
            {colsList}
        </ListGroup>)

    }
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
                <h2 className="header">Click on a column name to redact</h2>
                <br />
                <div class="col-md-12 text-center">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {
                            temp(props.location.state.colsData)

                        }
                    </div>
                </div>




            </Jumbotron>
        </Container >
    );

}

export default Columns;