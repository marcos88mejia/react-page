import { useEffect, useState } from "react"
import { ApiWebUrl } from "../utils";
import Productos from "../components/Productos";

function Tienda() {
  const [listaCategorias, setListaCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]);
  useEffect(() => {
    leerServicio();
  }, [])

  const leerServicio = () => {
    const rutaServicio = ApiWebUrl + "categorias.php";
    fetch(rutaServicio)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setListaCategorias(data);
        seleccionarCategoria(null, data[0]);
      })
  }

  const dibujarLista = () => {
    return (
      <ul className="list-group" id="lista-categorias">
        {listaCategorias.map(item =>
          <li className="list-group-item" key={item.idcategoria}
            title={item.descripcion}
            onClick={(event) => seleccionarCategoria(event, item)}>
            {item.nombre}
            <span className="badge text-bg-secondary position-absolute end-90"> {item.total} </span>
          </li>
        )}
      </ul>
    )
  }

  const seleccionarCategoria = (event, item) => {
    console.log(item.idcategoria);
    let itemLista = document.querySelectorAll("#lista-categorias li");
    itemLista.forEach(item => {
      item.classList.remove("active")
    })
    setCategoriaSeleccionada(item)

    if (event === null) {
      if (document.querySelector("#lista-categorias li") !== null) {
        document.querySelector("#lista-categorias li").classList.add("active");
      }
    }
    else {
      event.currentTarget.classList.add("active");
    }
  }

  return (
    <section className="padded">
      <div className="container">
        <h2>Tienda</h2><br />
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-5">
            {dibujarLista()}
          </div>
          <div className="col-lg-9 col-md-8 col-sm-7">
            <h3> {categoriaSeleccionada.nombre} </h3>
            <small> {categoriaSeleccionada.descripcion} </small>
            <br /><Productos categoriaProductos={categoriaSeleccionada.idcategoria} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tienda