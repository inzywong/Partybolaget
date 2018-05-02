import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBXGe38zJsZ3BCnIJu39JIkfVwolcJ0yIU",
    authDomain: "partybolagetkth.firebaseapp.com",
    databaseURL: "https://partybolagetkth.firebaseio.com",
    projectId: "partybolagetkth",
    storageBucket: "partybolagetkth.appspot.com",
    messagingSenderId: "1068495948674"
  };
  const fire = firebase.initializeApp(config);
  export default fire;
