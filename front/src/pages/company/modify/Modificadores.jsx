import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Modificadores.css';
import Header from '../../../components/Header/Header';

const Modificadores = () => {
    const [showPublishModal, setShowPublishModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();

    const handlePublishClick = () => setShowPublishModal(true);
    const handleDeleteClick = () => setShowDeleteModal(true);
    const handleCloseModal = () => {
        setShowPublishModal(false);
        setShowDeleteModal(false);
    };

    const handleEdit = () => {
        navigate("/edit-game");
    };

    return (
        <>
            <Header currentPage={"company-modify-game"} />
            <div className="modificadores">
                <main className="main">
                    <div className="header">
                        <img src="https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png" alt="GTA V" className="game-image" />
                        <div className="game-info">
                            <h1>Grand Theft Auto V</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ornare libero a sem imperdiet, mollis venenatis tortor maximus. Pellentesque a efficitur odio.</p>
                        </div>
                        <div className="price">
                            <h2>$19.99</h2>
                        </div>
                    </div>

                    <div className="status">
                        <strong>Estado:</strong> Publicado
                    </div>

                    <div className="buttons">
                        <button className="edit-btn" onClick={handleEdit}>Editar</button>
                        <button className="publish-btn" onClick={handlePublishClick}>Publicar</button>
                        <button className="delete-btn" onClick={handleDeleteClick}>Eliminar</button>
                    </div>

                    <div className="details">
                        <p><strong>Categoría:</strong> Aventura, Acción, Mundo Abierto</p>
                        <p><strong>Idioma:</strong> Español, Inglés y 12 más</p>
                        <p><strong>Cantidad de jugadores:</strong> Un jugador (Modo historia) - Multijugador</p>
                    </div>

                    <div className="requirements">
                        <h3>Requisitos del sistema</h3>
                        <div className="requirements-columns">
                            <div className="requirements-min">
                                <h4>Mínimo:</h4>
                                <ul>
                                    <li>Requiere un procesador y un sistema operativo de 64 bits</li>
                                    <li>Procesador: Intel Core 2 Quad CPU Q6600 a 2.4 GHz (4 CPU) / AMD Phenom 9850 Quad-Core (4 CPU) a 2.5 GHz</li>
                                    <li>Memoria: 4 GB de RAM</li>
                                    <li>Gráficos: NVIDIA 9800 GT 1 GB / AMD HD 4870 1 GB (DX 10, 10.1, 11)</li>
                                    <li>Almacenamiento: 120 GB de espacio disponible</li>
                                </ul>
                            </div>
                            <div className="requirements-rec">
                                <h4>Recomendado:</h4>
                                <ul>
                                    <li>Requiere un procesador y un sistema operativo de 64 bits</li>
                                    <li>Procesador: Intel Core i5 3470 a 3.2 GHz (4 CPU) / AMD X8 FX-8350 a 4 GHz (8 CPU)</li>
                                    <li>Memoria: 8 GB de RAM</li>
                                    <li>Gráficos: NVIDIA GTX 660 2 GB / AMD HD 7870 2 GB</li>
                                    <li>Almacenamiento: 120 GB de espacio disponible</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>

                {showPublishModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>¡ATENCIÓN!</h2>
                            <p>Si oprime publicar su juego estará disponible en la tienda.</p>
                            <div className="modal-buttons">
                                <button className="cancel-btn" onClick={handleCloseModal}>Cancelar</button>
                                <button className="save-btn">Guardar cambios</button>
                            </div>
                        </div>
                    </div>
                )}

                {showDeleteModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>¡ATENCIÓN!</h2>
                            <p>Si oprime eliminar NO habrá vuelta atrás y perderá todos los datos permanentemente.</p>
                            <div className="modal-buttons">
                                <button className="cancel-btn" onClick={handleCloseModal}>Cancelar</button>
                                <button className="delete-btn">Eliminar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Modificadores;
