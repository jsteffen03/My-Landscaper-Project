import { Card, Button, Image } from 'semantic-ui-react'
import { Plant } from '../types';

interface PlantCardProps {
    plant: Plant;
    projectId: number;
    setProjectPlants: React.Dispatch<React.SetStateAction<Plant[]>>;
    projectPlants: Plant[];
    isInProject: boolean;
    setNewProjectPlants: React.Dispatch<React.SetStateAction<Plant[]>>;
}


function PlantCard({plant, projectId, projectPlants, isInProject, setNewProjectPlants}: PlantCardProps) {


    function addToProject(id: number) {
        fetch(`/api/project/${projectId}/plant`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plant_id: id,
                project_id: projectId
            }),
        })
        .then(r=> {
            if(r.ok)
                return r.json()
            else
                alert("Failed to add plant to project")
        })
        .then((newPlant: Plant) => {
            setNewProjectPlants([...projectPlants, newPlant])
          })
        .catch(error =>{
            console.error('There was a problem with the post operation:', error);
            alert('There was an error adding the plant to the project.');
        })
    }

    return (
        <Card>
            <Image alt={plant.name} src={plant.img} />
            <Card.Content>
                <Card.Header>{plant.name}</Card.Header>
                <Card.Meta>{plant.scientific_name}</Card.Meta>
                <Card.Meta>{plant.type}</Card.Meta>
                <Button
                    color={isInProject ? 'grey' : 'green'}
                    onClick={() => addToProject(plant.id)}
                    disabled={isInProject}
                >
                    {isInProject ? 'Already in Project' : 'Add to Project'}
                </Button>
            </Card.Content>
        </Card>
    );
}

export default PlantCard