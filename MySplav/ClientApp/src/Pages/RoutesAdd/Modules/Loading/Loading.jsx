import React, { useEffect, useState, Fragment } from 'react';
import "./Loading.css";

export default function Loading({ isLoading, id }) {
    return (
        <Fragment>
            {isLoading && id !== 0 && (
                <div className="text-center py-3">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </div>
                </div>
            )}
        </Fragment>
    );
}