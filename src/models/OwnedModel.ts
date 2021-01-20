import { User } from './Users';

export default class OwnedModel {
  user: User

  constructor(user) {
    this.user = user;
  }

}