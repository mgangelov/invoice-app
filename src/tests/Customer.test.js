import { Customer } from '../model/Customer';
import { Invoice } from '../model/Invoice';
const customerName = 'testCustomerName';
const customerVatNumber = '1111111';
const testCustomer = new Customer({
    customerName,
    vatNumber: customerVatNumber
});

describe('Customer management', () => {
    test('Customer creation', () => {
        expect(testCustomer).toBeTruthy();
        expect(testCustomer.customerName).toEqual(customerName);
        expect(testCustomer.vatNumber).toEqual(customerVatNumber);
        expect(testCustomer.documents).toEqual([]);
    });


    test('Add a new valid document for Customer', () => {
        const testDocument = new Invoice({
            id: '111121',
            total: 400
        });
        testCustomer.addDocument(testDocument);
        expect(testCustomer.documents.length).toEqual(1);
    });

    test('Attempt to add an invalid document for Customer', () => {
        const testDocument = new Invoice({
            id: '111121'
        });
        expect(() => testCustomer.addDocument(testDocument)).toThrowError(
            `Cannot add document with ID ${testDocument.id}`
        );
    });
});
