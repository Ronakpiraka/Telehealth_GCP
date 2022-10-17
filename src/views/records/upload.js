import React, { useState } from 'react';
import { Upload } from 'antd';
// import ImgCrop from 'antd-img-crop';
import { Button} from 'antd';
// import axios from 'axios';

export default function Demo() {
  const[file, setfile]=useState('')
  const[msg, setmsg]=useState('')
  const[err, seterr]=useState('')
  const [fileList, setFileList] = useState([
    {
      uid: '1',
      name: 'image.png',
      status: 'done',
      url: 'https://media.istockphoto.com/photos/electrocardiogram-in-hands-of-doctor-heart-health-check-picture-id1264072162',
    },
  ]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFileChange = (event) => {
      setfile(event.target.files[0])
	}

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  function uploadFileData(event){
		// event.preventDefault();
		// setmsg('');

		// let data = new FormData();
		// data.append('file', file);

		// axios.post('https://brilliorpmstorageaccount.blob.core.windows.net/patient-images',{
		// 	method: 'POST',
		// 	body: data
		// }).then(response => {
    //   setmsg('File successfully uploaded')
		// 	// this.setState({msg: "File successfully uploaded"});
		// }).catch(err => {
		// seterr({err})
		// });
    alert('File successfully uploaded')

	}

  return (
    <React.Fragment>
    {/* <ImgCrop rotate>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 5 && '+ Upload'}
      </Upload>
    </ImgCrop> */}
     <Button type="primary" onClick={uploadFileData}>Save</Button>
     </React.Fragment>
  )
};