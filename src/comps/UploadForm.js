import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const imageTypes = ['image/png', 'image/jpeg'];

  const selectFileHandler = ({ target }) => {
    let selected = target.files[0];

    if (!selected || !imageTypes.includes(selected.type)) {
      setError('Please select a valid image file (.png or .jpeg)');
      setFile(null);
      return;
    }

    setFile(selected);
    setError(null);
  };
  return (
    <form>
      <label>
        <input type="file" onChange={selectFileHandler} />
        <span>+</span>
      </label>
      <div className="output">
        {error && <div className="error">{error} </div>}
        {file && <div className="file">{file.name} </div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

export default UploadForm;
