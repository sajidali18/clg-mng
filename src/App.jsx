import React from 'react'
import CollegeDashboard from './Components/Dashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadLogo from './Components/Uploadlogo';
import UploadImage from './Components/Uplpadimage';
import UniversityProfile from './Components/Clginfo';
import ClgList from './Components/ClgList';

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/addcollege" element={<CollegeDashboard/>}/>
        <Route path="/" element={<ClgList/>}/>
        <Route path="/college/:collegeId" element={<UniversityProfile/>}/>
        <Route path="/image/:collegeId" element={<UploadLogo/>}/>
        <Route path="/profile-image/:collegeId" element={<UploadImage/>}/>
        </Routes>
     </BrowserRouter>
  )
}

export default App