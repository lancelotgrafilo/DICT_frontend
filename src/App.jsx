
import { Homepage } from './pages/HomePage/HomePage.jsx';
import { RequestForm } from './components/RequestForm/RequestForm.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RegionUserPage } from './pages/RegionUserPage/RegionUserPage.jsx'; 
import { AppProviders } from './utils/context/AppProviders.jsx';
import { Request } from "./components/Request/Request.jsx";
import { Activities } from './components/Activities/Activities.jsx';
import { TrainingPage } from './pages/TrainingPage/TrainingPage.jsx';
import { FocalDashboard } from './components/Users/Focal/Dashboard/FocalDashboard.jsx';

export default function App() {
  return (
    <AppProviders>
   
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="home" element={ <Homepage/> }></Route>
          <Route path="request-form" element={ <RequestForm/> }> </Route>
          
          <Route path="admin" element={<RegionUserPage />}>
            <Route path="dashboard" element={<FocalDashboard/>} />
            <Route path="request" element={<Request />} />
            <Route path="activities" element={<Activities/>} />
          </Route>

          <Route path="training" element={ <TrainingPage /> }>

          </Route>
          
        </Routes>
      </Router>

    </AppProviders>
    
  );
}
