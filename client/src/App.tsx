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

type User = {
  id: number;
  email: string;
  name: string;
  password: string;
}

type NewLandscaper = {
  name: string;
  company: string;
  email: string;
  password: string;
}


function App() {

  const [user, setUser] = useState<User | null>(null)
  const [landscaper, setLandscaper] = useState<NewLandscaper | null>(null)

  interface SessionData {
    user?: {
      id: number;
      email: string;
      name: string;
    };
  }

  useEffect(() => {
    fetch('/api/checksessions')
    .then(r=>{
      if(r.ok){
        return r.json() as Promise<SessionData>
      }
      else {
        throw new Error
      }
    })
    .then(data=>{
      console.log(data)
    })
    .catch(()=>{})
  }, [])

  return (
    <div>
      <BrowserRouter>
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
          <Route path="/landscaper_page" element={
            <LandscaperPage />
          }/>
          <Route path="/user_page" element={
            <UserPage />
          }/>
          <Route path="/project_page" element={
            <ProjectPage />
          }/>
          <Route path="/item_search" element={
            <ItemSearch />
          }/>
          <Route path='*' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
