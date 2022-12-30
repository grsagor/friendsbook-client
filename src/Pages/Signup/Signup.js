import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;    

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
                        saveUsers(data, userInfo?.displayName, data?.email)
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }


    const saveUsers = (data, name, email) => {
        const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

    fetch(url, {
      method: 'POST',
      body: formData
  })
  .then(res => res.json())
  .then(imgData => {
      if(imgData.success){
        const user = { 
            name, 
            email,
            university: 'Not Set',
            address: 'Not Set',
            img: imgData.data.url
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
        <div>
            <h2 className='text-3xl'>Please Sign Up To Visit <span className='text-lime-600 font-semibold'>Friendsbook</span>...</h2>
            <form className='w-3/4 mx-auto' onSubmit={handleSubmit(handleSignUp)}>

                <div className="form-control w-full">
                    <label className="label"><span className="label-text">Name</span></label>
                    <input {...register("name")} type="text" placeholder="Enter name" className="input input-bordered w-full" />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Enter Picture</span></label>
                    <input {...register("image")} type="file" placeholder="Enter Picture" className="input input-bordered w-full max-w-xs" />
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
            <p>If you don't have any account, please <Link className='text-lime-600 font-semibold' to='/login'>Lonin</Link>.</p>

        </div>
    );
};

export default Signup;