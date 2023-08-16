const pageLoadedEvent = async () => {
    const pokemonCount = 54;
    const pokemonList = await getAllPokemon(pokemonCount);
    loadPokemons(pokemonList);
};

const getAllPokemon = async (count) => {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${count}`
    );
    const data = await response.json();
    return data.results;
};

const loadPokemons = async (pokemonList) => {
    for (const pokemon of pokemonList) {
        const id = extractPokemonId(pokemon.url);
        await getPokemon(id);
    }
};

const extractPokemonId = (url) => {
    const parts = url.split("/");
    return parseInt(parts[parts.length - 2]);
};

const getPokemon = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    await renderPokemon(data);
};

const renderPokemon = async (data) => {
    const sprite = data.sprites.front_default;
    const { types } = data;
    const pokemonContainerEl = document.getElementById("pokedex-cards");

    const pokemonBtn = document.createElement("button");
    pokemonBtn.classList.add("card");
    await setCardColor(types, pokemonBtn);

    pokemonBtn.addEventListener("click", () => {
        renderPopUp(data);
    });

    closeButton.addEventListener("click", () => {
        overlay.style.display = "none";
        popup.style.display = "none";
    });

    const pokemonImg = document.createElement("img");
    pokemonImg.setAttribute("src", sprite);

    pokemonBtn.appendChild(pokemonImg);
    pokemonContainerEl.appendChild(pokemonBtn);
};

const setCardColor = async (types, pokemonBtn) => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1]
        ? typeColors[types[1].type.name]
        : typeColors.default;

    pokemonBtn.style.background = `linear-gradient(to top right, ${colorOne}, ${colorTwo})`;

    pokemonBtn.addEventListener("mouseenter", () =>
        addGradientOnHover(pokemonBtn, colorOne, colorTwo)
    );

    pokemonBtn.addEventListener("mouseleave", () =>
        addDefaultGradient(pokemonBtn, colorOne, colorTwo)
    );
};

const addGradientOnHover = (btn, colorOne, colorTwo) => {
    btn.style.background = `linear-gradient(to top right, ${colorTwo}, ${colorOne})`;
};
const addDefaultGradient = (btn, colorOne, colorTwo) => {
    btn.style.background = `linear-gradient(to top right, ${colorOne}, ${colorTwo})`;
};

const renderPopUp = (data) => {
    overlay.style.display = "block";
    popup.style.display = "block";

    const popupTypes = document.getElementById("popupTypes");
    popupTypes.innerHTML = "";

    const typeOneElement = document.createElement("span");
    typeOneElement.classList.add("type");
    typeOneElement.textContent = data.types[0].type.name;
    setTypeColor(typeOneElement, data.types[0].type.name);

    popupTypes.appendChild(typeOneElement);

    if (data.types.length > 1) {
        const typeTwoElement = document.createElement("span");

        typeTwoElement.textContent = data.types[1].type.name;
        typeTwoElement.classList.add("type");

        setTypeColor(typeTwoElement, data.types[1].type.name);

        popupTypes.appendChild(typeTwoElement);
    }

    const popupName = document.getElementById("popupName");
    popupName.textContent = capitalizeFirstLetter(data.name);

    const popupStats = document.getElementById("popupStats");
    popupStats.innerHTML = "";

    data.stats.forEach((stat) => {
        const statElement = document.createElement("li");
        statElement.textContent = stat.stat.name;
        popupStats.appendChild(statElement);
    });
};

const setTypeColor = (element, type) => {
    element.style.color = `${typeColors[type]}`;
    element.style.border = `1px solid ${typeColors[type]}`;
};

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
