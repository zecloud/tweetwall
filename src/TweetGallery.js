import React from 'react';
import FakeTweet from "fake-tweet";
import "fake-tweet/build/index.css";
//import 'react-lazy-load-image-component/src/effects/blur.css';
import StackGrid from "react-stack-grid";


const TweetGallery = ( props) => {
  const images=props.images;

  //console.log(images);
  return     <StackGrid
  columnWidth={400}
>

{images.map((image,index) => 
<div key={image.key}>

 <FakeTweet  key={image.key} config={image.tweet} /> 

              </div>
)}

               
    </StackGrid>
}

export default TweetGallery