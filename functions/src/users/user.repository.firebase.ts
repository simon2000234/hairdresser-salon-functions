import {UserRepository} from './user.repository';
import {User} from '../models/user';
import * as admin from 'firebase-admin';
import {isNullOrUndefined} from "util";

export class UserRepositoryFirebase implements UserRepository {
  createUserAndCartWhen1stLogin(user: User): Promise<any> {
    if(isNullOrUndefined(user.email)){
      const error = new TypeError('User must have an email');
      return Promise.reject(error);
    }
    if(isNullOrUndefined(user.name)){
      const error = new TypeError('User must have a name');
      return Promise.reject(error);
    }
    if(isNullOrUndefined(user.uid)){
      const error = new TypeError('User must have an Id');
      return Promise.reject(error);
    }
    if(isNullOrUndefined(user.cartId)){
      const error = new TypeError('User must have a CartId');
      return Promise.reject(error);
    }
    if(isNullOrUndefined(user.picUrl)){
      const error = new TypeError('User must have a picUrl');
      return Promise.reject(error);
    }
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
