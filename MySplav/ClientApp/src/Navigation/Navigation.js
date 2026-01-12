import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
    const location = useLocation();
    const isAddPage = location.pathname === '/Routes/Add' || location.pathname.includes('/Routes/Change');

    return (
        <div id="Navigation-block">
            <nav>
                {
                    !isAddPage &&
                    <Link to="/Routes/Add">
                        <button type="button" className="btn btn-primary">Добавить маршрут</button>
                    </Link>
                }

                {
                    isAddPage &&
                    <Link to="/Routes/List">
                        <button type="button" className="btn btn-secondary">Назад к списку</button>
                    </Link>
                }
            </nav>
        </div>
        
    );
}