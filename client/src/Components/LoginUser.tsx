import { useState } from "react"
import { useNavigate } from 'react-router-dom'  
import { FormField, Button, Form } from 'semantic-ui-react'
import { User } from '../types';

type newUser = {
    name: string;
    email: string;
    password: string;
}

interface LoginUserProps {
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

function LoginUser({ setUser }: LoginUserProps) {

    const navigate = useNavigate();

    const [email, setEmail] = useState<string>(""); //email
    const [password, setPassword] = useState<string>(""); //password
    const [name, setName] = useState<string>(""); //name
    const [cPassword, setCPassword] = useState<string>(""); //confirm password
    const [sLI, setSLI] = useState<boolean>(false); //stay logged in

    function handleLogin(e?: React.FormEvent<HTMLFormElement>): void { //handles login
        if (e) e.preventDefault();
        fetch("/api/login_user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                stayLoggedIn: sLI
            }),
        })
        .then(r => {
            if(r.ok){
                return r.json()
            }
            else {
                throw new Error('Failed to login.')
            }
        })
        .then(data=>{
            setUser(data)
            navigate('/user_page')
        })
        .catch(()=>{
            alert("Not valid username/password combination. Please try again.")
        })
    }

    function handleCreate(newUser: newUser): void { //handles creating new user
        fetch("/api/users",{
            method:"POST",
            headers:{
            "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        .then(r => {
            if(r.ok){
                return r.json()
            }
            else {
                throw new Error('Failed to post new user')
            }
        })
        .then(()=>{
            handleLogin();
        })
        .catch(()=>{
            alert("An account with this email already exists. Please login.")
        })
    }

    function addUser(e: React.FormEvent<HTMLFormElement>){ //adds new user
        e.preventDefault()
        if (cPassword === password) {
            const newUser: newUser = {
                name: name,
                email: email,
                password: password
            };
            handleCreate(newUser);
        }
        else {
            alert("Passwords do not match");
        }
    }

    return(
        <div className="body-login">
            <div className="img-container">
                <img  alt="logo" src="./src/assets/Logo.png"/>
            </div>
            <div className="login-container"> 
                <Form className="Login" onSubmit={(e)=>handleLogin(e)}>
                    <h1>Login</h1>
                    <FormField>
                        <label>Email</label>
                        <input placeholder='Email' autoComplete="email" onChange={(e)=>setEmail(e.target.value)}/>
                    </FormField>
                    <FormField>
                        <label>Password</label>
                        <input placeholder='Password' type="password" autoComplete="current-password" onChange={(e)=>setPassword(e.target.value)}/>
                    </FormField>
                    <div className="Button">
                        <Button color='green' type="submit">Login Home Owner</Button>
                        <Button toggle active={sLI} onClick={() => setSLI(!sLI)} type="button">{sLI === true ? "Remember Me" : "Don't Remember Me"}</Button>
                    </div>
                </Form>
                <Form className="CreateAccount" onSubmit={(e)=>addUser(e)}>
                    <h1>Create Account</h1>
                    <FormField>
                        <label>Name</label>
                        <input placeholder='John Doe' onChange={(e)=>setName(e.target.value)}/>
                    </FormField>
                    <FormField>
                        <label>Email</label>
                        <input placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
                    </FormField>
                    <FormField>
                        <label>Password</label>
                        <input placeholder='Password' type="password"  onChange={(e)=>setPassword(e.target.value)}/>
                    </FormField>
                    <FormField>
                        <label>Verify Password</label>
                        <input placeholder='Confirm Password' type="password" onChange={(e)=>setCPassword(e.target.value)}/>
                    </FormField>
                    <div className="Button">
                        <Button color='green' type="submit">Create a Home Owner Acount</Button>
                    </div>  
                </Form>
            </div>
        </div>
    )
}       

export default LoginUser