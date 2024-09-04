import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {Button} from 'semantic-ui-react'
import SelectedPlantCard from './SelectedPlantCard';


function ProjectPage({projectId, setProjectId}: {projectId:number, setProjectId: any}) {

    useEffect(() => {
        // Retrieve the project ID from sessionStorage
        const storedProjectId = sessionStorage.getItem('projectId');
        if (storedProjectId) {
          // Convert the stored project ID to an integer
            const projectIdAsInt = parseInt(storedProjectId, 10);
            setProjectId(projectIdAsInt);
          } 
      }, []); 

    const navigate = useNavigate();
    const [project, setProject] = useState<any>([])

    useEffect(() => {
        if (projectId) {
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
                console.log(data)
                setProject(data)
            })
            .catch(()=>{})
        }
    }, [projectId])

    const plants = project.plants

    console.log(project)

    const plantRender = plants?.map((plant:any) => <SelectedPlantCard key={plant.id} plant={plant} projectId={projectId}/>)

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
                        {plantRender}
                    </div> 
                </div>
            </div>
        </div>
    )
} 

export default ProjectPage