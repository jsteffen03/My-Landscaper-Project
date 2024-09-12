import { Card, Image } from 'semantic-ui-react';
import { Plant } from '../types';

//Renders selected plant for project
function LSelectedPlantCard({ plant }: { plant: Plant }) {
    return (
        <Card>
            <Image alt={plant.name} src={plant.img} />
            <Card.Content>
                <Card.Header>{plant.name}</Card.Header>
                <Card.Meta>{plant.scientific_name}</Card.Meta>
                <Card.Meta>{plant.type}</Card.Meta>
            </Card.Content>
        </Card>
    );
}

export default LSelectedPlantCard;
