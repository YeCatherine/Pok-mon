import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import IPokemonData from "../Types/Pokemon";
import PokemonListService from "../Services/PokemonListService";
import {Container, Row, Col, Image, ListGroup as Ul, ListGroupItem as Li} from "react-bootstrap";

/**
 * Outputs the list of pokemon weight, height, order, type name, abilities, moves.
 * @param props The pokemon.
 * @constructor Functional component of pokemon page.
 */
const PokemonPage: React.FC = (props) => {
    const params = useParams<any>();
    const [pokemon, setPokemon] = useState<IPokemonData>();

    useEffect(() => {
        PokemonListService.get(params.name)
            .then((response: any) => {
                setPokemon(response.data);
                console.log(response.data);
            })
            .catch((e: any) => {
                console.log(e);
            });
    }, [params.name]);

    /**
     * Outputs the pokemon properties.
     * @param props The pokemon.
     * @constructor Pokemon properties.
     */
    const Pokemon = (props) => {
        return <>
            <Container>
                <Row>
                    <Col xs={6} md={4}>
                        <Image src={props?.pokemon?.sprites?.front_default}
                               alt={props?.pokemon?.name}
                               roundedCircle/>
                    </Col>
                    <Col xs={6} md={4}>
                        <Ul>
                            <Li><span>weight:</span><span>{props?.pokemon?.weight}</span></Li>
                            <Li><span>height:</span><span>{props?.pokemon?.height}</span></Li>
                            <Li><span>order:</span><span>{props?.pokemon?.order}</span></Li>
                        </Ul>
                        <Ul>
                            <Li><span><strong>Types:</strong></span>
                                <ul>
                                    {props?.pokemon?.types.map(type => (
                                        <Li key={type.type.name}>{type.type.name}</Li>))}
                                </ul>
                            </Li>
                        </Ul>
                        <Ul>
                            <Li><span><strong>Abilities:</strong></span>
                                <ul>
                                    {props?.pokemon?.abilities.map(ability => (
                                        <Li key={ability.ability.name}>{ability.ability.name}</Li>))}
                                </ul>
                            </Li>
                        </Ul>
                        <Ul>
                            <Li><span><strong>Moves:</strong></span>
                                <ul>
                                    {props?.pokemon?.moves.map(move => (
                                        <Li key={move.move.name}>
                                            <Link to={`/move/${move.move.name}`}>{move.move.name}</Link>
                                        </Li>))}
                                </ul>
                            </Li>
                        </Ul>
                    </Col>
                </Row>
            </Container>
        </>
    };

    return (<>
        <h1>Hello "{params.name}"</h1>
        <Link to="/">Back to main</Link>
        <Pokemon key={pokemon?.name} pokemon={pokemon}/>
    </>);
};

export default PokemonPage;
