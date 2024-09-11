import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {Button, Card} from 'semantic-ui-react'
import PlantCard from './PlantCard.tsx'
import { Plant } from '../types';

interface ItemSearchProps {
    projectId: number;
    projectPlants: Plant[];
    setProjectPlants: React.Dispatch<React.SetStateAction<Plant[]>>;
}

function ItemSearch({ projectId, projectPlants, setProjectPlants }: ItemSearchProps) {

    const navigate = useNavigate();
    const [plants, setPlants] = useState<Plant[]>([])

    useEffect(() => {
        if (projectId != 0) {
            fetch(`/api/project/${projectId}`)
            .then(r=>{
                if(r.ok){
                    return r.json()
                }
                else {
                    throw new Error('Failed to fetch project data.')
                }
            })
            .then(data=>{
                setProjectPlants(data.plants)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
        }
    }, [projectId, setProjectPlants])

    useEffect(() => {
        fetch('/api/plants')
        .then(r=>{
            if(r.ok){
                return r.json()
            }
            else {
                throw new Error('Failed to fetch project data.')
            }
        })
        .then(data=>{
            setPlants(data)
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, [])

    const plantRender = plants?.map((plant:Plant) => {
        const isInProject = projectPlants.some((p) => p.id === plant.id);
        return  (
            <PlantCard 
                key={plant.id} 
                plant={plant}
                projectPlants={projectPlants} 
                projectId={projectId} 
                setProjectPlants={setProjectPlants} 
                isInProject={isInProject}
            />
        )
    })
    
    return (
        <div className="container">
            <div className="Header"> 
                <h1>My Landscaper - Plants</h1>
                <Button color='black' onClick={()=>navigate('/project_page')}>Back to Project</Button>
            </div> 
            <div className="Content2">
                <div className="plants2">Filters</div>
                <div className="plants">
                    <Card.Group>
                        {plantRender}
                    </Card.Group>
                </div>
            </div>
        </div>
    )
}

export default ItemSearch