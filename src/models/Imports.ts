import { v4 as uuid } from "uuid";
import OwnedModel from "./OwnedModel";
import firebase from "../firebase";
import { Import } from "../../types";

export default class Imports extends OwnedModel {
  collection: any;

  constructor(user) {
    super(user);

    this.collection = firebase.firestore().collection("imports");
  }

  async subscribe({
    ref,
    where,
    onSnapshot,
  }: {
    ref?: string;
    where?: { field: string; operator: string; value: string };
    onSnapshot: (_import: Import | Import[] | null) => Promise<void>;
  }) {
    const target = (() => {
      if (ref) {
        return this.collection.doc(ref);
      }

      console.log(this.user);
      const collection = this.collection.where(
        "users",
        "array-contains",
        this.user.user_id
      );

      if (where) {
        const { field, operator, value } = where;
        return collection.where(field, operator, value);
      }

      return collection;
    })();

    return target.onSnapshot((snapshot) => {
      if (ref) {
        onSnapshot(snapshot.exists ? snapshot.data() : null);
      } else {
        const imports: Import[] = [];
        snapshot.forEach((_import) => imports.push(_import.data()));
        onSnapshot(imports);
      }
    });
  }
}
