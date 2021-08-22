import React from "react";
import PokeComponentType from "../../Types/PokeComponentType";
import useLocalStorage from "../../Hooks/useLocalStorage";
import IPokemonData from "../../Types/Pokemon";
import PokemonCard from "./PokemonCard";

/**
 * Functional component for list of captured pokemon.
 * @param props Captured pokemon.
 * @constructor of CapturedPokemons.
 */
const CapturedPokemons: React.FC<PokeComponentType> = (props) => {
    const {checkCapturedPokemon, setCapturePokemon} = props;
    const [capturedPokemonList] = useLocalStorage<Array<IPokemonData>>('capturedPokemonList', []);
    const list = capturedPokemonList.map((currentPokemon, index) =>
        <PokemonCard key={index} pokemon={currentPokemon}
                     checkCapturedPokemon={checkCapturedPokemon}
                     setCapturePokemon={setCapturePokemon}/>
    );

    return (
        <>
            <h3>Captured Pokemon List</h3>
            <div
                className="list-group d-flex flex-wrap flex-row justify-content-center">{list}</div>
        </>
    );
}
export default CapturedPokemons;
