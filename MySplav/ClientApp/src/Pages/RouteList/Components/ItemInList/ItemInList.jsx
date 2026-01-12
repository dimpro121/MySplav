import React from 'react';
import "./ItemInList.css";
import { useNavigate } from 'react-router-dom';

export default function ItemInList({ item, onEdit, onDelete }) {
    const navigate = useNavigate();
    return (
        <div className="list-group-item list-group-item-action" >
            <div className="d-flex w-100 justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ width: '40px', height: '40px' }}>
                        <span className="fw-bold">{item.id}</span>
                    </div>
                    <div>
                        <h6 className="mb-0 fw-bold">{item.name || "Без названия"}</h6>
                        <p className="mb-0 text-muted small">
                            {item.description || "Описание отсутствует"}
                        </p>
                    </div>
                </div>

                <div className="btn-group btn-group-sm">
                    {onEdit && (
                        <img src="/imgs/icons/pencil.svg"
                            className="btn btn-outline-primary"
                            onClick={() => { navigate(`/Routes/Change/${item.id}`) }}
                            title="Изменить"
                        />
                    )}
                    {onDelete && (
                            <img src="/imgs/icons/trash.svg" 
                                className="btn btn-outline-danger"
                                onClick={() => onDelete(item)} 
                                title="Удалить"
                            />
                    )}
                </div>
            </div>
        </div>
    );
}