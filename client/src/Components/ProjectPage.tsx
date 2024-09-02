import { useNavigate } from 'react-router-dom'
import {Form, Button, FormField} from 'semantic-ui-react'


function ProjectPage({projectId}: {projectId:number}){

    const navigate = useNavigate();

    return(
        <div className="container">
            <div className="Header">
                <h2>Project Title {projectId}</h2>
                <h1>My Landscaper</h1>
                <Button color="black" onClick={()=>navigate('/user_page')}>Home</Button> 
            </div> 
            <div className="Content">
                <div className="MyProjects">
                    <Form onSubmit={(e)=>console.log(e)}>
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
                    </Form>
                </div>
                <div className="ProjectPlants">
                    <div className="Button">
                        <h2>Plant Data</h2>
                    </div> 
                    <div>
                        Plants
                    </div> 
                </div>
            </div>
        </div>
    )
} 

export default ProjectPage