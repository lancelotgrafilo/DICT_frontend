
import { Homepage } from './pages/HomePage/HomePage.jsx';
import { RequestForm } from './components/RequestForm/RequestForm.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RegionUserPage } from './pages/RegionUserPage/RegionUserPage.jsx'; 
import { AppProviders } from './utils/context/AppProviders.jsx';
import { Request } from "./components/Request/Request.jsx";
import { Activities } from './components/Activities/Activities.jsx';
import { TrainingPage } from './pages/TrainingPage/TrainingPage.jsx';
import { FocalDashboard } from './components/Users/Focal/Dashboard/FocalDashboard.jsx';
import { ModulesList } from './components/ModulesList/ModulesList.jsx';
import { Settings } from './components/Settings/Settings.jsx';
import { History } from './components/Users/Focal/History/History.jsx';
import { SuperAdminPage } from './pages/SuperAdminPage/SuperAdminPage.jsx';
import { FocalForm } from './components/FocalForm/FocalForm.jsx';
import { LoginPage } from './pages/LoginPage/LoginPage.jsx';
import { SignUpPage } from './pages/SignUpPage/SignUpPage.jsx';

export default function App() {
  return (
    <AppProviders>
   
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="home" element={ <Homepage/> }></Route>
          <Route path="request-form" element={ <RequestForm/> }> </Route>
          
          <Route path="admin" element={<RegionUserPage />}>
            <Route index element={<FocalDashboard />} /> {/* Default route */}
            <Route path="dashboard" element={<FocalDashboard />} />
            <Route path="request" element={<Request />} />
            <Route path="activities" element={<Activities />} />
            <Route path='modules-lists' element={<ModulesList/>} />
            <Route path='history' element={<History/>} />
            <Route path='settings' element={<Settings/>} /> 
          </Route>

          <Route path="super-admin" element={<SuperAdminPage/>}>
            <Route index element={<FocalDashboard />} /> {/* Default route */}
            <Route path="dashboard" element={<FocalDashboard />} />
            <Route path="request" element={<Request />} />
            <Route path="activities" element={<Activities />} />
            <Route path="focal-form" element={ <FocalForm/>} />
            <Route path='modules-lists' element={<ModulesList/>} />
            <Route path='history' element={<History/>} />
            <Route path='settings' element={<Settings/>} /> 
          </Route>


          <Route path="training" element={ <TrainingPage /> } />
          <Route path="login" element={<LoginPage/>} />
          <Route path="sign-up" element={<SignUpPage/>} />
          <Route path="focal-form" element={ <FocalForm/>} />

          
        </Routes>
      </Router>

    </AppProviders>
    
  );
}
