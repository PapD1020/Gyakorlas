import React, { useEffect, useState } from 'react'
import { NavLink} from 'react-router-dom';

export default function Kategoriak() {

    const [Kategoriak, setKategoriak] = useState([]);

    useEffect(() => {
        Refresh();
    }, []);

    function Refresh(){
        fetch("https://localhost:7082/api/kategoriak").then((res) => res.json()).then((Kategoriak) => setKategoriak(Kategoriak))
    }

    function Torles(id){
        fetch("https://localhost:7082/api/kategoriak/" + id, {
                            method: "DELETE",
                            headers: {
                                'Accept': 'application/json, text/plain',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                id: id,
                            }),
                        })
                            .then(() => {
                                Refresh();
                            })
    };

  return (
    <div>
        <h1>Kategóriák</h1>
        <div className='card'>
            {Kategoriak.map((val) => (
                <div>
                    <h4>{val.megnevezes}</h4>
                    <h3>{val.leiras}</h3>
                    <img src={"./images/" + val.kepek} alt="kep"></img>
                    <div>
                        <NavLink key={val.id} to={"/Modositas.js/" + val.id}>
                            <button>Módosítás</button>
                        </NavLink>
                        <button onClick={() => {Torles(val.id);}}>Törlés</button>
                    </div>
                </div>
            ))}
        </div>
    </div>

  )
}
