import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {Button, Card, Form, Input, FormTextArea, ListDescription} from 'semantic-ui-react'
import SelectedPlantCard from './SelectedPlantCard';

type Plant = {
    id: number;
    name: string;
    scientific_name: string;
    type: string;
    img: string;
}

type Project = {
    id: number;
    title: string;
    description: string;
    status: string;
    user_id: number;
    plants?: [];
}

function ProjectPage({projectId, projectPlants, setProjectPlants, setProjectId}: {projectId:number, projectPlants:Plant[], setProjectPlants: React.Dispatch<React.SetStateAction<Plant[]>>, setProjectId: React.Dispatch<React.SetStateAction<number>>}) {

    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [newDescription, setNewDescription] = useState<string>('')
    const [newTitle, setNewTitle] = useState<string>('')
    const [plantNum, setPlantNum] = useState<number>(0)
    const [floweringTreesCount, setFloweringTreesCount] = useState<number>(0);
    const [shadeTreesCount, setShadeTreesCount] = useState<number>(0);
    const [evergreenTreesCount, setEvergreenTreesCount] = useState<number>(0);

    useEffect(() => {
        if (projectId != 0) {
            fetch(`/api/project/${projectId}`)
            .then(r=>{
                if(r.ok){
                    return r.json()
                }
                else {
                    throw new Error
                }
            })
            .then(data=>{
                setProject(data)
                setProjectPlants(data.plants)
            })
            .catch(()=>{})
        }
    }, [projectId])

    const handleEditSubmit = () => {
        const updatedProject = {description: newDescription, title: newTitle };
        fetch(`/api/project/${projectId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProject),
        })
            .then((r) => {
                if (!r.ok) {
                    throw new Error();
                }
                return r.json();
            })
            .then((updatedData) => {
                setProject(updatedData);
                setIsEditing(false); 
            })
            .catch((error) => {
                console.error('Error updating project:', error);
            });
    };

    useEffect(() => {
        if (projectPlants) {
            console.log("ran")
            const totalPlants = projectPlants.length;
            setPlantNum(totalPlants);
            console.log("Total Plants:", totalPlants);

            const floweringTrees = projectPlants.filter(
                (plant: Plant) => plant.type === "Flowering Tree"
            ).length;
            setFloweringTreesCount(floweringTrees);
    
            const shadeTrees = projectPlants.filter(
                (plant: Plant) => plant.type === "Shade Tree"
            ).length;
            setShadeTreesCount(shadeTrees);
    
            const evergreenTrees = projectPlants.filter(
                (plant: Plant) => plant.type === "Evergreen Tree"
            ).length;
            setEvergreenTreesCount(evergreenTrees);
        }
    }, [projectPlants])

    const plantRender = projectPlants?.map((plant:any) => <SelectedPlantCard key={plant.id} plant={plant} projectId={projectId} projectPlants={projectPlants} setProjectPlants={setProjectPlants}/>)

    return(
        <div className="container">
            <div className="Header">
                <h2>{project?.title}</h2>
                <h1>My Landscaper</h1>
                <Button color="black" onClick={()=>navigate('/user_page')}>Home</Button> 
            </div> 
            <div className="Content">
                <div className="MyProjects">
                    {isEditing == false ?
                    <div>
                    <h2>Project Desription</h2>
                    <ListDescription>{project?.description}</ListDescription>
                    <h2>Project Status</h2>
                    <p>{project?.status}</p>
                    <Button color="blue" onClick={() => setIsEditing(true)}>Edit Project</Button>                    
                    <h2>Number of Plants</h2>
                    <p>Total: {plantNum}</p>
                    <p>Flowering Trees: {floweringTreesCount}</p>
                    <p>Shade Trees: {shadeTreesCount}</p>
                    <p>Evergreen Trees: {evergreenTreesCount}</p>
                    </div>
                    :
                    <Form className="EditForm">                        
                        <Form.Field>
                            <label>Title</label>
                            <Input
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                placeholder="Enter new TItle"
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Description</label>
                            <FormTextArea
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                placeholder="Enter new description"
                            />
                        </Form.Field>
                        <Button color="green" onClick={()=>handleEditSubmit()}>Save Changes</Button>
                        <Button color="red" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </Form>
                    }   
                </div>
                <div className="ProjectPlants">
                    <div className="Button">
                        <h2>Project Plants</h2>
                        <div>
                            <Button color='green' onClick={()=>navigate('/item_search')}>Add Plants</Button>
                        </div>
                    </div>
                    <Card.Group>
                        {plantRender}
                    </Card.Group>    
                </div>
            </div>
        </div>
    )
} 

export default ProjectPage