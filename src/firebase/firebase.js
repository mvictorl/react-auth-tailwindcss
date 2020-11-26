import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBQVpPgWjdtxD2mtbcNziECtvgKKLI9Ta4",
    authDomain: "auth-test-app-a8edc.firebaseapp.com",
    databaseURL: "https://auth-test-app-a8edc.firebaseio.com",
    projectId: "auth-test-app-a8edc",
    storageBucket: "auth-test-app-a8edc.appspot.com",
    messagingSenderId: "609954531658",
    appId: "1:609954531658:web:3d4c9084a30c9c1f1e19b3"
  };

firebase.initializeApp(firebaseConfig)

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return
  const userRef = firestore.doc(`users/${user.uid}`)
  const snapshot = await userRef.get()
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      })
    } catch (error) {
      console.error("Error creating user document", error)
    }
  }
  return getUserDocument(user.uid)
}

const getUserDocument = async (uid) => {
  if (!uid) return null
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get()
    return {
      uid,
      ...userDocument.data(),
    }
  } catch (error) {
    console.error("Error fetching user", error)
  }
}

export const auth = firebase.auth()
export const firestore = firebase.firestore() 
