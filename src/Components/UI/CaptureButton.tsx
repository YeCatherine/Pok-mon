import React from "react";
import usePokemonCapture from "../../Hooks/usePokemonCapture";
import IPokemonSimpleComponent from "../../Types/IPokemonSimpleComponent";
import {Button} from "react-bootstrap";

/**
 * The capture button functional component.
 * @param props The button status.
 * @constructor of CaptureButton.
 */
const CaptureButton: React.FC<IPokemonSimpleComponent> = (props) => {
    const {setCapturedPokemons, checkCapturedPokemon} = usePokemonCapture();
    const {pokemon} = props;

    return (
        <Button variant="primary"
                onClick={() => setCapturedPokemons(pokemon)}>
            {checkCapturedPokemon(pokemon) ? "Free" : "Capture"}
        </Button>);
}

export default CaptureButton;
