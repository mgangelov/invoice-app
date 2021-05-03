import Header from './components/Header';
import GetStartedPanel from './components/GetStartedPanel';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useState } from 'react';

import {
    parseInvoiceCSVData,
    readContentsOfFileObjectAsync
} from './helpers/fileProcessingUtils';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import {
    calculateSumForAllCustomers,
    calculateSumForCustomer,
    findCustomerByVATNumber,
    processExchangeRateList,
    processInvoiceCSVData
} from './helpers/dataProcessingUtils';

const App = () => {
    const [hasFileUploadFinished, setHasFileUploadFinished] = useState(false);

    const [selectedFile, setSelectedFile] = useState();
    const [VATNumber, setVATNumber] = useState('');
    const [currencyList, setCurrencyList] = useState('');
    const [outputCurrency, setOutputCurrency] = useState('');

    const [invoicesSumResult, setInvoicesSumResult] = useState(0);

    const [formValidated, setFormValidated] = useState(false);

    const buildResultString = (invoiceSum, currency, VATNumber) => {
        const overallInvoiceSumString = 'Overall invoice sum is ';
        const individualCustomerInvoiceSumString = `
            The invoice sum for client with VAT number ${VATNumber} is 
        `;
        return VATNumber ?
            `${individualCustomerInvoiceSumString} ${invoiceSum} ${currency}` :
            `${overallInvoiceSumString} ${invoiceSum} ${currency}`;
    }

    const handleFormSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault()
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        setFormValidated(true);
        if (selectedFile) {
            setHasFileUploadFinished(true);
            const fileContents = await
                readContentsOfFileObjectAsync(selectedFile);
            const csvData = await parseInvoiceCSVData(fileContents);
            const customers = await processInvoiceCSVData(csvData);
            const dataExchangeRate = await processExchangeRateList(currencyList);
            let invoiceSum = 0;
            if (VATNumber) {
                const individualInvoiceSum = calculateSumForCustomer(
                    findCustomerByVATNumber(VATNumber, customers),
                    outputCurrency,
                    dataExchangeRate
                );
                invoiceSum = individualInvoiceSum;
            } else {
                const overallInvoiceSum = calculateSumForAllCustomers(
                    customers, outputCurrency, dataExchangeRate
                );
                invoiceSum = overallInvoiceSum;
            }
            setInvoicesSumResult(invoiceSum);
        }
    }

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
            <Form validated={formValidated} onSubmit={handleFormSubmit}>
                <Container>
                        <Row>
                            <Col>
                                <Form.Group controlId="CSVFileUploadField">
                                    <Form.Label>CSV file</Form.Label>
                                    <Form.File
                                        required
                                        onChange={(e) => {
                                            setSelectedFile(e.target.files[0]);
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="VATNumberField">
                                    <Form.Label>VAT number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter VAT number"
                                        value={VATNumber}
                                        onChange={(e) => setVATNumber(e.target.value)}
                                    />
                                    <Form.Text className="text-muted">
                                        Fill in if you want filtering by VAT number.
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="currencyConversionField">
                                    <Form.Label>List of currencies</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Enter Currencies"
                                        value={currencyList}
                                        onChange={(e) => setCurrencyList(e.target.value)}
                                    />
                                    <Form.Text className="text-muted">
                                        Enter currency conversions in the form of "EUR:1".
                                        One currency per line, no comma at the end of each line
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>
                </Container>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Form.Group controlId="VATNumberField">
                                <Form.Label>Default currency</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter default currency"
                                    input={outputCurrency}
                                    onChange={(e) => setOutputCurrency(e.target.value)}
                                />
                                <Form.Text className="text-muted">
                                    Enter default currency, eg. "EUR"
                                </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button type="submit">Upload</Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
            {
                hasFileUploadFinished &&
                (<Container>
                    <Row>
                        <Col>
                        {buildResultString(
                                invoicesSumResult,
                                outputCurrency,
                                VATNumber,
                        )}
                        </Col>
                    </Row>
                </Container>)
            }
        </div>
    );
}

export default App;