export class Customer {
    constructor({customerName, vatNumber, documents=[]}) {
        this.customerName = customerName;
        this.vatNumber = vatNumber;
        this.documents = documents;
    }

    addDocuments(document) {
        if (document.id && document.total) {
            this.documents.push(document);
        } else {
            console.error(`Cannot add document ${document}`);
        }
    }
}