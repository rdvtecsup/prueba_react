import AdminLayout from '../../components/plantillas/AdminLayout';
import { useForm } from 'react-hook-form';
import { useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { postZona } from '../../../apiReact/api';
import { getZonas } from '../../../apiReact/api';

function Zona() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { register, handleSubmit, reset } = useForm();
    const [zonas, setZonas] = useState([]);

    useEffect(() => {
      async function obtenerZona() {
        const res2 = await getZonas();
        setZonas(res2.data);
        console.log(res2.data)
      }
      obtenerZona();
    }, []);
    const OnSubmit = handleSubmit(data => {
        postZona(data)
        handleClose()
      })
  
    return (
        <AdminLayout>
            <>
                <h1>Zonas</h1>
                <div className='col-2 mt-5'>

                    <Button variant="success" onClick={handleShow}>
                        AGREGAR ZONA
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Registro de zona</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={OnSubmit}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Nombre: </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        autoFocus
                                        {...register('zona_nombre')}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                            <Button variant="success" onClick={OnSubmit}>
                                Guardar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {zonas.map((zona) => (
                        //<option key={zona.id} value={zona.id}>{zona.nombre}</option>
                        <tr>
                            <th scope="row">{zona.zona_id}</th>
                            <td>{zona.zona_id}</td>
                            <td>{zona.zona_nombre}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>

            </>
        </AdminLayout>
    )
}

export default Zona;