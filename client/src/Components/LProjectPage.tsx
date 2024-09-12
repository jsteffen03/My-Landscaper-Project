import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {Button, Card, Form, Input} from 'semantic-ui-react'
import LSelectedPlantCard from './LSelectedPlantCard.tsx'
import { Project,  Plant } from '../types';

interface LProjectPageProps {
    projectId: number;
    projectPlants: Plant[];
    setProjectPlants: React.Dispatch<React.SetStateAction<Plant[]>>;
}

function LProjectPage({projectId, projectPlants, setProjectPlants}: LProjectPageProps) {

    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null) //current project
    const [plantNum, setPlantNum] = useState<number>(0) //total number of plants
    const [floweringTreesCount, setFloweringTreesCount] = useState<number>(0); //number of flowering trees
    const [shadeTreesCount, setShadeTreesCount] = useState<number>(0); //number of shade trees
    const [evergreenTreesCount, setEvergreenTreesCount] = useState<number>(0); //number of evergreen trees
    const [isEditing, setIsEditing] = useState<boolean>(false); //whether the project is being edited
    const [newStatus, setNewStatus] = useState<string>(''); //new project status

    useEffect(() => { //fetch current project data
        if (projectId != 0) {
            fetch(`/api/project/${projectId}`)
            .then(r=>{
                if(r.ok){
                    return r.json()
                }
                else {
                    throw new Error('Failed to fetch data.')
                }
            })
            .then(data=>{
                setProject(data)
                setProjectPlants(data.plants)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        }
    }, [projectId, setProjectPlants])

    useEffect(() => { //update plant counts
        if (projectPlants) {
            const totalPlants = projectPlants.length;
            setPlantNum(totalPlants);

            const floweringTrees = projectPlants.filter(
                (plant: Plant) => plant.type === "Flowering Tree"
            ).length;
            setFloweringTreesCount(floweringTrees);
    
            const shadeTrees = projectPlants.filter(
                (plant: Plant) => plant.type === "Shade Tree"
            ).length;
            setShadeTreesCount(shadeTrees);
    
            const evergreenTrees = projectPlants.filter(
                (plant: Plant) => plant.type === "Evergreen Tree"
            ).length;
            setEvergreenTreesCount(evergreenTrees);
        }
    }, [projectPlants])

    const handleEditSubmit = () => { //Edits status of project
        const updatedProject: Partial<Project> = {};
        if (newStatus !== project?.status) {
            updatedProject.status = newStatus;
        }
        if (Object.keys(updatedProject).length === 0) {
            setIsEditing(false);
            return;
        }
        fetch(`/api/project/${projectId}`, {
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
            setProject(updatedData);
            setIsEditing(false);
        })
        .catch(error => {
            console.error('Error updating project:', error);
        })
    }


    const plantRender = projectPlants.map(plant => ( //Renders project plants
        <LSelectedPlantCard 
            key={plant.id}
            plant={plant}
        />
    ))

    return(
        <div className="container">
            <div className="Header">
            <   div className="logo-welcome">
                    <div className="img-container-user">
                        <img className="logo" alt="logo" src="./src/assets/Logo.png" />
                    </div>
                    <h2 className='welcome'>{project?.title} - {project?.user?.name}</h2>                   
                </div>
                <h1 className="site-name">My Landscaper</h1>
                <Button size="huge" color="black" onClick={()=>navigate('/user_page')}>Home</Button> 
            </div> 
            <div className="Content">
                <div className="ProjectDetails">
                    {!isEditing ? (
                        <div>
                        <h2 className="PHeader">Project Desription</h2>
                        <p className='Description2'>{project?.description}</p>
                        <h2 className="PHeader">Project Status</h2>
                        <p className='Description2'>{project?.status}</p>
                        <Button color="black" onClick={() => setIsEditing(true)}>Change Status</Button>
                        <h2 className="PHeader">Number of Plants</h2>
                        <p className='Description2'>Total: {plantNum}</p>
                        <p className='Description2'>Flowering Trees: {floweringTreesCount}</p>
                        <p className='Description2'>Shade Trees: {shadeTreesCount}</p>
                        <p className='Description2'>Evergreen Trees: {evergreenTreesCount}</p>
                        </div>
                    ): (
                    <Form>
                        <Form.Field>
                            <label>Status</label>
                            <Input
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                                placeholder={project?.status}
                            />
                        </Form.Field>
                        <Button color="green" onClick={handleEditSubmit}>Save Changes</Button>
                        <Button color="red" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </Form>
                    )}
                </div>
                <div className="ProjectPlants">
                <div className='ProjectPlantsHeader'>
                    <h2 className="Title2" >Project Plants</h2>
                    </div> 
                    <Card.Group>
                        {plantRender}
                    </Card.Group>  
                </div>
            </div>
        </div>
    )
} 

export default LProjectPage