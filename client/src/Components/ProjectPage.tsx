import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {Form, Button, FormField} from 'semantic-ui-react'


function ProjectPage({projectId}: {projectId:number}){

    const navigate = useNavigate();
    const [project, setProject] = useState<any>([])

    useEffect(() => {
        fetch(`/api/project/${projectId}`)
        .then(r=>{
            if(r.ok){
                return r.json()
            }
            else {
                throw new Error
            }
        })
        .then(data=>{
            setProject(data)
        })
        .catch(()=>{})
    }, [])

    console.log(project)

    return(
        <div className="container">
            <div className="Header">
                <h2>Project Title {projectId}</h2>
                <h1>My Landscaper</h1>
                <Button color="black" onClick={()=>navigate('/user_page')}>Home</Button> 
            </div> 
            <div className="Content">
                <div className="MyProjects">
                    <h2>{project.title}</h2>
                    <h3>{project.description}</h3>
                    <h3>{project.status}</h3>
                    <Button color='green' onClick={()=>navigate('/item_search')}>Add Plants</Button>
                </div>
                <div className="ProjectPlants">
                    <div className="Button">
                        <h2>Project Plants</h2>
                    </div> 
                    <div>
                        {/* {plantRender} */}
                    </div> 
                </div>
            </div>
        </div>
    )
} 

export default ProjectPage

/* <Form onSubmit={(e)=>console.log(e)}>
    <h2>Project Details</h2> 
    <Button color='black' type='submit'>Submit</Button>
    <FormField>
        <label>Project Name</label>
        <input type="text" placeholder="Project Name" onChange={(e)=>console.log(e.target.value)}></input>
    </FormField>
    <FormField>
        <label>Project Details</label>
        <input type="text"  placeholder="Project Details" onChange={(e)=>console.log(e.target.value)}></input>
    </FormField>
</Form> */