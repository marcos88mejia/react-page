import { useEffect, useState } from "react"

function Carrito() {
  const [itemsCarrito, setItemsCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    leerDatosCarrito();
  }, [])

  const leerDatosCarrito = () => {
    let datosCarrito = JSON.parse(sessionStorage.getItem("carritocompras"));
    console.log(datosCarrito);
    setItemsCarrito(datosCarrito);
    calcularTotal(datosCarrito);
  }

  const calcularTotal = (datosCarrito) => {
    let suma = datosCarrito.reduce((acumulador, fila) => acumulador + fila["precio"] * fila["cantidad"], 0);
    setTotal(suma);
  }

  const dibujarTabla = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            itemsCarrito !== null
              ? itemsCarrito.map(item =>
                <tr key={item.idproducto}>
                  <td> {item.idproducto} </td>
                  <td> {item.nombre} </td>
                  <td> {item.precio} </td>
                  <td> {item.cantidad} </td>
                  <td> {item.precio * item.cantidad} </td>
                  <td><i className="bi bi-x-lg" onClick={() => EliminarItem(item)}></i></td>
                </tr>
              )
              : <></>
          }
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="4">Total</th>
            <th> {total} </th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    )
  }

  const EliminarItem = (item) => {
    let carritoMenos = itemsCarrito.filter(itemCart => itemCart.idproducto !== item.idproducto);
    setItemsCarrito(carritoMenos);
    sessionStorage.setItem("carritocompras", JSON.stringify(carritoMenos));
    if (datosCarrito !== null) {
      calcularTotal(carritoMenos);
    }

  }

  const vaciarCarrito = () => {
    sessionStorage.removeItem("carritocompras");
    setItemsCarrito([]);
    setTotal(0);
  }

  return (
    <section className="padded">
      <div className="container">
        <h2>Carrito de compras</h2>
        <div className="row">
          <div className="col-md-10">
            {dibujarTabla()}
          </div>
          <div className="col-md-2">
            <button className="btn btn-danger" onClick={() => vaciarCarrito()}>
              Vaciar carrito
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Carrito