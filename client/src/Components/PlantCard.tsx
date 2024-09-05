import { CardMeta, CardHeader, CardContent, Card, Button, Image } from 'semantic-ui-react'

type Plant = {
    id: number;
    name: string;
    scientific_name: string;
    type: string;
    img: string;
}


function PlantCard({plant, projectId}: {plant:Plant, projectId:number}){

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
                throw new Error("Failed to add plant to project")
        })
        .then(data=>{
            console.log(data)
        })
        .catch(error =>{
            console.log(error)
        })
    }
    
    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        const id = plant.id
        addToProject(id)
    }

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
                    <Button color='green' onClick={(e)=>handleClick(e)}>Add to Project</Button>
                </CardContent>
            </Card>    
        </div>
    )
}

export default PlantCard