const path = require('path');
const jsonfile = require('jsonfile');
const { firestore, COLLECTION_RESTAURANT } = require('./firestoreClient');

const SKIP_INT = 0;

async function main() {
    const batchWrite = firestore.batch();
    const collectionRef = firestore.collection(COLLECTION_RESTAURANT);

    [...Array(2).fill()].map((_, i) => {
        // Batches of 250 (1000 / 4)
        i = SKIP_INT + i;

        [...Array(5).fill()].map((_, z) => {
            // Open the json file
            const filepath = path.resolve(
                __dirname,
                `./Yelp/data-scrape/${i * 5 + z}.json`
            );
            const fileContent = jsonfile.readFileSync(filepath);
            // console.log(fileContent);
            fileContent.forEach(restaurant => {
                // arr.push(restaurant);
                batchWrite.set(collectionRef.doc(), restaurant);
            });
            // });
        });
    });

    batchWrite
        .commit()
        .then(_ => console.log('Successfully bath wrote'))
        .catch(err => console.error(`Error writing batch: ${err}`));
}

main();

// console.log();
