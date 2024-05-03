import React from 'react';
import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar';
import Footer from './Components/Footer/Footer';


import { BrowserRouter as Router } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Footer />
                <Sidebar />


            </div>
        </Router>
    );
}

export default App;
