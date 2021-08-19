import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import PokemonListService from "../Services/PokemonListService";
import IPokemonData from "../Types/Pokemon";
import CapturedPokemons from "./CapturedPokemons";
import PokeComponentType from "../Types/PokeComponentType";
import NotCapturedPokemon from "./NotCapturedPokemon";
import {Container, Row, Col} from "react-bootstrap";
import PokemonImage from "./PokemonImage";
import CaptureButton from "./CaptureButton";
import EvolutionChain from "./EvolutionChain";

interface IPokemonSearchBoxComponent {
    placeholder: string;
    handleSearch: (e) => void;
}

const PokemonSearchBox: React.FC<IPokemonSearchBoxComponent> = (props) => {
    return <input type='search' placeholder={props.placeholder} onChange={props.handleSearch}/>
}

const PokemonList: React.FC<PokeComponentType> = (props) => {
    const {checkCapturedPokemon, setCapturePokemon} = props;
    const [pokemons, setPokemons] = useState<Array<IPokemonData>>([]);
    const [searchPokemon, setSearchPokemon] = useState<string>("");
    const [sortStatus, setSortStatus] = useState<boolean>(true);

    useEffect(() => {
        PokemonListService.getAll()
            .then((response: any) => {
                setPokemons(response.data.results);
            })
            .catch((e: any) => {
                console.log(e);
            })
    }, []);

    const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchPokemon(e.target.value.toLowerCase())
    }
    /**
     * Filter pokemon by name in SearchBox.
     *
     * @param pokemon
     */
    const filterPokemon = pokemon => pokemon.name.toLowerCase().includes(searchPokemon)
    /**
     * Sort by Desc and Asc
     *
     * @param a
     * @param b
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
        <div className="list-row">
            <div className="col-md-6">
                <h3>Pokemon List</h3>
                <PokemonSearchBox placeholder="Write Pokemon name" handleSearch={handleSearch}/>
                <Container>
                    <Row className="list-group">
                        <Col>
                            <Link to="/">Home</Link>
                        </Col>
                        <Col>
                            <button onClick={() => setSortStatus(!sortStatus)}>
                                ClickMe to sort {sortStatus ? 'ASK' : 'DESC'}
                            </button>
                        </Col>

                        {pokemons && pokemons.filter(filterPokemon).sort(sortingLogic).map((onePokemon, index) =>
                            (<Col key={index}>
                                <PokemonImage pokemon={onePokemon}/>
                                <Link to={`/pokemon/${onePokemon.name}`}>{onePokemon.name}</Link>
                                <CaptureButton pokemon={onePokemon} checkCapturedPokemon={checkCapturedPokemon}
                                               setCapturePokemon={setCapturePokemon}/>
                            </Col>)
                        )}
                    </Row>
                </Container>
            </div>
            <NotCapturedPokemon checkCapturedPokemon={checkCapturedPokemon} setCapturePokemon={setCapturePokemon}/>
            <CapturedPokemons checkCapturedPokemon={checkCapturedPokemon} setCapturePokemon={setCapturePokemon}/>
            <hr/>
        </div>
    )
}

export default PokemonList;
