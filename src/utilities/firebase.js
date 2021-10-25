import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useState, useEffect } from 'react';
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useUserState = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    onIdTokenChanged(getAuth(firebase), setUser);
  }, []);

  return [user];
};

// export const useUserState = () => useAuthState(firebase.auth());

const firebaseConfig = {
    apiKey: "AIzaSyAaJTvz918e31iv5gQBGWzvUwTlPHabDYI",
    authDomain: "react-tutorial-scheduler.firebaseapp.com",
    databaseURL: "https://react-tutorial-scheduler-default-rtdb.firebaseio.com",
    projectId: "react-tutorial-scheduler",
    storageBucket: "react-tutorial-scheduler.appspot.com",
    messagingSenderId: "623516125855",
    appId: "1:623516125855:web:b6f0be8609dd13a90d30aa"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

// ref(database) // refers to the entire JSON
// ref(database, '/') // refers to the entire JSON
// ref(database, '/courses')

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
};

export const setData = (path, value) => (
    set(ref(database, path), value)
);