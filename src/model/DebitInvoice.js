import { Invoice } from "./Invoice";

export class DebitInvoice extends Invoice {
    constructor({id, currencyName, total=0, parentDocumentId}) {
        super({id, currencyName, total, childInvoices: []});
        this.parentDocumentId = parentDocumentId;
    }

    addChildInvoice(invoice) {
        return undefined;
    }

    calculateInvoiceValueInCurrency(currencyName, exchangeRate) {
       return this.getTotalInCurrency(currencyName, exchangeRate); 
    }}