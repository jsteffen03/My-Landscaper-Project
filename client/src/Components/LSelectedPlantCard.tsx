import { CardMeta, CardHeader, CardContent, Card, Button} from 'semantic-ui-react'

type Plant = {
    id: number;
    name: string;
    scientific_name: string;
    type: string;
    img: string;
}

function LSelectedPlantCard({plant}: {plant:Plant}){

    return(
        <div key={plant.name}>
            <Card>
            <img alt={plant.name} src={plant.img}/>
                <CardContent>
                    <CardHeader>{plant.name}</CardHeader>
                    <CardMeta>
                        {plant.scientific_name}
                    </CardMeta>
                    <CardMeta>
                        {plant.type}
                    </CardMeta>
                </CardContent>
            </Card>    
        </div>
    )
}

export default LSelectedPlantCard