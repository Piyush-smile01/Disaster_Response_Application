const admin = require("firebase-admin");

const serviceAccount = require("./disaster-management-aaf3e-57149546527b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
module.exports = db;
