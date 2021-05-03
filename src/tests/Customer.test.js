import { Customer } from "../model/Customer";

test('Customer creation', () => {
    const customerName = 'testCustomerName';
    const customerVatNumber = '1111111';
    const testCustomer = new Customer({
        customerName,
        customerVatNumber
    });
    expect(testCustomer).toBeTruthy();
    expect(testCustomer.customerName).toEqual(customerName);
    expect(testCustomer.vatNumber).toEqual(customerVatNumber);
});