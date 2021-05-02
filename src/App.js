import Header from './components/Header';
import GetStartedPanel from './components/GetStartedPanel';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import FileUploadButton from './components/FileUploadButton';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import readContentsOfFileObject from './helpers/readContentsOfFileObjectAsync';
import processInvoiceCSVData from './helpers/processInvoiceCSVData';

const App = () => {
    const [hasFileUploadFinished, setHasFileUploadFinished] = useState(false);
    const [selectedFile, setSelectedFile] = useState();

    return (
        <div className="App">
            <Header
                title={'Invoice App'}
                description={
                    'Easily calculate the sum of any invoices in your business.'
                }
            />
            <GetStartedPanel description={
                `
                Upload list of invoices, debit and credit notes
                in different currencies.
                `
            } />
            <Form>
                <Container>
                        <Row>
                            <Col>
                                <Form.Group controlId="formCSVFileUpload">
                                    <Form.Label>CSV file</Form.Label>
                                    <Form.File
                                        onChange={(e) => {
                                            setSelectedFile(e.target.files[0]);
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formVATNumber">
                                    <Form.Label>VAT number</Form.Label>
                                    <Form.Control type="text" placeholder="Enter VAT number" />
                                    <Form.Text className="text-muted">
                                        Fill in if you want filtering by VAT number.
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formCurrencyConversions">
                                    <Form.Label>List of currencies</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Currencies" />
                                    <Form.Text className="text-muted">
                                        Enter currency conversions.
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>
                </Container>
                <Container>
                    <Row>
                        <Col>
                            <p>Placeholder for Output currency</p>
                            <FileUploadButton
                                fileUploadHandler={async (e) => {
                                    e.preventDefault();
                                    setHasFileUploadFinished(true);
                                    const fileContents = await readContentsOfFileObject(selectedFile);
                                    const csvData = await processInvoiceCSVData(fileContents);
                                    console.log('CSV Data ', csvData);
                                }}
                            />
                        </Col>
                    </Row>
                </Container>
            </Form>
            {
                hasFileUploadFinished &&
                (<Container>
                    <Row>
                        <Col>Great success</Col>
                    </Row>
                </Container>)
            }
        </div>
    );
}

export default App;