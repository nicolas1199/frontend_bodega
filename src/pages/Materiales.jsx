import React, { useEffect, useState } from "react"
import Barra from "./partials/_navbar.jsx"
import axios from "axios";
import './general.css'
const Materiales = ()=>{
    const [data, setData] = useState('');

    useEffect(() => {
        axios.get('http://localhost:4000/api/loged/materiales')
            .then(res => {
                console.log(res);
                
                setData(res.data.materiales);
            }).catch(err => {
                console.error(err);
                
            })
    })
    return(
        <div>
            <Barra/><hr/>
            <div className="loged">
                <div className="tittle">
                    <h1>MATERIALES</h1>
                </div>

                <table id="tabla" className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Precio</th>
                            <th>Unidades Disponibles</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Precio</th>
                            <th>Unidades Disponibles</th>
                            <th>Acciones</th>
                        </tr>
                    </tfoot>


                </table>
            </div>
        </div>
    )
}

export default Materiales