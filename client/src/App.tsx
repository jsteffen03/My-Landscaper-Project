import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './Components/Home';
import LoginUser from './Components/LoginUser';
import LoginLandscaper from './Components/LoginLandscaper';
import LandscaperPage from './Components/LandscaperPage';
import UserPage from './Components/UserPage';
import ProjectPage from './Components/ProjectPage';
import ItemSearch from './Components/ItemSearch';
import LProjectPage from './Components/LProjectPage';
import { User, Plant, Landscaper } from './types';

function App() { 

  const [user, setUser] = useState<User | null>(null); //Sets current user upon login
  const [landscaper, setLandscaper] = useState<Landscaper | null>(null); //Sets current landscaper upon login
  const [projectId, setProjectId] = useState<number>(0); //Sets current project Id for future fetches
  const [projectPlants, setProjectPlants] = useState<Plant[]>([]); //Sets current project plants

  useEffect(() => { //Grabs projectId from sessionStorage if any
    const storedProjectId = sessionStorage.getItem('projectId');
    if (storedProjectId) {
      const projectIdAsInt = parseInt(storedProjectId, 10);
      setProjectId(projectIdAsInt);
    }
  }, []);

  useEffect(() => { //Checks if user is logged in
    fetch('/api/checksessions')
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error('Failed to check sessions');
        }
      })
      .then((data) => {
        if (data.company) {
          setLandscaper(data);
        } else {
          setUser(data);
        }
      })
      .catch((error) => console.error('Error fetching session data:', error));
  }, []);

  let routes: JSX.Element; //Routes for different users

  if (user) { //User valid routes
    routes = (
      <Routes>
        <Route
          path="/user_page"
          element={<UserPage setUser={setUser} user={user} setProjectId={setProjectId} />}
        />
        <Route
          path="/project_page"
          element={
            <ProjectPage projectId={projectId} projectPlants={projectPlants} setProjectPlants={setProjectPlants} />
          }
        />
        <Route
          path="/item_search"
          element={
            <ItemSearch projectId={projectId} projectPlants={projectPlants} setProjectPlants={setProjectPlants} />
          }
        />
        <Route path="*" element={<UserPage setUser={setUser} user={user} setProjectId={setProjectId} />} />
      </Routes>
    );
  } else if (landscaper) { //Landscaper valid routes
    routes = (
      <Routes>
        <Route
          path="/landscaper_page"
          element={
            <LandscaperPage landscaper={landscaper} setLandscaper={setLandscaper} setProjectId={setProjectId} />
          }
        />
        <Route
          path="/l_project_page"
          element={<LProjectPage projectId={projectId} projectPlants={projectPlants} setProjectPlants={setProjectPlants} />}
        />
        <Route
          path="*"
          element={<LandscaperPage landscaper={landscaper} setLandscaper={setLandscaper} setProjectId={setProjectId} />}
        />
      </Routes>
    );
  } else { //Login routes
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login_user" element={<LoginUser setUser={setUser} />} />
        <Route path="/login_landscaper" element={<LoginLandscaper setLandscaper={setLandscaper} />} />
        <Route path="*" element={<Home />} />
      </Routes>
    );
  }

  return ( 
    <div className="body">
      <BrowserRouter>{routes}</BrowserRouter>
    </div>
  );
}

export default App;
