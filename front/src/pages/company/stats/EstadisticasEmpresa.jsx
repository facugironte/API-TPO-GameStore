import React from 'react';
import './EstadisticasEmpresa.css';
import Header from '../../../components/Header/Header';

const EstadisticasEmpresa = () => {
    const games = [
        {
            name: "Grand Theft Auto V",
            state: "Publicado",
            unitsSold: "190.000.000",
            views: "300.000.000",
            wishlists: "1500.000.000",
            conversionRate: "75%",
            image: "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png"
        },
        {
            name: "Red Dead Redemption 2",
            state: "Publicado",
            unitsSold: "190.000.000",
            views: "300.000.000",
            wishlists: "1500.000.000",
            conversionRate: "75%",
            image: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg"
        },
        {
            name: "Max Payne",
            state: "Publicado",
            unitsSold: "190.000.000",
            views: "300.000.000",
            wishlists: "1500.000.000",
            conversionRate: "75%",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_Gx5ucZF9jSdbk4eLGO6XUE7oYAupAKSlsg&s"
        }
    ];

    return (
        <>
            <Header currentPage={"stats"} />
            <div className="estadisticas-container">
                {games.map((game, index) => (
                    <div key={index} className="game-card">
                        <img src={game.image} alt={game.name} className="game-image" />
                        <div className="game-info">
                            <h2>{game.name}</h2>
                            <p><strong>ESTADO:</strong> {game.state}</p>
                            <p><span role="img" aria-label="units-sold">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6200EA" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                <path d="M17 17h-11v-14h-2" />
                                <path d="M6 5l14 1l-1 7h-13" />
                                </svg>    
                            </span> UNIDADES VENDIDAS: {game.unitsSold}</p>
                            <p><span role="img" aria-label="views">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6200EA" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                </svg>    
                            </span> CANTIDAD DE VISUALIZACIONES: {game.views}</p>
                            <p><span role="img" aria-label="wishlist">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6200EA" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                            </svg>    
                            </span> WISHLISTS: {game.wishlists}</p>
                            <p><span role="img" aria-label="conversion-rate">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-percentage" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6200EA" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M17 17m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                                <path d="M7 7m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                                <path d="M6 18l12 -12" />
                            </svg>
                            </span> TASA DE CONVERSION: {game.conversionRate}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default EstadisticasEmpresa;