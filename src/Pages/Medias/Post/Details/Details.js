import React, { useContext } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthProvider';
import CommentsSection from './CommentsSectiono/CommentsSection';

const Details = () => {
    const postDetail = useLoaderData();
    const { post, img, _id } = postDetail[0];
    const [reactor, setReactor] = useState(postDetail[0].reactor);

    console.log(postDetail);

    const { user } = useContext(AuthContext);

    const find = reactor?.find(singleReactor => singleReactor === user?.email);

    const handleLike = () => {
        if(!find){
            if(reactor){
                const body = {
                    reactor: [user?.email, ...reactor],
                    id: _id,
                    reactCount: reactor.length+1
                }
    
                fetch(`http://localhost:5000/like`, {
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
                        toast.success('Liked');
                        const reactors = [...reactor, user?.email]
                        setReactor(reactors);
                    }
                })
            }
            if(!reactor){
                const body = {
                    reactor: [user?.email],
                    id: _id,
                    reactCount: 1
                }
    
                fetch(`http://localhost:5000/like`, {
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
                        toast.success('Liked');
                        const reactors = [user?.email]
                        setReactor(reactors);
                    }
                })
            }
        }
        if(find){
                const reactors = reactor?.filter(reactorEmail => reactorEmail!==user?.email);
                const body = {
                    reactor: reactors,
                    reactCount: reactor.length-1,
                    id: _id
                }
    
                fetch(`http://localhost:5000/like`, {
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
                        // toast.success('Admin Made');
                        // refetch();
                        toast.success('Unliked');
                        setReactor(reactors);
                    }
                })
            
        }
        

    }

    return (
        <div>
            <div className="card w-1/4 mx-auto bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Shoes!</h2>
                    <p>{post}</p>
                </div>
                <figure><img src={img} alt="Shoes" /></figure>
                <div className='flex'>
                    <div className={`w-1/2 ${find ? 'text-red-600' : ''}`}><button onClick={handleLike} className='w-full border border-black'>Like</button></div>
                    <div className='w-1/2'><Link to={`/details/${_id}`}><button className='w-full border border-black'>Details</button></Link></div>
                </div>
            </div>
            <CommentsSection
                _id = {_id}
            ></CommentsSection>
        </div>
    );
};

export default Details;