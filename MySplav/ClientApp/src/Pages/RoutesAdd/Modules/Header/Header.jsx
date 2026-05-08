import React, { useEffect, useState, Fragment } from 'react';
import "./Header.css";

export default function Header({ handleCancel, id }) {
    return (
        <Fragment>
            <div className="card-header bg-main text-white d-flex justify-content-between align-items-center">
                <h2 className="mb-0">
                    {id == 0 ? "Добавление маршрута" : "Изменение маршрута"}
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
        </Fragment>
    );
}