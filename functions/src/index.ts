import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {DependencyFactory} from './dependency-factory';

const factory = new DependencyFactory();


admin.initializeApp();

exports.createUserAndCartWhen1stLogin = functions.auth
  .user().onCreate((user) => {
    return factory.getUserController().createUserAndCartWhen1stLogin(user);
  });

exports.deleteDateConnected2UserWhenUserDelete = functions.firestore.document('users/{id}')
  .onDelete((snapshot) => {
    return factory.getUserController().deleteDateConnected2UserWhenUserDelete(snapshot);
  });
