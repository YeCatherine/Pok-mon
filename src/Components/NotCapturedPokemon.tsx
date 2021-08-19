import React, {useState, useEffect} from "react";
import PokemonListService from "../Services/PokemonListService";
import IPokemonData from "../Types/Pokemon";
import PokeComponentType from "../Types/PokeComponentType";
import useLocalStorage from "../Hooks/useLocalStorage";

/**
 * Functional component for random notcaptured pokemon.
 * @param props Captured pokemon.
 * @constructor of NotCapturedPokemon.
 */
const NotCapturedPokemon: React.FC<PokeComponentType> = (props) => {
    const [pokemons, setPokemons] = useState<Array<IPokemonData>>([]);
    const [capturedPokemonList] = useLocalStorage<Array<IPokemonData>>('capturedPokemonList', []);
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
        let captured: Array<IPokemonData> = Array.from(capturedPokemonList);

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
    }, [capturedPokemonList, pokemons]);

    return (
        <>
            <div className="col-md-6">
                <h3>Random not Captured Pokemon</h3>
                {randomPokemon && randomPokemon.name}
            </div>
        </>
    );
}
export default NotCapturedPokemon;
