import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import HomePosts from './HomePosts/HomePosts';
import Upload from './Upload/Upload';

const Home = () => {
    const { user } = useContext(AuthContext);

    // console.log(user);
    return (
        <div>
            <Upload></Upload>
            <HomePosts></HomePosts>
        </div>
    );
};

export default Home;