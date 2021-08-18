import http from "../http-common";

const getAll = (): any => {
    return http.get("/pokemon?limit=1000");
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
