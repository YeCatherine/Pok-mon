import http from "../http-common";

/**
 * Retrieves the Get request from "/pokemon?limit= ".
 */
const getAll = (): any => {
    //@todo change limit after dev.
    return http.get("/pokemon?limit=30");
}

/**
 * Retrieves the Get request from `/evolution-chain/${id}`.
 * @param name The name of pokemon.
 */
const getEvolutionChain = (id: number): any => {
    return http.get(`/evolution-chain/${id}`)
}

/**
 * Retrieves the Get request from `/pokemon/${name}`.
 * @param name The name of pokemon.
 */
const get = (name: string): any => {
    return http.get(`/pokemon/${name}`);
}
const getSpecies = (name: string): any => {
    return http.get(`/pokemon-species/${name}`);
}


/**
 * Retrieves the Get request from `/move/${name}`.
 * @param name The name of pokemon.
 */
const getMove = (name: string): any => {
    return http.get(`/move/${name}`);
}

/**
 * Retrieves the Get request from separate endpoint.
 */
const PokemonListService = {
    getAll,
    get,
    getSpecies,
    getMove,
    getEvolutionChain
}

export default PokemonListService;
