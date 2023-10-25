import { Avatar } from '@mui/material';
import React, { useRef, useState } from 'react'

const RenderEditImageCell = (params) => {
    let refImage = useRef(null)
    const [image,setImage]=useState("")
    const { row } = params;
  
 
    return (<>
        <input key={params.row.id} type='file'
         onChange={(e) => {
            setImage(URL.createObjectURL(e.target.files[0]))
        }}  
        style={{display:"none"}}
        ref={refImage}
         />
        <Avatar src={image ? image : params.row.image} onClick={()=>refImage.current.click()} />,
    </>
    );
};

export default RenderEditImageCell