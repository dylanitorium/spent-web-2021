import firebase from "./firebase";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export const useSubscribeToCollection = (name) => {
  const [collection, setCollection] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const subscribe = () =>
    firebase
      .firestore()
      .collection(name)
      .onSnapshot((docs) => {
        const data: any[] = [];
        docs.forEach((doc) => data.push(doc.data()));
        setCollection(data);
        loading && setLoading(false);
      });

  return [collection, subscribe, loading];
};

export const useSubscribeToDoc = (collection, ref) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const subscribe = () =>
    firebase
      .firestore()
      .collection(collection)
      .doc(ref)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setData(doc.data());
        }
        loading && setLoading(false);
      });

  return [data, subscribe, loading];
};

export const useGetDoc = (collection, ref) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const getDoc = async () => {
    const doc = await firebase
      .firestore()
      .collection(collection)
      .doc(ref)
      .get();

    if (doc.exists) {
      setData(doc.data());
    }

    setLoading(false);
  };

  return [data, getDoc, loading];
};

export const useGetCollection = (name) => {
  const [collection, setCollection] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const getCollection = async () => {
    const docs = await firebase.firestore().collection(name).get();

    const data: any[] = [];
    docs.forEach((doc) => data.push(doc.data()));
    setCollection(data);
    loading && setLoading(false);

    setLoading(false);
  };

  return [collection, getCollection, loading];
};

// create uuid
export const useCreateDoc = (collection, identifierField = "id"): any[] => {
  const [loading, setLoading] = useState(false);

  const createDoc = async (data, opts = {}) => {
    setLoading(true);

    const id = uuid();

    await firebase
      .firestore()
      .collection(collection)
      .doc(id)
      .set({
        [identifierField]: id,
        ...data,
      }, opts);

    setLoading(false);

    return;
  };

  return [createDoc, loading];
};
