
import {initializeApp} from 'firebase/app';
import{ 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider}
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


const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt:"select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth)=>{
const userDocRef = doc(db, 'users', userAuth.uid);

console.log(userDocRef)

const userSnapshot = await getDoc(userDocRef)
console.log(userSnapshot);
console.log(userSnapshot.exists());

if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
        await setDoc(userDocRef, {
            displayName,
            email,
            createdAt
        });
    }catch(error){
        console.log('error', error.message)
    }
}
return userDocRef;
}