import React, {useState, useEffect} from "react";
import PokemonListService from "../../Services/PokemonListService";
import IPokemonData from "../../Types/IPokemonData";
import PokemonCard from "../UI/PokemonCard";
import PokemonSearchBox from "../UI/PokemonSearchBox";

/**
 * Generates the list of pokemon.
 *
 * @param props The list of pokemon.
 *
 * @constructor The functional component of PokemonList.
 */
const PokemonList: React.FC = (props) => {

    const [pokemons, setPokemons] = useState<Array<IPokemonData>>([]);
    const [searchPokemon, setSearchPokemon] = useState<string>("");
    const [sortStatus, setSortStatus] = useState<boolean>(true);

    /**
     * Retrieves all pokemons.
     */
    useEffect(() => {
        PokemonListService.getAll()
            .then((response: any) => {
                setPokemons(response.data.results);
            })
            .catch((e: any) => {
                console.warn(e);
            })
    }, []);

    /**
     * Handles search on input.
     *
     * @param e Event.
     */
    const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchPokemon(e.target.value.toLowerCase())
    }

    /**
     * Filter pokemon by name in SearchBox.
     *
     * @param pokemon All pokemons.
     */
    const filterPokemon = pokemon => pokemon.name.toLowerCase().includes(searchPokemon)

    /**
     * Sorts pokemon by Desc and Asc.
     *
     * @param a Previous item.
     *
     * @param b Next item.
     */
    const sortingLogic = (a: IPokemonData, b: IPokemonData) => {
        if (a.name > b.name) {
            return sortStatus ? 1 : -1
        }
        if (a.name < b.name) {
            return sortStatus ? -1 : 1
        }
        return 0;
    }

    if (!pokemons) return <h1>Loading...</h1>

    return (
        <>
            <PokemonSearchBox placeholder="Pokemon name"
                              handleSearch={handleSearch}/>
            <button
                onClick={() => setSortStatus(!sortStatus)}>Sort {sortStatus ? 'ASC' : 'DESC'}</button>
            <div
                className="list-group d-flex flex-wrap flex-row  align-content-between">
                {pokemons.filter(filterPokemon).sort(sortingLogic).map((pokemon, index) =>
                    <PokemonCard key={index} pokemon={pokemon}/>
                )}
            </div>
        </>
    )
}

export default PokemonList;
