// firebase.js
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBx4TPTVG2fp-IHawDfdk5iMAq6JKDVsIk",
  authDomain: "boldandbrew-40d63.firebaseapp.com",
  projectId: "boldandbrew-40d63",
  storageBucket: "boldandbrew-40d63.firebasestorage.app",
  messagingSenderId: "504665117718",
  appId: "1:504665117718:web:cb09e86f4c25f6858b5137",
  measurementId: "G-ZKNEPQFWW1"
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const googleProvider = new firebase.auth.GoogleAuthProvider()

export { auth, googleProvider, firebase }