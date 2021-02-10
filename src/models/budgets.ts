import { v4 as uuid } from "uuid";
import OwnedModel from "./OwnedModel";
import firebase from "../firebase";
import { CreateBudget, Budget } from "../../types";

export default class Budgets extends OwnedModel {
  collection: any;

  constructor(user) {
    super(user);

    this.collection = firebase.firestore().collection("budgets");
  }

  async create(data: CreateBudget) {
    const budget_id = uuid();

    await this.collection.doc(budget_id).set({
      budget_id,
      users: [this.user],
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
    onSnapshot: (budget: Budget | Budget[] | null) => Promise<void>;
  }) {
    const target = (() => {
      if (ref) {
        return this.collection.doc(ref);
      }

      const collection = this.collection.where(
        "users",
        "array-contains",
        this.user
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
        const budgets: Budget[] = [];
        snapshot.forEach((budget) => budgets.push(budget.data()));
        onSnapshot(budgets);
      }
    });
  }
}
