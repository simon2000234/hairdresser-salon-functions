import {UserRecord} from 'firebase-functions/lib/providers/auth';
import * as admin from 'firebase-admin';
import {UserRepository} from './user.repository';
import {User} from '../models/user';
import {isNullOrUndefined} from "util";

export class UserService {
  constructor(private userRepository: UserRepository) {}


  createUserAndCartWhen1stLogin(user: UserRecord): Promise<void> {
    const key = admin.database().ref().push().key;
    if(key === null)
    {
      const error = new TypeError('Key gen failed, key is null');
      return Promise.reject(error);
    }

    return this.userRepository.createUserAndCartWhen1stLogin({
      email: user.email,
      uid: user.uid,
      name: user.displayName,
      picUrl: 'https://i.imgur.com/YcP0tikb.jpg',
      isAdmin: false,
      cartId: key
    })
  }

  deleteDateConnected2UserWhenUserDelete(user: User): Promise<void> {
    if(user.uid === null){
      const error = new TypeError('User Id is null');
      return Promise.reject(error);
    }

    if (isNullOrUndefined(user.uid))
    {
      const error = new TypeError('User Id is null or undefined');
      return Promise.reject(error);
    }
    if(isNullOrUndefined(user.cartId)){
      const error = new TypeError('Cart Id is null or undefined');
      return Promise.reject(error);
    }

    return this.userRepository.deleteDateConnected2UserWhenUserDelete(user.uid, user.cartId)
  }
}
