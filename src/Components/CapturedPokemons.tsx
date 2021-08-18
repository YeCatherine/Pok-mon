import React from "react";
import PokeComponentType from "../Types/PokeComponentType";
import useLocalStorage from "../Hooks/useLocalStorage";
import IPokemonData from "../Types/Pokemon";

const CapturedPokemons: React.FC<PokeComponentType> = (props) => {
    const {checkCapturedPokemon, setCapturePokemon} = props;
    const [capturedPokemonList] = useLocalStorage<Array<IPokemonData>>('capturedPokemonList', []);
    const list = capturedPokemonList.map((currentPokemon, index) =>
        (<li key={index}>
            {currentPokemon.name}
            <button
                onClick={() => setCapturePokemon(currentPokemon)}>
                {checkCapturedPokemon(currentPokemon) ? "Escape" : "Capture"}
            </button>
        </li>)
    );

    return (
        <>
            <div className="col-md-6">
                <h3>Captured Pokemon List</h3>
                <ul className="list-group">
                    {list}
                </ul>
            </div>
        </>
    );

}
export default CapturedPokemons;