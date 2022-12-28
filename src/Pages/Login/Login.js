import { GoogleAuthProvider } from 'firebase/auth';
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const Login = () => {

    const { providerLogin } = useContext(AuthContext);

    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
            .then(res => {
                console.log(res.user);
            })
            .catch(error => console.log(error.message))
    }
    return (
        <div>
            <button onClick={handleGoogleSignIn} className='btn btn-outline w-full'>Continue With Google</button>
        </div>
    );
};

export default Login;