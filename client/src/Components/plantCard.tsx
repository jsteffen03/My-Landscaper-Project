import { CardMeta, CardHeader, CardContent, Card, Button, Image } from 'semantic-ui-react'

function plantCard({plant}: {plant:any}){

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

export default plantCard

// /home/jcsteffen03/Development/code/phase-5/My-Landscaper-Project/server/static/Images/Austrain Pine Tree.jpg
// server/static/Images/Austrain Pine Tree.jpg