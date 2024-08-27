// import { useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home.tsx'
import LoginUser from './Components/LoginUser.tsx'
import LoginLandscaper from './Components/LoginLandscaper.tsx';
import LandscaperPage from './Components/LandscaperPage.tsx';
import UserPage from './Components/UserPage.tsx';
import ProjectPage from './Components/ProjectPage.tsx';
import ItemSearch from './Components/ItemSearch.tsx';

function App() {

  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <Home />
              }/>
            <Route path="/login_user" element={
              <LoginUser />
              }/>
            <Route path="/login_landscaper" element={
              <LoginLandscaper />
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
