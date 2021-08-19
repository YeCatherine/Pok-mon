import IPokemonData from "./Pokemon";

/**
 * The interface for ICaptureButton button.
 */
export default interface ICaptureButton {
    pokemon: IPokemonData;
    checkCapturedPokemon: (pokemon: IPokemonData) => boolean;
    setCapturePokemon: (pokemon: IPokemonData) => void;
}
