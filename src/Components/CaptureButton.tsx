import React from "react";
import ICaptureButton from "../Types/ICaptureButton";

/**
 * The capture button functional component.
 * @param props The button status.
 * @constructor of CaptureButton.
 */
const CaptureButton: React.FC<ICaptureButton> = (props) => {
    const {pokemon, checkCapturedPokemon, setCapturePokemon} = props;
    return (
        <button className="btn btn-outline-secondary"
                onClick={() => setCapturePokemon(pokemon)}>
            {checkCapturedPokemon(pokemon) ? "Escape" : "Capture"}
        </button>);
}

export default CaptureButton;
