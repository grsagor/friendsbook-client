import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import app from '../firebase/firebase.config'

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    const providerLogin = (provider) => {
        return signInWithPopup(auth, provider);
    }

    const signIn = (email, password) => {
        // setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const createUser = (email, password) => {
        // setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUser = userInfo => {
        return updateProfile(auth.currentUser, userInfo);
    }

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('user observed');
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, [])

    const logOut = () => {
        // setLoading(true);
        return signOut(auth);
    }

    const authInfo = {
        providerLogin,
        user,
        logOut,
        createUser,
        updateUser,
        signIn,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;