import { useEffect, useState } from "react"
import { ApiWebUrl } from "../utils";

function Seleccionados() {
    const [itemsEmpleados, setItemsEmpleados] = useState([]);
    //const [total, setTotal] = useState(0);
    useEffect(() => {
        leerSeleccionEmpleados();
    }, [])

    const leerSeleccionEmpleados = () => {
        let datoEmpleado = JSON.parse(sessionStorage.getItem("seleccionempleado"));
        console.log(datoEmpleado);
        setItemsEmpleados(datoEmpleado);
    }

    const dibujarTablaEmpleadoSel = () => {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Empleado</th>
                        <th>Cargo</th>
                        <th>Fecha Contratacion</th>
                        <th>Ciudad</th>
                        <th>Direccion</th>
                        <th>Usuario</th>
                        <th>Foto</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        itemsEmpleados !== null
                            ? itemsEmpleados.map(item =>
                                <tr key={item.idempleado} className="seleccion-alineada">
                                    <td> {item.idempleado} </td>
                                    <td> {item.nombres} {item.apellidos} </td>
                                    <td> {item.cargo} </td>
                                    <td> {item.fechacontratacion.substring(8, 10) + "/" + item.fechacontratacion.substring(5, 7) + "/" + item.fechacontratacion.substring(0, 4)} </td>
                                    <td> {item.ciudad} </td>
                                    <td> {item.direccion} </td>
                                    <td> {item.usuario} </td>
                                    <td> <img src={ApiWebUrl + "fotos/" + item.foto} className="foto-empleado" alt="..." /> </td>
                                    <td><i className="bi bi-trash eliminar" onClick={() => EliminarItem(item)}></i></td>
                                </tr>
                            )
                            : <></>
                    }
                </tbody>
                {/* <tfoot>
                    <tr>
                        <th colSpan="4">Total</th>
                        <th> {setItemsEmpleados.length +1} </th>
                        <th></th>
                    </tr>
                </tfoot> */}
            </table>
        )
    }

    const LimpiarSeleccion = () => {
        sessionStorage.removeItem("seleccionempleado");
        setItemsEmpleados([]);
    }

    const EliminarItem = (item) => {
        let empMenos = itemsEmpleados.filter(itemEmp => itemEmp.idempleado !== item.idempleado);
        setItemsEmpleados(empMenos);
        sessionStorage.setItem("seleccionempleado", JSON.stringify(empMenos));
    }

    return (
        <section className="padded">
            <div className="container">
                <h2>Empleados seleccionados</h2>
                <div className="row">
                    <div className="col-md-10">
                        {dibujarTablaEmpleadoSel()}
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-danger" onClick={() => LimpiarSeleccion()}>
                            Limpiar seleccion
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Seleccionados