import React from 'react';
import { useQuery } from 'react-query';
import Post from './Post/Post';

const Medias = () => {
    const { data: posts = [], refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/posts');
            const data = await res.json();
            return data;
        }
    });
    return (
        <div>
            {
                posts?.map( singlepost => <Post
                    key = {singlepost._id}
                    singlepost = {singlepost}
                    refetch = {refetch}
                ></Post>)
            }
        </div>
    );
};

export default Medias;