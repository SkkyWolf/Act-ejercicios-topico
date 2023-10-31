async function displayRicky() {
    const apiUrl = `https://rickandmortyapi.com/api/character/1`;

    try {
        const response = await fetch(apiUrl);
        if (response.status === 200) {
            const characterData = await response.json();
            addCharacters(characterData);
        } else {
            alert('No se encontraron datos');
        }
    } catch (error) {
        alert('Error al obtener datos: ' + error);
    }
}

function addCharacters(characterData) {

    const characterlist = document.getElementById('character-list');
    const characterElement = document.createElement('div');

    characterElement.innerHTML = `
        <h1>${characterData.name}</h1>
        <img src="${characterData.image}">
    `;

    characterlist.appendChild(characterElement);
}

document.addEventListener('DOMContentLoaded', function () {
    displayRicky();
});
