const API_BASE = "https://pokeapi.co/api/v2/pokemon";

let paginaAtual = 1;
let totalPaginas = 0;

const limite = 20;

async function carregarPokemons() {

    const offset = (paginaAtual - 1) * limite;
    
    const response = await fetch(
        `${API_BASE}?limit=${limite}&offset=${offset}`
    );
   
    const data = await response.json();
    //Desabilitar botão anterior se não houver página anterior e desabilitar botão próximo se não houver página próxima
    if(!data.previous){
        document
        .getElementById("btnAnterior")
        .setAttribute("disabled", "true");
    }else{
        document
        .getElementById("btnAnterior")
        .removeAttribute("disabled");
    }
    if(!data.next){
        document
        .getElementById("btnProximo")
        .setAttribute("disabled", "true");
    }else{
        document
        .getElementById("btnProximo")
        .removeAttribute("disabled");
    }
    totalPaginas = Math.ceil(data.count / limite);

    const lista =
        document.getElementById("listaPokemons");

    lista.innerHTML = "";

    for (const pokemon of data.results) {

        const detalheResponse =
            await fetch(pokemon.url);

        const detalhe =
            await detalheResponse.json();

        const numero = 
            await detalhe.id.toString().padStart(3, "0");
        ``

       lista.innerHTML += `
        <div class="card">

            <span class="numero">#${numero}</span>

            <img
            src="${detalhe.sprites.front_default}"
            alt="${pokemon.name}"
            />
        `;
        document.getElementById("paginaAtual")
            .textContent = `Página ${paginaAtual}`;
        
    }
}
carregarPokemons();

document.getElementById("paginaAtual")
    .textContent = `Página ${paginaAtual} de ${totalPaginas}`;

document.getElementById("btnAnterior").disabled =
    paginaAtual === 1;

document.getElementById("btnProximo").disabled =
    paginaAtual === totalPaginas;

document
    .getElementById("btnProximo")
    .addEventListener("click", () => {
        
        paginaAtual++;

        carregarPokemons();
    });

document
    .getElementById("btnAnterior")
    .addEventListener("click", () => {

        if (paginaAtual > 1) {

            paginaAtual--;

            carregarPokemons();
        }

    });