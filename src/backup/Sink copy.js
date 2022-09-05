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

const CenteredModal = (props) => {
    const [fileUpload, setFileUpload] = useState(false);
    const [textBox, setTextBox] = useState(false);
    const [adw, setAdw] = useState(false);
    const [pageBtnStatus, setPageBtnStatus] = useState('disabled')
    const [sampleRadioSelect, setSampleRadioSelect] = useState(false);
    const [fileRadioSelect, setFileRadioSelect] = useState(false);
    const [objStoreRadioSelect, setObjStoreRadioSelect] = useState(false);
    const [adwRadioSelect, setAdwRadioSelect] = useState(false);
    const [chkBox, setChkBox] = useState(true);
    const [radioBtnStatus, setRadioBtnStatus] = useState('');
    const [sinkFlag, setSinkFlag] = useState('');
    const history = useHistory();
    const handleSelect = (e) => {
        console.log(e);
        history.push({ pathname: "/summary", state: { dataset: props.location.state.dataset, source: props.location.state.source, sink: sinkFlag } })
        //history.push("/summary")
    }

    useEffect(() => {
        chkBox ? setRadioBtnStatus('') : setRadioBtnStatus("disabled")
        if (!chkBox) {
            setPageBtnStatus('')
        }
    }, [chkBox]);

    const handleCheckBox = (e) => {
        console.log(chkBox);
        chkBox ? setChkBox(false) : setChkBox(true)
    }

    const handleRadioSelect = (e) => {
        console.log(e.target.value);
        if (e.target.value === "obj_store") {
            setFileRadioSelect(false)
            setObjStoreRadioSelect(true)
            setSampleRadioSelect(false)
            setFileUpload(false);
            setTextBox(true);
            setAdw(false)
            setPageBtnStatus('')
            setSinkFlag('obj_store')
        }
        else if (e.target.value === "adw") {
            setFileRadioSelect(false)
            setObjStoreRadioSelect(false)
            setSampleRadioSelect(true)
            setFileUpload(false);
            setTextBox(false);
            setAdw(true)
            setPageBtnStatus('')
            setSinkFlag('adw')
        }
        //setDatasetSelected(e)
    }

    return (
        <Container className="p-3">
            <Image src="images/generic_theme.png" fluid />
            <Jumbotron>
                <h1 className="header">Select a destination for the input data</h1>
                <br />
                <br />
                <br />

                <div class="col-md-12 text-center">
                    <Form.Check
                        type='checkbox'
                        id='default-checkbox'
                        label='Check this box to include a destination and choose from below types'
                        checked={chkBox}
                        onClick={handleCheckBox}
                    />
                    <br />
                    <br />

                    <Form>

                        <ButtonGroup toggle>

                            <ToggleButton
                                key="1"
                                type="radio"
                                variant="light"
                                name="radio"
                                value="obj_store"
                                checked={objStoreRadioSelect}
                                onChange={handleRadioSelect}
                                disabled={radioBtnStatus}
                            >
                                <Image src="images/objStore.png" roundedCircle />
                                <br />
                                Object Storage
  </ToggleButton>


                        </ButtonGroup>

                        {'   '}
                        <><ButtonGroup toggle>

                            <ToggleButton
                                key="1"
                                type="radio"
                                variant="light"
                                name="radio"
                                value="adw"
                                checked={adwRadioSelect}
                                onChange={handleRadioSelect}
                                disabled={radioBtnStatus}
                            >
                                <Image src="images/adb.png" roundedCircle />
                                <br />
                                Autonomous Data Warehouse
</ToggleButton>


                        </ButtonGroup> </>
                        <br />
                        <br />
                        {textBox ?
                            <>
                                <br />
                                <br />
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Enter object storage bucket URL</Form.Label>
                                    <Form.Control as="textarea" rows="1" />
                                </Form.Group> </> : null
                        }
                        {adw ?
                            <>

                            </> : null}

                        <br />
                        <br />





                    </Form>
                    <Button variant="outline-primary" size="lg" onClick={history.goBack} disabled={pageBtnStatus}>
                        Prev
      </Button>
                    {'   '}
                    <Button variant="outline-primary" size="lg" onClick={handleSelect} disabled={pageBtnStatus}>
                        Next
      </Button>
                </div>
            </Jumbotron>
        </Container>
    );
}

export default CenteredModal;