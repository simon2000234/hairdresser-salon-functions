import {UserRepositoryFirebase} from "../src/users/user.repository.firebase";
import {User} from "../src/models/user";


describe('User Repository', () => {

  let userRepo: UserRepositoryFirebase;

  beforeEach(() => {
    userRepo = new UserRepositoryFirebase();
  });

  it('User Repository defined', () => {
    const userRepoDefined = new UserRepositoryFirebase();
    expect(userRepoDefined).toBe(userRepoDefined);
  });

  it('When createUserAndCartWhen1stLogin User needs to have an email', async () => {

    const user: User = {
      isAdmin: true,
      name: 'testUser',
      cartId: 'testCart',
      picUrl: 'testUrl',
      uid: 'testId'
    };

    await expect(userRepo.createUserAndCartWhen1stLogin(user)).rejects.toThrow('User must have an email')
  });

  it('When createUserAndCartWhen1stLogin User needs to have a name', async () => {

    const user: User = {
      isAdmin: true,
      cartId: 'testCart',
      picUrl: 'testUrl',
      uid: 'testId',
      email: 'testMail'
    };

    await expect(userRepo.createUserAndCartWhen1stLogin(user)).rejects.toThrow('User must have a name')
  });

  it('When createUserAndCartWhen1stLogin User needs to have an Id', async () => {

    const user: User = {
      isAdmin: true,
      cartId: 'testCart',
      picUrl: 'testUrl',
      email: 'testMail',
      name: 'testName'
    };

    await expect(userRepo.createUserAndCartWhen1stLogin(user)).rejects.toThrow('User must have an Id')
  });

  it('When createUserAndCartWhen1stLogin User needs to have a CartId', async () => {

    const user: User = {
      isAdmin: true,
      picUrl: 'testUrl',
      email: 'testMail',
      name: 'testName',
      uid: 'testId'
    };

    await expect(userRepo.createUserAndCartWhen1stLogin(user)).rejects.toThrow('User must have a CartId')
  });

  it('When createUserAndCartWhen1stLogin User needs to have a picUrl', async () => {

    const user: User = {
      isAdmin: true,
      email: 'testMail',
      name: 'testName',
      uid: 'testId',
      cartId: 'testCartId'
    };

    await expect(userRepo.createUserAndCartWhen1stLogin(user)).rejects.toThrow('User must have a picUrl')
  });

});
