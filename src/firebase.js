import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";


const firebaseConfig = {
    apiKey: "AIzaSyBWuBKJXfmayoiV_iBsVgbIJGj6zp0xPvs",
    authDomain: "easy-trade-eb360.firebaseapp.com",
    projectId: "easy-trade-eb360",
    storageBucket: "easy-trade-eb360.appspot.com",
    messagingSenderId: "555143091504",
    appId: "1:555143091504:web:ae1443cfca2f59cf57a4f5",
    measurementId: "G-G4R9M927KL"
  };
export const firebaseApp = initializeApp(firebaseConfig);
 const messaging = getMessaging(firebaseApp);

export const gettoken = async() => {
   return await getToken(messaging, {vapidKey: 'BFZShwq3OUqTPSSL1F-KSLvOX8QhnKZ5FjixQrWqp2cd-OjaDR2uUOAAVlf_5vR_2oGf9HvICK7oC_bnUyp6IzM'}).then((currentToken) => {
    
      if (currentToken) {
        // setTokenFound({status:true,token:currentToken});
        localStorage.setItem("divceToken",JSON.stringify({status:true,token:currentToken}))
        return {status:true,token:currentToken}
        // return currentToken        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        // setTokenFound({status:false,token:""});
        
        return {status:false,token:""}
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      // setTokenFound({status:false,token:""});
      // raise err
      console.log('An error occurred while retrieving token. ', err);
      return {status:false,token:""}
      // return err
      // catch error while creating client token
    })}
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});

export function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      gettoken()
      console.log('Notification permission granted.');
    }
    console.log(permission)
  })}