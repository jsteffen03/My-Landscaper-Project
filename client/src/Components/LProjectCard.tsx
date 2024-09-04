import { useNavigate } from 'react-router-dom';
import {ItemMeta,ItemHeader,ItemGroup,ItemDescription,ItemContent,Button,Item} from 'semantic-ui-react'

function LProjectCard({project, setProjectId}:{project:any, setProjectId: any}) {

    const navigate = useNavigate();

    function editProject(){
        setProjectId(project.id)
        console.log(project.id)
        navigate('/l_project_page')
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
                    View
                </Button>
            </ItemContent>
            </Item>  
        </ItemGroup>
    )
}

export default LProjectCard