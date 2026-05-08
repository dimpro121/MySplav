import React, { useEffect, useState, Fragment } from 'react';
import "./RouteId.css";

export default function RouteId({ handleChange, id }) {
    return (
        <Fragment>
            <div className="mb-3">
                <label htmlFor="id" className="form-label">
                    ID маршрута
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="id"
                    name="id"
                    value={id}
                    disabled
                    onChange={handleChange}
                    min="0"
                    required
                />
                <div className="form-text">
                    {id === 0
                        ? "ID будет автоматически присвоен при создании"
                        : "ID маршрута нельзя изменить"}
                </div>
            </div>
        </Fragment>
    );
}