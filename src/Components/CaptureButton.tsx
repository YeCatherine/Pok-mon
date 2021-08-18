import IPokemonData from "../Types/Pokemon";
import React from "react";

interface ICaptureButton {
    pokemon: IPokemonData;
    checkCapturedPokemon: (pokemon: IPokemonData) => boolean;
    setCapturePokemon: (pokemon: IPokemonData) => void;
}

const CaptureButton: React.FC<ICaptureButton> = (props) => {
    const {pokemon, checkCapturedPokemon, setCapturePokemon} = props;
    return (<button
        onClick={() => setCapturePokemon(pokemon)}>
        {checkCapturedPokemon(pokemon) ? "Escape" : "Capture"}
    </button>);
}

export default CaptureButton;