import {User} from '../models/user';

export interface UserRepository {
  deleteDateConnected2UserWhenUserDelete(uid: string, cartId: string): Promise<any>;

  createUserAndCartWhen1stLogin(user: User): Promise<any>;
}
