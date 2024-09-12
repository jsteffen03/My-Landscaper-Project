import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import {ItemMeta, ItemHeader, ItemGroup, ItemDescription,ItemContent,Button,Item, Form, FormField} from 'semantic-ui-react'
import { User, Project } from '../types';

interface ProjectCardProps {
    project: Project;
    projectData: Project[];
    setProjectData: React.Dispatch<React.SetStateAction<Project[]>>;
    setProjectId: React.Dispatch<React.SetStateAction<number>>;
    user: User;
}


function ProjectCard({project, projectData, setProjectData, setProjectId, user}: ProjectCardProps) {

    const navigate = useNavigate();
    const [emailAddress, setEmailAddress] = useState<string>("")
    const [sendingEmail, setSendingEmail] = useState<boolean>(false)
    const [companyName, setCompanyName] = useState<string>("")

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
            const notRemoved = projectData.filter(proj => proj.id !== project.id);
            setProjectData(notRemoved);
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

    function sendEmail(){
        const emailSubject = `Project Invitation - ${project.title} - My Landscaper`;
        fetch('/api/send_email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_email: user.email,
                recipient_email: emailAddress,
                user_name: user.name,
                company_name: companyName,
                subject: emailSubject,
                project_id: project.id
            }),
        })
        .then(r=>r.json())
        .then(()=>{
            setSendingEmail(false)
            setCompanyName("")
            setEmailAddress("")
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('There was an error sending the email.');
        });
    }

    const landscapers = project?.landscapers?.map(landscaper =>{
        return (
            <div key={landscaper.id}>
                <p>{landscaper.name}</p>
            </div>
        )
    })

    return(
        <ItemGroup divided className='ProjectCard'>
            <Item>
                <ItemContent>
                    <ItemHeader>{project.title}</ItemHeader>
                    <ItemMeta>
                        <span>Status: {project.status}</span>
                    </ItemMeta>
                    <ItemMeta>
                        <span>Landscapers:</span>
                        <span>{landscapers?.length ? landscapers : "No Landscapers can view this project"}</span>
                    </ItemMeta>
                    <ItemDescription>Description: {project.description}</ItemDescription>
                    <Button floated="right" color="black" onClick={editProject}>Edit</Button>
                    <Button floated="right" color="red" onClick={deleteProject}>Delete</Button>
                    {sendingEmail ? <></>: <Button floated="right" color="black" onClick={() => setSendingEmail(!sendingEmail)}>Send Email</Button>}
                    {sendingEmail ? 
                    <Form>                    
                        <FormField>
                            <label>Company</label>
                            <input placeholder='Company' value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
                        </FormField>
                        <FormField>
                            <label>Email Address</label>
                            <input placeholder='Email Address' value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}/>
                        </FormField>
                        <Button floated="right" color="red" onClick={() => setSendingEmail(!sendingEmail)}>Cancel</Button>
                        <Button primary floated="right" onClick={sendEmail}>Send</Button>
                    </Form>
                    : 
                    null} 
                </ItemContent>
            </Item>
        </ItemGroup>
    )
}

export default ProjectCard