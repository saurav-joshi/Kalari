import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import './App.css';
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Jumbotron from 'react-bootstrap/Jumbotron';
import { useHistory } from "react-router-dom";

const CenteredModal = (props) => {
    console.log(props.location.state.p2)
    const [fileUpload, setFileUpload] = useState(false);
    const [textBox, setTextBox] = useState(false);
    const [adw, setAdw] = useState(false);
    const [pageBtnStatus, setPageBtnStatus] = useState('disabled')
    const [sampleRadioSelect, setSampleRadioSelect] = useState(false);
    const [fileRadioSelect, setFileRadioSelect] = useState(false);
    const [objStoreRadioSelect, setObjStoreRadioSelect] = useState(false);
    //const [adwRadioSelect, setAdwRadioSelect] = useState(false);
    const history = useHistory();
    const handleSelect = (e) => {
        console.log(e);
        history.push({ pathname: "/sink", state: { dataset: props.location.state.dataset, source: "sample" } })
        //history.push("/sink")
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
            setPageBtnStatus('')
        }
        else if (e.target.value === "obj_store") {
            setFileRadioSelect(false)
            setObjStoreRadioSelect(true)
            setSampleRadioSelect(false)
            setFileUpload(false);
            setTextBox(true);
            setAdw(false)
            setPageBtnStatus('')
        }
        else if (e.target.value === "sample") {
            setFileRadioSelect(false)
            setObjStoreRadioSelect(false)
            setSampleRadioSelect(true)
            setFileUpload(false);
            setTextBox(false);
            setAdw(false)
            setPageBtnStatus('')
        }
        //setDatasetSelected(e)
    }

    return (
        <Container className="p-3">
            <Image src="images/generic_theme.png" fluid />
            <Jumbotron>
                <h1 className="header">Select your input data</h1>
                <br />
                <br />
                <br />
                <div class="col-md-12 text-center">

                    <Form>

                        <><ButtonGroup toggle>

                            <ToggleButton
                                key="1"
                                type="radio"
                                variant="light"
                                name="radio"
                                value="sample"
                                checked={sampleRadioSelect}
                                onChange={handleRadioSelect}
                            >

                                <Image src="images/sample.png" roundedCircle />
                                <br />
                                Pre-loaded File
                            </ToggleButton>

                        </ButtonGroup>
                            {'   '}
                            <ButtonGroup toggle>

                                <ToggleButton
                                    key="1"
                                    type="radio"
                                    variant="light"
                                    name="radio"
                                    value="file"
                                    checked={fileRadioSelect}
                                    onChange={handleRadioSelect}
                                >

                                    <Image src="images/upload.png" roundedCircle />
                                    <br />
                                    Upload a file
                </ToggleButton>


                            </ButtonGroup> </>

                        {'   '}
                        <ButtonGroup toggle>

                            <ToggleButton
                                key="1"
                                type="radio"
                                variant="light"
                                name="radio"
                                value="obj_store"
                                checked={objStoreRadioSelect}
                                onChange={handleRadioSelect}
                            >
                                <Image src="images/objStore.png" roundedCircle />
                                <br />
                                Object Storage
  </ToggleButton>
                            <br />

                        </ButtonGroup>






                    </Form>
                    {textBox ?
                        <>
                            <br />
                            <br />
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Enter object storage bucket URL</Form.Label>
                                <Form.Control as="textarea" rows="1" />
                            </Form.Group> </> : null
                    }
                    {'   '}
                    {fileUpload ?
                        <>
                            <br />
                            <br />
                            <Form.Group >
                                <Form.File id="exampleFormControlFile1" />
                            </Form.Group></> : null}

                    <br />
                    <br />
                    <Button variant="outline-primary" size="lg" onClick={history.goBack} disabled={pageBtnStatus}>
                        Prev
      </Button>
                    {'   '}
                    <Button variant="outline-primary" size="lg" onClick={handleSelect} disabled={pageBtnStatus}>
                        Next
      </Button>
                </div>
                <CenteredModal
                    flagCreate={createFlag}
                    flagConsume={consumeFlag}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onSubmit={handleModalSubmit}
                />
            </Jumbotron>
        </Container>
    );
}

export default CenteredModal;