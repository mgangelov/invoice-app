import { Invoice } from '../model/Invoice';
import { DebitInvoice } from '../model/DebitInvoice';
import { CreditInvoice } from '../model/CreditInvoice';
import { Currency } from '../model/Currency';
import { ExchangeRate } from '../model/ExchangeRate';

const invoiceId = '11111';
const invoiceCurrencyName = 'EUR';
const invoiceTotal = 400;

const testInvoice = new Invoice({
    id: invoiceId,
    currencyName: invoiceCurrencyName,
    total: invoiceTotal
});

describe('Invoice management', () => {
    test('Invoice creation', () => {
        expect(testInvoice).toBeTruthy();
        expect(testInvoice.id).toEqual(invoiceId);
        expect(testInvoice.currencyName).toEqual(invoiceCurrencyName);
        expect(testInvoice.total).toEqual(invoiceTotal);
    });

    const testDebitInvoiceId = '22222';
    const testDebitInvoice = new DebitInvoice({
        id: testDebitInvoiceId,
        currencyName: 'GBP',
        total: 100,
        parentDocumentId: invoiceId
    });

    test('Add a valid debit invoice as a child', () => {
        testInvoice.addChildInvoice(testDebitInvoice);
        expect(testInvoice.childInvoices.length).toEqual(1);
    });

    test('Attempt to add same invoice as a child', () => {
        expect(() => {
            testInvoice.addChildInvoice(testDebitInvoice)
        })
            .toThrowError(`Invoice with ID ${testDebitInvoiceId} already added`)
    });

    test('Add a valid credit invoice as a child', () => {
        const testCreditInvoice = new CreditInvoice({
            id: '22223',
            currencyName: 'USD',
            total: 200,
            parentDocumentId: invoiceId
        });

        testInvoice.addChildInvoice(testCreditInvoice);
        expect(testInvoice.childInvoices.length).toEqual(2);
    });
});

describe('Invoice calculation', () => {
    const testEurCurrency = new Currency({
        name: 'EUR',
        exchangeRate: 1
    });

    const testGbpCurrency = new Currency({
        name: 'GBP',
        exchangeRate: 0.87
    });

    const testUsdCurrency = new Currency({
        name: 'USD',
        exchangeRate: 1.21
    });

    const testExchangeRate = new ExchangeRate({
        currenciesList: [
            testEurCurrency,
            testGbpCurrency,
            testUsdCurrency
        ]
    });

    test('Get total of invoice in default currency', () => {
        expect(testInvoice.getTotalInDefaultCurrency(testExchangeRate))
            .toEqual(400);
    });

    test('Get total of invoice in non-default currency', () => {
        expect(testInvoice.getTotalInCurrency('GBP', testExchangeRate))
            .toEqual(348);
    });

    test('Calculate invoice value in USD', () => {
        expect(
            testInvoice.calculateInvoiceValueInCurrency('USD',testExchangeRate)
        ).toEqual(423.0804597701149);
    });
})