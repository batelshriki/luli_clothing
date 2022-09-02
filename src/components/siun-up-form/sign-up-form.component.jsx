import { useState } from "react"

import FormInput from "../form-input/form-input.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    displayName: '',
    email:'',
    password:'',
    confirmPassword:'',

}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword}= formFields;

    console.log(formFields);


    const resetFirmFields= () =>{
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) =>{
            event.preventDefault();

            if(password !== confirmPassword){
                alert("password do not match");
                return;
            }

            try{
                const {user} = await createAuthUserWithEmailAndPassword(email,password);
                await createUserDocumentFromAuth(user, {displayName});
                resetFirmFields();
               
            }catch(error){
                if(error.code == 'auth/email-already-in-use'){
                    alert('email already in use')
                }else{
                  console.log('user error', error)  
                }
            }
    }
    
    const handleChange = (event) =>{
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    }

    return(
        <div>
            <h1>Sign up with email and password</h1>
            <form onSubmit={handleSubmit}>
                
                <FormInput type="text"
                label="Display Name"
                 required
                  onChange={handleChange} 
                  name="displayName" 
                  value={displayName}/>

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

                <FormInput type="password"
                label="Confirm Password"
                required 
                onChange={handleChange} 
                name="confirmPassword" 
                value={confirmPassword}/>

                <button type="submit">Sign-up</button>
            </form>
        </div>
    )
}

export default  SignUpForm



// option 2
{/* <FormInput type="text"
label="Display Name"
inputOptions = {{
    type:'text',
    required: true,
    onChange:handleChange, 
    name:"displayName" ,
    value:displayName
}} */}