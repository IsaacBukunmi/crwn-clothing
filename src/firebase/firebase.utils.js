import firebase from 'firebase/app';
import 'firebase/firestore'; //For database
import 'firebase/auth'; //For authentication

const config = {
    apiKey: "AIzaSyCXuB79iSpFdV_SBfZVFamVyZrDqJrk1Y0",
    authDomain: "crwn-db-b0ee0.firebaseapp.com",
    databaseURL: "https://crwn-db-b0ee0.firebaseio.com",
    projectId: "crwn-db-b0ee0",
    storageBucket: "crwn-db-b0ee0.appspot.com",
    messagingSenderId: "495690466170",
    appId: "1:495690466170:web:2661a74f34db6b54c30cc3",
    measurementId: "G-B6S2F70961"
  };


export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return; //exit from function

    const userRef = firestore.doc(`users/${userAuth.uid}`); //getting user reference

    const snapShot = await userRef.get();
    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error){
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' }); // This is to bring out account pop up
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;