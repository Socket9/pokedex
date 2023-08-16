const typeColors = {
    electric: "#F7D02C",
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    ice: "#96D9D6",
    grass: "#7AC74C",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
    default: "#2A1A1F",
};

window.addEventListener("DOMContentLoaded", pageLoadedEvent);

const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");
const closeButton = document.getElementById("closeButton");
