import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
    const location = useLocation();
    const isAddPage = location.pathname === '/Routes/Add';

    return (
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
    );
}