import "./Productos.css";
import { useEffect, useState } from "react"
import { ApiWebUrl, agregarCarrito } from "../utils";
import noImage from "./../assets/images/no-image.svg";
import { Link } from "react-router-dom";

function Productos(props) {
    // console.log(props);
    const [listaProductos, setListaProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState([]);
    useEffect(() => {
        leerServicio(props.categoriaProductos);
    }, [props.categoriaProductos])

    const leerServicio = (idcategoria) => {
        const rutaServicio = ApiWebUrl + "productos.php?idcategoria=" + idcategoria;
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setListaProductos(data);
            })
    }

    const LeerProductoSeleccionado = (idproducto) => {
        const rutaServicio = ApiWebUrl + "productos.php?idproducto=" + idproducto;
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data[0]);
                setProductoSeleccionado(data[0]);
            })
    }

    const dibujarCuadricula = () => {
        return (
            <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-2 g-4">

                {listaProductos.map(item =>
                    <div className="col" key={item.idProducto}>
                        <div className="card h-100">
                            <figure className="image-content">

                                <Link to={"/productodetalles/" + item.idproducto}>
                                    <img src={item.imagenchica === null
                                        ? noImage
                                        : ApiWebUrl + item.imagenchica} class="card-img-top" alt="..." />
                                </Link>

                                {
                                    item.preciorebajado !== "0"
                                        ? <div className="porcentaje-descuento"> {((item.preciorebajado / item.precio - 1) * 100).toFixed(0) + "%"}</div>
                                        : ""
                                }

                                <i className="bi bi-eye vista-rapida"
                                    onClick={() => LeerProductoSeleccionado(item.idproducto)}
                                    data-bs-toggle="modal" data-bs-target="#VistaRapidaModal"></i>
                            </figure>
                            <div className="card-body">
                                <h5 className="card-title text-center">{item.nombre} </h5>
                                <p className="card-text">
                                    S/.
                                    {item.preciorebajado === "0"
                                        ? parseFloat(item.precio).toFixed(2)
                                        : parseFloat(item.preciorebajado).toFixed(2)
                                    }
                                    <span className="precio-lista">
                                        {
                                            item.preciorebajado === "0"
                                                ? ""
                                                : "(S/." + parseFloat(item.precio).toFixed(2) + ")"
                                        }
                                    </span>

                                    <i className="bi bi-basket" title="Añadir al carrito" onClick={() => agregarCarrito(item) }></i>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    const dibujarVistaRapida = () => {
        return (
            <div className="modal fade" id="VistaRapidaModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel"> {productoSeleccionado.nombre} </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <img src={productoSeleccionado.imagengrande === null
                                        ? noImage
                                        : ApiWebUrl + productoSeleccionado.imagengrande}
                                        class="card-img-top" alt="..." />
                                </div>
                                <div className="col-md-6">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <th>Detalle</th>
                                                <td> {productoSeleccionado.detalle} </td>
                                            </tr>
                                            <tr>
                                                <th>Precio</th>
                                                <td>S/.
                                                    {productoSeleccionado.preciorebajado === "0"
                                                        ? parseFloat(productoSeleccionado.precio).toFixed(2)
                                                        : parseFloat(productoSeleccionado.preciorebajado).toFixed(2)
                                                    }
                                                    <span className="precio-lista">
                                                        {
                                                            productoSeleccionado.preciorebajado === "0"
                                                                ? ""
                                                                : "(S/." + parseFloat(productoSeleccionado.precio).toFixed(2) + ")"
                                                        }
                                                    </span></td>
                                            </tr>
                                            <tr>
                                                <th>Categoria</th>
                                                <td> {productoSeleccionado.categoria} </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                onClick={()=> agregarCarrito(productoSeleccionado)}>Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {dibujarCuadricula()}
            {dibujarVistaRapida()}
        </>


    )


}

export default Productos