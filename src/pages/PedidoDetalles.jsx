import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ApiWebUrl, agregarCarrito } from "../utils";

function PedidoDetalles() {
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState([]);

    let params = useParams();
    console.log(params);
    useEffect(() => {
        leerPedidoSelecionado();
    }, [])

    const leerPedidoSelecionado = () => {
        const rutaServicio = ApiWebUrl + "pedidosdetalle.php?idpedido=" + params.idpedido;
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPedidoSeleccionado(data);
            })
    }

    const dibujarCuadriculaPedidos = () => {
        return (
            <div className="row row-cols-xl-5 row-cols-leg-4 row-cols-md-3 row-cols-2 g-4">

                {pedidoSeleccionado.map(item =>
                    <div className="col" key={item.idpedido}>
                        <div className="card text-center">
                            <img src={ApiWebUrl + item.imagenchica} class="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{item.idproducto} - {item.nombre} </h5>
                                <p className="card-text"> {item.detalle} </p>
                                <p className="card-text"> {item.cantidad}  {item.cantidad > 1 ? "unidades" : "unidad"}  </p>
                                <p className="card-text"> <b>S/. {parseFloat(item.precio).toFixed(2)}</b></p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <section className="padded">
            <div className="container">
                <h2>Detalle del Pedido</h2>
                {dibujarCuadriculaPedidos()}
            </div>
        </section>
    )
}

export default PedidoDetalles