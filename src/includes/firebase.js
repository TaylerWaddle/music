import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCM-9QhPNUqD_MKwF_6DrC2YOLIZZDZ1QU',
  authDomain: 'music-7101b.firebaseapp.com',
  projectId: 'music-7101b',
  storageBucket: 'music-7101b.appspot.com',
  appId: '1:654945003588:web:5ad3b7be6dd815cffa7411'
}

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

db.enablePersistence().catch((error) => {
  console.log(`Firebase persistence error ${error.code}`)
})

const usersCollection = db.collection('users')
const songsCollection = db.collection('songs')
const commentsCollection = db.collection('comments')

export { auth, db, usersCollection, songsCollection, commentsCollection, storage }
