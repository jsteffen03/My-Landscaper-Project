import { useNavigate } from 'react-router-dom'
import {Button} from 'semantic-ui-react'
import LProjectCard from './LProjectCard.tsx'

function LandscaperPage({setLandscaper, landscaper, setProjectId}: {setLandscaper:any, landscaper:any, setProjectId: any}) {

    const navigate = useNavigate();

    function handleLogout(){
        fetch('/api/logout',{method:"DELETE"})
        .then(r=>r.json())
        .then(data => setLandscaper(undefined))
        .then(()=>navigate('/'))
    }
    
    const projectRender = landscaper.projects.map((project:any) => <LProjectCard key={project.id} project={project} setProjectId={setProjectId}/>)

    return(
        <div className="container">
            <div className="Header">
                <h2>Welcome {landscaper.name}</h2>
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
            </div>
        </div>
    )
}

export default LandscaperPage