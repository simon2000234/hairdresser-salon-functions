import {UserRepository} from "../src/users/user.repository";
import {IMock, Mock} from "moq.ts";
import {UserService} from "../src/users/user.service";
import {User} from "../src/models/user";


describe('UserService', () => {

  let userRepository: IMock<UserRepository>;
  let userService: UserService;

  beforeEach( () => {
    userRepository = new Mock<UserRepository>();
    userService = new UserService(userRepository.object());
  });

  it('IfIdIsUndefinedWhenDeletingUserShouldThrowException', async () => {
    const user: User = {
      isAdmin: true,
      name: 'testUser',
      email: 'testMail',
      cartId: 'testCart',
      picUrl: 'testUrl',
      uid: undefined
    };

    await expect(userService.deleteDateConnected2UserWhenUserDelete(user)).rejects.toThrow('User Id is null or undefined');
  });

  it('IfIdIsNullWhenDeletingUserShouldThrowException', async () => {
    const user: User = {
      isAdmin: true,
      name: 'testUser',
      email: 'testMail',
      cartId: 'testCart',
      picUrl: 'testUrl',
    };

    await expect(userService.deleteDateConnected2UserWhenUserDelete(user)).rejects.toThrow('User Id is null');
  });

  it('IfCartIdIsUndefinedWhenDeletingUserShouldThrowException', async () => {
    const user: User = {
      isAdmin: true,
      name: 'testUser',
      email: 'testMail',
      cartId: undefined,
      picUrl: 'testUrl',
      uid: 'testUserId'
    };

    await expect(userService.deleteDateConnected2UserWhenUserDelete(user)).rejects.toThrow('Cart Id is null or undefined');
  });

  it('IfCartIdIsUndefinedWhenDeletingUserShouldThrowException', async () => {
    const user: User = {
      isAdmin: true,
      name: 'testUser',
      email: 'testMail',
      picUrl: 'testUrl',
      uid: 'testUserId'
    };

    await expect(userService.deleteDateConnected2UserWhenUserDelete(user)).rejects.toThrow('Cart Id is null or undefined');
  });

});



