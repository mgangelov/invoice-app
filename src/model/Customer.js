export class Customer {
    constructor({customerName, vatNumber, documents=[]}) {
        this.customerName = customerName;
        this.vatNumber = vatNumber;
        this.documents = documents;
    }

    addDocument(document) {
        if (document.id && document.total) {
            this.documents.push(document);
        } else {
            throw new Error(`Cannot add document with ID ${document.id}`);
        }
    }
}