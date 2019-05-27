import React from "react";
import { getPostPhoto } from '../Posts/apiPost';

const PostPhoto = (id) => {
    let photo = getPostPhoto(id);
 
    return (
        <img
            src={photo}
            alt={id}
            onError={i => i.target.style.display='none'}
        />
    );
}

export default PostPhoto;
