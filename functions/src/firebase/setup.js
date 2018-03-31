const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.firestore = admin.firestore();
exports.auth = admin.auth();
