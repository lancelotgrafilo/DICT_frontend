
import { Homepage } from './pages/HomePage/HomePage.jsx';
import { RequestForm } from './components/RequestForm/RequestForm.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RegionUserPage } from './pages/RegionUserPage/RegionUserPage.jsx'; 
import { AppProviders } from './utils/context/AppProviders.jsx';
import { Request } from "./components/Request/Request.jsx";

export default function App() {
  return (
    <AppProviders>
   
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="home" element={ <Homepage/> }></Route>
          <Route path="request-form" element={ <RequestForm/> }> </Route>
          
          <Route path="admin" element={<RegionUserPage />}>
            <Route path="request" element={<Request />} />
          </Route>
          
        </Routes>
      </Router>

    </AppProviders>
    
  );
}
