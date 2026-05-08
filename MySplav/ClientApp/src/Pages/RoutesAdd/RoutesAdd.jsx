import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import "./RoutesAdd.css";
import DialogAgree from '../../Shared/DialogAgree/DialogAgree';
import Header from './Modules/Header/Header';
import Loading from './Modules/Loading/Loading';
import Error from './Modules/Error/Error';
import RouteId from './Modules/RouteId/RouteId';
import RouteName from './Modules/RouteName/RouteName';
import RouteDescription from './Modules/RouteDescription/RouteDescription';
import RouteWaters from './Modules/RouteWaters/RouteWaters';
import ValidationError from './Modules/ValidationError/ValidationError';
import LowPanel from './Modules/LowPanel/LowPanel';

let intRouteId = 0;

const isEqual = (item1, item2) => {
    if (item1.id && item1.id == item2.id) {
        return true;
    }

    if (item1.internalId && item1.internalId == item2.internalId) {
        return true;
    }

    return false;
}

const getKey = (item) => {
    return item.id || item.internalId || `temp-${Date.now()}-${Math.random()}`;
}

function RoutesAdd() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isInitialMount = useRef(true);

    const [data, setData] = useState({
        id: 0,
        name: "",
        description: "",
        waters: []
    });

    const [blockButtonSubmit, setBlockButtonSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: name === 'id' ? parseInt(value) || 0 : value
        }));
    };

    const loadRouteData = async (id) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/Routes/Get?id=${id}`);
            if (!response.ok) {
                throw new Error('Ошибка загрузки данных');
            }
            const routeData = await response.json();

            if (routeData.id) {
                setData(routeData);
            }
        } catch (error) {
            console.error('Error loading route:', error);
            setError('Не удалось загрузить данные маршрута');
        } finally {
            setIsLoading(false);
            setBlockButtonSubmit(false);
        }
    };

    useEffect(() => {
        if (id) {
            loadRouteData(id);
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (blockButtonSubmit) return;

        setBlockButtonSubmit(true);
        setError(null);
        setIsLoading(true);

        try {
            let link = "/Routes/AddRoute";
            let method = 'POST';

            if (data.id !== 0) {
                link = "/Routes/ChangeRoute";
            }

            const response = await fetch(link, {
                method: method,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Ошибка сохранения данных');
            }

            const result = await response.json();

            if (result.id) {
                setData(result);
                if (data.id === 0) {
                    navigate(`/Routes/Change/${result.id}`, { replace: true });
                } else {
                    alert('Данные успешно сохранены!');
                }
            }
        } catch (error) {
            console.error('Error saving route:', error);
            setError('Не удалось сохранить данные. Пожалуйста, попробуйте еще раз.');
        } finally {
            setBlockButtonSubmit(false);
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/Routes/List');
    };

    const addWater = () => {
        setData(prevState => ({
            ...prevState,
            waters: [...prevState.waters, { id: 0, internalId: intRouteId++, name: "" }]
        }));
    }

    const deleteWater = (water) => {
        let newWaters = data.waters.filter(i => !isEqual(i, water));
        setData(prevState => ({
            ...prevState,
            waters: [...newWaters]
        }));
    }

    const changeWater = (water, value) => {
        let newWaters = data.waters.map(i => {
            if (isEqual(i, water)) {
                i.name = value
            }

            return i;
        });
        setData(prevState => ({
            ...prevState,
            waters: [...newWaters]
        }));
    }

    return (
        <div className="RoutesAdd-container">
            <div className="card shadow">
                <Header handleCancel={handleCancel} id={data.id} />

                <div className="card-body">
                    <Loading isLoading={isLoading} id={data.id} />
                    <Error error={error} />

                    <RouteId handleChange={handleChange} id={data.id} />
                    <RouteName isLoading={isLoading} handleChange={handleChange} name={data.name} />
                    <RouteDescription isLoading={isLoading} handleChange={handleChange} description={data.description} />

                    <RouteWaters
                        addWater={addWater}
                        waters={data.waters}
                        isLoading={isLoading}
                        getKey={getKey}
                        deleteWater={deleteWater}
                    />
                    <ValidationError error={error} />

                    <LowPanel
                        handleCancel={handleCancel}
                        handleSubmit={handleSubmit}
                        blockButtonSubmit={blockButtonSubmit}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
}

export default RoutesAdd;