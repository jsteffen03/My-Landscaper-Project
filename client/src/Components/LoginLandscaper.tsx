import { useState } from "react"
import { useNavigate } from 'react-router-dom'  
import { FormField, Button, Form } from 'semantic-ui-react'

type Landscaper = {
    id: number;
    name: string;
    company: string;
    email: string;
    password: string;
}

type NewLandscaper = {
    name: string;
    company: string;
    email: string;
    password: string;
}

interface LoginLandscaperProps {
    setLandscaper: (landscaper: Landscaper) => void;
}

function LoginLandscaper({ setLandscaper }: LoginLandscaperProps) {

    const navigate = useNavigate();

    const [name, setName] = useState<string>("");
    const [company, setCompany] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [cPassword, setCPassword] = useState<string>("");
    const [sLI, setSLI] = useState<boolean>(false)

    function handleLogin(e?: React.FormEvent<HTMLFormElement>) {
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
        .then(r=>r.json())
        .then(data=>{
            console.log(data)
            setLandscaper(data.landscaper)
            navigate('/landscaper_page')
        })
        .catch(data=>{
            alert("Not valid username/password combination. Please try again.")
            console.log(data)
        })
    }

    function handleCreate(newUser: Omit<NewLandscaper, 'id'>): void {
        fetch("/api/landscapers",{
            method:"POST",
            headers:{
            "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        .then(r=>r.json())
        .then(data=>{
            console.log(data)
            handleLogin();
        })
        .catch(data=>{
            console.log(data)
            alert("Not valid username/password")
        })
    }

    function addLandscaper(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        if (cPassword === password) {
            const NewLandscaper: Omit<NewLandscaper, 'id'> = {
                name: name,
                company: company,
                email: email,
                password: password
            };
            handleCreate(NewLandscaper);
        }
        else {
            alert("Passwords do not match");
        }
    }

    return(
        <div className="body">
        <h1 className="Title">My Landscaper</h1>
        <div className="Container"> 
            <Form className="Login"  onSubmit={(e)=>handleLogin(e)}>
                <h1>Login</h1>
                <FormField>
                    <label>Email</label>
                    <input placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
                </FormField>
                <FormField>
                    <label>Password</label>
                    <input placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                </FormField>
                <div className="Button">
                    <Button color='green' type="submit">Login Landscaper</Button>
                    <Button toggle active={sLI} onClick={() => setSLI(!sLI)} type="button">{sLI === true ? "Rember Me" : "Don't Rember Me"}</Button>
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
                    <input placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                </FormField>
                <FormField>
                    <label>Verify Password</label>
                    <input placeholder='Password' onChange={(e)=>setCPassword(e.target.value)}/>
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