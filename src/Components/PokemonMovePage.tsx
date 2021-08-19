import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import IPokemonData from "../Types/Pokemon";
import PokemonListService from "../Services/PokemonListService";
import {Container, ListGroup as Ul, ListGroupItem as Li} from "react-bootstrap";
import PokemonImage from "./PokemonImage";
import CaptureButton from "./CaptureButton";

/**
 * Functional component for pokemon move page.
 * @param props Pokemon move name.
 * @constructor The functional component for pokemon move page.
 */
const PokemonMovePage: React.FC = (props) => {
    const params = useParams<any>();
    const [move, setMove] = useState<IPokemonData>();

    /**
     * Gets all pokemon moves.
     */
    useEffect(() => {
        PokemonListService.getMove(params.name)
            .then((response: any) => {
                setMove(response.data);
                console.log(response.data);
            })
            .catch((e: any) => {
                console.log(e);
            });
        console.log(move)
    }, [move, params.name]);

    /**
     * Retrieves the list of pokemon moves.
     * @param props The pokemon.
     * @constructor Functional component of pokemon moves.
     */
    const Move = (props) => {
        console.log(props);
        return <>
            <h1>Related Pokemon</h1>
            <Container>
                <div className="list-group d-flex flex-wrap flex-row">
                    {props?.move?.learned_by_pokemon && props?.move?.learned_by_pokemon.map((onePokemon, index) =>
                        (<div className="card text-dark text-center col-md-3" key={index}>
                            <PokemonImage pokemon={onePokemon}/>
                            <Link className="card-header"
                                  to={`/pokemon/${onePokemon.name}`}>{onePokemon.name}
                            </Link>
                        </div>)
                    )}
                </div>
            </Container>
        </>
    };

    return (
        <div>
            <div>
                <h2>Move name "{params.name}"</h2>
                <Link to="/">Back to main</Link>
                <Move move={move}/>
            </div>
        </div>
    );
};

export default PokemonMovePage;
