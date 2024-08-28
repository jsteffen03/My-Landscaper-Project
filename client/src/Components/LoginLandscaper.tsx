import { useState } from "react"
import { FormField, Button, Form } from 'semantic-ui-react'

function LoginLandscaper(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [sLI, setSLI] = useState(false)

    return(
        <div className="body">
        <h1 className="Title">My Landscaper</h1>
        <div className="Container"> 
            <Form className="Login">
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

export default LoginLandscaper