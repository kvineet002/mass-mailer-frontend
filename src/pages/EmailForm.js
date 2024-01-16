import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';


export default function EmailForm(){
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [Message, setMessage] = useState(null);
  // const [file, setFile] = useState(null);
  // const onDrop = (acceptedFiles) => {
  //   setFile(acceptedFiles[0]);
  // };
  // const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: '.csv' });
  

  async function SendEmail() {
  
    try {  
      console.log(email)
      const response = await axios.post('https://mass-mailer-eight.vercel.app/send-email', {
        email:email,
        Message:Message
      }
      );
  
      setSuccessMessage(response.data);
      setError(null);
    } catch (error) {
      setError('Error sending email');
      setSuccessMessage(null);
    }
  }
  
  // console.log(email)
  return (
    <div>
      <h2 className='p-5 font-semibold'>Simple Email Form</h2>
      <div className='mx-5'>
        <label>Email Address:</label>
        <input
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
          className='border-4 px-4 mx-4 py-2 rounded-lg '

        />
        <label>Message:</label>
        <input
          onChange={(e)=>{
            setMessage(e.target.value)
          }}
          className='border-4 px-4 mx-4 py-10 rounded-lg '

        />
        {/* <div {...getRootProps()} className=' border-4 p-10 border-dotted mb-6 w-[30%] cursor-pointer'>
          <input {...getInputProps()} />
          <p>Drag & drop or click to select a CSV file</p>
        </div> */}
        <button  onClick={SendEmail} className=' bg-black text-white p-2 rounded-lg'  type="submit">Send Email</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

