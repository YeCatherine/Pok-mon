import http from "../http-common";

const getAll = (): any => {
    return http.get("/pokemon");
}
const get = (name: string): any => {
    return http.get(`/pokemon/${name}`);
}
}

const PokemonListService = {
    getAll,
    get,
}

export default PokemonListService;
