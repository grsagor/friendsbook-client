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

        fetch(`https://friendsbook-server.vercel.app/users`, {
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
                    <div className='flex justify-between font-bold'>
                        <div><span>Name</span><br /></div>
                        <div><button>Edit</button></div>
                    </div>
                    <span>{user?.displayName}</span>
                </div>
                <div>
                    <div className='flex justify-between font-bold'>
                        <div><span>Email</span><br /></div>
                        <div><button>Edit</button></div>
                    </div>
                    <span>{user?.email}</span>
                </div>
                <div>
                <div className='flex justify-between font-bold'>
                        <div><span>University</span><br /></div>
                        <div><button>Edit</button></div>
                    </div>
                    <span>Not Set</span>
                </div>
                <div>
                <div className='flex justify-between font-bold'>
                        <div><span>Address</span><br /></div>
                        <div><button>Edit</button></div>
                    </div>
                    <span>Not Set</span>
                </div>
            </div>
            <div className='hidden'>
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

                    <input className='btn btn-primary w-full' value='Update' type="submit" />
                </form>
            </div>
        </div>
    );
};

export default About;