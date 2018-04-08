const admin = require('firebase-admin');

const SERVICE_ACCOUNT = require('../credentials/firestore.import.alpha.json');

admin.initializeApp({
    credential: admin.credential.cert(SERVICE_ACCOUNT),
    databaseURL: 'https://eat-with-me-alpha.firebaseio.com'
});

exports.firestore = admin.firestore();
exports.COLLECTION_RESTAURANT = 'restaurants';
