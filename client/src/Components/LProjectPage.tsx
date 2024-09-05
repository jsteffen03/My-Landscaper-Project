import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {Button} from 'semantic-ui-react'


function LProjectPage({projectId, setProjectId}: {projectId:number, setProjectId:any}){

    const navigate = useNavigate();
    const [project, setProject] = useState<any>([])

    useEffect(() => {
        // Retrieve the project ID from sessionStorage
        const storedProjectId = sessionStorage.getItem('projectId');
        
        if (storedProjectId) {
          // Convert the stored project ID to an integer
          const projectIdAsInt = parseInt(storedProjectId, 10);
          
          if (!isNaN(projectIdAsInt)) {
            // If it's a valid number, set it to state
            setProjectId(projectIdAsInt);
          } else {
            console.error("Stored project ID is not a valid number.");
          }
        }
      }, []); 

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

export default LProjectPage