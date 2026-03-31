import React, { useEffect, useState } from 'react';
import "./RouteList.css";
import ItemInList from './Components/ItemInList/ItemInList';
import DialogAgree from '../../Shared/DialogAgree/DialogAgree';

function RouteList() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
    const [idForDelete, setIdForDelete] = useState(0);

    const onDelete = (item) => {
        setIdForDelete(item.id);
        setIsDialogDeleteOpen(true);
    }

    const handleConfirmDelete = () => {
        fetch(`/Routes/Delete/` + idForDelete)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка загрузки данных');
                }
                return response.json();
            })
            .then(data => {
                updateList();
            })
            .catch(error => {
                setError('Не удалось удалить объект');
            })
            .finally(() => {
            });

        setIsDialogDeleteOpen(false);
    };

    const handleCancelDelete = () => {
        setIsDialogDeleteOpen(false);
    };

    const filterData = (term) => {
        if (!term.trim()) {
            setFilteredData(data);
            return;
        }

        const lowercasedTerm = term.toLowerCase();
        const filtered = data.filter(item => {
            const nameMatch = item.name?.toLowerCase().includes(lowercasedTerm) || false;
            const descriptionMatch = item.description?.toLowerCase().includes(lowercasedTerm) || false;
            return nameMatch || descriptionMatch;
        });

        setFilteredData(filtered);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        filterData(value);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setFilteredData(data);
    };

    const updateList = () => {
        setIsLoading(true);
        setError(null);

        fetch(`/Routes/GetList`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка загрузки данных');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setFilteredData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Не удалось загрузить список маршрутов');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        updateList();
    }, []);

    return (
        <div className="RouteList">
            <div className="RouteList-header">
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2 className="mb-0">
                            <i className="bi bi-signpost-split me-2"></i>
                            Список маршрутов
                        </h2>
                        <span className="badge bg-main">
                            Всего: {filteredData.length}
                        </span>
                    </div>

                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>
                                <input
                                    type="text"
                                    id=""
                                    className="form-control"
                                    placeholder="Поиск"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                {searchTerm && (
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        onClick={handleClearSearch}
                                        title="Очистить поиск"
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isLoading && (
                <div>
                    <div>
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </div>
                            <p className="mt-3">Загрузка маршрутов...</p>
                        </div>
                    </div>
                </div>
            )}

            {error && !isLoading && (
                <div>
                    <div>
                        <div className="alert alert-danger" role="alert">
                            <i className="bi bi-exclamation-triangle me-2"></i>
                            {error}
                            <button
                                className="btn btn-sm btn-outline-danger ms-3"
                                onClick={() => window.location.reload()}
                            >
                                <i className="bi bi-arrow-clockwise me-1"></i>
                                Повторить
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!isLoading && !error && data.length === 0 && (
                <div>
                    <div>
                        <div className="card text-center py-5">
                            <div className="card-body">
                                <i className="bi bi-signpost text-muted" style={{ fontSize: '3rem' }}></i>
                                <h5 className="card-title mt-3">Маршруты не найдены</h5>
                                <p className="card-text">Добавьте первый маршрут для начала работы</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!isLoading && !error && data.length > 0 && filteredData.length === 0 && (
                <div>
                    <div>
                        <div className="alert alert-warning" role="alert">
                            <i className="bi bi-search me-2"></i>
                            По запросу "{searchTerm}" ничего не найдено
                            <button
                                className="btn btn-sm btn-outline-warning ms-3"
                                onClick={handleClearSearch}
                            >
                                <i className="bi bi-arrow-counterclockwise me-1"></i>
                                Сбросить поиск
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!isLoading && !error && filteredData.length > 0 && (
                <div>
                    <div>
                        <div className="list-group">
                            {filteredData.map(item => (
                                <ItemInList
                                    key={item.id}
                                    item={item}
                                    onDelete={onDelete}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <DialogAgree
                isOpen={isDialogDeleteOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />

            {!isLoading && !error && filteredData.length > 0 && (
                <div className="mt-4">
                    <div>
                        <div className="d-flex justify-content-between align-items-center text-muted">
                            <small>
                                Показано {filteredData.length} из {data.length} маршрутов
                            </small>
                            {searchTerm && (
                                <small>
                                    Результаты поиска по: "{searchTerm}"
                                </small>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RouteList;