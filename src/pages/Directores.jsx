import { useEffect, useState } from "react"
import { ApiWebUrl } from "../utils";

function Directores() {
    const [listaDirectores, setListaDirectores] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [iddirector, setIdDirector] = useState("");
    const [nombres, setNombres] = useState("");
    const [peliculas, setPeliculas] = useState("");

    useEffect(() => {
        leerServicio();
    }, [])

    const leerServicio = () => {
        const rutaServicio = ApiWebUrl + "directores.php";
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setListaDirectores(data);
                setCargando(false);
            })
    }

    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Director</th>
                        <th>Peliculas</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaDirectores.map(item =>
                            <tr key={item.iddirector}>
                                <td> {item.iddirector} </td>
                                <td> {item.nombres} </td>
                                <td> {item.peliculas} </td>
                                <td> <i className="bi bi-pencil-square" data-bs-toggle="modal" data-bs-target="#UpdateModal"
                                onClick={() => llenarCampos(item)}></i> </td>
                                <td> <i className="bi bi-trash3"data-bs-toggle="modal" data-bs-target="#DeleteModal"
                                onClick={() => llenarCampos(item)}></i> </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
        )
    }

    const llenarCampos = (item) => {
        setIdDirector(item.iddirector);
        setNombres(item.nombres);
        setPeliculas(item.peliculas);

    }

    const dibujarPreCarga = () => {
        return (
            <div className="lds-hourglass"></div>
        )
    }

    const insertDirector = (event) => {
        event.preventDefault(); //evita recarga de pagina
        console.log(nombres + "-" + peliculas);
        const rutaServicio = ApiWebUrl + "directoresinsert.php";
        let formData = new FormData();
        formData.append("nombres", nombres);
        formData.append("peliculas", peliculas);

        document.querySelector("#InsertModal .btn-close").click();

        fetch(rutaServicio, {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                setCargando(true);
                leerServicio();
                setNombres("");
                setPeliculas("");
            })
    }

    const UpdateDirector = (event) => {
        event.preventDefault(); //evita recarga de pagina
        const rutaServicio = ApiWebUrl + "directoresupdate.php";
        let formData = new FormData();
        formData.append("iddirector", iddirector);
        formData.append("nombres", nombres);
        formData.append("peliculas", peliculas);

        document.querySelector("#UpdateModal .btn-close").click();

        fetch(rutaServicio, {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                setCargando(true);
                leerServicio();
                setNombres("");
                setPeliculas("");
            })
    }

    
    const dibujarInsertModal = () => {
        return (
            <div className="modal fade" id="InsertModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Nuevo director</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={(event) => insertDirector(event)}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Nombre del director"
                                        value={nombres} onChange={(event) => setNombres(event.target.value)}
                                        required minLength="4" />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Peliculas"
                                        value={peliculas} onChange={(event) => setPeliculas(event.target.value)}
                                        required minLength="1" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">Agregar director</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }

    const dibujarUpdateModal = () => {
        return (
            <div className="modal fade" id="UpdateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Editar director</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={(event) => UpdateDirector(event)}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <input type="text" className="form-control" 
                                        value={iddirector} readOnly />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Nombre del director"
                                        value={nombres} onChange={(event) => setNombres(event.target.value)}
                                        required minLength="4" />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Peliculas"
                                        value={peliculas} onChange={(event) => setPeliculas(event.target.value)}
                                        required minLength="1" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">Actualizar director</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }

    const DeleteDirector = (event) => {
        event.preventDefault();
        const rutaServicio = ApiWebUrl + "directoresdelete.php";
        let formData = new FormData();
        formData.append("iddirector", iddirector);

        document.querySelector("#DeleteModal .btn-close").click();

        fetch(rutaServicio, {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                setCargando(true);
                leerServicio();
                setNombres("");
                setPeliculas("");
            })

    }

    const dibujarDeleteModal = () => {
        return (
            <div className="modal fade" id="DeleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Eliminar director</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={(event) => DeleteDirector(event)}>
                            <div className="modal-body">
                                ¿Está seguro que desea eliminar al director {nombres}?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">Eliminar director</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }


    return (
        <section className="padded">
            <div className="container">
                <h2>Directores</h2><br />
                <div className="mb-3">
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#InsertModal">
                        Nuevo director
                    </button>
                </div>
                {cargando ? dibujarPreCarga() : dibujarTabla()}
                {dibujarInsertModal()}
                {dibujarUpdateModal()}
                {dibujarDeleteModal()}
            </div>
        </section>
    )
}



export default Directores