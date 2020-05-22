import {UserRecord} from 'firebase-functions/lib/providers/auth';
import * as admin from 'firebase-admin';
import {UserRepository} from './user.repository';
import {User} from '../models/user';

export class UserService {
  constructor(private userRepository: UserRepository) {}


  createUserAndCartWhen1stLogin(user: UserRecord): Promise<void> {
    let key = admin.database().ref().push().key;
    if(key === null)
    {
      key = "fail"
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
    if (user.uid === undefined)
    {
      const error = new TypeError('User Id is undefined');
      return Promise.reject(error);
    }
    if(user.cartId === undefined){
      const error = new TypeError('Cart Id is undefined');
      return Promise.reject(error);
    }
    return this.userRepository.deleteDateConnected2UserWhenUserDelete(user.uid, user.cartId)
  }
}
