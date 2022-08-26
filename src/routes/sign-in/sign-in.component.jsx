import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import { 
    auth,
    signInWithGooglePopup,
     createUserDocumentFromAuth,
    signInWithGoogleRedirect }
     from "../../utils/firebase/firebase.utils"

 const SignIn = () =>{


    useEffect (()=>{
        async function loadData() {
            const response = await getRedirectResult(auth)
         if(response){
            const userDocRef = await createUserDocumentFromAuth (response.user)
         }

        }
          loadData()
    },[])

    const logGoogleUser = async () =>{
        const {user} = await signInWithGooglePopup();
        const userDocRef = await  createUserDocumentFromAuth(user);
    }
  

    return(
        <div>
            <h1>hello frm sign in page</h1>
            <button onClick={logGoogleUser}>sign in with Google Popup</button>
            <button onClick={ signInWithGoogleRedirect }>sign in with Google Redirect</button>
        </div>
    )
}

export default SignIn