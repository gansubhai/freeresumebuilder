import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Navbar from './component/nav/Navbar';
import HomePage from './component/nav/HomePage';
import CreateResumePage from './component/nav/CreateResumePage';
import AboutPage from './component/nav/AboutPage';
import './index.css';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-resume" element={<CreateResumePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;