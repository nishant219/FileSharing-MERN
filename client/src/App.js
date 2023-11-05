// //we are using "useRef" to redirect input file btn to upload btn

// //after clicking on upload btn we are clicking on input file btn, 
// //so we need to store grabbed file somewhere- "useState"

// //as soon as we selct file we need to make api call, so "useEefffect" came into picture
// //we will open it when we got new file *(On component didUpdate not on onMount)


import { useState, useRef, useEffect } from 'react';
import './App.css';
import uploadFileAPI from "./component/uploadFileAPI";

function App() {
  const logo = 'https://i.pinimg.com/originals/16/46/24/1646243661201a0892cc4b1a64fcbacf.jpg';

  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const uploadFile = async () => {

      if (selectedFile) {
        const data = new FormData(); //we are using form data because we are sending file
        data.append("selectedFile", selectedFile); //we are appending file to form data

        try {
          const response = await uploadFileAPI(data);
          setResult(response.path);
        } catch (error) {
          console.log(error);
        }

      }
      
    };
    uploadFile();
  }, [selectedFile]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container">

      {/* <img src={logo} alt="banner" className="logo"/> */}

      <div className="wrapper">
        <h3>File Sharing MERN web application</h3>
        <p>Upload files and get a sharable link</p>
        <button onClick={onUploadClick}>Upload</button>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => { setSelectedFile(e.target.files[0]) }}
        />

        <a href={result} target='_blank' >{result}</a>

      </div>
    </div>
  );
}

export default App;
