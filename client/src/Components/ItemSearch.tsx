import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {Button, Card, Form, FormField, FormSelect} from 'semantic-ui-react'
import PlantCard from './PlantCard.tsx'
import { Plant } from '../types';

interface ItemSearchProps {
    projectId: number;
    projectPlants: Plant[];
    setProjectPlants: React.Dispatch<React.SetStateAction<Plant[]>>;
}

function ItemSearch({ projectId, projectPlants, setProjectPlants }: ItemSearchProps) {

    const navigate = useNavigate();
    const [plants, setPlants] = useState<Plant[]>([])
    const [newProjectPlants, setNewProjectPlants] = useState<Plant[]>(projectPlants)
    const [filteredPlants, setFilteredPlants] = useState<Plant[]>([])
    const [search, setSearch] = useState<string>("")
    const [filter, setFilter] = useState<any>("")

    useEffect(() => {
        if (projectId != 0) {
            fetch(`/api/project/${projectId}`)
            .then(r=>{
                if(r.ok){
                    return r.json()
                }
                else {
                    throw new Error('Failed to fetch project data.')
                }
            })
            .then(data=>{
                setProjectPlants(data.plants)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
        }
    }, [newProjectPlants])

    useEffect(() => {
        fetch('/api/plants')
        .then(r=>{
            if(r.ok){
                return r.json()
            }
            else {
                throw new Error('Failed to fetch project data.')
            }
        })
        .then(data=>{
            setPlants(data)
            setFilteredPlants(data)
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, [])

    function handleSearch(e?: React.FormEvent<HTMLFormElement>){
        if (e) e.preventDefault()
        setFilteredPlants(plants.filter((plant)=>{
            if (search === "" && filter === "") {
                return true;
              }
            
              if (search !== "" && plant.name.toLowerCase().includes(search.toLowerCase())) {
                if (filter === "" || plant.type === filter) {
                  return true;
                }
                return false;
              }
            
              if (filter !== "" && plant.type === filter) {
                if (search === "" || plant.name.toLowerCase().includes(search.toLowerCase())) {
                  return true;
                }
                return false;
              }
            
              return false;
        }))
    }

    const options: any = [
        { key: 'a', text: '--Select--', value: '' },
        { key: 'f', text: 'Flowering Tree', value: 'Flowering Tree' },
        { key: 's', text: 'Shade Tree', value: 'Shade Tree' },
        { key: 'e', text: 'Evergreen Tree', value: 'Evergreen Tree' }
    ]

    const plantRender = filteredPlants?.map((plant:Plant) => {
        const isInProject = projectPlants.some((p) => p.id === plant.id);
        return  (
            <PlantCard 
                key={plant.id} 
                plant={plant}
                projectPlants={projectPlants} 
                projectId={projectId} 
                setProjectPlants={setProjectPlants} 
                isInProject={isInProject}
                setNewProjectPlants={setNewProjectPlants}
            />
        )
    })
    
    return (
        <div className="container">
            <div className="Header">
                <div className="logo-welcome">
                    <div className="img-container-user">
                        <img className="logo" alt="logo" src="./src/assets/Logo.png" />
                    </div>
                    <h1 className='welcome'>Item Search</h1>                 
                </div>                 
                <h2 className="site-name">My Landscaper</h2>
                <Button color='black' size='huge' onClick={()=>navigate('/project_page')}>Back to Project</Button>
            </div>
            <div className="Content">
                <div className="ProjectDetails">
                    <Form onSubmit={(e)=>handleSearch(e)}>
                        <h2 className="PHeader">Search</h2> 
                        <Button floated='right' color='black' type="submit" >Search</Button>
                        <FormField>
                            <label>Plant Name</label>
                            <input type="text" placeholder="Plant Name" onChange={(e)=>setSearch(e.target.value)}></input>
                        </FormField>
                        <FormSelect onChange={(e, { value })=>setFilter(value)}
                            fluid
                            label='Select Type'
                            options={options}
                            placeholder='--Select--'    
                        />
                    </Form>
                </div>
                <div className="ProjectPlants">
                    <div className='ProjectPlantsHeader'>
                        <h2 className="Title2" >Plants</h2>
                    </div>
                    <Card.Group>
                        {plantRender}
                    </Card.Group>
                </div>
            </div>
        </div>
    )
}

export default ItemSearch