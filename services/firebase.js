const admin = require('firebase-admin');

// Load Firebase Admin credentials
const serviceAccount = require('../firebase-adminsdk.json'); // Your downloaded key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Firestore instance

module.exports = { db };
