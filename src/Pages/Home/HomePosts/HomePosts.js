import React from 'react';
import { useQuery } from 'react-query';
import Post from '../../Medias/Post/Post';

const HomePosts = () => {
    const { data: posts = [], refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/postsinhome');
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

export default HomePosts;