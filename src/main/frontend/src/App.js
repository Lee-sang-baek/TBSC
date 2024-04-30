import React from 'react';
import {Routes, Route, BrowserRouter } from 'react-router-dom';
import  NoticeList from './Components/CommonBoard/NoticeList';
import NoticeDetail from "./Components/CommonBoard/NoticeDetail";
import CreateNotice from "./Components/CommonBoard/CreateNotice";
import {createRoot} from "react-dom/client";
function App() {
    const container = document.getElementById('root');
    const root = createRoot(container); // createRoot(container!) if you use TypeScript
    return (
        <BrowserRouter>
            <Routes>
                <Route path="notices" element={<NoticeList />} />
                <Route path="notices/:num" element={<NoticeDetail />} />
                <Route path="notices/new" element={<CreateNotice />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
