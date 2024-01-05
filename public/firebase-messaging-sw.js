
// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');
self.importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
self.importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');
// importScripts("react-redux")
// let playsoundeffect=importScripts("../src/utils/playSoundEffect");
// let notificationSfx=importScripts("../src/assets/notificationsfx.wav")
// Initialize the Firebase app in the service worker by passing the generated config
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    }).catch(function(err) {
      console.log('Service worker registration failed, error:', err);
    });
  }
let firebaseConfig = {
  apiKey: "AIzaSyBWuBKJXfmayoiV_iBsVgbIJGj6zp0xPvs",
  authDomain: "easy-trade-eb360.firebaseapp.com",
  projectId: "easy-trade-eb360",
  storageBucket: "easy-trade-eb360.appspot.com",
  messagingSenderId: "555143091504",
  appId: "1:555143091504:web:ae1443cfca2f59cf57a4f5",
  measurementId: "G-G4R9M927KL"
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