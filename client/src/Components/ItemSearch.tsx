import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {Button, Card} from 'semantic-ui-react'
import PlantCard from './plantCard.tsx'

type Plants = {
    id: number;
    name: string;
    scientific_name: string;
    type: string;
    img: string;
}

function ItemSearch(){

    const navigate = useNavigate();
    const [plants, setPlants] = useState<Plants | null>(null)

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
            console.log(data)
        })
        .catch(()=>{})
    }, [])


    const plantRender = plants?.map((plant:Plants) => <PlantCard key={plant.id} plant={plant}/>)
    
    return (
        <div className="container">
            <div className="Header"> 
                <h1>Project Page</h1>
                <Button color='black' onClick={(e)=>navigate('/user')}>Back to Home</Button>
            </div> 
            <div className="Content2">
                <div className="plants2">
                    <Card.Group>
                        {/* {selectedFurnitureRender} */}
                    </Card.Group>
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