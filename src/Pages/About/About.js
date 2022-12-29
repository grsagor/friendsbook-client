import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../context/AuthProvider';

const About = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleAbout = (data) => {
        const body = {
            university: data.university,
            address: data.address
        }

        fetch(`http://localhost:5000/users`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if(data.modifiedCount>0){
                        toast.success('User Updated');
                        // refetch();
                    }
                })
    }

    return (
        <div>
            <div className='text-left w-1/4 mx-auto'>
                <div>
                    <span>Name</span><br />
                    <span>{user?.displayName}</span>
                </div>
                <div>
                    <span>Email</span><br />
                    <span>{user?.email}</span>
                </div>
                {/* <div>
                    <span>University</span><br />
                    <span>{varsity}</span>
                </div>
                <div>
                    <span>Address</span><br />
                    <span>{address}</span>
                </div> */}
            </div>
            <div>
                <form onSubmit={handleSubmit(handleAbout)}>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">University</span></label>
                        <textarea {...register("university")} type="text" placeholder="Post" className="input input-bordered w-full h-24" />
                        {errors.email && <p className='text-error'>{errors.email?.message}</p>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Address</span></label>
                        <textarea {...register("address")} type="text" placeholder="Post" className="input input-bordered w-full h-24" />
                        {errors.email && <p className='text-error'>{errors.email?.message}</p>}
                    </div>

                    <input className='btn btn-primary w-full' value='Post' type="submit" />
                </form>
            </div>
        </div>
    );
};

export default About;