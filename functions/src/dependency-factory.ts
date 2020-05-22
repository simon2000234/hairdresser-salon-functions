import {UserControllerFirebase} from './users/user.controller.firebase';
import {UserService} from './users/user.service';
import {UserRepository} from './users/user.repository';
import {UserController} from './users/user.controller';
import {UserRepositoryFirebase} from './users/user.repository.firebase';

export class DependencyFactory {
  getUserController(): UserController {
    const repo: UserRepository = new  UserRepositoryFirebase();
    const service: UserService = new UserService(repo);
    return new UserControllerFirebase(service);
  }
}
