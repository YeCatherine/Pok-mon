import http from "../http-common";

//@todo change limit after dev.
const getAll = (): any => {
    return http.get("/pokemon?limit=10");
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
    getMove
}

export default PokemonListService;
