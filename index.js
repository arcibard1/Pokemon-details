let pokemonList = [];

const replaceable = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`);
    const data = await response.json();
    console.log(data.results);

    pokemonList = data.results.map(pokemon => ({name: pokemon.name, url: pokemon.url}));
    updateListDisplay();
}

const updateListDisplay = () => {
    const ul = document.querySelector(`#pokemon-list`);
    ul.innerHTML = '';

    for(let pokemon of pokemonList) {
        const li = document.createElement('li');
        const a = document.createElement('a');

        a.textContent = pokemon.name;
        a.href = pokemon.url;
        a.target = '_blank';

        li.appendChild(a);
        ul.appendChild(li);
    }
}

document.querySelector('#add-pokemon').addEventListener('click', () => {
    const inputField = document.querySelector('#pokemon-input');
    const pokemonName = inputField.value.trim();

    if(pokemonName && !pokemonList.find(pokemon => pokemon.name === pokemonName)) {
        pokemonList.push({name: pokemonName, url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`});
        updateListDisplay();
    }

    inputField.value = '';
});

replaceable();
