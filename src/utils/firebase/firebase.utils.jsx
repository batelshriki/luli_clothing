
import {initializeApp} from 'firebase/app';
import{ 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword

}
     from'firebase/auth';
     import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6_n7JyW6Q3-1B4NY0OLRqte3iroX25Ek",
    authDomain: "luli-clothing-db.firebaseapp.com",
    projectId: "luli-clothing-db",
    storageBucket: "luli-clothing-db.appspot.com",
    messagingSenderId: "447780980444",
    appId: "1:447780980444:web:11d812a22cad36a77c1619"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);


const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
    prompt:"select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth ,googleProvider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async(
    userAuth,
    additionalInformation={}
    )=>{
    if(!userAuth)return;

const userDocRef = doc(db, 'users', userAuth.uid);



const userSnapshot = await getDoc(userDocRef)


if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
        await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation
        });
    }catch(error){
        console.log('error', error.message)
    }
}
return userDocRef;
}


export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}