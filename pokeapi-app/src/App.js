import React, { useState } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchPokemonData = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      const data = await response.json();
      setPokemonData(data);
      setError(null);
    } catch (error) {
      setPokemonData(null);
      setError('Pokémon nebyl nalezen.');
    }
  };

  return (
    <div className="container">
      <h1 className="title">PokéDex</h1>
      <input type="text" className="input" value={searchTerm} onChange={handleSearchChange} placeholder="Zadejte jméno Pokémona" />
      <button className="button" onClick={fetchPokemonData}>Vyhledat</button>
      {error && <p className="error-message">{error}</p>}
      {pokemonData && (
        <div className="pokemon-info">
          <h2>{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <p>{pokemonData.species.name}</p>
          <h3>Schopnosti:</h3>
          <ul>
            {pokemonData.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
