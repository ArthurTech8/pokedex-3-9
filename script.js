const API_BASE = "https://pokeapi.co/api/v2/pokemon";

let paginaAtual = 1;
let totalPaginas = 0;

const limite = 20;

async function carregarPokemons() {
    
    document.getElementById("paginacao")
        .classList.remove("oculto");
    
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
        alt="nome do pokemon"
        />

        <h3 class="nome-pokemon">${pokemon.name}</h3>
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

//INPUT DE BUSCA DE POKEMONS - FUNÇÃO DE BUSCA
async function buscarPokemon() {

    document.getElementById("paginacao")
        .classList.add("oculto");

    const nome = document
        .getElementById("inputBusca")
        .value
        .trim()
        .toLowerCase();

    if (nome === "") {
        document.getElementById("paginacao")
            .style.display = "flex";
        carregarPokemons();
        return;
    }

    try {

        const response = await fetch(
            `${API_BASE}/${nome}`
        );
       
        const pokemon = await response.json();

        const lista =
            document.getElementById("listaPokemons");

        lista.innerHTML = `
            <div class="card">

                <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">

                <h2>${pokemon.name}</h2>

                <p>#${pokemon.id}</p>

            </div>
        `;

        document.getElementById("paginacao")
            .style.display = "none";
//MODAL DE ERRO PARA POKEMON NÃO ENCONTRADO
    } catch(error) {
        console.error(error);
        abrirModal("Pokémon não encontrado!");

}
}
function abrirModal(mensagem) {
        console.log("Abrindo modal de erro");
        document.getElementById("mensagemErro")
        .textContent = mensagem;
        
        document.getElementById("modalErro")
        .style.display = "flex";
         //ASSOCIANDO BOTÃO DE FECHAR MODAL AO MODAL DE ERRO
        document
            .getElementById("fecharModal")
            .addEventListener("click", fecharModal);
    }
    
    function fecharModal() {
        
        console.log("Botão clicado");
        
        document.getElementById("modalErro")
            .style.display = "none";
        
       
    }
//ASSOCIANDO BOTÃO DE BUSCA AO INPUT DE BUSCA
document
    .getElementById("btnBuscar")
    .addEventListener("click", buscarPokemon);

//BUSCAR POKEMON AO PRESSIONAR ENTER NO INPUT DE BUSCA
document
    .getElementById("inputBusca")
    .addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            buscarPokemon();

        }

    });
