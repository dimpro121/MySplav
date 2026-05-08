import React, { useEffect, useState, Fragment } from 'react';
import "./LowPanel.css";

export default function LowPanel({ handleCancel, handleSubmit, blockButtonSubmit, isLoading }) {
    return (
        <Fragment>
            <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleCancel}
                    disabled={blockButtonSubmit}
                >
                    Отмена
                </button>

                <div className="btn-group">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={blockButtonSubmit || isLoading}
                        onClick={handleSubmit}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Сохранение...
                            </>
                        ) : (
                            <>
                                <i className="bi bi-check-circle me-2"></i>
                                Опубликовать
                            </>
                        )}
                    </button>
                </div>
            </div>
        </Fragment>
    );
}