import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {Button} from 'semantic-ui-react'
import SelectedPlantCard from './SelectedPlantCard';


function ProjectPage({projectId, setProjectId}: {projectId:number, setProjectId: React.Dispatch<React.SetStateAction<number>>}) {

    useEffect(() => {
        const storedProjectId = sessionStorage.getItem('projectId');
        if (storedProjectId) {
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
                setProject(data)
            })
            .catch(()=>{})
        }
    }, [projectId])

    const plantRender = project.plants?.map((plant:any) => <SelectedPlantCard key={plant.id} plant={plant} projectId={projectId}/>)

    return(
        <div className="container">
            <div className="Header">
                <h2>{project.title}</h2>
                <h1>My Landscaper</h1>
                <Button color="black" onClick={()=>navigate('/user_page')}>Home</Button> 
            </div> 
            <div className="Content">
                <div className="MyProjects">
                    <h3>{project.description}</h3>
                    <h3>{project.status}</h3>
                </div>
                <div className="ProjectPlants">
                    <div className="Button">
                        <h2>Project Plants</h2>
                        <div>
                            <Button color='green' onClick={()=>navigate('/item_search')}>Add Plants</Button>
                        </div>
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