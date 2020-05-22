import {UserRepository} from './user.repository';
import {User} from '../models/user';
import * as admin from 'firebase-admin';

export class UserRepositoryFirebase implements UserRepository {
  createUserAndCartWhen1stLogin(user: User): Promise<any> {
    return admin.firestore().doc('shopping-carts/' + user.cartId).set({
      productsInCart: []
    }).then(() => {
      return admin.firestore().doc('users/' + user.uid).set(user)
    })
  }

  deleteDateConnected2UserWhenUserDelete(uid: string, cartId: string): Promise<any> {
    return admin.auth().deleteUser(uid).then(() => {
      return admin.firestore().doc('shopping-carts/' + cartId).delete()
    })
  }

}
