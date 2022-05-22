import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Modositas(props) {

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`https://localhost:7082/api/kategoriak/${id}`);
                const kategoria = await res.json();
                document.getElementById("name").value = kategoria.megnevezes;
                document.getElementById("description").value = kategoria.leiras;
                document.getElementById("pictures").value = kategoria.kepek;
            }
            catch (err) {
                console.log(err);
            }
        })();
    }, [id]);

  return (
    <div>
        <h1>Módosítás</h1>
        <h1>{id}</h1>
        <form onSubmit={(e) => {
                    e.persist();
                    e.preventDefault();

                    fetch("https://localhost:7082/api/kategoriak/" + id, {
                        method: "PUT",
                        headers: {
                            'Accept': 'application/json, text/plain',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id:id,
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
                            <input type="text" id="name"/>
                            <input type="text" id="description"/>
                            <input type="text" id="pictures"/>
                            <div>
                                <button type='submit'>Módosítás</button>
                            </div>
                        </div>
                </div>
            </form>
        </div>
  )
}
