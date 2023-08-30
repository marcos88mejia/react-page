import { useEffect, useState } from "react"
import { ApiWebUrl } from "../utils";
import { Link } from "react-router-dom";

function Pedidos() {
    const [listaPedidos, setListaPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        leerServicio();
    }, [])

    const leerServicio = () => {
        const rutaServicio = ApiWebUrl + "pedidos.php";
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setListaPedidos(data);
                setCargando(false);
            })
    }

    const dibujarTablaPedidos = () => {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Fecha Pedido</th>
                        <th>Usuario</th>
                        <th>Cliente</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaPedidos.map(item =>
                            <tr key={item.idpedido} >
                                <Link to={"/pedidodetalles/" + item.idpedido}>
                                    <td> {item.idpedido} </td>
                                </Link>
                                <td> {item.fechapedido.substring(8, 10) + "/" + item.fechapedido.substring(5, 7) + "/" + item.fechapedido.substring(0, 4)} </td>
                                <td> {item.usuario} </td>
                                <td> {item.nombres} </td>
                                <td> {parseFloat(item.total).toFixed(2)} </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        )
    }

    const dibujarPreCarga = () => {
        return (
            <div className="lds-hourglass"></div>
        )
    }

    return (
        <section className="padded">
            <div className="container">
                <h2>Pedidos</h2><br />
                {cargando ? dibujarPreCarga() : dibujarTablaPedidos()}

            </div>
        </section>
    )
}

export default Pedidos