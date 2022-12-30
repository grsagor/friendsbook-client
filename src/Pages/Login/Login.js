import { GoogleAuthProvider } from 'firebase/auth';
import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const { providerLogin, signIn } = useContext(AuthContext);

    const googleProvider = new GoogleAuthProvider();

    const handleLogin = data => {
        signIn(data.email, data.password)
        .then(res => {
            navigate('/');
            const user = res.user;
            console.log(user);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
            .then(res => {
                navigate('/', {replace: true});
                console.log(res.user);
                saveUsers(res.user);
            })
            .catch(error => console.log(error.message))
    }

    const saveUsers = (data) => {

        fetch(`https://friendsbook-server.vercel.app/users?email=${data.email}`)
            .then(res=>res.json())
            .then(users=> {
              if(users.length >0 ){
                console.log('User Found')
                console.log(users.length);
              }  
              if(users.length < 1){
                const user = { 
                    name: data.displayName,
                    email: data.email,
                    university: 'Not Set',
                    address: 'Not Set',
                    img: data.photoURL
                };
                fetch('https://friendsbook-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    })
              }
            })
        
        
    
    }
    return (
        <div className='w-3/4 mx-auto my-4'>
            <h2 className='text-3xl'>Please Log In To Visit <span className='text-lime-600 font-semibold'>Friendsbook</span>...</h2>
            <form onSubmit={handleSubmit(handleLogin)}>

                <div className="form-control w-full">
                    <label className="label"><span className="label-text">Email</span></label>
                    <input {...register("email", { required: "Email Address is required" })} type="text" placeholder="Enter email" className="input input-bordered w-full" />
                    {errors.email && <p className='text-error'>{errors.email?.message}</p>}
                </div>

                <div className="form-control w-full">
                    <label className="label"><span className="label-text">Password</span></label>
                    <input {...register("password", { required: "Password is required" })} type="password" placeholder="Enter password" className="input input-bordered w-full" />
                    {errors.password && <p className='text-error'>{errors.password?.message}</p>}
                    <label className="label"><span className="label-text">Forgot Password?</span></label>
                </div>

                <input className='btn btn-primary w-full' value='Login' type="submit" />
            </form>

            <p>If you don't have any account, please <Link className='text-lime-600 font-semibold' to='/signup'>Sign Up</Link>.</p>


            <button onClick={handleGoogleSignIn} className='btn btn-outline w-full my-4'>Continue With Google</button>
        </div>
    );
};

export default Login;