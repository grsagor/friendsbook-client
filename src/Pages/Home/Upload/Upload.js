import React from 'react';
import Button from '@material-ui/core/Button';
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
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label>
            </div>
          </div>
    );
};

export default Upload;