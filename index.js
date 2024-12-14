const listapokemon = document.querySelector("#lista-pokemon")
const botonBuscar = document.getElementById("btn-buscar")
const botonTodos=document.getElementById("btn-todos")
const divError = document.getElementById("error-busqueda")
let URL = "https://pokeapi.co/api/v2/pokemon/"

for (let i = 1; i <= 150; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemones(data))
}
function mostrarPokemones(pokemon) {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="pokemon">
                <div class="img-pokemon">
                    <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="">
                </div>
                <div class="info-pokemon">
                    <div class="pokemon-basicinfo">
                        <p class="pokemon-id">#${pokemon.id}</p>
                        <h2 class="pokemon-nombre">${pokemon.name}</h2>
                    </div>
                    <div class="div-moreinfo">
                        <button class="btn-moreinfo buscador-btn" id="${pokemon.id}">Mas Informacion</button>
                    </div>
                    <div class="pokemon-stats">
                        <p class="stats">${pokemon.height}M</p>
                        <p class="stats">${pokemon.weight}KG</p>
                    </div>
                </div>
            </div>
    `;
    listapokemon.appendChild(div)
}
botonBuscar.addEventListener("click", () => {
    const busqueda = document.getElementById("buscador").value.toLowerCase()
    listapokemon.innerHTML = ``;
    for (let i = 1; i <= 150; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
                    if (data.name === busqueda || String(data.id) === busqueda) {
                    
                        mostrarPokemones(data)
                    }
            })
    }
})
botonTodos.addEventListener("click",()=>{
    listapokemon.innerHTML = ``;
    for (let i = 1; i <= 150; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => mostrarPokemones(data))
    }
})

/*
<div class="pokemon-tipos">
                        <p class="tipos">${pokemon.types.type.name}</p>
                        <p class="tipos">${pokemon.types.type.name}</p>
                    </div>




<div class="pokemon">
                <div class="img-pokemon">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png" alt="" srcset="">
                </div>
                <div class="info-pokemon">
                    <div class="pokemon-basicinfo">
                        <p class="pokemon-id">#132</p>
                        <h2 class="pokemon-nombre">Ditto</h2>
                    </div>
                    <div class="pokemon-tipos">
                        <p class="tipos">Normal</p>
                        <p class="tipos">Lucha</p>
                    </div>
                    <div class="pokemon-stats">
                        <p class="stats">15KG</p>
                        <p class="stats">1M</p>
                    </div>
                </div>
            </div>

*/ 