import { useEffect, useState } from "react"
import { ApiWebUrl } from "../utils";

function Proveedores() {
  const [listaProveedores, setListaProveedores] = useState([]);
  const [listaProveedoresFiltrado, setListaProveedoresFiltrado] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [textoBuscar, setTextoBuscar] = useState("");
  const [columnaSeleccionada, setColumnaSeleccionada] = useState("Empresa");
  const [colSeleccionada, setColSeleccionada] = useState("nombreempresa");
  const [pagina, setPagina] = useState(0);
  const [filasPagina, setFilasPagina] = useState(10);
  const [numeroPaginas, setNumeroPaginas] = useState(0);
  const [ascendente,setAscendente] = useState(1);

  useEffect(() => {
    leerServicio();
  }, [])

  const leerServicio = async () => {
    const rutaServicio = ApiWebUrl + "servicioproveedores.php";
    // fetch(rutaServicio)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //     setListaProveedores(data);
    //     setCargando(false);
    //   })
    const response = await fetch(rutaServicio);
    const data = await response.json();
    console.log(data);
    setListaProveedores(data);
    setListaProveedoresFiltrado(data);
    setNumeroPaginas(Math.ceil(data.length / filasPagina));
    setCargando(false);

  }

  const dibujarTabla = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th columna="idproveedor" onClick={(event) => seleccionarColumna(event)}>Código</th>
            <th columna="nombreempresa" onClick={(event) => seleccionarColumna(event)}>Proveedor</th>
            <th columna="nombrecontacto" onClick={(event) => seleccionarColumna(event)}>Contacto</th>
            <th columna="cargocontacto" onClick={(event) => seleccionarColumna(event)}> Cargo</th>
            <th columna="ciudad" onClick={(event) => seleccionarColumna(event)}>Ciudad</th>
            <th columna="pais" onClick={(event) => seleccionarColumna(event)}>Pais</th>
          </tr>
        </thead>
        <tbody>
          {
            listaProveedoresFiltrado.slice(pagina * filasPagina, (pagina + 1) * filasPagina).map(item =>
              <tr key={item.idproveedor}>
                <td> {item.idproveedor} </td>
                <td> {item.nombreempresa} </td>
                <td> {item.nombrecontacto} </td>
                <td> {item.cargocontacto} </td>
                <td> {item.ciudad} </td>
                <td> {item.pais} </td>
              </tr>
            )
          }

        </tbody>
      </table>
    )
  }

  const seleccionarColumna = (event) => {
    setColumnaSeleccionada(event.target.innerText);
    setColSeleccionada(event.target.getAttribute("columna"));
    let columna = event.target.getAttribute("columna");

    let ascententex = ascendente;
    if(colSeleccionada === columna){
      ascententex = -ascententex;
    }
    else{
      ascententex = 1;
    }
    setAscendente(ascententex);

    const resultado = [...listaProveedoresFiltrado].sort((a,b) => {
      const codigoMayor = "return a." + columna + " > b." + columna + "? true : false";
      const codigoMenor = "return a." + columna + " < b." + columna + "? true : false";

      const funcionMayor = new Function('a','b',codigoMayor);  
      const funcionMenor = new Function('a','b',codigoMenor);  

      if(funcionMayor(a,b)){
        return ascententex;
      }
      if(funcionMenor(a,b)){
        return -ascententex;
      }

      // if(eval("a." + colSeleccionada) > eval("b." + colSeleccionada)){
      //   return 1;
      // }
      // if(eval("a." + colSeleccionada) < eval("b." + colSeleccionada)){
      //   return -11;
      // }
      // if(a.nombreempresa > b.nombreempresa){
      //   return 1;
      // }
      // if(a.nombreempresa < b.nombreempresa){
      //   return -1;
      // }
      return 0;
    })
    setListaProveedoresFiltrado(resultado);
  }

  const buscarTexto = (texto) => {
    setTextoBuscar(texto);
    const resultado = listaProveedores.filter(item =>
      item[colSeleccionada].toUpperCase().includes(texto.toUpperCase())
    )
    setNumeroPaginas(Math.ceil(resultado.length / filasPagina));
    setListaProveedoresFiltrado(resultado);
  }

  const dibujarPreCarga = () => {
    return (
      <div className="lds-hourglass"></div>
    )
  }

  const dibujarNumerosPaginacion = () => {
    return (
      <>
        {
          Array.from({ length: numeroPaginas }).map(
            (item, index) =>
              <li className="page-item" key={index}>
                <a className="page-link" href="#" onClick={() => setPagina(index)} > {index + 1} </a></li>
          )
        }
      </>
    )
  }

  const dibujarPaginacion = () => {
    return (
      <>
        <div> {(pagina + 1) + " de " + numeroPaginas} </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item"><a className="page-link" href="#" onClick={() => Retroceder()}>Retroceder</a></li>
            {dibujarNumerosPaginacion()}
            <li className="page-item"><a className="page-link" href="#" onClick={() => Avanzar()}>Avanzar</a></li>
          </ul>
        </nav>
      </>
    )
  }

  const Retroceder = () => {
    if (pagina > 0) {
      setPagina(pagina - 1);
    }
  }

  const Avanzar = () => {
    if (pagina < numeroPaginas - 1) {
      setPagina(pagina + 1);
    }
  }


  return (
    <section className="padded">
      <div className="container">
        <h2>Proveedores</h2><br />
        <div className="mb-3">
          <label className="form-label">Buscar por <strong> {columnaSeleccionada} </strong> </label>
          <input type="text" className="form-control" placeholder="Indique expresión a buscar"
            value={textoBuscar} onChange={(event) => buscarTexto(event.target.value)} />

        </div>
        {cargando ? dibujarPreCarga() : dibujarTabla()}
        {dibujarPaginacion()}
      </div>
    </section>
  )
}



export default Proveedores