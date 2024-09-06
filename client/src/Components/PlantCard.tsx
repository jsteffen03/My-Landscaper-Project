import { useEffect } from 'react';
import { CardMeta, CardHeader, CardContent, Card, Button, Image } from 'semantic-ui-react'

type Plant = {
    id: number;
    name: string;
    scientific_name: string;
    type: string;
    img: string;
}


function PlantCard({plant, projectId, projectPlants, setProjectPlants, isInProject}: {plant:Plant, projectId:number, projectPlants:Plant[], setProjectPlants: React.Dispatch<React.SetStateAction<Plant[]>>, isInProject: boolean}){


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
            setProjectPlants((prevPlants) => [...prevPlants, newPlant]);
          })
        .catch(error =>{
            console.log(error)
        })
    }
    
    // function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    //     e.preventDefault()
    //     const id = plant.id
    //     addToProject(id)
    // }

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
                    <Button
                        color={isInProject ? 'grey' : 'green'}
                        onClick={()=>addToProject(plant.id)}
                        disabled={isInProject} // Disable button if plant is already in the project
                    >
                        {isInProject ? 'Already in Project' : 'Add to Project'}
                    </Button>
                </CardContent>
            </Card>    
        </div>
    )
}

export default PlantCard