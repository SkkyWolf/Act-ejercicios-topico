const pokemonParty = [];
const historial = [];
const tipos = [
  "Selecciona...",
  "Normal",
  "Lucha",
  "Volador",
  "Veneno",
  "Tierra",
  "Roca",
  "Bicho",
  "Fantasma",
  "Acero",
  "Fuego",
  "Agua",
  "Planta",
  "Eléctrico",
  "Psíquico",
  "Hielo",
  "Dragón",
  "Siniestro",
  "Hada",
];

document.addEventListener("DOMContentLoaded", () => {
  // CONTROLS
  const input = document.getElementById("nombreInput");
  const buscar = document.getElementById("buscar");
  const limpiar = document.getElementById("limpiar");

  // ALERT
  const span = document.getElementById("info-alert");
  const btn = document.getElementById("close-alert");
  const div = document.getElementById("alert");

  // SHOW
  const equipoPokemon = document.getElementById("equipo-pokemon");
  const historialEl = document.getElementById("historial");
  const showWaterType = document.getElementById("show-water-type");

  // HISTORY
  const sortBtn = document.getElementById("sort");
  const waterTypeBtn = document.getElementById("water-type");

  function _alert(msg) {
    div.classList.remove("hide");
    span.textContent = msg;
    btn.onclick = () => div.classList.add("hide");
  }

  async function buscarFn(nombrePokemon) {
    if (!nombrePokemon) {
      _alert("Ingrese un nombre valido!");
      return;
    }

    const apiUrl = "https://pokeapi.co/api/v2/pokemon/" + nombrePokemon;

    try {
      const response = await fetch(apiUrl);

      if (response.status === 200) {
        const pokemonData = await response.json();
        console.log(pokemonData);
        addPokemon(pokemonData);
      } else _alert("No se encontró el pokémon " + nombrePokemon);
    } catch (error) {
      _alert("Error al obtener los datos: " + error);
    }
  }

  function addPokemon(pokemon) {
    input.value = "";
    historial.push(pokemon);

    if (pokemonParty.includes(pokemon.name)) {
      _alert("Este pokemon existe en el equipo!");
      return;
    } else if (pokemonParty.length >= 3) {
      limpiar.disabled = false;
      buscar.disabled = true;
      _alert("El equipo pokemon ya está lleno!");
      return;
    } else if (pokemonParty.length === 2) {
      limpiar.disabled = false;
      buscar.disabled = true;
      _alert("Se ha llenado el equipo!");
    }

    pokemonParty.push(pokemon.name);

    const pokemonElement = document.createElement("div");
    pokemonElement.classList.add("pokemon-card");
    pokemonElement.innerHTML = `
        <div class="pokemonBox">
            <div class="ajuste">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
                <h1>${pokemon.name}</h1>
            </div>
            <div class="textStyle">
                <p>Base de experiencia: ${pokemon.base_experience}</p>
                <p>Habilidades: ${pokemon.abilities[0].ability.name}</p>
                <p>Tipo: ${pokemon.types[0].type.name}</p>
            </div>
        </div>
    `;
    equipoPokemon.appendChild(pokemonElement);
  }

  function limpiarFn() {
    equipoPokemon.replaceChildren();
    limpiar.disabled = true;
    buscar.disabled = false;
    pokemonParty.splice(0, pokemonParty.length);
  }

  function sortFn() {
    historialEl.replaceChildren();

    if (historial.length === 0) {
      _alert("No hay nada en el historial!");
      return;
    }

    const sorted = historial.sort((a, b) =>
      a.base_experience > b.base_experience ? 1 : -1
    );

    for (const pokemon of sorted) {
      const pokemonElement = document.createElement("div");
      pokemonElement.classList.add("pokemon-card");
      pokemonElement.innerHTML = `
        <div class="pokemonBox">
            <div class="ajuste">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
                <h1>${pokemon.name}</h1>
            </div>
            <div class="textStyle">
                <p>Base de experiencia: ${pokemon.base_experience}</p>
                <p>Habilidades: ${pokemon.abilities[0].ability.name}</p>
                <p>Tipo: ${pokemon.types[0].type.name}</p>
            </div>
        </div>
        `;
      historialEl.appendChild(pokemonElement);
    }
  }

  function checkWater() {
    let hasWater = false;

    for (const pokemon of historial) {
      for (const subitem of pokemon.types) {
        if (subitem.type.name === "water") {
          hasWater = true;
          break;
        }
      }
      if (hasWater) break;
    }

    if (hasWater) {
      showWaterType.classList.add("yes");
      showWaterType.classList.remove("no");
    } else {
      showWaterType.classList.remove("yes");
      showWaterType.classList.add("no");
    }
  }

  buscar.onclick = () => buscarFn(input.value);
  limpiar.onclick = limpiarFn;
  sortBtn.onclick = sortFn;
  waterTypeBtn.onclick = checkWater;
});