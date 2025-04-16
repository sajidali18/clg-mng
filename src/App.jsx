import React from 'react'
import CollegeDashboard from './Components/Dashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadLogo from './Components/Uploadlogo';
import UploadImage from './Components/Uplpadimage';

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<CollegeDashboard/>}/>
        <Route path="/image/:collegeId" element={<UploadLogo/>}/>
        <Route path="/profile-image/:collegeId" element={<UploadImage/>}/>
        </Routes>
     </BrowserRouter>
  )
}

export default App