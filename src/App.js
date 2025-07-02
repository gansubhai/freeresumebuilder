import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Navbar from './component/nav/Navbar';
import HomePage from './component/nav/HomePage';
import CreateResumePage from './component/nav/CreateResumePage';
import AboutPage from './component/nav/AboutPage';
import Footer from './component/nav/Footer';
import './index.css';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-resume" element={<CreateResumePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;