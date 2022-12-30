import { current } from 'daisyui/src/colors';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { AuthContext } from '../../../../../context/AuthProvider';

const CommentsSection = ({ _id }) => {
    const { data: post = [], refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch(`https://friendsbook-server.vercel.app/posts?id=${_id}`);
            const data = await res.json();
            return data;
        }
    });

    const { currentComments } = post[0];



    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleAddComment = (data) => {
        console.log(data);
        const newComment = {
            commenterName: user?.displayName,
            commenterEmail: user?.email,
            comment: data.comment
        }

        if (currentComments) {
            const newCurrentComments = [newComment, ...currentComments];
            const body = {
                currentComments: newCurrentComments,
                id: _id
            };
            fetch(`https://friendsbook-server.vercel.app/comments`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.modifiedCount > 0) {
                        toast.success('Comment Added');
                        refetch();
                    }
                })
        }
        if (!currentComments) {
            const newCurrentComments = [newComment];
            const body = {
                currentComments: newCurrentComments,
                id: _id
            };
            fetch(`https://friendsbook-server.vercel.app/comments`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.modifiedCount > 0) {
                        toast.success('Comment Added');
                        refetch();
                    }
                })
        }



    }
    return (
        <div className='w-1/4 mx-auto'>
            <div>
                <form onSubmit={handleSubmit(handleAddComment)}>

                    <div className="form-control w-full my-2">
                        <textarea {...register("comment")} type="text" placeholder="Add Your Comment..." className="input input-bordered w-full h-12" />
                        {errors.email && <p className='text-error'>{errors.email?.message}</p>}
                    </div>

                    <input className='btn btn-primary w-full' value='Comment' type="submit" />
                </form>
            </div>
            <div>
                {
                    currentComments?.map( currentComment => <div className='my-1'>
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{currentComment.commenterName}</h2>
                                <p className='text-left'>{currentComment.comment}</p>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default CommentsSection;