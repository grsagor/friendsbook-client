import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthProvider';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';
// import IconButton from '@material-ui/core/IconButton';

const Upload = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const imageHostKey = process.env.REACT_APP_imgbb_key;

  const handleAddPost = data => {
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
          data.img = imgData.data.url;

          if(user){
              data.email = user?.email;
              data.displayName = user?.displayName;
          }

          fetch('http://localhost:5000/posts', {
              method: 'POST',
              headers: {
                  'content-type': 'application/json'
              },
              body: JSON.stringify(data)
          })
              .then(res => res.json())
              .then(data => {
                  console.log(data)
                  if(data?.acknowledged){
                      toast.success('Post Added')
                      // navigate('/dashboard/myproducts');
                  }
              })
      }
  })
  }

  return (
    <div className='w-1/4 mx-auto'>
      {/* Text Field Start*/}
      {/* <div><textarea {...register("post")} className="textarea textarea-bordered w-3/4" placeholder="Bio"></textarea></div> */}
      {/* Text Field End */}
      {/* <div><input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        id="contained-button-file"
        {...register("image")}
      />
        <label className='btn' htmlFor="contained-button-file">
          Upload
        </label>
      </div> */}

      <form onSubmit={handleSubmit(handleAddPost)}>

        <div className="form-control w-full">
          <label className="label"><span className="label-text">Post</span></label>
          <textarea {...register("post")} type="text" placeholder="Post" className="input input-bordered w-full h-24" />
          {errors.email && <p className='text-error'>{errors.email?.message}</p>}
        </div>

        <div className="form-control w-full my-2">
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            id="contained-button-file"
            {...register("image")}
          />
          <label className='btn' htmlFor="contained-button-file">Upload Image</label>
        </div>

        <input className='btn btn-primary w-full' value='Post' type="submit" />
      </form>

    </div>
  );
};

export default Upload;