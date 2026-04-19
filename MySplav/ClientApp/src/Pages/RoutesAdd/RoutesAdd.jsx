import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import "./RoutesAdd.css";
import DialogAgree from '../../Shared/DialogAgree/DialogAgree';

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
                <div className="card-header bg-main text-white d-flex justify-content-between align-items-center">
                    <h2 className="mb-0">
                        {data.id == 0 ? "Добавление маршрута" : "Изменение маршрута"}
                    </h2>
                    <button
                        type="button"
                        className="btn btn-light btn-sm RoutesAdd-button-back"
                        onClick={handleCancel}
                    >
                        <i className="bi bi-arrow-left me-1"></i>
                        К списку
                    </button>
                </div>

                <div className="card-body">
                    {isLoading && data.id !== 0 && (
                        <div className="text-center py-3">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="alert alert-danger" role="alert">
                            <i className="bi bi-exclamation-triangle me-2"></i>
                            {error}
                        </div>
                    )}

                    <div className="mb-3">
                        <label htmlFor="id" className="form-label">
                            ID маршрута
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="id"
                            name="id"
                            value={data.id}
                            disabled
                            onChange={handleChange}
                            min="0"
                            required
                        />
                        <div className="form-text">
                            {data.id === 0
                                ? "ID будет автоматически присвоен при создании"
                                : "ID маршрута нельзя изменить"}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Название маршрута <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            placeholder="Введите название маршрута"
                            required
                            minLength="2"
                            maxLength="100"
                            disabled={isLoading}
                        />
                        <div className="form-text">
                            Минимум 2 символа, максимум 100 символов
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Краткое описание маршрута
                        </label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Введите описание маршрута"
                            maxLength="500"
                            disabled={isLoading}
                        />
                        <div className="form-text d-flex justify-content-between">
                            <span>Опишите детали маршрута, остановки, особенности</span>
                            <span>{data.description.length}/500</span>
                        </div>
                    </div>

                    <div className="mb-3">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={addWater}
                        >
                            Добавить водоём
                        </button>
                        {
                            data.waters?.map(i => {
                                let isDisable = i.Id != 0 || i.Id != null ? true : false;
                                return (
                                    <div className="RoutesAdd-input-container" key={getKey(i)}>
                                        <input
                                            type="text"
                                            className="RoutesAdd-input"
                                            value={i.name ?? ""}
                                            onChange={(e) => changeWater(i, e.target.value)}
                                            placeholder="Введите название водоёма"
                                            required
                                            minLength="2"
                                            maxLength="100"
                                            disabled={isLoading || isDisable}
                                            name={getKey(i)}
                                        />

                                        <img
                                            src="/imgs/icons/trash.svg"
                                            className="RoutesAdd-input-container-delete"
                                            title="Удалить"
                                            onClick={() => deleteWater(i)}
                                        />
                                    </div>
                                )
                                    
                            })
                        }
                    </div>

                    {error && (
                        <div className="alert alert-warning">
                            <i className="bi bi-info-circle me-2"></i>
                            Проверьте правильность введенных данных
                        </div>
                    )}

                    <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={handleCancel}
                            disabled={blockButtonSubmit}
                        >
                            Отмена
                        </button>

                        <div className="btn-group">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={blockButtonSubmit || isLoading}
                                onClick={handleSubmit}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Сохранение...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-check-circle me-2"></i>
                                        Опубликовать
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoutesAdd;