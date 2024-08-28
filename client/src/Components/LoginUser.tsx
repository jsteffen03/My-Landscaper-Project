// import { useNavigate} from "react-router-dom"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'  
import { FormField, Button, Form } from 'semantic-ui-react'

interface User {
    id: number;
    email: string;
    name: string;
}

interface LoginUserProps {
    setUser: (user: User) => void;
}

const LoginUser: React.FC<LoginUserProps> = ({ setUser }) => {

    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [cPassword, setCPassword] = useState<string>("");
    const [sLI, setSLI] = useState<boolean>(false);

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        fetch("/api/login", {
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
        .then(r=>{
            console.log(r.ok)
            if (r.ok) { return r.json()}
            else {throw new Error}
        })
        .then(data=>{
        console.log(data)
            setUser(data.user)
            navigate('/user_page')
        })
        .catch(data=>{
            alert("Not valid username/password combination. Please try again.")
            console.log(data)
        })
    }

    return(
        <div className="body">
        <h1 className="Title">My Landscaper</h1>
        <div className="Container"> 
            <Form className="Login" onSubmit={handleLogin}>
                <h1>Login</h1>
                <FormField>
                    <label>Email</label>
                    <input placeholder='Username' onChange={(e)=>setEmail(e.target.value)}/>
                </FormField>
                <FormField>
                    <label>Password</label>
                    <input placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                </FormField>
                <div className="Button">
                    <Button color='green'>Login Home Owner</Button>
                    <Button toggle active={sLI} onClick={() => setSLI(!sLI)}>{sLI === true ? "Rember Me" : "Don't Rember Me"}</Button>
                </div>
            </Form>
            <Form className="CreateAccount">
                <h1>Create Account</h1>
                <FormField>
                    <label>Name</label>
                    <input placeholder='Username' onChange={(e)=>setName(e.target.value)}/>
                </FormField>
                <FormField>
                    <label>Email</label>
                    <input placeholder='Username' onChange={(e)=>setEmail(e.target.value)}/>
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
                    <Button color='green' onClick={(e)=>console.log(e)}>Create a Home Owner Acount</Button>
                </div>  
            </Form>
        </div>
        </div>
    )
}       

export default LoginUser