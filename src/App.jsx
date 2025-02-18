
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
import { FocalList } from './components/FocalList/FocalList.jsx';
import { Divisions } from './components/Divisions/Divisions.jsx';
import { Cie } from './components/CIE/Cie.jsx';
import { Cpcb } from './components/CIE-Division/CPCB/Cpcb.jsx';
import { Ecm } from './components/CIE-Division/ECM/Ecm.jsx';
import { Pprd } from './components/CIE-Division/PPRD/Pprd.jsx';
import { Tec } from './components/CIE-Division/TEC/Tec.jsx';

export default function App() {
  return (
    <AppProviders>
   
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="home" element={ <Homepage/> }></Route>
          <Route path="request-form" element={ <RequestForm/> }> </Route>
          <Route path="divisions" element={ <Divisions/> } /> 
          
          <Route path="divisions/cie" element={ <Cie/> }/>
          <Route path="divisions/cie/cpcb" element={ <Cpcb/> }/>
          <Route path="divisions/cie/ecm" element={ <Ecm/> }/>
          <Route path="divisions/cie/pprd" element={ <Pprd/> }/>
          <Route path="divisions/cie/tec" element={ <Tec/> }/>
          
          
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
            <Route path='modules-lists' element={<ModulesList/>} />
            <Route path='history' element={<History/>} />
            <Route path='settings' element={<Settings/>} />
            <Route path='focal-list' element={<FocalList/>} />
            <Route path="focal-form" element={ <FocalForm/>} />
          </Route>


          <Route path="training" element={ <TrainingPage /> } />
          <Route path="login" element={<LoginPage/>} />
          <Route path="sign-up" element={<SignUpPage/>} />

          
        </Routes>
      </Router>

    </AppProviders>
    
  );
}
