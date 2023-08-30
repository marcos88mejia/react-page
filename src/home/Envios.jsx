import { useEffect, useState } from "react"
import { ApiWebUrl } from "../utils";

function Envios() {
    const [listaEmpresas, setListaEmpresas] = useState([]);
    useEffect(() => {
        leerServicio();
    }, [])

    //function y const es igual
    const leerServicio = () => {
        const rutaServicio = ApiWebUrl + "servicioenvios.php";
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setListaEmpresas(data);
            })
    }

    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Empresa</th>
                        <th>Teléfono</th>
                        <th>Latitud</th>
                        <th>Longitud</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaEmpresas.map(item =>
                            <tr key={item.idempresaenvio}>
                                <td> {item.idempresaenvio} </td>
                                <td> {item.nombre} </td>
                                <td> {item.telefono} </td>
                                <td> {item.latitud} </td>
                                <td> {item.longitud} </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
        )
    }

    return (
        <section className='padded'>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h2>Envios</h2>
                        {dibujarTabla()}
                    </div>
                    <div className="col-md-9">

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Envios