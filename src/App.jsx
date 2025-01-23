// Import necessary components
import { RegionUserPage } from './pages/RegionUserPage/RegionUserPage.jsx';
import { RegionDashboard } from './components/RegionUserDashboard/RegionDashboard.jsx';
import { AppProviders } from './utils/context/AppProviders.jsx';
import { Modules } from './components/Modules/Modules.jsx';
import { Request } from './components/Request/Request.jsx';
import { Activities } from './components/Activities/Activities.jsx';
import { Settings } from './components/Settings/Settings.jsx';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

export default function App() {
  return (
    <AppProviders>
      <Router>
        <Routes>
          <Route path="/" element={<RegionUserPage />}>
            <Route path="dashboard" element={<RegionDashboard />} />
            <Route path="request" element={<Request />} />
            <Route path="activities" element={<Activities />} />
            <Route path="modules" element={<Modules />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AppProviders>
  );
}
