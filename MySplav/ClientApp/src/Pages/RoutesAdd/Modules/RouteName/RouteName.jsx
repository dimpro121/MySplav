import React, { useEffect, useState, Fragment } from 'react';
import "./RouteName.css";

export default function RouteName({ handleChange, isLoading, name }) {
    return (
        <Fragment>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Название маршрута <span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={name}
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
        </Fragment>
    );
}