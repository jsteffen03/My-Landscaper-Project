import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, Card, Form, Input, TextArea } from 'semantic-ui-react';
import SelectedPlantCard from './SelectedPlantCard';
import { Project, Plant } from '../types';

interface ProjectPageProps {
    projectId: number;
    projectPlants: Plant[];
    setProjectPlants: React.Dispatch<React.SetStateAction<Plant[]>>;
}

function ProjectPage({ projectId, projectPlants, setProjectPlants }: ProjectPageProps) {
    const navigate = useNavigate()
    const [project, setProject] = useState<Project | null>(null)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [newDescription, setNewDescription] = useState<string>('')
    const [newTitle, setNewTitle] = useState<string>('')
    const [plantNum, setPlantNum] = useState<number>(0)
    const [floweringTreesCount, setFloweringTreesCount] = useState<number>(0)
    const [shadeTreesCount, setShadeTreesCount] = useState<number>(0)
    const [evergreenTreesCount, setEvergreenTreesCount] = useState<number>(0)

    useEffect(() => {
        if (projectId !== 0) {
            fetch(`/api/project/${projectId}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch project data')
                }
            })
            .then(data => {
                setProject(data);
                setProjectPlants(data.plants || []);
                setNewDescription(data.description);
                setNewTitle(data.title);
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            });
        }
    }, [projectId, setProjectPlants]);

    const handleEditSubmit = () => {
        const updatedProject: Partial<Project> = {};
        if (newTitle !== project?.title) {
            updatedProject.title = newTitle;
        }
        if (newDescription !== project?.description) {
            updatedProject.description = newDescription;
        }
        if (Object.keys(updatedProject).length === 0) {
            setIsEditing(false);
            return;
        }
        fetch(`/api/project/${projectId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProject),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update project');
            }
            return response.json();
        })
        .then(updatedData => {
            setProject(updatedData);
            setIsEditing(false);
        })
        .catch(error => {
            console.error('Error updating project:', error);
        })
    }

    useEffect(() => {
        if (projectPlants) {
            const totalPlants = projectPlants.length;
            setPlantNum(totalPlants);

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

    const plantRender = projectPlants.map((plant: Plant) => (
        <SelectedPlantCard key={plant.id} plant={plant} projectId={projectId} projectPlants={projectPlants} setProjectPlants={setProjectPlants} />
    ))

    return (
        <div className="container">
            <div className="Header">
                <div className="logo-welcome">
                    <div className="img-container-user">
                        <img className="logo" alt="logo" src="./src/assets/Logo.png" />
                    </div>
                <h2 className='welcome'>{project?.title}</h2>                   
                </div>
                <h1 className="site-name">My Landscaper</h1>
                <Button size="huge" color="black" onClick={() => navigate('/user_page')}>Home</Button>
            </div>
            <div className="Content">
                <div className="ProjectDetails">
                    {!isEditing ? (
                        <div>
                            <h2 className="PHeader">Project Description</h2>
                            <p className='Description'>{project?.description}</p>
                            <h2 className="PHeader">Project Status</h2>
                            <p className='Description2'>{project?.status}</p>
                            <Button color="black" onClick={() => setIsEditing(true)}>Edit Project</Button>
                            <h2 className="PHeader">Number of Plants</h2>
                            <p className='Description2'>Total: {plantNum}</p>
                            <p className='Description2'>Flowering Trees: {floweringTreesCount}</p>
                            <p className='Description2'>Shade Trees: {shadeTreesCount}</p>
                            <p className='Description2'>Evergreen Trees: {evergreenTreesCount}</p>
                        </div>
                    ) : (
                        <Form>
                            <Form.Field>
                                <label>Title</label>
                                <Input
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder={project?.title}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Description</label>
                                <TextArea
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                    placeholder={project?.description}
                                />
                            </Form.Field>
                            <Button color="green" onClick={handleEditSubmit}>Save Changes</Button>
                            <Button color="red" onClick={() => setIsEditing(false)}>Cancel</Button>
                        </Form>
                    )}
                </div>
                <div className="ProjectPlants">
                    <div className='ProjectPlantsHeader'>
                        <h2 className="Title2" >Project Plants</h2>
                        <Button floated='right' color='black' onClick={() => navigate('/item_search')}>Add Plants</Button>
                    </div>
                    <Card.Group>
                        {plantRender}
                    </Card.Group>
                </div>
            </div>
        </div>
    );
}

export default ProjectPage;
