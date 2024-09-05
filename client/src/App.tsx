import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react'
import Home from './Components/Home.tsx'
import LoginUser from './Components/LoginUser.tsx'
import LoginLandscaper from './Components/LoginLandscaper.tsx';
import LandscaperPage from './Components/LandscaperPage.tsx';
import UserPage from './Components/UserPage.tsx';
import ProjectPage from './Components/ProjectPage.tsx';
import ItemSearch from './Components/ItemSearch.tsx';
import LProjectPage from './Components/LProjectPage.tsx';

type User = {
  id: number;
  email: string;
  name: string;
  password: string;
  projects?: [];
}

type Landscaper = {
  id: number;
  name: string;
  company: string;
  email: string;
  password: string;
}

function App() {

  const [user, setUser] = useState<User | null>(null)
  const [landscaper, setLandscaper] = useState<Landscaper | null>(null)
  const [projectId, setProjectId] = useState<number>(0)

  useEffect(() => {
    fetch('/api/checksessions')
    .then(r=>{
      if(r.ok){
        return r.json()
      }
      else {
        throw new Error
      }
    })
    .then(data=>{
      if (data.company) {
        setLandscaper(data)
      }
      else{
        setUser(data)
      }
    })
    .catch(()=>{})
  }, [])

  let routes: JSX.Element;

  // Routes for different user types
  if (user) {
    routes = (
      <Routes>
        <Route path="/user_page" element={
          <UserPage setUser={setUser} user={user} setProjectId={setProjectId}/>
        }/>
        <Route path="/project_page" element={
          <ProjectPage projectId={projectId} setProjectId={setProjectId}/>
        }/>
        <Route path="/item_search" element={
          <ItemSearch projectId={projectId}/>
        }/>
        <Route path='*' element={
          <UserPage setUser={setUser} user={user} setProjectId={setProjectId}/>
          } />
      </Routes>
    )
  } else if (landscaper) {
    routes = (
      <Routes>
        <Route path="/landscaper_page" element={
          <LandscaperPage landscaper={landscaper} setLandscaper={setLandscaper} setProjectId={setProjectId}/>
        }/>
        <Route path="/l_project_page" element={
          <LProjectPage projectId={projectId} setProjectId={setProjectId}/>
        }/>
        <Route path="*" element={<LandscaperPage landscaper={landscaper} setLandscaper={setLandscaper} setProjectId={setProjectId}/>} />
      </Routes>
    )
  } else {
    routes = (
      <Routes>
        <Route path="/" element={
          <Home />
        }/>
        <Route path="/login_user" element={
          <LoginUser setUser={setUser}/>
        }/>
        <Route path="/login_landscaper" element={
          <LoginLandscaper setLandscaper={setLandscaper}/>
        }/>
        <Route path='*' element={<Home />} />
      </Routes>
    )
  }

  return (
    <div className="body2">
      <BrowserRouter>{routes}</BrowserRouter>
    </div>
  );
}

export default App;

