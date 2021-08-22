import React, {useState, useEffect} from "react";
import PokemonListService from "../../Services/PokemonListService";
import usePokemonCapture from "../../Hooks/usePokemonCapture";
import IPokemonData from "../../Types/IPokemonData";
import PokemonCard from "./PokemonCard";

/**
 * Functional component for random notcaptured pokemon.
 * @param props Captured pokemon.
 * @constructor of NotCapturedPokemon.
 */
const NotCapturedPokemon: React.FC = (props) => {
    const [pokemons, setPokemons] = useState<Array<IPokemonData>>([]);
    const {capturedPokemons} = usePokemonCapture();
    const [randomPokemon, setRandomPokemon] = useState<IPokemonData>();

    /**
     * Gets the all pokemon.
     */
    useEffect(() => {
        PokemonListService.getAll()
            .then((response: any) => {
                setPokemons(response.data.results);
            })
            .catch((e: any) => {
                console.log(e);
            })
    }, []);

    /**
     * Gets the random pokemon.
     */
    useEffect(() => {
        let captured: Array<IPokemonData> = Array.from(capturedPokemons);

        const freePokemons = pokemons.filter(x => {
            for (let capturedIndex in captured) {
                if (captured[capturedIndex].name === x.name) {
                    // Remove captured from the list of comparison to reduce task complexity.
                    captured = captured.splice(0, 1);
                    return false;
                }
            }
            return x;
        });
        setRandomPokemon(freePokemons[Math.floor(Math.random() * freePokemons.length)]);
    }, [capturedPokemons, pokemons]);

    if (!randomPokemon) return null;
    return (
        <>
            <h3>Random not Captured Pokemon</h3>
            <div
                className="list-group d-flex flex-wrap flex-row justify-content-center">
                <PokemonCard pokemon={randomPokemon}/>
            </div>
        </>
    );
}
export default NotCapturedPokemon;
