import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {UserRecord} from 'firebase-functions/lib/providers/auth';

export interface UserController {
  deleteDateConnected2UserWhenUserDelete(snap: DocumentSnapshot): Promise<void>;

  createUserAndCartWhen1stLogin(user: UserRecord): Promise<void>;
}
