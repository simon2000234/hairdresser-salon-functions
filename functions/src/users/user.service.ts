import {UserRecord} from 'firebase-functions/lib/providers/auth';
import * as admin from 'firebase-admin';
import {UserRepository} from './user.repository';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {User} from '../models/user';

export class UserService {
  constructor(private userRepository: UserRepository) {}


  createUserAndCartWhen1stLogin(user: UserRecord): Promise<void> {
    let key = admin.database().ref().push().key
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

  deleteDateConnected2UserWhenUserDelete(snapshot: DocumentSnapshot): Promise<void> {
    const user = snapshot.data() as User
    if (user.uid === undefined || user.cartId === undefined)
    {
      user.uid = "fail";
      user.cartId = "fail";
    }
    return this.userRepository.deleteDateConnected2UserWhenUserDelete(user.uid, user.cartId)
  }
}
