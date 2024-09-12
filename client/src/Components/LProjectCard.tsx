import { useNavigate } from 'react-router-dom';
import {ItemMeta,ItemHeader,ItemGroup,ItemDescription,ItemContent,Button,Item} from 'semantic-ui-react'
import { Project } from '../types';
import { confirmAlert } from 'react-confirm-alert';

interface LProjectCardProps {
    project: Project;
    setProjectId: React.Dispatch<React.SetStateAction<number>>;
    landProject: Project[];
    setLandProject: React.Dispatch<React.SetStateAction<Project[]>>
    landscaperId: number | undefined;
}

function LProjectCard({ project, setProjectId, landProject, setLandProject, landscaperId}: LProjectCardProps) {

    const navigate = useNavigate();

    function editProject(){
        setProjectId(project.id)
        sessionStorage.setItem('projectId', project.id.toString())
        navigate('/l_project_page')
    }

    function deleteProject(){
        fetch(`/api/project/${project.id}/landscaper`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                landscaper_id: landscaperId
            })
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to delete project');
            }
            return response.json();
        })
        .then(() => {
            const updatedProjects = landProject.filter(proj => proj.id !== project.id);
            setLandProject(updatedProjects);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    function showDeleteConfirmation() {
        confirmAlert({
            title: 'Confirm to Delete Project',
            message: 'Are you sure you want to delete this project?',
            buttons: [
                {
                    label: 'Delete Project',
                    onClick: deleteProject 
                },
                {
                    label: 'Cancel',
                    onClick: () => {}
                }
            ],
        });
    }

    return(
        <ItemGroup divided className='ProjectCard'>
            <Item>
            <ItemContent>
                <ItemHeader>{project.title} - {project.user?.name}</ItemHeader>
                <ItemMeta>
                    <span>{project.status}</span>
                </ItemMeta>
                <ItemDescription>{project.description}</ItemDescription>
                <Button color='black' floated="right" onClick={editProject}>
                    View
                </Button>
                <Button color='red' floated="right" onClick={showDeleteConfirmation}>
                    Delete
                </Button>
            </ItemContent>
            </Item>  
        </ItemGroup>
    )
}

export default LProjectCard