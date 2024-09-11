import { useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {Button, Form, FormField} from 'semantic-ui-react'
import LProjectCard from './LProjectCard.tsx'
import { Project, Landscaper } from '../types';

interface LandscaperPageProps {
    setLandscaper: React.Dispatch<React.SetStateAction<Landscaper | null>>;
    landscaper: Landscaper | null;
    setProjectId: React.Dispatch<React.SetStateAction<number>>;
}

function LandscaperPage({setLandscaper, landscaper, setProjectId}: LandscaperPageProps) {

    const navigate = useNavigate();
    const [newPID, setNewPID] = useState<number>(0)
    const [landProject, setLandProject] = useState<Project[]>([])

    useEffect(() => {
        if (landscaper) {
            fetch(`/api/landscapers/${landscaper.id}`)
                .then((r) => {
                    if (r.ok) {
                        return r.json();
                    } else {
                        throw new Error('Failed to fetch landscaper data.');
                    }
                })
                .then((data) => {
                    setLandProject(data.projects);
                })
                .catch((error) => {
                    console.error('Error fetching landscaper data:', error);
                });
        }
    }, [landscaper]);

    function handleLogout(){
        fetch('/api/logout',{method:"DELETE"})
        .then(r=>r.json())
        .then(() => setLandscaper(null))
        .then(()=>navigate('/'))
    }

    function addProject(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        fetch(`/api/project/${newPID}/landscaper`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                landscaper_id: landscaper?.id
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response bad');
            }
            return response.json();
        })
        .then(()=>{
            fetch(`/api/project/${newPID}`)
            .then(r=>{
                if(r.ok){
                  return r.json()
                }
                else {
                  throw new Error
                }
              })
              .then(data=>{
                setLandProject([...landProject, data])
              })
              .catch(error => {
                console.error('There was a problem with the second fetch:', error);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch:', error);
        });
    }
    
    const projectRender = landProject.map((project:any) => (
            <LProjectCard 
            key={project.id} 
            project={project} 
            setProjectId={setProjectId} 
            landProject={landProject} 
            setLandProject={setLandProject} 
            landscaperId={landscaper?.id}
        />
    ))

    return(
        <div className="container">
            <div className="Header">
                <h2>Welcome {landscaper?.name}</h2>
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
                    <div>
                        <h2>Project</h2>
                        <Form onSubmit={(e)=>addProject(e)}>
                            <FormField>
                                <label>Project ID</label>
                                <input placeholder="Project ID - Enter a ID from Email" onChange={(e)=>setNewPID(parseInt(e.target.value))}/>
                            </FormField>
                            <Button color='black' type='submit'>Receive Project</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandscaperPage