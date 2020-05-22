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

  it('test test', () => {
    const yes = true;
    expect(yes).toBe(true)
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

    //expect(userService.deleteDateConnected2UserWhenUserDelete(user)).rejects.toThrow(TypeError);
    expect(userService.deleteDateConnected2UserWhenUserDelete(user)).rejects.toThrow('User Id is undefined');
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

    //expect(userService.deleteDateConnected2UserWhenUserDelete(user)).rejects.toThrow(TypeError);
    expect(userService.deleteDateConnected2UserWhenUserDelete(user)).rejects.toThrow('User Id is undefined');
  })
});



