import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../context/AuthProvider';

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { createUser, updateUser } = useContext(AuthContext);

    const handleSignUp = data => {
        createUser(data.email, data.password)
            .then(res => {
                const user = res.user;
                console.log(user);
                toast('User Created Successfully');
                console.log(data.name);
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        // saveUsers(userInfo?.displayName, data?.email, data?.role)
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div>
            <form className='w-3/4 mx-auto' onSubmit={handleSubmit(handleSignUp)}>

                <div className="form-control w-full">
                    <label className="label"><span className="label-text">Name</span></label>
                    <input {...register("name")} type="text" placeholder="Enter name" className="input input-bordered w-full" />
                </div>

                <div className="form-control w-full">
                    <label className="label"><span className="label-text">Email</span></label>
                    <input {...register("email")} type="email" placeholder="Enter email" className="input input-bordered w-full" />
                </div>

                <div className="form-control w-full">
                    <label className="label"><span className="label-text">Password</span></label>
                    <input {...register("password")} type="password" placeholder="Enter password" className="input input-bordered w-full" />
                </div>

                <input className='btn btn-primary w-full mt-4' value='Sign Up' type="submit" />
            </form>
        </div>
    );
};

export default Signup;