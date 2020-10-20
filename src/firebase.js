import fb from 'firebase/app';

export const firebase = !fb.apps.length ? fb.initializeApp({  apiKey: "AIzaSyBBeuvNr93cQDwDIwsO2UWMiqALt921adw",
authDomain: "social-media-975f6.firebaseapp.com",
databaseURL: "https://social-media-975f6.firebaseio.com",
projectId: "social-media-975f6",
storageBucket: "social-media-975f6.appspot.com",
messagingSenderId: "1048931378051",
appId: "1:1048931378051:web:a7ef91908d4680e34d0cb6",
measurementId: "G-2F9QR19FQF"}) : fb.app()