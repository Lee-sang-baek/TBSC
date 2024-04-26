import React from 'react';
import Header from './Components/Header/Header';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div>
                <Header />
            </div>
        </Router>
    );
}

export default App;
