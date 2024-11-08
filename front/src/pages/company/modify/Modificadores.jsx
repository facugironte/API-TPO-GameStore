import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Modificadores.css';
import Header from '../../../components/Header/Header';
import { getGamebyId, updateGame, deleteGame } from '../../../utils/fetchGames';
import { useDispatch } from 'react-redux';
import { deleteCompanyGame } from '../../../app/slices/login/userSlice';

const Modificadores = ({ removeGameFromList }) => {
    const { id } = useParams();
    const [showPublishModal, setShowPublishModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [game, setGame] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlePublishClick = async () => {
        try {
            const newState = game.state === 'PUBLICADO' ? 'DESPUBLICADO' : 'PUBLICADO';
            await updateGame(id, { ...game, state: newState });
            setGame((prevGame) => ({ ...prevGame, state: newState }));
            setShowPublishModal(false);
        } catch (error) {
            console.error('Error al cambiar el estado del juego:', error);
        }
    };

    const handleDeleteClick = async () => {
        try {
            deleteGame(id).then ((response) => {
                console.log("Juego eliminado correctamente", response);
                if(response.status === 200){
                    dispatch(deleteCompanyGame(id));
                }
            }
            );
            navigate("/company-your-games");
        } catch (error) {
            console.error("Error al eliminar el juego:", error);
        }
        setShowDeleteModal(false);
    };

    const handleCloseModal = () => {
        setShowPublishModal(false);
        setShowDeleteModal(false);
    };

    const handleEdit = () => {
        navigate(`/edit-game/${id}`);
    };

    useEffect(() => {
        const loadGame = async () => {
            try {
                const data = await getGamebyId(id);
                setGame(data);
            } catch (error) {
                console.error('Error al cargar el juego:', error);
            }
        };
        loadGame();
    }, [id]);

    console.log(game);

    if (!game) return <p>Cargando datos del juego...</p>;

    return (
        <>
            <Header currentPage={"company-modify-game"} />
            <div className="modificadores">
                <main className="main">
                    <div className="header">
                        <img src={game.logo_url} alt={game.name} className="game-image" />
                        <div className="game-info">
                            <h1>{game.name}</h1>
                            <p>{game.description}</p>
                        </div>
                        <div className="price">
                            <h2>${game.price}</h2>
                        </div>
                    </div>

                    <div className="status">
                        <strong>Estado:</strong> {game.state}
                    </div>

                    <div className="buttons">
                        <button className="edit-btn" onClick={handleEdit}>Editar</button>
                        <button className="publish-btn" onClick={handlePublishClick}>
                            {game.state === 'PUBLICADO' ? 'Despublicar' : 'Publicar'}
                        </button>
                        <button className="delete-btn" onClick={handleDeleteClick}>Eliminar</button>
                    </div>

                    <div className="details">
                        <p><strong>Categoría:</strong> {game.categories.map(cat => cat.name).join(", ")}</p>
                        <p><strong>Idioma:</strong> {game.languages.map(lang => lang.name).join(", ")}</p>
                        <p><strong>Cantidad de jugadores:</strong> {game.players_modes.map(mode => mode.name).join(", ")}</p>
                    </div>

                    <div className="requirements">
                        <h3>Requisitos del sistema</h3>
                        <div className="requirements-columns">
                            <div className="requirements-min">
                                <h4>Mínimo:</h4>
                                <ul>
                                    <li>Procesador: {game.minCpu}</li>
                                    <li>Memoria: {game.minRam}</li>
                                    <li>Gráficos: {game.minGpu}</li>
                                    <li>Almacenamiento: {game.minStorage}</li>
                                    <li>Sonido: {game.minSound}</li>
                                </ul>
                            </div>
                            <div className="requirements-rec">
                                <h4>Recomendado:</h4>
                                <ul>
                                    <li>Procesador: {game.optCpu}</li>
                                    <li>Memoria: {game.optRam}</li>
                                    <li>Gráficos: {game.optGpu}</li>
                                    <li>Almacenamiento: {game.optStorage}</li>
                                    <li>Sonido: {game.optSound}</li>
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
                                <button className="save-btn" onClick={handlePublishClick}>Guardar cambios</button>
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