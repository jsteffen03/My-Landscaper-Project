import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {Button, Card} from 'semantic-ui-react'
import PlantCard from './PlantCard.tsx'

type Plant = {
    id: number;
    name: string;
    scientific_name: string;
    type: string;
    img: string;
}

function ItemSearch({projectId, projectPlants, setProjectPlants}: {projectId:number, projectPlants:Plant[], setProjectPlants: React.Dispatch<React.SetStateAction<Plant[]>>}) {

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
                    throw new Error
                }
            })
            .then(data=>{
                setProjectPlants(data.plants)
            })
            .catch(()=>{})
        }
    }, [projectPlants])

    useEffect(() => {
        fetch('/api/plants')
        .then(r=>{
            if(r.ok){
                return r.json()
            }
            else {
                throw new Error
            }
        })
        .then(data=>{
            setPlants(data)
        })
        .catch(()=>{})
    }, [])


    const plantRender = plants?.map((plant:Plant) => {
        const isInProject = projectPlants.some((p) => p.id === plant.id);
        return  (
        <PlantCard key={plant.id} plant={plant} projectId={projectId} setProjectPlants={setProjectPlants} isInProject={isInProject}/>)
    })
    
    return (
        <div className="container">
            <div className="Header"> 
                <h1>My Landscaper - Plants</h1>
                <Button color='black' onClick={()=>navigate('/project_page')}>Back to Project</Button>
            </div> 
            <div className="Content2">
                <div className="plants2">
                    Filters 
                </div>
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