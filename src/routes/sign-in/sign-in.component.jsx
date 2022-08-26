import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

const SignIn = () =>{

    const logGoogleUser = async () =>{
        const {user} = await signInWithGooglePopup();
        // console.log(response)
      const userDocRef = await  createUserDocumentFromAuth(user);
    }

    return(
        <div>
            <h1>hello frm sign in page</h1>
            <button onClick={logGoogleUser}>sign in with Google Popup</button>
        </div>
    )
}

export default SignIn