import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {Form, Button, FormField} from 'semantic-ui-react'
import ProjectCard from './ProjectCard.tsx'

type NewProject = {
    title: string;
    description: string;
    user_id: number;
    status: string;
  };

function UserPage({ setUser, user, setProjectId}: {setUser:any, user:any, setProjectId: any}) {

    const [projectData, setProjectData] = useState<any>([])
    const [userProjects, setUserProjects] = useState<any>([])
    const [newPTitle, setNewPTitle] = useState<string>("")
    const [newPDescription, setNewPDescription] = useState<string>("")
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
        .then(data => setUser(undefined))
        .then(()=>navigate('/'))
    }

    function handleAddProject(newProject: NewProject): void{
        console.log(newProject)
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
            console.log("im here")
        })
    }


    function addProject(e?: React.FormEvent<HTMLFormElement>){
        if (e) e.preventDefault();
        if (user){
            const newProject = {
                title: newPTitle,
                description: newPDescription,
                user_id: user.id,
                status: "In Progress"
            }
            console.log(newProject)
            console.log(projectData)
            handleAddProject(newProject)
        }
        else {
            alert("Your not supposed to be here. Please log in.")
        }
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
                            <input type="text" placeholder="Project Name" onChange={(e)=>setNewPTitle(e.target.value)}></input>
                        </FormField>
                        <FormField>
                            <label>Project Details</label>
                            <input type="text"  placeholder="Project Details" onChange={(e)=>setNewPDescription(e.target.value)}></input>
                        </FormField>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default UserPage