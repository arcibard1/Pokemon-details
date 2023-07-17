let pokemonList = [];

const replaceable = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`)
    const data = await response.json()

    pokemonList = data.results.map(pokemon => {name: pokemon.name, url: pokemon.url}
    updateListDisplay()
}

const updateListDisplay = () => {
    const ul = document.querySelector(`#pokemon-list`)
    ul.innerHTML = ''

    for(let pokemon of pokemonList) {
        const li = document.createElement('li')
        const a = document.createElement('a')

        a.textContent = pokemon.name
        a.href = pokemon.url
        a.addEventListener('click', e => {
            e.preventDefault()
            displayPokemonDetails(pokemon.url)
        })

        li.appendChild(a)
        ul.appendChild(li)
    }
}

const displayPokemonDetails = async (url) => {
    const response = await fetch(url)
    const pokemon = await response.json()

    document.querySelector('#pokemon-name').innerText = pokemon.name
    document.querySelector('#pokemon-image').src = pokemon.sprites.front_default

    document.querySelector('#pokemon-list-page').style.display = 'none'
    document.querySelector('#pokemon-details-page').style.display = 'block'
}

document.querySelector('#back-button').addEventListener('click', () => {
    document.querySelector('#pokemon-list-page').style.display = 'block'
    document.querySelector('#pokemon-details-page').style.display = 'none'
})

document.querySelector('#add-pokemon').addEventListener('click', () => {
    const inputField = document.querySelector('#pokemon-input')
    const pokemonName = inputField.value.trim()

    if(pokemonName && !pokemonList.find(pokemon => pokemon.name === pokemonName)) {
        pokemonList.push({name: pokemonName, url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`})
        updateListDisplay()
    }

    inputField.value = ''
})

replaceable()
