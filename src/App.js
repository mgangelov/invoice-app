import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import GetStartedPanel from './components/GetStartedPanel';
import { Button, Col, Container, Row } from 'react-bootstrap';

function App() {
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
            }/>
            <Container>
                <Row>
                    <Col>
                        Placeholder for CSV File and VAT number
                    </Col>
                    <Col>
                        Placeholder for List of currencies
                    </Col>
                </Row>
            </Container>
            <div id="upload-section">
                <p>Placeholder for Output currency</p>
                <Button variant="primary">Upload</Button>
            </div>
        </div>
    );
}

export default App;