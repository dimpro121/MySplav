import React from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RoutesList from './Pages/RouteList/RouteList';
import RoutesAdd from './Pages/RoutesAdd/RoutesAdd';
import Navigation from './Navigation/Navigation';

function App() {
    return (
        <BrowserRouter>
            <Navigation/>

            <Routes>
                <Route path="/Routes/List" element={<RoutesList />} />
                <Route path="/Routes/Add" element={<RoutesAdd />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;