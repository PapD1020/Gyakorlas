import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Uj() {

    const navigate = useNavigate();

    return (
        <div>
            <h1>Új</h1>
            <form onSubmit={(e) => {
                        e.persist();
                        e.preventDefault();
    
                        fetch("https://localhost:7082/api/ujkategoriak/", {
                            method: "POST",
                            headers: {
                                'Accept': 'application/json, text/plain',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                id: 0,
                                megnevezes: e.target.elements.name.value,
                                leiras: e.target.elements.description.value,
                                kepek: e.target.elements.pictures.value,
                            }),
                        })
                            .then(() => {
                                navigate("/");
                            })
                    }}>
    
                    <div className='card'>
                            <div>
                                <input type="text" placeholder='Termékneve' id="name"/>
                                <input type="text" placeholder='Leírás' id="description"/>
                                <input type="text" placeholder='Útvonal' id="pictures"/>
                                <div>
                                    <button type='submit'>Hozzáadás</button>
                                </div>
                            </div>
                    </div>
                </form>
            </div>
      )
}
