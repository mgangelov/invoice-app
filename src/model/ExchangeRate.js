export class ExchangeRate {
    constructor({ currenciesList=[] }) {
        this.currencies = {};
        if (currenciesList.length > 0) {
            currenciesList.forEach(({ name, exchangeRate }) => {
                this.currencies[name] = exchangeRate;
            });
            this.defaultCurrency = currenciesList
                .filter(currency => currency.defaultCurrency)[0];
        }
    }
}