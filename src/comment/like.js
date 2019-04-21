import React, { useState,useEffect} from 'react';



export default function Like() {
    const [count, setCount] = useState();
        return (
      <div>
        <span> {count} </span>
        <button className="like" onClick={() => setCount(count ? count + 1 : 1)}>
         <img  src="https://img.icons8.com/windows/32/000000/facebook-like.png" alt="like"/> 
        </button>
      </div>
    );
  } 