import React, {  useEffect, useState } from 'react';
import "./RouteList.css";
import ItemInList from './Components/ItemInList/ItemInList';

function RouteList() {
    const [data, setData] = useState();

    const onDelete = () => { }
    const onEdit = () => { }
    const onView = () => { }

    useEffect(() => {
        fetch(`/Routes/GetList`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setData(data)
            })
            .catch(error => {
            });
    }, []);

    return (
        <div>
            {data?.map(i => {
                return (
                    <ItemInList
                        key={i.id}
                        item={i}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onView={onView}
                    />
                )
            })}
        </div>
    );
}

export default RouteList;