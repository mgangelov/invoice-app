export class Invoice {
    constructor({id, currencyName, total=0, childInvoices=[]}) {
        this.id = id;
        this.currencyName = currencyName;
        this.total = total;
        this.childInvoices = childInvoices;
    }

    getValueInCurrency(currencyName, exchangeRate) {
        const currencyExchangeRate =
            exchangeRate.currencies[currencyName];
        return this.getValueInDefaultCurrency(exchangeRate) *
            currencyExchangeRate;
    }

    getValueInDefaultCurrency(exchangeRate) {
        return this.total / exchangeRate.currencies[this.currencyName];
    }

    calculateInvoiceValueInCurrency(currencyName, exchangeRate) {
        return this.childInvoices.reduce((acc, currentInvoice) => {
            return acc +
                currentInvoice.calculateInvoiceValueInCurrency(
                    currencyName, exchangeRate
                );
        }, this.getValueInCurrency(currencyName, exchangeRate));
    }
}