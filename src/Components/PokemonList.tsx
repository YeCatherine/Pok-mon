import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import PokemonListService from "../Services/PokemonListService";
import IPokemonData from "../Types/Pokemon";
import CapturedPokemons from "./CapturedPokemons";
import PokeComponentType from "../Types/PokeComponentType";
import NotCapturedPokemon from "./NotCapturedPokemon";
import {Container, Row, Col, ListGroup as Ul, ListGroupItem as Li, Image} from "react-bootstrap";
import PokemonImage from "./PokemonImage";
import CaptureButton from "./CaptureButton";

const PokemonList: React.FC<PokeComponentType> = (props) => {
    const {checkCapturedPokemon, setCapturePokemon} = props;
    const [pokemons, setPokemons] = useState<Array<IPokemonData>>([]);
    const [sortStatus, setSortStatus] = useState(true);

    useEffect(() => {
        PokemonListService.getAll()
            .then((response: any) => {
                setPokemons(response.data.results);
            })
            .catch((e: any) => {
                console.log(e);
            })
    }, []);

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

                        {pokemons && pokemons.sort(sortingLogic).map((onePokemon, index) =>
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
