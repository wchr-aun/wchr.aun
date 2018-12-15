import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyApTy8LYvaDuOZV1uF1G6lmyUJbigcg7ig",
  authDomain: "azwraith-ab64b.firebaseapp.com",
  databaseURL: "https://azwraith-ab64b.firebaseio.com",
  projectId: "azwraith-ab64b",
  storageBucket: "azwraith-ab64b.appspot.com",
  messagingSenderId: "993510187628"
}

const firebaseApp = firebase.initializeApp(config)

firebase.firestore().settings({
  timestampsInSnapshots: true
})

export default firebaseApp
