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
import { FilePersonFill, HouseDoorFill, Table } from 'react-bootstrap-icons';

const Tables = (props) => {
    const [tblData, setTblData] = useState(null)
    //const [listVariant, setListVariant] = useState("light")
    let obj = null
    const history = useHistory();
    console.log(props.location.state.tblData)
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
        //setListVariant("primary")
        const formData = new FormData();
        let tblName = e.target.value

        formData.append("tblName", tblName);


        axios({
            url: `http://144.24.132.94:8083/fetchCols/`,
            method: 'POST',
            data: formData,
            headers: {
                contentType: "multipart/form-data"
            }
        }).then(function (response) {
            let ColsData = response.data
            console.log(ColsData)
            history.push({ pathname: "/showcolumns", state: { adwDBName: props.location.state.adwDBName, policy: props.location.state.policyName, parentSchema: props.location.state.parentSchema, pwd: props.location.state.pwd, childSchema: props.location.state.childSchema, childSchemaPwd: props.location.state.childSchemaPwd, tblName: tblName, colsData: ColsData } })
        }).catch(function (error) {

            console.log(error);
        });

    }
    const temp = (jsonData) => {
        let str = JSON.stringify(jsonData)
        let jsonObj = JSON.parse(str)
        const tablesList = []

        for (var i = 0; i < Object.keys(jsonObj).length; i++) {
            tablesList.push(<ListGroup.Item action value={jsonObj[i].table_name} onClick={handleClick}><Table /> {jsonObj[i].table_name}</ListGroup.Item>)
        }
        return (<ListGroup>
            {tablesList}
        </ListGroup>)



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
                <h2 className="header">Click on a table name to begin redaction</h2>
                <br />
                <div class="col-md-12 text-center">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {
                            temp(props.location.state.tblData)

                        }
                    </div>
                    <br />
                    <Button variant="outline-primary" size="lg" onClick={history.goBack} >
                        Prev
                </Button>
                </div>




            </Jumbotron>
        </Container >
    );

}

export default Tables;