import { v4 as uuid } from "uuid";
import firebase from "../firebase"; //TODO

interface CreateUser {
  auth_id: string;
  displayName: string;
  email: string;
}

export interface User {
  user_id: string;
  auth_id: string;
  displayName: string;
  email: string;
  onboarded: boolean;
}

export default class Users {
  collection: any;

  constructor() {
    this.collection = firebase.firestore().collection("users");
  }

  async get() {}

  async create(data: CreateUser) {
    const user_id = uuid();

    await this.collection.doc(data.auth_id).set({
      user_id,
      ...data,
    });
  }

  async subscribe({
    ref,
    where,
    onSnapshot,
  }: {
    ref?: string;
    where?: { field: string; operator: string; value: string };
    onSnapshot: (user: User | User[] | null) => Promise<void>;
  }) {
    const target = (() => {
      if (ref) {
        return this.collection.doc(ref);
      }

      if (where) {
        const { field, operator, value } = where;
        return this.collection.where(field, operator, value);
      }

      return this.collection;
    })();

    return target.onSnapshot((snapshot) => {
      if (ref) {
        onSnapshot(snapshot.exists ? snapshot.data() : null);
      } else {
        const users: User[] = [];
        snapshot.forEach((user) => users.push(user.data()));
        onSnapshot(users);
      }
    });
  }
}
