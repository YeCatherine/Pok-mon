import React from "react";
import usePokemonCapture from "../../Hooks/usePokemonCapture";
import IPokemonSimpleComponent from "../../Types/IPokemonSimpleComponent";

/**
 * The capture button functional component.
 * @param props The button status.
 * @constructor of CaptureButton.
 */
const CaptureButton: React.FC<IPokemonSimpleComponent> = (props) => {
    const {setCapturedPokemons, checkCapturedPokemon} = usePokemonCapture();
    const {pokemon} = props;

    return (
        <button className="btn btn-outline-secondary"
                onClick={() => setCapturedPokemons(pokemon)}>
            {checkCapturedPokemon(pokemon) ? "Escape" : "Capture"}
        </button>);
}

export default CaptureButton;
