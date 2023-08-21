import React, { useState } from 'react';

const Images = () => {
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    return(
        <div>
            <h1>images</h1>
                <div className="App">
                    <h2>Add Image:</h2>
                    <input type="file" onChange={handleChange} />
                    <img src={file} />
                </div>
        </div>
    );
};

export default Images;