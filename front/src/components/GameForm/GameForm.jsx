import React, { useState } from 'react';
import './gameForm.css';

const GameForm = ({ initialData, onSubmit, buttonText }) => {
  const [juego, setJuego] = useState(initialData);
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

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
      }
    }));
  };

  const handleCheckboxChange = (e, type) => {
    const { name, checked } = e.target;
    setJuego((prevState) => {
      const currentValues = prevState[type] ? [...prevState[type]] : [];
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(juego);
  };

  return (
    <div className="juego-form">
      <main className="main">
        <form onSubmit={handleSubmit}>
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
                  type="text"
                  id="precio"
                  name="precio"
                  value={juego.precio}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="icon-container">
              <img className='icon' src="https://cdn-icons-png.flaticon.com/512/747/747376.png" alt="Icono" />
            </div>
          </div>

          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={juego.descripcion}
            onChange={handleChange}
          />

<label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={juego.descripcion}
            onChange={handleChange}
          />

          <div className="input-group">
            {/* Categoría */}
            <div className="column">
              <label htmlFor="categoria">Categoría</label>
              <div className="dropdown">
                <button
                  type="button"
                  onClick={() => setShowCategoryOptions(!showCategoryOptions)}
                >
                  Seleccione una categoría
                </button>
                {showCategoryOptions && (
                  <div className="dropdown-options">
                    {['Acción', 'Aventura', 'Deportes', 'Estrategia', 'Simulación', 'RPG'].map((category) => (
                      <label key={category}>
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
                  onClick={() => setShowLanguageOptions(!showLanguageOptions)}
                >
                  Seleccione un idioma
                </button>
                {showLanguageOptions && (
                  <div className="dropdown-options">
                    {['Español', 'Inglés', 'Francés', 'Alemán', 'Japonés'].map((language) => (
                      <label key={language}>
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
            <button type="button" className="cancelar-btn">Cancelar</button>
            <button type="submit" className="añadir-btn">{buttonText}</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default GameForm;
