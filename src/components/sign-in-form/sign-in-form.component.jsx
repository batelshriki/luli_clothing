import { useState, useContext } from "react"

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { UserContext } from "../../contexts/user.context";

import {
        signInWithGooglePopup,
        createUserDocumentFromAuth,
        signInAuthUserWithEmailAndPassword 
        } from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss';


const defaultFormFields = {
    email:'',
    password:''

}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password}= formFields;

    // console.log(formFields);
    const { setCurrentUser } = useContext(UserContext);

    const resetFirmFields= () =>{
        setFormFields(defaultFormFields);
    }


    const signInWithGoogle = async () =>{
        const {user} = await signInWithGooglePopup();
       await  createUserDocumentFromAuth(user);
    }


    const handleSubmit = async (event) =>{
            event.preventDefault();

            try{
                const {user} = await signInAuthUserWithEmailAndPassword(
                    email,
                    password
                    );
                    setCurrentUser(user);
                // console.log(response);
                resetFirmFields();
               
            }catch(error){
                switch(error.code){
                    case 'auth/wrong-password':
                        alert ('incorrect password dor email');
                    break
                    case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                    default:
                        console.log(error)
                }
                // if(error.code == 'auth/wrong-password'){
                //     alert('incorrect password dor email')
                // }else if('auth/user-not-found')
                console.log(error)
            }
    }
    
    const handleChange = (event) =>{
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    }

    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>
                

                <FormInput type="email" 
                 label="Email"
                required 
                onChange={handleChange} 
                name="email" 
                value={email}/>

                <FormInput type="password"
                label="password"
                required 
                onChange={handleChange} 
                name="password" 
                value={password}/>


                <div className="buttons-container">
                <Button type="submit">Sign-in </Button>
                <Button type='button' buttonType='google' 
                    onClick={signInWithGoogle}>Google Sign-in 
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default  SignInForm;


