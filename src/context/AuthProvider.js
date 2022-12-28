import React from 'react';
import { createContext } from 'react';
import {getAuth} from 'firebase/auth'
import app from '../firebase/firebase.config'

const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {

    const authInfo = {

    }
    return (
        <AuthContext.Pro
    );
};

export default AuthProvider;