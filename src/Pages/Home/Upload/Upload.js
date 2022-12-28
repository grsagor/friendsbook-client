import React from 'react';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';
// import IconButton from '@material-ui/core/IconButton';

const Upload = () => {
    return (
        <div>
            {/* Text Field Start*/}
            <div><textarea className="textarea textarea-bordered w-3/4" placeholder="Bio"></textarea></div>
            {/* Text Field End */}
            <div><input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="contained-button-file"
            />
            <label className='btn' htmlFor="contained-button-file">
                Upload
            </label>
            </div>
          </div>
    );
};

export default Upload;