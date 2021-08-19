import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import PokemonListService from "../Services/PokemonListService";
import IPokemonData from "../Types/Pokemon";
import CapturedPokemons from "./CapturedPokemons";
import PokeComponentType from "../Types/PokeComponentType";
import NotCapturedPokemon from "./NotCapturedPokemon";
import {Container, Col} from "react-bootstrap";
import PokemonImage from "./PokemonImage";
import CaptureButton from "./CaptureButton";
import IPokemonSearchBox from "../Types/IPokemonSearchBox";

/**
 * Searches pokemon.
 * @param props Pokemon list.
 * @constructor The functional component of PokemonSearchBox.
 */
const PokemonSearchBox: React.FC<IPokemonSearchBox> = (props) => {
    return <input
        className="p-2 flex-grow-1"
        type='search'
        placeholder={props.placeholder}
        onChange={props.handleSearch}/>
}

/**
 * Generates the list of pokemon.
 * @param props The list of pokemon.
 * @constructor The functional component of PokemonList.
 */
const PokemonList: React.FC<PokeComponentType> = (props) => {
    const {checkCapturedPokemon, setCapturePokemon} = props;
    const [pokemons, setPokemons] = useState<Array<IPokemonData>>([]);
    const [searchPokemon, setSearchPokemon] = useState<string>("");
    const [sortStatus, setSortStatus] = useState<boolean>(true);

    /**
     * Retrieves all pokemon.
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
     * Handles search on input.
     * @param e Event.
     */
    const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchPokemon(e.target.value.toLowerCase())
    }
    /**
     * Filter pokemon by name in SearchBox.
     *
     * @param pokemon All pokemon.
     */
    const filterPokemon = pokemon => pokemon.name.toLowerCase().includes(searchPokemon)
    /**
     * Sorts pokemon by Desc and Asc.
     * @param a Previous item.
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

    return (
        <div className="row">
            <div>
                <h1>Pokemon List</h1>
                <Container>
                    <>
                        <div className="list-group d-flex flex-wrap flex-row bd-highlight">
                            <PokemonSearchBox placeholder="Pokemon name" handleSearch={handleSearch}/>
                            <Col>
                                <button onClick={() => setSortStatus(!sortStatus)}>
                                    Sort {sortStatus ? 'ASC' : 'DESC'}
                                </button>
                            </Col>
                        </div>
                        <div className="list-group d-flex flex-wrap flex-row  align-content-between">
                            {pokemons && pokemons.filter(filterPokemon).sort(sortingLogic).map((onePokemon, index) =>
                                (<div className="card text-dark text-center" key={index}>
                                    <PokemonImage pokemon={onePokemon}/>
                                    <Link className="card-header"
                                          to={`/pokemon/${onePokemon.name}`}>{onePokemon.name}
                                    </Link>
                                    <CaptureButton pokemon={onePokemon} checkCapturedPokemon={checkCapturedPokemon}
                                                   setCapturePokemon={setCapturePokemon}/>
                                </div>)
                            )}
                        </div>
                    </>
                    <CapturedPokemons checkCapturedPokemon={checkCapturedPokemon}
                                      setCapturePokemon={setCapturePokemon}/>
                    <NotCapturedPokemon checkCapturedPokemon={checkCapturedPokemon}
                                        setCapturePokemon={setCapturePokemon}/>
                </Container>
            </div>
            <hr/>
        </div>
    )
}

export default PokemonList;
