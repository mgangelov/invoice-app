import * as parse from 'csv-parse';

export const parseInvoiceCSVData = async (csvFile) => {
    return new Promise((resolve, reject) => {
        parse(csvFile, {columns: true}, (err, records) => {
            if (err) {
                reject(err);
            }
            resolve(records);
        });

    });
};

export const readContentsOfFileObjectAsync = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = reject;

        fileReader.readAsText(file);
        });
};