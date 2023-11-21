//https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=

//key privada: 380eaebbfafb7a9a2f2745b820c72c2c51ac9e95
//key public: 8a7f3707d8be1b668a1f65784df054bb

//Hash: 1380eaebbfafb7a9a2f2745b820c72c2c51ac9e958a7f3707d8be1b668a1f65784df054bb
//https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=8a7f3707d8be1b668a1f65784df054bb&hash=f72655e032f38b1b21793fd1f2e199e3

document.getElementById('get-characters').addEventListener('click', async function () {
    try {
        const apiKey = '8a7f3707d8be1b668a1f65784df054bb';
        const hash = 'f72655e032f38b1b21793fd1f2e199e3';
        const apiUrl = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=' + apiKey + '&hash=' + hash;

        const response = await fetch(apiUrl);

        if (response.status === 200) {
            const data = await response.json();
            const charactersList = document.getElementById('characters-list');
            const characters = data.data.results;

            charactersList.innerHTML = '';

            characters.forEach(character => {
                const characterElement = document.createElement('div');
                characterElement.innerHTML = `
            <div class="characMarvel">
                <h2>${character.name}</h2>
            </div>
            <div class="portada-marvel">
                <img class="imgTa" src="${character.thumbnail.path}.${character.thumbnail.extension}"">
                <p>${character.description || 'No hay descripción'}</p>
            </div>
            `;
                charactersList.appendChild(characterElement);
            });

        } else {
            alert('No se encontraron datos');
        }

    } catch (error) {
        console.error('Hubo un error:', error);
    }
});
