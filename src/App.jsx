
import { Homepage } from './pages/HomePage/HomePage.jsx';
import { RequestForm } from './components/RequestForm/RequestForm.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

export default function App() {
  return (
   
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="home" element={ <Homepage/> }></Route>
          <Route path="request-form" element={ <RequestForm/> }> </Route>
        </Routes>
      </Router>
    
  );
}
