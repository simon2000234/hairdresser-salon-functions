import {UserController} from './user.controller';
import {admin} from 'firebase-admin/lib/auth';
import UserRecord = admin.auth.UserRecord;
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {UserService} from './user.service';
import {User} from "../models/user";

export class UserControllerFirebase implements UserController{
  constructor(private userService: UserService) {}

  createUserAndCartWhen1stLogin(user: UserRecord): Promise<void> {
    
    return this.userService.createUserAndCartWhen1stLogin(user);
  }

  deleteDateConnected2UserWhenUserDelete(snap: DocumentSnapshot): Promise<void> {
    const user = snap.data() as User;
    return this.userService.deleteDateConnected2UserWhenUserDelete(user);
  }


}
