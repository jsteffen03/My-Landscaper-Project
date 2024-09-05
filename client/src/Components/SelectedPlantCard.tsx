import { CardMeta, CardHeader, CardContent, Card, Button} from 'semantic-ui-react'

type Plant = {
    id: number;
    name: string;
    scientific_name: string;
    type: string;
    img: string;
}

function SelectedPlantCard({plant, projectId, projectPlants, setProjectPlants}: {plant:any, projectId:number, projectPlants:Plant[], setProjectPlants: React.Dispatch<React.SetStateAction<Plant[]>>}){

    function deletePlant(id: number) {
        console.log(plant)
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
        .then(r=> {
            if(r.ok)
                return r.json()
            else
                throw new Error("Failed to delete plant from project")
        })
        .then(()=>{
            const notRemoved = projectPlants.filter(plant=>{
                if(plant.id == id){
                    return false
                }
                return true
            })
            setProjectPlants(notRemoved)
        })
        .catch(error =>{
            console.log(error)
        })
    }

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
                    <Button color='red' onClick={()=>deletePlant(plant.id)}>Remove</Button>
                </CardContent>
            </Card>    
        </div>
    )
}

export default SelectedPlantCard