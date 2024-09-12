import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import {ItemMeta, ItemHeader, ItemGroup, ItemDescription,ItemContent,Button,Item, Form, FormField} from 'semantic-ui-react'
import { User, Project } from '../types';
import { confirmAlert } from 'react-confirm-alert'

interface ProjectCardProps {
    project: Project;
    projectData: Project[];
    setProjectData: React.Dispatch<React.SetStateAction<Project[]>>;
    setProjectId: React.Dispatch<React.SetStateAction<number>>;
    user: User;
}

//Renders project cards for each current user project
function ProjectCard({project, projectData, setProjectData, setProjectId, user}: ProjectCardProps) {

    const navigate = useNavigate();
    const [emailAddress, setEmailAddress] = useState<string>("") //email address for sending project
    const [sendingEmail, setSendingEmail] = useState<boolean>(false) //controls email form
    const [companyName, setCompanyName] = useState<string>("") //company name for sending project

    function deleteProject(){ //Deletes project from database
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

    function showDeleteConfirmation() { //Shows delete confirmation
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

    function editProject(){ //saves project id to storage and navigates to project page
        setProjectId(project.id)
        sessionStorage.setItem('projectId', project.id.toString())
        navigate('/project_page')
    }

    function sendEmail(){ //sends email to landscape company
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
        .then(()=>{ //Changes status of project
            const updatedProject: Partial<Project> = {};
            updatedProject.status = "Email Sent - Awaiting Confirmation";
            fetch(`/api/project/${project.id}`, { 
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
                const updatedProjects = projectData.map(proj => {
                    if (proj.id === updatedData.id) {
                        return updatedData;
                    }
                    return proj;
                });
                setProjectData(updatedProjects); //updates project data
            })
            .catch(error => {
                console.error('Error updating project:', error);
            })
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('There was an error sending the email.');
        });
    }

    const landscapers = project?.landscapers?.map(landscaper =>{ //Renders project's landscapers
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
                    <Button floated="right" color="red" onClick={showDeleteConfirmation}>Delete</Button>
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
                        <Button floated="right" color="black" onClick={sendEmail}>Send</Button>
                    </Form>
                    : 
                    null} 
                </ItemContent>
            </Item>
        </ItemGroup>
    )
}

export default ProjectCard