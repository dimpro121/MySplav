import React, { useEffect, useState, Fragment } from 'react';
import "./RouteDescription.css";

export default function RouteDescription({ handleChange, isLoading, description }) {
    return (
        <Fragment>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Краткое описание маршрута
                </label>
                <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Введите описание маршрута"
                    maxLength="500"
                    disabled={isLoading}
                />
                <div className="form-text d-flex justify-content-between">
                    <span>Опишите детали маршрута, остановки, особенности</span>
                    <span>{description.length}/500</span>
                </div>
            </div>
        </Fragment>
    );
}