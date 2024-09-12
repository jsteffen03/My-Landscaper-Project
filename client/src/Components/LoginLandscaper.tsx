import { useState } from "react"
import { useNavigate } from 'react-router-dom'  
import { FormField, Button, Form } from 'semantic-ui-react'
import { User, Plant, Landscaper } from '../types';

type NewLandscaper = {
    name: string;
    company: string;
    email: string;
    password: string;
}

interface LoginLandscaperProps {
    setLandscaper: React.Dispatch<React.SetStateAction<Landscaper | null>>;
}

function LoginLandscaper({ setLandscaper }: LoginLandscaperProps) {

    const navigate = useNavigate();

    const [name, setName] = useState<string>("");
    const [company, setCompany] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [cPassword, setCPassword] = useState<string>("");
    const [sLI, setSLI] = useState<boolean>(false)

    function handleLogin(e?: React.FormEvent<HTMLFormElement>): void {
        if (e) e.preventDefault();
        fetch("/api/login_landscaper", {
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
                throw new Error('Failed to fetch data.')
            }
        })
        .then(data=>{
            setLandscaper(data)
            navigate('/landscaper_page')
        })
        .catch(()=>{
            alert("Not valid username/password combination. Please try again.")
        })
    }

    function handleCreate(newLandscaper: NewLandscaper): void {
        fetch("/api/landscapers",{
            method:"POST",
            headers:{
            "Content-Type": "application/json"
            },
            body: JSON.stringify(newLandscaper)
        })
        .then(r => {
            if(r.ok){
                return r.json()
            }
            else {
                throw new Error('Failed to post data.')
            }
        })
        .then(()=>{
            handleLogin();
        })
        .catch(()=>{
            alert("An account with this email already exists. Please login.")
        })
    }

    function addLandscaper(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        if (cPassword === password) {
            const newLandscaper: NewLandscaper = {
                name: name,
                company: company,
                email: email,
                password: password
            };
            handleCreate(newLandscaper);
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
                <Form className="Login"  onSubmit={(e)=>handleLogin(e)}>
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
                        <Button color='green' type="submit">Login Landscaper</Button>
                        <Button toggle active={sLI} onClick={() => setSLI(!sLI)} type="button">{sLI === true ? "Remember Me" : "Don't Remember Me"}</Button>
                    </div>
                </Form>
                <Form className="CreateAccount" onSubmit={(e)=>addLandscaper(e)}>
                    <h1>Create Account</h1>
                    <FormField>
                        <label>Name</label>
                        <input placeholder='Name' onChange={(e)=>setName(e.target.value)}/>
                    </FormField>
                    <FormField>
                        <label>Company Name</label>
                        <input placeholder='Company Name' onChange={(e)=>setCompany(e.target.value)}/>
                    </FormField>
                    <FormField>
                        <label>Email</label>
                        <input placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
                    </FormField>
                    <FormField>
                        <label>Password</label>
                        <input placeholder='Password' type="password" onChange={(e)=>setPassword(e.target.value)}/>
                    </FormField>
                    <FormField>
                        <label>Verify Password</label>
                        <input placeholder='Password' type="password" onChange={(e)=>setCPassword(e.target.value)}/>
                    </FormField>
                    <div className="Button">
                        <Button color='green' type="submit">Create a Landscaper Acount</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}       

export default LoginLandscaper