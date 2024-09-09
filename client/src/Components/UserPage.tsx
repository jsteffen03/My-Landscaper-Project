import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {Form, Button, FormField, FormTextArea} from 'semantic-ui-react'
import ProjectCard from './ProjectCard.tsx'

type NewProject = {
    title: string;
    description: string;
    user_id: number;
    status: string;
};

type User = {
    id: number;
    email: string;
    name: string;
    password: string;
    projects?: [];
}

function UserPage({ 
    setUser, user, setProjectId
}: {
    setUser: React.Dispatch<React.SetStateAction<User | null>>, user: User, setProjectId: React.Dispatch<React.SetStateAction<number>>
}) {

    const [projectData, setProjectData] = useState<any>([])
    const [userProjects, setUserProjects] = useState<any>([])
    const [newPTitle, setNewPTitle] = useState<string>("")
    const [newPDescription, setNewPDescription] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [emailHeader, setEmailHeader] = useState<string>("")
    const [emailAddress, setEmailAddress] = useState<string>("")
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/projects')
        .then(r=>{
          if(r.ok){
            return r.json()
          }
          else {
            throw new Error
          }
        })
        .then(data=>{
          setProjectData(data)
        })
        .catch(()=>{})
    }, [])

    useEffect(() => {
        setUserProjects(projectData.filter((project:any) => project.user_id === user.id))
    }, [projectData])

    const projectRender = userProjects.map((project:any) => <ProjectCard key={project.id} project={project} projectData={projectData} setProjectData={setProjectData} setProjectId={setProjectId}/>)

    function handleLogout(){
        fetch('/api/logout',{method:"DELETE"})
        .then(r=>r.json())
        .then(() => setUser(null))
        .then(()=>navigate('/'))
    }

    function handleAddProject(newProject: NewProject): void{
        fetch("/api/projects",{
            method:"POST",
            headers:{
            "Content-Type": "Application/json"
            },
            body: JSON.stringify(newProject)
        })
        .then(r=>r.json())
        .then(data=>{
            const newArr = [...projectData,data]
            setProjectData(newArr)
            setNewPTitle("")
            setNewPDescription("")
        })
    }

    function addProject(e?: React.FormEvent<HTMLFormElement>){
        if (e) e.preventDefault();
        if (user && newPDescription != "" && newPTitle != "") {
            const newProject = {
                title: newPTitle,
                description: newPDescription,
                user_id: user.id,
                status: "In Progress"
            }
            handleAddProject(newProject)
        }
        else {
            alert("Please enter a project name and description")
        }
    }

    function sendEmail(){
        fetch('/api/send_email', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({
                user_email: user.email,
                recipient_email: emailAddress,
                subject: emailHeader,
                message_body: email,
            }),
        })
        .then(r=>r.json())
        .then(data=>{
            console.log(data)
            setEmailHeader("")
            setEmailAddress("")
            setEmail("")
        })
    }


    return(
        <div className="container">
            <div className="Header">
                <h2>Welcome {user.name}</h2>
                <h1>My Landscaper</h1>
                <Button color="black" onClick={handleLogout}>Log Out</Button> 
            </div> 
            <div className="Content">
                <div className="ProjectPlants">
                    <div className="Button">
                        <h2>My Projects</h2>
                    </div> 
                    <div>
                        {projectRender} 
                    </div> 
                </div>
                <div className="MyProjects">
                    <Form onSubmit={(e)=>addProject(e)}>
                        <h2>New Project</h2> 
                        <Button color='black' type='submit'>Submit</Button>
                        <FormField>
                            <label>Project Name</label>
                            <input type="text" value={newPTitle} placeholder="Project Title" onChange={(e)=>setNewPTitle(e.target.value)}></input>
                        </FormField>
                        <FormField>
                            <label>Project Details</label>
                            <FormTextArea type="text" value={newPDescription} placeholder="Please give a detailed description of your project" onChange={(e)=>setNewPDescription(e.target.value)}></FormTextArea>
                        </FormField>
                    </Form>
                    <Form>
                        <h2>Send Email</h2>
                        <FormField>
                            <label>Landscaper Email Address</label>
                            <input type="text" placeholder="Email" onChange={(e)=>setEmailAddress(e.target.value)}/>
                        </FormField>                        
                        <FormField>
                            <label>Email</label>
                            <input type="text" placeholder="Email" onChange={(e)=>setEmailHeader(e.target.value)}/>
                        </FormField>
                        <FormField>
                            <label>Email Boby</label>
                            <FormTextArea type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                        </FormField>
                        <Button color='black' onClick={sendEmail}>Submit</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default UserPage