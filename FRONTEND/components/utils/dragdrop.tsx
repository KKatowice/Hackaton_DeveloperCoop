import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import '@/app/css/additional-styles/dragdropz.css'

let fileTypes = ["JPG", "PNG", "GIF","TXT","DOC","DOCX","PDF","XLS","XLSX","MD"];
import 'dotenv/config'
const cid = process.env.IMGUR_ID

function DragDrop(isAvatar:any = false, setimg:any) {
  if(isAvatar){
    fileTypes = ["JPG", "PNG", "GIF"]
  }
  const [file, setFile] = useState(null);
  const [uploadLink, setUploadLink] = useState(null);

  const handleChange = (file:any) => {
    setFile(file);
    console.log("el file...", file,cid)
    
  };

  useEffect(() => {
    if (!file){return}
    uploadToImgur(file).then((link) => {
        setUploadLink(link);
      });
      }, [file]);

  async function uploadToImgur(file:any) {
    const formData = new FormData();
    formData.append('image', file);
    console.log("invio a imgur", formData)
    let response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: `Client-ID ${cid}`,
        Accept: 'application/json'
      },
      body: formData
    });


    let data = await response.json();
    if(data.success === false) {
        response = await fetch('https://api.imgur.com/3/upload', {
        method: 'POST',
        headers: {
            Authorization: `Client-ID ${cid}`,
            Accept: 'application/json'
        },
        body: formData
        });
        data = await response.json()
    }
    setimg(data.data.link)
    console.log("dai pls funziona subito", data, data.data.link)
    return data.data.link;
  }

  return (
    <FileUploader 
      handleChange={handleChange} 
      name="file" 
      types={fileTypes} 
      maxSize={15} 
      classes=""
    />
  );
}

export default DragDrop;