
// import { TrainingPage } from './pages/TrainingPage/TrainingPage.jsx'
// import { SignUpPage } from './pages/SignUpPage/SignUpPage.jsx' 
// import { LoginPage } from "./pages/LoginPage/LoginPage.jsx"
// import { Sidebar } from './components/Sidebar/Sidebar.jsx'
import { RegionUserPage } from './pages/RegionUserPage/RegionUserPage.jsx'
import { AppProviders } from './utils/context/AppProviders.jsx'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

export default function App() {
  return (
    
      <AppProviders>
        <Router>
          <RegionUserPage/>

          {/* <TrainingPage /> */}

          {/*       
          <Sidebar/>
          <LoginPage/>
          <SignUpPage /> */}
        </Router>
        
      </AppProviders>

      

      
    
  )
  
}
