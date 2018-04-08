const path = require('path');
const csv = require('csvtojson');
const CSV_PATH = path.resolve(__dirname, '../csv/restaurants.csv');
const { firestore, COLLECTION_RESTAURANT } = require('./firestoreClient');

const TYPES = {
    likes: parseInt
};

function loadCsv(csv_path) {
    return new Promise((resolve, reject) => {
        const results = [];
        csv()
            .fromFile(csv_path)
            .on('json', json => {
                for (const [key, value] of Object.entries(json)) {
                    json[key] = !!TYPES[key] ? TYPES[key](value) : value;
                }

                results.push(json);
            })
            .on('done', err => {
                if (err) return reject(err);
                resolve(results);
            });
    });
}

async function main() {
    const data = await loadCsv(CSV_PATH);

    const batchWrite = firestore.batch();
    const collectionRef = firestore.collection(COLLECTION_RESTAURANT);

    data.forEach(row => batchWrite.set(collectionRef.doc(), row));

    batchWrite
        .commit()
        .then(_ => console.log('Successfully bath wrote'))
        .catch(err => console.error(`Error writing batch: ${err}`));
}

main();
