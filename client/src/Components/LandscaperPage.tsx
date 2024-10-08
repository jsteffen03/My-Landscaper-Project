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
    const [newPID, setNewPID] = useState<number>(0) //new project id to receive projects
    const [landProject, setLandProject] = useState<Project[]>([]) //landscaper's projects

    useEffect(() => { // get all projects
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

    function handleLogout(){ //handles logout
        fetch('/api/logout',{method:"DELETE"})
        .then(r=>r.json())
        .then(() => setLandscaper(null))
        .then(()=>navigate('/'))
    }

    function addProject(e: React.FormEvent<HTMLFormElement>): void { //Handles rceiving new project from user
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
        .then(()=>{ //handles adding new project to database
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
        .then(()=>{ //handles updating project status
            const updatedProject: Partial<Project> = {};
            updatedProject.status = "Viewed";
            fetch(`/api/project/${newPID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProject),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update project');
                }
                return response.json();
            })
            .then(updatedData => {
                setLandProject((prevProjects) => {
                    const updatedIndex = prevProjects.findIndex(proj => proj.id === updatedData.id);
                    if (updatedIndex !== -1) {
                        const newProjects = [...prevProjects];
                        newProjects[updatedIndex] = updatedData;
                        return newProjects;
                    }
                    return prevProjects; 
                });
            })
            .catch(error => {
                console.error('Error updating project:', error);
            })
        })
        .catch(error => {
            console.error('There was a problem with the fetch:', error);
        });
    }
    
    const projectRender = landProject.map((project:any) => ( //Renders projects
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
                <div className="logo-welcome">
                <div className="img-container-user">
                    <img className="logo" alt="logo" src="./src/assets/Logo.png" />
                </div>
                <h2 className='welcome'>Welcome,  {landscaper?.name}</h2>
                </div>
                <h1 className="site-name">My Landscaper</h1>
                <Button size="huge" color="black" onClick={handleLogout}>Log Out</Button>
            </div>
            <div className="Content">
                <div className="LandscaperProjects">
                    <h2 className='Title'>My Projects</h2>
                    <div>
                        {projectRender} 
                    </div>
                    <div>
                        <h2 className='PHeader'>Add Project from Email</h2>
                        <Form onSubmit={(e)=>addProject(e)}>
                            <FormField>
                                <label>Project ID</label>
                                <input placeholder="Enter the Project ID from Email" onChange={(e)=>setNewPID(parseInt(e.target.value))}/>
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