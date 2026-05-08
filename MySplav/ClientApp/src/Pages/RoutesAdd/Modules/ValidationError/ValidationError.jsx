import React, { useEffect, useState, Fragment } from 'react';
import "./ValidationError.css";

export default function ValidationError({ error }) {
    return (
        <Fragment>
            {error && (
                <div className="alert alert-warning">
                    <i className="bi bi-info-circle me-2"></i>
                    Проверьте правильность введенных данных
                </div>
            )}
        </Fragment>
    );
}