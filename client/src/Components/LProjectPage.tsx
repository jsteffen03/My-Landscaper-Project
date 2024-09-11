import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {Button, Card, List} from 'semantic-ui-react'
import LSelectedPlantCard from './LSelectedPlantCard.tsx'
import { Project,  Plant } from '../types';

interface LProjectPageProps {
    projectId: number;
    projectPlants: Plant[];
    setProjectPlants: React.Dispatch<React.SetStateAction<Plant[]>>;
}

function LProjectPage({projectId, projectPlants, setProjectPlants}: LProjectPageProps) {

    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null)
    const [plantNum, setPlantNum] = useState<number>(0)
    const [floweringTreesCount, setFloweringTreesCount] = useState<number>(0);
    const [shadeTreesCount, setShadeTreesCount] = useState<number>(0);
    const [evergreenTreesCount, setEvergreenTreesCount] = useState<number>(0);

    useEffect(() => {
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

    useEffect(() => {
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

    const plantRender = projectPlants.map(plant => (
        <LSelectedPlantCard 
            key={plant.id}
            plant={plant}
        />
    ))

    return(
        <div className="container">
            <div className="Header">
            <h2>{project?.title} - {project?.user?.name} - {project?.id}</h2>
                <h1>My Landscaper</h1>
                <Button color="black" onClick={()=>navigate('/user_page')}>Home</Button> 
            </div> 
            <div className="Content">
                <div className="MyProjects">
                    <h2>Project Desription</h2>
                    <List.Description>{project?.description}</List.Description>
                    <h2>Project Status</h2>
                    <p>{project?.status}</p>
                    <h2>Number of Plants</h2>
                    <p>Total: {plantNum}</p>
                    <p>Flowering Trees: {floweringTreesCount}</p>
                    <p>Shade Trees: {shadeTreesCount}</p>
                    <p>Evergreen Trees: {evergreenTreesCount}</p>
                </div>
                <div className="ProjectPlants">
                    <div className="Button">
                        <h2>Project Plants</h2>
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