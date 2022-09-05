import React, { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import './App.css';
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

const App = () => {
  const [modalShow, setModalShow] = useState(false);
  const [datasetSelected, setDatasetSelected] = useState('Pick a data source');
  const [sourceTypeSelected, setSourceTypeSelected] = useState(false);
  const [fileUpload, setFileUpload] = useState(false);
  const [textBox, setTextBox] = useState(false);

  const [sampleRadioSelect, setSampleRadioSelect] = useState(false);
  const [fileRadioSelect, setFileRadioSelect] = useState(false);
  const [objStoreRadioSelect, setObjStoreRadioSelect] = useState(false);

  const [mainScrBtnStatus, setMainScrBtnStatus] = useState('')

  const handleModalButtonClick = (e) => {
    console.log("Got value.......");
    console.log(e);
    setMainScrBtnStatus('disabled')
    setSourceTypeSelected(true)
    setModalShow(false)
  }

  const handleSelect = (e) => {
    console.log(e);
    setDatasetSelected(e)
  }

  const handleRadioSelect = (e) => {
    console.log(e.target.value);
    if (e.target.value === "file") {
      setFileRadioSelect(true)
      setObjStoreRadioSelect(false)
      setSampleRadioSelect(false)
      setFileUpload(true);
      setTextBox(false)
    }
    else if (e.target.value === "obj_store") {
      setFileRadioSelect(false)
      setObjStoreRadioSelect(true)
      setSampleRadioSelect(false)
      setFileUpload(false);
      setTextBox(true)
    }
    else if (e.target.value === "sample") {
      setFileRadioSelect(false)
      setObjStoreRadioSelect(false)
      setSampleRadioSelect(true)
      setFileUpload(false);
      setTextBox(false)
    }
    //setDatasetSelected(e)
  }

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Source Type
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <ButtonGroup toggle>

              <ToggleButton
                key="1"
                type="radio"
                variant="info"
                name="radio"
                value="sample"
                checked={sampleRadioSelect}
                onChange={handleRadioSelect}
              >
                Sample file
                </ToggleButton>

            </ButtonGroup>
            {'   '}
            <ButtonGroup toggle>

              <ToggleButton
                key="1"
                type="radio"
                variant="info"
                name="radio"
                value="file"
                checked={fileRadioSelect}
                onChange={handleRadioSelect}
              >
                Upload a file
                </ToggleButton>

            </ButtonGroup>
            {'   '}
            <ButtonGroup toggle>

              <ToggleButton
                key="1"
                type="radio"
                variant="info"
                name="radio"
                value="obj_store"
                checked={objStoreRadioSelect}
                onChange={handleRadioSelect}
              >
                Object Storage
  </ToggleButton>

            </ButtonGroup>
            <br />
            <br />

            {fileUpload ?
              <>
                <Container>
                  <Row>
                    <Col xs={6} md={4}>
                      <Image src="https://roundicons.com/wp-content/uploads/2017/07/Upload-Document-Flat-Icon.png" rounded />
                    </Col>
                  </Row>
                </Container>
                <br />
                <Form.Group>
                  <Form.File id="exampleFormControlFile1" />
                </Form.Group></> : null}

            {textBox ?
              <>
                <Container>
                  <Row>
                    <Col xs={6} md={4}>
                      <Image src="https://docs.cloud.oracle.com/ja-jp/iaas/Content/Resources/Images/doc-portal-carousel-icon-objectstorage.png" rounded />
                    </Col>
                  </Row>
                </Container>
                <br />
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Enter object storage bucket URL</Form.Label>
                  <Form.Control as="textarea" rows="1" />
                </Form.Group> </> : null
            }
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleModalButtonClick} value="ok">Ok</Button>
          <Button onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Container className="p-3">
      <Jumbotron>
        <h1 className="header">OCI Streaming Service - Demo/Stub</h1>
        <br />
        <br />
        <br />
        <div class="col-md-12 text-center">
          <DropdownButton id="dropdown-basic-button" title={datasetSelected} onSelect={handleSelect} disabled={mainScrBtnStatus}>
            <Dropdown.Item eventKey="Logs Data">Logs Data</Dropdown.Item>
            <Dropdown.Item eventKey="Twitter Data">Twitter Data</Dropdown.Item>
            <Dropdown.Item eventKey="Citibike Tripdata">Citibike Tripdata</Dropdown.Item>
          </DropdownButton>
          <br />
          <br />

          <Button variant="primary" onClick={() => setModalShow(true)} disabled={mainScrBtnStatus}>
            create
      </Button>{'   '}

          <Button variant="primary" onClick={() => setModalShow(true)} disabled={mainScrBtnStatus}>
            consume
      </Button>{'   '}
          <Button variant="danger" disabled={mainScrBtnStatus}>
            delete
      </Button>
          <br />
          <br />

          {sourceTypeSelected
            ? <><p>Loading....</p> < Spinner animation="grow" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner></>
            : null
          }

        </div>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Jumbotron>
    </Container >
  );

}

export default App;
