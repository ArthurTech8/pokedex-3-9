const API_BASE =
    "https://pokeapi.co/api/v2/pokemon";

async function carregarDetalhes() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const id = params.get("id");

    const response =
        await fetch(`${API_BASE}/${id}`);

    const pokemon =
        await response.json();

    const card =
        document.getElementById("cardDetalhes");

    const tipoPrincipal =
    pokemon.types[0].type.name;

    const [cor1, cor2] =
    gradientes[tipoPrincipal] || ["#777", "#AAA"];

    card.innerHTML = `
    <div
        class="card detalhes"
        style="
            background: linear-gradient(
                135deg,
                ${cor1},
                ${cor2}
            );
        "
    >

        <span class="numeroDetalhes">
            #${pokemon.id.toString().padStart(3,"0")}
        </span>

        <h2>${pokemon.name}</h2>

        <div class="atributos">

            <img
                src="${pokemon.sprites.other['official-artwork'].front_default}"
                alt="${pokemon.name}"
            </img>

            <p class="tipo">
                ${pokemon.types.map(
                    t => t.type.name
                ).join(", ")}
            </p>

            <p>
                <strong>Vida:</strong>
                ${pokemon.stats[0].base_stat}
            </p>

            <p>
                <strong>Ataque:</strong>
                ${pokemon.stats[1].base_stat}
            </p>

            <p>
                <strong>Defesa:</strong>
                ${pokemon.stats[2].base_stat}
            </p>

            <button
                class="btn-voltar"
                onclick="history.back()"
            >
                Voltar para Pokédex
            </button>
        </div>
    </div>

`;
}
carregarDetalhes();


const gradientes = {
    grass: ["#78C850", "#A8E6A3"],
    fire: ["#F08030", "#FFB36B"],
    water: ["#6890F0", "#9CC3FF"],
    electric: ["#F8D030", "#FFE27A"],
    psychic: ["#F85888", "#FFA9C2"],
    poison: ["#A040A0", "#D18AD1"],
    bug: ["#A8B820", "#D4E157"],
    normal: ["#A8A878", "#D7D7B7"],
    flying: ["#A890F0", "#D2C2FF"],
    rock: ["#B8A038", "#E2D27E"],
    ground: ["#E0C068", "#F2DEA1"],
    ghost: ["#705898", "#B39DDB"],
    dragon: ["#7038F8", "#B39DFF"],
    dark: ["#705848", "#A1887F"],
    steel: ["#B8B8D0", "#ECEFF1"],
    fairy: ["#EE99AC", "#FFD6E0"],
    ice: ["#98D8D8", "#DDFBFB"]
};
