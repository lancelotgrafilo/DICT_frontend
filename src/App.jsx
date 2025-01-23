// Import necessary components
import { RegionUserPage } from './pages/RegionUserPage/RegionUserPage.jsx';
import { AppProviders } from './utils/context/AppProviders.jsx';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

export default function App() {
  return (
    <AppProviders>
      <Router>
        <Routes>
          {/* Correct usage of the element prop */}
          <Route path="/" element={<RegionUserPage />} />

          {/* Add components for these routes or leave as placeholders */}
          <Route path="/request" element={<div>Request Page</div>} />
          <Route path="/activities" element={<div>Activities Page</div>} />
          <Route path="/modules" element={<div>Modules Page</div>} />
          <Route path="/settings" element={<div>Settings Page</div>} />

          {/* Add a fallback route for unmatched paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AppProviders>
  );
}
