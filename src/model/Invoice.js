export class Invoice {
    constructor({ id, currencyName, total = 0, childInvoices = [] }) {
        this.id = id;
        this.currencyName = currencyName;
        this.total = total;
        this.childInvoices = childInvoices;
    }

    addChildInvoice(invoice) {
        const invoiceAlreadyAdded = this.childInvoices
            .filter(({ id }) => invoice.id === id).length > 0;
        if (
            !invoiceAlreadyAdded &&
            invoice.parentDocumentId &&
            invoice.parentDocumentId === this.id
        ) {
            this.childInvoices.push(invoice);
        } else {
            throw new Error(`Invoice with ID ${invoice.id} already added`);
        }
    }

    getTotalInCurrency(currencyName, exchangeRate) {
        const currencyExchangeRate =
            exchangeRate.currencies[currencyName];
        return this.getTotalInDefaultCurrency(exchangeRate) *
            currencyExchangeRate;
    }

    getTotalInDefaultCurrency(exchangeRate) {
        return this.total / exchangeRate.currencies[this.currencyName];
    }

    calculateInvoiceValueInCurrency(currencyName, exchangeRate) {
        return this.childInvoices.reduce((acc, currentInvoice) => {
            return acc + currentInvoice
                .calculateInvoiceValueInCurrency(currencyName, exchangeRate);
        }, this.getTotalInCurrency(currencyName, exchangeRate));
    }
}