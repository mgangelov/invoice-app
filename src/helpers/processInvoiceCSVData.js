import * as parse from 'csv-parse';

const processInvoiceCSVData = async (csvFile) => {
    return new Promise((resolve, reject) => {
        parse(csvFile, {}, (err, records) => {
            if (err) {
                reject(err);
            }
            resolve(records);
        });

    });
};

export default processInvoiceCSVData;