export type Plant = {
    id: number;
    name: string;
    scientific_name: string;
    type: string;
    img?: string;
    projects?: Project[]; // Relation to projects through join table
};
  
export  type User = {
    id: number;
    name: string;
    email: string;
    password?: string; // Exclude password from most types to maintain security
    projects: Project[]; // One-to-many relationship with projects
};
  
export  type Landscaper = {
    id: number;
    name: string;
    company: string;
    email: string;
    password?: string; // Exclude password from most types to maintain security
    projects: Project[]; // Many-to-many relationship with projects
};
  
export  type Project = {
    id: number;
    title: string;
    description?: string;
    status: string;
    user_id: number;
    user?: User; // The User who owns this project
    plants?: Plant[]; // Many-to-many relationship with plants
    landscapers?: Landscaper[]; // Many-to-many relationship with landscapers
};