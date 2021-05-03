import { CreditInvoice, Currency, Customer, DebitInvoice, ExchangeRate, Invoice } from "../model";

const DOCUMENT_TYPE = {
    INVOICE: '1',
    CREDIT_NOTE: '2',
    DEBIT_NOTE: '3'
};

const objectPropertyExists = (object, property) => {
    return Object.prototype.hasOwnProperty.call(object, property);
}

const documentForCustomerExists = (customer, documentNo) => {
    return customer.documents.filter(({id}) => id === documentNo).length > 0;
}

const lookupDocumentForCustomer = (customer, documentNo) => {
    return customer.documents
        .filter(({id}) => id === documentNo)[0];
}

const isValidInvoiceType = (invoiceType) => {
    return Object.values(DOCUMENT_TYPE).includes(invoiceType);
}

export const findCustomerByVATNumber = (VATNumber, customers) => {
    for (const customerName in customers) {
        const customer = customers[customerName];
        if (customer.vatNumber === VATNumber) {
            return customer;
        }
    }
}

export const processInvoiceCSVData = async (parsedCSVData) => {
    const customers = {};
    const invoices = {};
    for (const csvEntry of parsedCSVData) {
        const customerId = csvEntry['Customer'];
        const currencyName = csvEntry['Currency'];
        const VATNumber = csvEntry['Vat number'];
        const documentNo = csvEntry['Document number'];
        const parentDocumentId = csvEntry['Parent document'];
        const total = csvEntry['Total'];
        const invoiceType = csvEntry['Type'];

        if (
            customerId &&
            VATNumber &&
            !objectPropertyExists(customers, customerId)
        ) {
            customers[customerId] = new Customer({
                customerName: customerId,
                vatNumber: VATNumber
            });
        }

        if (
            documentNo &&
            currencyName &&
            total &&
            isValidInvoiceType(invoiceType)
        ) {
            if (invoiceType === DOCUMENT_TYPE.INVOICE) {
                const invoiceDocument = new Invoice({
                    id: documentNo,
                    currencyName,
                    total
                });
                if (!objectPropertyExists(invoices, documentNo)) {
                    invoices[documentNo] = invoiceDocument;
                } else {
                    throw new Error(`Document with ID ${documentNo} already exists`);
                }
                customers[customerId].addDocument(invoiceDocument);
            } else {
                if (
                    parentDocumentId &&
                    objectPropertyExists(invoices, parentDocumentId)
                ) {
                    if (documentForCustomerExists(customers[customerId], parentDocumentId)) {
                        const childInvoiceProperties = {
                            id: documentNo,
                            currencyName,
                            total,
                            parentDocumentId
                        }
                        const invoiceDocument =
                            (invoiceType === DOCUMENT_TYPE.CREDIT_NOTE) ?
                                new CreditInvoice(childInvoiceProperties) :
                                new DebitInvoice(childInvoiceProperties);
                        lookupDocumentForCustomer(
                            customers[customerId], parentDocumentId
                        ).addChildInvoice(invoiceDocument);
                    } else {
                        throw new Error(
                            `Parent document with ID ${parentDocumentId} not related to
                            customer with ID ${customerId}`
                        );
                    }
                } else {
                    throw new Error(
                        `Parent invoice document ${parentDocumentId} does not exist`
                    );
                }
            } 
        }
    }
    return customers;
}

export const processExchangeRateList = async (currencyList) => {
    const currencyExchangeRates = currencyList
        .split('\n')
        .map(currencyInput => currencyInput.split(':'))
        .map(([currencyName, currencyExchangeRate]) => new Currency({
            name: currencyName,
            exchangeRate: currencyExchangeRate
        }));

    return new ExchangeRate({
        currenciesList: currencyExchangeRates
    });
}

export const calculateSumForAllCustomers = (
    customers,
    currencyName,
    exchangeRate
) => {
    let overallInvoicesSum = 0;
    for (const customerId in customers) {
        const customer = customers[customerId];
        const overallCustomerSpend = calculateSumForCustomer(
            customer,
            currencyName,
            exchangeRate
        );
        overallInvoicesSum += overallCustomerSpend;
    }
    return overallInvoicesSum;
};

export const calculateSumForCustomer = (
    customer,
    currencyName,
    exchangeRate
) => {
    return customer.documents.reduce((acc, invoice) => {
        const invoiceSum = invoice.calculateInvoiceValueInCurrency(
            currencyName,
            exchangeRate
        );
        return acc += invoiceSum;
    }, 0);
}