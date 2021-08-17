import http from "../http-common";

const getAll = (): any => {
    return http.get("/pokemon?");
}

const PokemonListService = {
    getAll
}

export default PokemonListService;
