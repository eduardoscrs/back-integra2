import { query } from 'express';
import admin from 'firebase-admin';
import { QuerySnapshot } from 'firebase-admin/firestore';
import serviceAccount from '../../serviceAccountKeys.js' ; // Asegúrate de que la ruta sea correcta

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

let customersRef = db.collection('Customers');

customersRef.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
  });
});
