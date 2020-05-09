import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCeTnQ_kHSdiwyOiXCaOL94tuPu4k3GNI4",
    authDomain: "crw-edb.firebaseapp.com",
    databaseURL: "https://crw-edb.firebaseio.com",
    projectId: "crw-edb",
    storageBucket: "crw-edb.appspot.com",
    messagingSenderId: "460758217319",
    appId: "1:460758217319:web:0c7f9d3eed6e2006"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef
}

export default firebase;