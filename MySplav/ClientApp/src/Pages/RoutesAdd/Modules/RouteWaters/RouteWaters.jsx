import React, { useEffect, useState, Fragment } from 'react';
import "./RouteWaters.css";

export default function RouteWaters({ addWater, waters, isLoading, getKey, deleteWater }) {
    return (
        <Fragment>
            <div className="mb-3">
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={addWater}
                >
                    Добавить водоём
                </button>
                {
                    waters?.map(i => {
                        let isDisable = i.Id != 0 || i.Id != null ? true : false;
                        return (
                            <div className="RoutesAdd-input-container" key={getKey(i)}>
                                <input
                                    type="text"
                                    className="RoutesAdd-input"
                                    value={i.name ?? ""}
                                    onChange={(e) => changeWater(i, e.target.value)}
                                    placeholder="Введите название водоёма"
                                    required
                                    minLength="2"
                                    maxLength="100"
                                    disabled={isLoading || isDisable}
                                    name={getKey(i)}
                                />

                                <img
                                    src="/imgs/icons/trash.svg"
                                    className="RoutesAdd-input-container-delete"
                                    title="Удалить"
                                    onClick={() => deleteWater(i)}
                                />
                            </div>
                        )

                    })
                }
            </div>
        </Fragment>
    );
}