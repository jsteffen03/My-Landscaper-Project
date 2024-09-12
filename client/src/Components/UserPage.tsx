import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Form, Button, FormField, FormTextArea } from 'semantic-ui-react';
import ProjectCard from './ProjectCard';
import { User, Project } from '../types';

type newProject = {
    title: string;
    description: string;
    user_id: number;
    status: string;
}

interface UserPageProps {
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    user: User;
    setProjectId: React.Dispatch<React.SetStateAction<number>>;
}

function UserPage({ setUser, user, setProjectId }: UserPageProps) {
    const [projectData, setProjectData] = useState<Project[]>([]);
    const [userProjects, setUserProjects] = useState<Project[]>([]);
    const [newPTitle, setNewPTitle] = useState<string>('');
    const [newPDescription, setNewPDescription] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/projects')
            .then(r => {
                if (r.ok) {
                    return r.json();
                } else {
                    throw new Error();
                }
            })
            .then((data: Project[]) => {
                setProjectData(data);
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        if (user) {
            setUserProjects(projectData.filter((project: Project) => project.user_id === user.id));
        }
    }, [projectData, user]);

    const handleLogout = () => {
        fetch('/api/logout', { method: "DELETE" })
            .then(r => r.json())
            .then(() => setUser(null))
            .then(() => navigate('/'));
    };

    const handleAddProject = (newProject: newProject): void => {
        fetch("/api/projects", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(newProject)
        })
            .then(r => r.json())
            .then(data => {
                setProjectData(prevData => [...prevData, data]);
                setNewPTitle('');
                setNewPDescription('');
            });
    };

    const addProject = (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();
        if (user && newPDescription !== "" && newPTitle !== "") {
            const newProject: newProject = {
                title: newPTitle,
                description: newPDescription,
                user_id: user.id,
                status: "Created"
            };
            handleAddProject(newProject);
        } else {
            alert("Please enter a project name and description");
        }
    };

    const projectRender = userProjects.map((project: Project) => (
        <ProjectCard 
            key={project.id} 
            project={project} 
            projectData={projectData} 
            setProjectData={setProjectData} 
            setProjectId={setProjectId} 
            user={user} 
        />
    ));

    return (
        <div className="user-home">
            <div className="Header">
                <div className="logo-welcome">
                <div className="img-container-user">
                    <img className="logo" alt="logo" src="./src/assets/Logo.png" />
                </div>
                <h2 className='welcome'>Welcome,  {user.name}</h2>
                </div>
                <h1 className="site-name">My Landscaper</h1>
                <Button size="huge" color="black" onClick={handleLogout}>Log Out</Button>
            </div>
            <div className="Content">
                <div className="Projects">
                    <h2 className='Title'>My Projects</h2>
                    <div>
                        {projectRender}
                    </div>
                </div>
                <div className="NewProjects">
                    <Form onSubmit={addProject}>
                        <h2 className='Title'>New Project</h2>
                        <Button color='black' floated='right' type='submit'>Submit</Button>
                        <FormField>
                            <p className='label'>Project Title</p>
                            <input
                                type="text"
                                value={newPTitle}
                                placeholder="Project Title"
                                onChange={(e) => setNewPTitle(e.target.value)}
                            />
                        </FormField>
                        <FormField>
                            <p className='label' >Project Details</p>
                            <FormTextArea
                                value={newPDescription}
                                placeholder="Please give a detailed description of your project"
                                onChange={(e) => setNewPDescription(e.target.value)}
                            />
                        </FormField>
                    </Form>
                    <div className='Instructions'>
                        <h2>Things to include in your project details:</h2>
                        <ul>                            
                            <li>What is your vision?</li>
                            <li>What area of your yard are you landscaping?</li>
                            <li>Do you want to include plants in your project?</li>
                            <li>Do you want to include walkways in your project?</li>
                            <li>Do you want to include a patio in your project?</li>
                            <li>Do you want to include a fireplace in your project?</li>
                            <li>Do you want to include a fence in your project?</li>
                            <li>Do you want to include a water feature in your project?</li>
                            <li>Do you want to include lights in your project?</li>
                            <li>Do you want mulch, rock, or grass in your project?</li>
                            <li>Do you want to include artwork in your project?</li>
                            <li>Please be as detailed as possible for your project</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPage;
