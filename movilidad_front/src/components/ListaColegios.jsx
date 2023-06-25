import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { postColegio, updateColegio, deleteColegio } from '../../apiReact/api';
import { getColegios, getZonas } from '../../apiReact/api';

function ConfirmDelete({ show, handleClose, handleConfirmDelete }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>¿Estás seguro de eliminar este registro?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={handleConfirmDelete}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function ListaColegios() {
    const [show, setShow] = useState(false);
    const [editingColegio, setEditingColegio] = useState(null);
    const { register, handleSubmit, reset } = useForm();

    const [colegios, setColegios] = useState([]);
    useEffect(() => {
        async function obtenerDatos() {
            const res = await getColegios();
            setColegios(res.data);
        }
        obtenerDatos();
    }, [setColegios]);
    // useEffect(() => {
    //     async function buscarDatos() {
    //         setIsSearching(true);
    //         const res = await getColegiosSearch(searchTerm);
    //         setColegios(res.data);
    //         setIsSearching(false);
    //     }
    //     buscarDatos();
    // }, [searchTerm]);

    const [zonas, setZonas] = useState([]);
    useEffect(() => {
        async function obtenerZona() {
            const res = await getZonas();
            setZonas(res.data);
        }
        obtenerZona();
    }, [setZonas]);

    const obtenerNombreZona = (colegio) => {
        const zona = zonas.find((zona) => zona.zona_id === colegio.zona);
        if (zona) {
            return zona.zona_nombre;
        }
        return '';
    };

    const handleClose = () => {
        setShow(false);
        setEditingColegio(null);
        reset();
    };

    const handleShow = () => setShow(true);
    
    const handleEdit = (colegio) => {
        setEditingColegio(colegio);
        setShow(true);
    };

    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [selectedColegio, setSelectedColegio] = useState(null);

    const handleCloseConfirmDelete = () => setShowConfirmDelete(false);
    const handleShowConfirmDelete = () => setShowConfirmDelete(true);

    const handleDelete = (colegio) => {
        setSelectedColegio(colegio);
        handleShowConfirmDelete();
    };

    const handleConfirmDelete = () => {
        // Lógica para eliminar el registro
        deleteColegio(selectedColegio.colegio_id);
        handleCloseConfirmDelete();
    };

    const OnSubmit = handleSubmit(async (data) => {
        if (editingColegio) {
            // Editar el colegio existente
            const updatedColegio = {
                ...editingColegio,
                colegio_nombre: data.colegio_nombre,
                colegio_direccion: data.colegio_direccion,
                colegio_telefono: data.colegio_telefono,
                colegio_contacto: data.colegio_contacto,
                zona: data.zona,
            };
            updateColegio(editingColegio.colegio_id, updatedColegio);
        } else {
            // Crear un nuevo colegio
            postColegio(data);
        }
        handleClose();
    });

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingColegio ? 'Editar Colegio' : 'Registro de Colegio'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={OnSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nombre del Colegio</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={editingColegio ? editingColegio.colegio_nombre : ''}
                                {...register('colegio_nombre')}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Dirección del Colegio</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={editingColegio ? editingColegio.colegio_direccion : ''}
                                {...register('colegio_direccion')}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Teléfono del Colegio</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={editingColegio ? editingColegio.colegio_telefono : ''}
                                {...register('colegio_telefono')}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contacto del Colegio</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={editingColegio ? editingColegio.colegio_contacto : ''}
                                {...register('colegio_contacto')}
                            />
                        </div>
                        <div className="form-floating">
                            <select
                                className="form-select"
                                id="floatingSelect"
                                aria-label="Floating label select example"
                                defaultValue={editingColegio ? editingColegio.zona : ''}
                                {...register('zona')}
                            >
                                <option selected>Seleccionar Zona</option>
                                {zonas.map((zona) => (
                                    <option key={zona.zona_id} value={zona.zona_id}>
                                        {zona.zona_nombre}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="floatingSelect">Seleccionar Zona</label>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={OnSubmit}>
                        {editingColegio ? 'Guardar Cambios' : 'Guardar'}
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="mt-5">
                {colegios.map((colegio) => (
                    <div className="card mb-3" key={colegio.id}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src="..." className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-4">
                                <div className="card-body">
                                    <h5 className="card-title">{colegio.colegio_nombre}</h5>
                                    <p className="card-text">{colegio.colegio_direccion}</p>
                                    <p className="card-text">
                                        <small className="text-body-secondary">{colegio.colegio_telefono}</small>
                                    </p>
                                    <p className="card-text">
                                        <small className="text-body-secondary">{colegio.colegio_contacto}</small>
                                    </p>
                                    <p className="card-text">
                                        <small className="text-body-secondary">{obtenerNombreZona(colegio)}</small>
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="d-grid gap-2 col-6 mx-auto">
                                    <br />
                                    <button className="btn btn-primary" type="button" onClick={() => handleEdit(colegio)}>
                                        Editar
                                    </button>
                                    <button className="btn btn-primary" type="button" onClick={() => handleDelete(colegio)}>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ConfirmDelete
                show={showConfirmDelete}
                handleClose={handleCloseConfirmDelete}
                handleConfirmDelete={handleConfirmDelete}
            />
        </>
    );
}

export default ListaColegios;
