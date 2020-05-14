import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {User} from './user';

admin.initializeApp();

exports.createUserAndCartWhen1stLogin = functions.auth
  .user().onCreate(((user) => {
    const key = admin.database().ref().push().key
    return admin.firestore().doc('shopping-carts/' + key).set({
      productsInCart: []
    }).then(() => {
      return admin.firestore().doc('users/' + user.uid).set({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        picUrl: 'https://i.imgur.com/YcP0tikb.jpg',
        isAdmin: false,
        cartId: key
      })
    })

    }
  ));

exports.deleteDateConnected2UserWhenUserDelete = functions.firestore.document('users/{id}')
  .onDelete((snapshot, context) => {
    const user = snapshot.data() as User
    return admin.auth().deleteUser(context.params.id).then(() => {
      return admin.firestore().doc('shopping-carts/' + user.cartId).delete()
    })
  })


