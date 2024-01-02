
// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');
self.importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
self.importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');
// importScripts("react-redux")
// let playsoundeffect=importScripts("../src/utils/playSoundEffect");
// let notificationSfx=importScripts("../src/assets/notificationsfx.wav")
// Initialize the Firebase app in the service worker by passing the generated config
let firebaseConfig = {
  apiKey: "AIzaSyAmHXQEvslz5HRfKLtj39Oi3CEJfXo3YRo",
    authDomain: "crm-f03ae.firebaseapp.com",
    projectId: "crm-f03ae",
    storageBucket: "crm-f03ae.appspot.com",
    messagingSenderId: "43857829456",
    appId: "1:43857829456:web:d740c65fcc86a00d6e7b55",
    measurementId: "G-YTPLM4Y9XN",
    
};

firebase.initializeApp(firebaseConfig);


// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  // useDispatch({type:"notificationback/set",payload:{title:notificationTitle,body:notificationOptions}})
  // useDispatch({
  //   type: "notifications/addItem",
  //   payload: {title:notificationTitle , body: notificationOptions} 
  // })
  self.registration.showNotification(notificationTitle,
    notificationOptions);
    // playsoundeffect(notificationSfx);
});