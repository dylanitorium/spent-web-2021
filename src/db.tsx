import firebase from "./firebase";
import { useState } from "react";

export const useSubcribeToCollection = (name) => {
  const [collection, setCollection] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  firebase
    .firestore()
    .collection(name)
    .onSnapshot((docs) => {
      const data: any[] = [];
      docs.forEach((doc) => data.push(doc.data()));
      setCollection(data);
      loading && setLoading(false);
    });

  return { loading, collection };
};

export const useSubcribeToDoc = (collection, ref) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
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

  return { loading, data };
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
