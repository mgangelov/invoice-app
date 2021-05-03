import { Invoice } from "./Invoice";

export class CreditInvoice extends Invoice {
    constructor({id, currencyName, total=0, parentDocumentId}) {
        super({id, currencyName, total, childInvoices: []});
        this.parentDocumentId = parentDocumentId;
    }

    addChildInvoice(invoice) {
        return undefined;
    }

    calculateInvoiceValueInCurrency(currencyName, exchangeRate) {
        return -1 * this.getTotalInCurrency(currencyName, exchangeRate);
    }
}