import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDUF_JwbBX10J0UOaUkvLt14RmQtqd94JY",
    authDomain: "kaodim1357.firebaseapp.com",
    databaseURL: "https://kaodim1357.firebaseio.com",
    projectId: "kaodim1357",
    storageBucket: "kaodim1357.appspot.com",
    messagingSenderId: "46376214007",
    appId: "1:46376214007:web:a549c1110ab32115"
  };
  // Initialize Firebase
const firebaseApp=  firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

//export firestore database
export default firebaseApp.firestore()
