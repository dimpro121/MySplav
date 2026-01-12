import { useParams, useNavigate  } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import "./RoutesAdd.css";

function RoutesAdd() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({
        id: 0,
        name: "",
        description: ""
    });


    const [blockButtonSubmit, setBlockButtonSubmit] = useState(false)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: name === 'id' ? parseInt(value) || 0 : value
        }));
    };

    const loadRouteData = (id) => {
        fetch(`/Routes/Get?id=${id}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            if (data.id) {
                setData(data)
            }
            setBlockButtonSubmit(false);
        })
        .catch(error => {
            setBlockButtonSubmit(false);
        });
    }

    useEffect(() => {
        if (id) {
            loadRouteData(id);
        }
    }, [id]);


    useEffect(() => {
        if (data.id != 0) {
            navigate(`/Routes/Change/${data.id}`);
        }
    }, [data]);

    const handleSubmit = (e) => {
        if (!blockButtonSubmit) {
            setBlockButtonSubmit(true);
            e.preventDefault();
            let link = "/Routes/AddRoute";

            if (data.id != 0) {
                link = "/Routes/ChangeRoute";
            }

            fetch(link, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.id) {
                    setData(data)
                }
                setBlockButtonSubmit(false);
            })
            .catch(error => {
                setBlockButtonSubmit(false);
            });
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow">
                <div className="card-header bg-main text-white">
                    <h2 className="mb-0">
                        {data.id == 0 && "Добавление маршрута"}
                        {data.id != 0 && "Изменение маршрута"}
                    </h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="Id" className="form-label">
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
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Название маршрута
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
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Description" className="form-label">
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
                            />
                            <div className="form-text">
                                Опишите детали маршрута, остановки, особенности
                            </div>
                        </div>

                        <div className="d-flex justify-content-between mt-4">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={blockButtonSubmit}
                            >
                                Опубликовать
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RoutesAdd;