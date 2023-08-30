import { useEffect, useState } from "react"
import { ApiWebUrl } from "../utils";

function Empleados() {
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    leerServicio();
  }, [])

  const leerServicio = () => {
    const rutaServicio = ApiWebUrl + "servicioempleados.php";
    fetch(rutaServicio)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setListaEmpleados(data);
        setCargando(false);
      })
  }

  const dibujarCuadricula = () => {
    return (
      <div className="row row-cols-xl-5 row-cols-leg-4 row-cols-md-3 row-cols-2 g-4">

        {listaEmpleados.map(item =>
          <div className="col" key={item.idempleado}>
            <div className="card">
              <img src={ApiWebUrl + "fotos/" + item.foto} className="card-img-top" alt="..." title="Seleccionar empleado" onClick={() => SeleccionarEmpleado(item)} />
              <div className="card-body">
                <h5 className="card-title">{item.nombre} {item.apellidos} </h5>
                <p className="card-text"> {item.cargo} </p>
                <i className="bi bi-person-fill-add icon-empleado" id="iconEmp" title="Seleccionar empleado" onClick={() => SeleccionarEmpleado(item)}></i>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const SeleccionarEmpleado = (item) => {
    console.log(item);

    let empleadoSel = [];
    if (sessionStorage.getItem("seleccionempleado")) {
      empleadoSel = JSON.parse(sessionStorage.getItem("seleccionempleado"));

      let index = -1;
      for (let i = 0; i < empleadoSel.length; i++) {
        if (item.idempleado === empleadoSel[i].idempleado) {
          index = i;
          break;
        }
      }

      if (index === -1) {
        empleadoSel.push(item);
        sessionStorage.setItem("seleccionempleado", JSON.stringify(empleadoSel));
      }
    }
    else {
      empleadoSel.push(item);
      sessionStorage.setItem("seleccionempleado", JSON.stringify(empleadoSel));
    }
  }

  const dibujarPreCarga = () => {
    return (
        <div className="lds-hourglass"></div>
    )
}

  return (
    <section className="padded">
      <div className="container">
        <h2>Empleados</h2>
        {cargando ? dibujarPreCarga():dibujarCuadricula()}
      </div>
    </section>
  )
}

export default Empleados