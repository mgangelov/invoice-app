export class ExchangeRate {
    constructor({ currenciesList=[], defaultCurrency }) {
        this.currencies = {};
        this.defaultCurrency = defaultCurrency;
        if (currenciesList.length > 0) {
            currenciesList.forEach(({ name, exchangeRate }) => {
                this.currencies[name] = exchangeRate;
            });
        }
    }
}