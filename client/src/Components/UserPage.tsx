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
        <div className="container">
            <div className="Header">
                <h2>Welcome {user.name}</h2>
                <h1>My Landscaper</h1>
                <Button color="black" onClick={handleLogout}>Log Out</Button>
            </div>
            <div className="Content">
                <div className="ProjectPlants">
                    <div className="Button">
                        <h2>My Projects</h2>
                    </div>
                    <div>
                        {projectRender}
                    </div>
                </div>
                <div className="MyProjects">
                    <Form onSubmit={addProject}>
                        <h2>New Project</h2>
                        <Button color='black' type='submit'>Submit</Button>
                        <FormField>
                            <label>Project Name</label>
                            <input
                                type="text"
                                value={newPTitle}
                                placeholder="Project Title"
                                onChange={(e) => setNewPTitle(e.target.value)}
                            />
                        </FormField>
                        <FormField>
                            <label>Project Details</label>
                            <FormTextArea
                                value={newPDescription}
                                placeholder="Please give a detailed description of your project"
                                onChange={(e) => setNewPDescription(e.target.value)}
                            />
                        </FormField>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default UserPage;
