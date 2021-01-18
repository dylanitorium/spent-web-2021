import { useEffect, createContext, useContext, useState } from "react";
import firebase from "../firebase";
import createAuthenticator from "../auth";

export const AuthContext = createContext({});
export const useAuth: any = () => useContext(AuthContext);

const auth = createAuthenticator(firebase);

export const signInWithGoogle = () => {
  auth("google");
};

export const signout = () => firebase.auth().signOut();

export const AuthProvider = ({ children }) => {
  const [authenticating, setAuthenticating] = useState(true);
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState<any>(null);
  const [user, setUser] = useState<any>(null);


  //const initialiseUser = async () => {
  //  if (authUser) {
  //    const db = firebase.firestore();
  //    const ref = db.collection("users").doc(authUser.uid);
  //    let user = await ref.get();
      

  //    if (!user.exists) {
  //      const { email, uid, displayName } = authUser;

  //      await ref.set({
  //        email,
  //        uid,
  //        displayName,
  //      });

  //      user = await ref.get();
  //    }

  //    setUser(user.data());
  //  } else {
  //    setUser(null);
  //  }

  //  setLoading(false);
  //};

  const initialiseUser = async () => {
    if (authUser) {
      const db = firebase.firestore();
      const ref = db.collection("users").doc(authUser.uid);

      return ref.onSnapshot(async (user) => {
        if (!user.exists) {
          const { email, uid, displayName } = authUser;
  
          return ref.set({
            email,
            uid,
            displayName,
          });
        } else {
          setUser(user.data());
          setLoading(false);
        }
      });
    } else {
      
      setUser(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((au) => {
      setAuthUser(au);
      setAuthenticating(false);
    });
  }, []);

  useEffect((): any => {
    if (!authenticating) {
      const promise = initialiseUser();
      return () => promise.then(unsub => unsub && unsub()); 
    }
  }, [authUser, authenticating]);

  return (
    <AuthContext.Provider
      value={{
        user,
        ready: !authenticating && !loading,
        signInWithGoogle,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
