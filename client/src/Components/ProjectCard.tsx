import { useNavigate } from 'react-router-dom';
import {ItemMeta,ItemHeader,ItemGroup,ItemDescription,ItemContent,Button,Item} from 'semantic-ui-react'

type Project = {
    title: string;
    user_id: number;
    status: string;
    id: number;
    description: string;
    landscapers?: [];
}

function ProjectCard({project, projectData, setProjectData, setProjectId}:{project:Project, projectData:any, setProjectData:any, setProjectId: any}) {

    const navigate = useNavigate();

    function deleteProject(){
        fetch(`/api/project/${project.id}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to delete project');
            }
            return response.json();
        })
        .then(() => {
            const notRemoved = projectData.filter((proj: { id: number; })=>{
                if(proj.id == project.id){
                    return false
                }
                return true    
            })
            setProjectData(notRemoved)
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    function editProject(){
        setProjectId(project.id)
        sessionStorage.setItem('projectId', project.id.toString())
        navigate('/project_page')
    }


    return(
        <ItemGroup divided>
            <Item>
            <ItemContent>
                <ItemHeader>{project.title}</ItemHeader>
                <ItemMeta>
                    <span>{project.status}</span>
                </ItemMeta>
                <ItemDescription>{project.description}</ItemDescription>
                <Button primary floated="right" onClick={editProject}>
                    Edit
                    {/* <Icon name='right chevron'/> */}
                </Button>
                <Button primary floated="right" onClick={deleteProject}>Delete</Button>
            </ItemContent>
            </Item>  
        </ItemGroup>
    )
}

export default ProjectCard