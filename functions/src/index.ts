import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.test = functions.auth
  .user().onCreate(((user, context) => {
      return admin.firestore().doc('users/' + user.uid).set({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
      })
    }
  ));

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
