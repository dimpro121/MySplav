import React, { useEffect, useState, Fragment } from 'react';
import "./RouteCountry.css";

const CONST_DEFAULT_COUNTRY = "Россия";

export default function RouteCountry({ handleChange, country, region }) {
    return (
        <div className="mb-3">
            <span className="RouteCountry-container">
                <label htmlFor="Country" className="form-label">
                    Страна
                </label>
                <input
                    type="text"
                    className="form-control Route-country"
                    id="country"
                    name="country"
                    value={country ?? CONST_DEFAULT_COUNTRY}
                    onChange={handleChange}
                    placeholder="Страна"
                    required
                    minLength="2"
                    maxLength="100"
                />
            </span>
            <span className="RouteCountry-container">
                <span>
                    <label htmlFor="Country" className="form-label">
                        Регион
                    </label>
                    <input
                        type="text"
                        className="form-control Route-region"
                        id="region"
                        name="region"
                        value={region ?? ""}
                        onChange={handleChange}
                        placeholder="Регион"
                        required
                        minLength="2"
                        maxLength="100"
                    />
                </span>
            </span>
        </div>
    );
}