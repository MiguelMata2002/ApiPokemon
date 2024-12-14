const listapokemon = document.querySelector("#lista-pokemon")
const botonBuscar = document.getElementById("btn-buscar")
const botonTodos=document.getElementById("btn-todos")
const divError = document.getElementById("error-busqueda")
const botonRandom=document.getElementById("btn-random")
let URL = "https://pokeapi.co/api/v2/pokemon/"

for (let i = 1; i <= 150; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemones(data))
}
function mostrarPokemones(pokemon) {
    let tipos=pokemon.types.map(type=>
        `<p class="${type.type.name} tipo">${type.type.name}</p>`
    );
    tipos=tipos.join('');
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
                    <div class="pokemon-moreinfo">
                        <button class="btn-moreinfo buscador-btn" id="${pokemon.id}">Mas Informacion</button>
                    </div>
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
botonRandom.addEventListener("click", () => {
    const randomId = Math.floor(Math.random() * 150) + 1; // Generar un número aleatorio entre 1 y 150
    listapokemon.innerHTML = ``; // Limpiar la lista actual
    fetch(URL + randomId)
        .then((response) => response.json())
        .then((data) => mostrarPokemones(data))
});

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-moreinfo")) {
        const pokemonId = event.target.id; // Obtener el ID del Pokémon
        fetch(URL + pokemonId)
            .then((response) => response.json())
            .then((data) => mostrarDetallePokemon(data));
    }
});

function mostrarDetallePokemon(pokemon) {
    // Limpiar el contenedor actual
    listapokemon.innerHTML = ``;

    let tipos = pokemon.types.map(
        (type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`
    );
    tipos = tipos.join("");

    // Crear la tarjeta del Pokémon
    const div = document.createElement("div");
    div.classList.add("pokemon-detalle");
    div.innerHTML = `
        <div class="detalle-img">
            <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
        </div>
        <div class="detalle-info">
            <h2>${pokemon.name} (#${pokemon.id})</h2>
            <div class="detalle-tipos">
                ${tipos}
            </div>
            <div class="detalle-stats">
                <p><strong>Altura:</strong> ${pokemon.height} M</p>
                <p><strong>Peso:</strong> ${pokemon.weight} KG</p>
            </div>
            <button class="btn-volver buscador-btn">Volver</button>
        </div>
    `;

    // Añadir la tarjeta al contenedor
    listapokemon.appendChild(div);

    // Agregar funcionalidad al botón "Volver"
    document.querySelector(".btn-volver").addEventListener("click", () => {
        botonTodos.click(); // Recargar todos los Pokémon al volver
    });
}


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