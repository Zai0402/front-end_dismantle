import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login';
import TechnicianDashboard from './teknisi/dashboard';
import Devices from './teknisi/devices';
import TechnicianTeams from './teknisi/technicianTeams';
import AdminDashboard from './admin/dashboard';
import OntData from './admin/ontData';
import Teknisi from './admin/teknisi';



function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>

        <Route path='/teknisi/dashboard' element={<TechnicianDashboard/>}/>
        <Route path='/teknisi/devices' element={<Devices/>}/>
        <Route path='/teknisi/teams' element={<TechnicianTeams/>}/>

        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin/data-ont' element={<OntData/>}/>
        <Route path='/admin/tim' element={<Teknisi/>}/>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
