import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

import './gameForm.css';

const GameForm = ({ initialData, onSubmit, buttonText, languages, categories, modes, sos }) => {
  const [juego, setJuego] = useState(initialData);
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [showPlayerOptions, setShowPlayerOptions] = useState(false);
  const [showSystemOptions, setShowSystemOptions] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJuego((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSpecsChange = (e, tipo) => {
    const { name, value } = e.target;
    setJuego((prevState) => ({
      ...prevState,
      [tipo]: {
        ...prevState[tipo],
        [name]: value,
      },
    }));
  };

  const handleCheckboxChange = (e, type) => {

    const { name, checked } = e.target;
    setJuego((prevState) => {
      const currentValues = prevState[type] ? [...prevState[type].split(", ")] : [];
      if (checked) {
        currentValues.push(name);
      } else {
        const index = currentValues.indexOf(name);
        if (index > -1) {
          currentValues.splice(index, 1);
        }
      }
      return { ...prevState, [type]: currentValues.join(", ") };
    });
  };

  const getButtonText = (selectedItems, defaultText) => {
    if (!selectedItems || selectedItems.length === 0) {
      return defaultText;
    }
    return selectedItems.join(", ");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(juego);
  };

  return (
    <div className="juego-form">
      <main className="main">
        <form className='form'>
          <div className="input-group">
            <div className="column">
              <label htmlFor="nombre">Nombre del videojuego</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={juego.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="column">
              <label htmlFor="precio">Precio</label>
              <div className="input-precio">
                <span>$</span>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  value={juego.precio}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={juego.descripcion}
            onChange={handleChange}
          />

          <label htmlFor="img">URL del logo</label>
          <input
            id="img"
            name="img"
            value={juego.img}
            onChange={handleChange}
          />

          <label htmlFor="img">URL de la portada</label>
          <input
            id="port"
            name="port"
            value={juego.port}
            onChange={handleChange}
          />

          <label htmlFor="video">URL del Trailer</label>
          <input
            id="video"
            name="video"
            value={juego.video}
            onChange={handleChange}
          />

          <div className="input-group">
            {/* Categoría */}
            <div className="column">
              <label htmlFor="categoria">Categoría</label>
              <div className="dropdown">
                <button
                  type="button"
                  className="dropdown-button"
                  onClick={() => setShowCategoryOptions(!showCategoryOptions)}
                >
                  {getButtonText(
                    juego.categoria ? juego.categoria.split(", ") : [],
                    "Seleccione una categoría"
                  )}
                </button>
                {showCategoryOptions && (
                  <div className="dropdown-options">
                    {categories.map((category, index) => (
                      <label key={index}>
                        <input
                          type="checkbox"
                          name={category}
                          checked={juego.categoria.includes(category)}
                          onChange={(e) => handleCheckboxChange(e, 'categoria')}
                        />
                        {category}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Idioma */}
            <div className="column">
              <label htmlFor="idioma">Idioma</label>
              <div className="dropdown">
                <button
                  type="button"
                  className="dropdown-button"
                  onClick={() => setShowLanguageOptions(!showLanguageOptions)}
                >
                  {getButtonText(
                    juego.idioma ? juego.idioma.split(", ") : [],
                    "Seleccione un idioma"
                  )}
                </button>
                {showLanguageOptions && (
                  <div className="dropdown-options">
                    {languages.map((language, index) => (
                      <label key={index}>
                        <input
                          type="checkbox"
                          name={language}
                          checked={juego.idioma.includes(language)}
                          onChange={(e) => handleCheckboxChange(e, 'idioma')}
                        />
                        {language}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="input-group">
            {/* Cantidad de jugadores */}
            <div className="column">
              <label htmlFor="jugadores">Cantidad de jugadores</label>
              <div className="dropdown">
                <button
                  type="button"
                  className="dropdown-button"
                  onClick={() => setShowPlayerOptions(!showPlayerOptions)}
                >
                  {getButtonText(
                    juego.jugadores ? juego.jugadores.split(", ") : [],
                    "Seleccione cantidad de jugadores"
                  )}
                </button>
                {showPlayerOptions && (
                  <div className="dropdown-options">
                    {modes.map((mode, index) => (
                      <label key={index}>
                        <input
                          type="checkbox"
                          name={mode}
                          checked={juego.jugadores.includes(mode)}
                          onChange={(e) => handleCheckboxChange(e, 'jugadores')}
                        />
                        {mode}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sistema operativo */}
            <div className="column">
              <label htmlFor="sistemaOperativo">Sistema operativo</label>
              <div className="dropdown">
                <button
                  type="button"
                  className="dropdown-button"
                  onClick={() => setShowSystemOptions(!showSystemOptions)}
                >
                  {getButtonText(
                    juego.sistemaOperativo ? juego.sistemaOperativo.split(", ") : [],
                    "Seleccione un sistema operativo"
                  )}
                </button>
                {showSystemOptions && (
                  <div className="dropdown-options">
                    {sos.map((os, index) => (
                      <label key={os}>
                        <input
                          type="checkbox"
                          name={os}
                          checked={juego.sistemaOperativo.includes(os)}
                          onChange={(e) => handleCheckboxChange(e, 'sistemaOperativo')}
                        />
                        {os}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="specs-container">
            <div className="column">
              <h4>Requisitos mínimos</h4>
              <label>Procesador</label>
              <input
                type="text"
                name="procesador"
                value={juego.minimos.procesador}
                onChange={(e) => handleSpecsChange(e, 'minimos')}
              />

              <label>Memoria</label>
              <input
                type="text"
                name="memoria"
                value={juego.minimos.memoria}
                onChange={(e) => handleSpecsChange(e, 'minimos')}
              />

              <label>Gráficos</label>
              <input
                type="text"
                name="graficos"
                value={juego.minimos.graficos}
                onChange={(e) => handleSpecsChange(e, 'minimos')}
              />

              <label>Almacenamiento</label>
              <input
                type="text"
                name="almacenamiento"
                value={juego.minimos.almacenamiento}
                onChange={(e) => handleSpecsChange(e, 'minimos')}
              />

              <label>Tarjeta de sonido</label>
              <input
                type="text"
                name="sonido"
                value={juego.minimos.sonido}
                onChange={(e) => handleSpecsChange(e, 'minimos')}
              />
            </div>

            <div className="column">
              <h4>Requisitos recomendados</h4>
              <label>Procesador</label>
              <input
                type="text"
                name="procesador"
                value={juego.recomendados.procesador}
                onChange={(e) => handleSpecsChange(e, 'recomendados')}
              />

              <label>Memoria</label>
              <input
                type="text"
                name="memoria"
                value={juego.recomendados.memoria}
                onChange={(e) => handleSpecsChange(e, 'recomendados')}
              />

              <label>Gráficos</label>
              <input
                type="text"
                name="graficos"
                value={juego.recomendados.graficos}
                onChange={(e) => handleSpecsChange(e, 'recomendados')}
              />

              <label>Almacenamiento</label>
              <input
                type="text"
                name="almacenamiento"
                value={juego.recomendados.almacenamiento}
                onChange={(e) => handleSpecsChange(e, 'recomendados')}
              />

              <label>Tarjeta de sonido</label>
              <input
                type="text"
                name="sonido"
                value={juego.recomendados.sonido}
                onChange={(e) => handleSpecsChange(e, 'recomendados')}
              />
            </div>
          </div>

          <div className="button-group">
            <Button text="Cancelar" btn_class="cancelar-btn" onClick={() => navigate("/company-your-games")} />
            <Button text={buttonText} btn_class="añadir-btn" onClick={handleSubmit}/>
          </div>
        </form>
      </main>
    </div>
  );
};

export default GameForm;
