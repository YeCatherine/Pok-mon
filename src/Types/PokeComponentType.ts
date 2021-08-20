import IPokemonData from "./Pokemon";

/**
 * Pokemon data type.
 */
export default interface PokeComponentType {
    pokemon?: IPokemonData;
    checkCapturedPokemon?: (pokemon: IPokemonData) => boolean;
    setCapturePokemon?: (pokemon: IPokemonData) => void;
}
