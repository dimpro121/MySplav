import React, { useEffect, useState, Fragment } from 'react';
import "./Error.css";

export default function Error({ error }) {
    return (
        <Fragment>
            {error && (
                <div className="alert alert-danger" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                </div>
            )}
        </Fragment>
    );
}