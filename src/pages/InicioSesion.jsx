import { useState } from "react"
import { ApiWebUrl } from "../utils";

function InicioSesion() {
    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");

    const iniciarSesion = (event) =>{
        event.preventDefault();
        const rutaServicio = ApiWebUrl + "iniciarsesion.php";

        let formData = new FormData();
        formData.append("usuario",usuario);
        formData.append("clave",clave);
        fetch(rutaServicio,{
            method:"POST",
            body:formData
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
    }

    return (
        <section className="padded">
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <h2>Inicio de sesión</h2>
                        <form onSubmit={(event) => iniciarSesion(event)}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Nombre del usuario"
                                        value={usuario} onChange={(event) => setUsuario(event.target.value)}
                                        required minLength="4" />
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control" placeholder="Clave"
                                        value={clave} onChange={(event) => setClave(event.target.value)}
                                        required minLength="1" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Agregar director</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </section>
    )
}


export default InicioSesion