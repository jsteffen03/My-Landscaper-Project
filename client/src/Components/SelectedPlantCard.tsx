import { Card, Button } from 'semantic-ui-react';
import { Plant } from '../types';

interface SelectedPlantCardProps {
    plant: Plant
    projectId: number
    projectPlants: Plant[]
    setProjectPlants: React.Dispatch<React.SetStateAction<Plant[]>>
}

//Plant cards for project plants
function SelectedPlantCard({ plant, projectId, projectPlants, setProjectPlants }: SelectedPlantCardProps) {

    const deletePlant = (id: number) => { //Deletes plant from project
        fetch(`/api/project/${projectId}/plant`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plant_id: id,
                project_id: projectId
            }),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to delete plant from project");
            }
        })
        .then(() => {
            const notRemoved = projectPlants.filter(plant => plant.id !== id);
            setProjectPlants(notRemoved);
        })
        .catch(error => {
            console.error('Error fetching data:', error)
        });
    }

    return (
        <Card key={plant.id}>
            <img alt={plant.name} src={plant.img} />
            <Card.Content>
                <Card.Header>{plant.name}</Card.Header>
                <Card.Meta>{plant.scientific_name}</Card.Meta>
                <Card.Meta>{plant.type}</Card.Meta>
                <Button color='red' onClick={() => deletePlant(plant.id)}>Remove</Button>
            </Card.Content>
        </Card>
    )
}

export default SelectedPlantCard;
