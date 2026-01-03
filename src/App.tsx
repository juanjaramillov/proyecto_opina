import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import Profile from './pages/Profile';
import Methodology from './pages/Methodology';
import Monetization from './pages/Monetization';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import FAQ from './pages/FAQ';
import Cookies from './pages/Cookies';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';
import LivePulse from './pages/LivePulse';
import Surveys from './pages/Surveys';
import Battles from './pages/Battles';




const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/live-pulse" element={<LivePulse />} />
                <Route path="/surveys" element={<Surveys />} />
                <Route path="/battles" element={<Battles />} />
                <Route path="/results" element={<Results />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/methodology" element={<Methodology />} />
                <Route path="/monetization" element={<Monetization />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
