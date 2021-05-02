export class Currency {
    constructor({name, exchangeRate}) {
        this.name = name;
        this.exchangeRate = exchangeRate;
        this.defaultCurrency = exchangeRate === 1;
    }
}