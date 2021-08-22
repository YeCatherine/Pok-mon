import React, {useState, useEffect} from "react";
import PokemonListService from "../../Services/PokemonListService";
import IPokemonData from "../../Types/Pokemon";
import CapturedPokemons from "../UI/CapturedPokemons";
import PokeComponentType from "../../Types/PokeComponentType";
import NotCapturedPokemon from "../UI/NotCapturedPokemon";
import {Container, Col, Row} from "react-bootstrap";
import IPokemonSearchBox from "../../Types/IPokemonSearchBox";
import PokemonCard from "../UI/PokemonCard";

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
     *
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
    if (!pokemons) return <h1>Loading...</h1>
    return (
        <Container fluid="md">
            <Row><Col><h1>Pokemon List</h1></Col></Row>
            <Row>
                <Col>
                    <CapturedPokemons
                        checkCapturedPokemon={checkCapturedPokemon}
                        setCapturePokemon={setCapturePokemon}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <NotCapturedPokemon
                        checkCapturedPokemon={checkCapturedPokemon}
                        setCapturePokemon={setCapturePokemon}/>
                </Col>
            </Row>
            <Row>
                <Col md={8}>
                    <PokemonSearchBox placeholder="Pokemon name"
                                      handleSearch={handleSearch}/></Col>
                <Col md={4}>
                    <button
                        onClick={() => setSortStatus(!sortStatus)}>
                        Sort {sortStatus ? 'ASC' : 'DESC'}
                    </button>
                </Col>
            </Row>
            <div
                className="list-group d-flex flex-wrap flex-row  align-content-between">
                {pokemons.filter(filterPokemon).sort(sortingLogic).map((pokemon, index) =>
                    <PokemonCard key={index} pokemon={pokemon}
                                 checkCapturedPokemon={checkCapturedPokemon}
                                 setCapturePokemon={setCapturePokemon}/>
                )}
            </div>
        </Container>
    )
}

export default PokemonList;
