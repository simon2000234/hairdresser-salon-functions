import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.createUserWhen1stLogin = functions.auth
  .user().onCreate(((user, context) => {
      return admin.firestore().doc('users/' + user.uid).set({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        picUrl: 'https://i.imgur.com/YcP0tikb.jpg',
        isAdmin: false
      })
    }
  ));

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
