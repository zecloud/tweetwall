import { HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { useState,useEffect,useReducer } from 'react';
import TweetGallery  from './TweetGallery';

const reducer = (state, action) => {
  switch (action.type) {
    case 'setTweets':
      if(state.tweets.length>20)
      {
        state.tweets.shift();
      }
      return {
        tweets:state.tweets.concat(action.payload)
      };
    default:
      throw new Error();
  }
}


const SignalrGallery= () =>{
   
    const [Photos,setPhotos]=useState([]);
    const [state, dispatch] = useReducer(reducer, { tweets: [] });
 
    useEffect(() => {
      console.log("st" )
      console.log(state.tweets)
      if(state.tweets)
      {
        let phs=state.tweets.map(tweet=>{
          return {
            key:tweet.text.id,
            lowResSrc : "docker.gif",
            originalSrc : "docker.gif",
            tweet:tweet.text,
            alt:tweet.text
          }
        })

        setPhotos(phs);

      }
    }, [state.tweets]);

    useEffect(() => {
      const hubConnection = new HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_SIGNALRHUB)
      .build();

    if(hubConnection.state!==HubConnectionState.Connected)
    {
      try{
          hubConnection
          .start()
          .then(() => {
            hubConnection.on('newTweet', (data) => {
              dispatch({type:'setTweets',payload:data})
            });
            console.log(hubConnection.state)
          });
        } catch(err){
          console.log(err);
        }
      }
    }, []);
   
    return <TweetGallery images={Photos}></TweetGallery>
    
}
export default SignalrGallery