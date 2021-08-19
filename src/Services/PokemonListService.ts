import http from "../http-common";

const getAllPokemon = (): any => {
    return http.get("/pokedex/1/")
}

const getAll = (): any => {
    return http.get("/pokemon?limit=1000");
}

const getEvolutionChain = (id: number): any => {
    return http.get(`/evolution-chain/${id}`)
}
const get = (name: string): any => {
    return http.get(`/pokemon/${name}`);
}
const getMove = (name: string): any => {
    return http.get(`/move/${name}`);
}
const PokemonListService = {
    getAll,
    get,
    getMove,
    getAllPokemon,
    getEvolutionChain
}

export default PokemonListService;
