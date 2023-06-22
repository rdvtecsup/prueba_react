import {
    useEffect,
    useState
} from "react"
import axios from 'axios'
import { getColegios,postZona, getZonas } from '../../apiReact/api';
function ListaColegios() {
    const [colegios, setColegios] = useState([])
    useEffect(() => {
        async function obtenerDatos() {
            const res = await getColegios()
            console.log(res.data)
            setColegios(res.data)
            //console.log("no jalo colegios")
        }
        obtenerDatos()
    }, []
    )
    const [zonas, setZonas] = useState([])
    useEffect(() => {

        async function obtenerZona() {
            const res2 = await getZonas()
            setZonas(res2.data)
        }
        obtenerZona()
    }, [])
    return (
        <>
            <div className='mt-5'>
                
                {colegios.map(colegio => (
                    <div className="card mb-3" key={colegio.id}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src="..." className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-4">
                                <div className="card-body">
                                    <h5 className="card-title">{colegio.nombre}</h5>
                                    <p className="card-text">{colegio.direccion}</p>
                                    <p className="card-text"><small className="text-body-secondary">{colegio.telefono}</small></p>
                                    <p className="card-text"><small className="text-body-secondary">{colegio.contacto}</small></p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="d-grid gap-2 col-6 mx-auto">
                                    <br />
                                    <button className="btn btn-primary" type="button">Editar</button>
                                    <button className="btn btn-primary" type="button">Eliminar</button>
                                </div>
                            </div>
                            <div class="form-floating">

                                <select class="form-select" id="floatingSelect" aria-label="Floating label select example">

                                    <option selected>Zona</option>
                                    {...zonas.map(zona => (
                                        <option value={zona.id}>{zona.nombre}</option>
                                    ))}
                                </select>
                                <label for="floatingSelect">Works with selects</label>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
export default ListaColegios