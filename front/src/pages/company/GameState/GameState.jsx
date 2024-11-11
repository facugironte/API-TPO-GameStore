import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getGamebyId, updateGame, deleteGame } from '../../../utils/fetchGames';
import { deleteCompanyGame, updateCompanyGame } from '../../../app/slices/login/userSlice';
import Header from '../../../components/Header/Header';
import Button from '../../../components/Button/Button';
import Swal from "sweetalert2";
import './gameState.css';

const GameState = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlePublishClick = async () => {
        try {
            const newState = game.state === 'PUBLICADO' ? 'DESPUBLICADO' : 'PUBLICADO';
            await updateGame(id, {state: newState }).then((data) => {
                dispatch(updateCompanyGame(data))
            });
            setGame((prevGame) => ({ ...prevGame, state: newState }));
        } catch (error) {
            console.error('Error al cambiar el estado del juego:', error);
        }
    };

    const handleDeleteClick = async () => {

        Swal.fire({
            title: '¿Estás seguro de eliminar el juego?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#6200ea',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, eliminar',
            customClass:{
                popup: 'alert-popup'
            }})
            .then((result) => {
                if (result.isConfirmed) {
                try {
                    deleteGame(id).then ((response) => {
                        if(response.status === 200){
                            dispatch(deleteCompanyGame(id));
                        }
                    }
                    );
                    Swal.fire(
                        {title: '¡Eliminado!',
                        text: 'El elemento ha sido eliminado.',
                        icon: 'success',
                        confirmButtonColor: "#6200ea",
                        customClass:{
                            popup: 'alert-popup'
                        }}
                    );
                    navigate("/company-your-games");
                } catch (error) {
                    console.error("Error al eliminar el juego:", error);
                }

                }
            }
        );
    }


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


    if (!game) return <p>Cargando datos del juego...</p>;

    return (
        <>
            <Header currentPage={"company-modify-game"} />
            <div className="modificadores">
                <main className="main">
                    <div className="main-info">
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
                        <Button text="Editar" className="edit-btn" onClick={handleEdit}/>
                        <Button text={game.state === 'PUBLICADO' ? 'Despublicar' : 'Publicar'} className="publish-btn" onClick={handlePublishClick}/>
                        <Button text="Eliminar" className="delete-btn" onClick={handleDeleteClick}/>
                    </div>

                    <div className="details">
                        <p><strong>Categoría:</strong> {game.categories.map(cat => cat.name).join(", ")}</p>
                        <p><strong>Idioma:</strong> {game.languages.map(lang => lang.name).join(", ")}</p>
                        <p><strong>Cantidad de jugadores:</strong> {game.players_modes.map(mode => mode.name).join(", ")}</p>
                        <p><strong>Sistemas:</strong> {game.sos.map(plat => plat.name).join(", ")}</p>
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
            </div>
        </>
    );
};

export default GameState;