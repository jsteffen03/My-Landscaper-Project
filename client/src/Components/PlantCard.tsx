import { CardMeta, CardHeader, CardContent, Card, Button, Image } from 'semantic-ui-react'

function PlantCard({plant, projectId}: {plant:any, projectId:number}){

    return(
        <div key={plant.name}>
            <Card>
            <Image alt={plant.name} src={plant.img}/>
                <CardContent>
                    <CardHeader>{plant.name}</CardHeader>
                    <CardMeta>
                        {plant.scientific_name}
                    </CardMeta>
                    <CardMeta>
                        {plant.type}
                    </CardMeta>
                    <Button color='green' onClick={(e)=>console.log(e)}>Add to Project</Button>
                </CardContent>
            </Card>    
        </div>
    )
}

export default PlantCard