async function displayPokemon(filtros) {
    const cantidadInput = document.getElementById('cantidadPokemon').value;
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${cantidadInput}`;

    try {
        const response = await fetch(apiUrl);
        if (response.status === 200) {
            const pokemonData = await response.json();
            addPokemon(pokemonData.results, filtros);
        } else {
            alert("No se encontraron pokémon");
        }
    } catch (error) {
        alert('Error al obtener los datos: ' + error);
    }
}
async function addPokemon(pokemonList, filtros) {
    const allListPoke = document.getElementById('pokemon-list');
    allListPoke.innerHTML = '';

    for (const pokemon of pokemonList) {
        try {
            const response = await fetch(pokemon.url);
            if (response.status === 200) {
                const pokemonData = await response.json();
                if (pokemonData.name.includes(filtros.nombre) 
                && pokemonData.abilities.some(ability => ability.ability.name.includes(filtros.habilidad))) {
                    const pokemonElement = document.createElement('div');
                    pokemonElement.classList.add('pokemon-card');

                    pokemonElement.innerHTML = `
                    <div class="pokemonBox">
                        <div class="ajuste">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemonData.id}.png">
                            <h1>${pokemonData.name}</h1>
                        </div>
                        <div class="textStyle">
                            <p>Habilidades: ${pokemonData.abilities[0].ability.name}</p>
                            <p>Base de experiencia: ${pokemonData.base_experience}</p>
                        </div>
                    </div>
                    `;

                    allListPoke.appendChild(pokemonElement);
                }
            } 
        } catch (error) {
            alert('Error al obtener los datos del pokémon: ' + error);
        }
    }
}

function filtro() {
    const nombreInput = document.getElementById('nombreInput');
    const habilidadInput = document.getElementById('habilidadInput');
    displayPokemon({
        nombre: nombreInput.value.toLowerCase(),
        habilidad: habilidadInput.value.toLowerCase()
    });
}

document.addEventListener('DOMContentLoaded', function () {
    displayPokemon({ nombre: '', habilidad: '' });
    document.getElementById('nombreInput').addEventListener('input', filtro);
    document.getElementById('habilidadInput').addEventListener('input', filtro)


    document.getElementById('cantidadPokemon').addEventListener('keydown', function (event) {
        if (event.key === "Enter") {
            displayPokemon({ nombre: '', habilidad: '' });
        }
    });;
});