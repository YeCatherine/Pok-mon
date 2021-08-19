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
                <div className="list-group d-flex flex-wrap flex-row justify-content-around">
                    <Ul>
                        <Li>{`My name is ${props?.pokemon?.name}`}
                            <ul>
                                <Image src={props?.pokemon?.sprites?.front_default}
                                       alt={props?.pokemon?.name}
                                       roundedCircle/>
                            </ul>
                        </Li>
                    </Ul>
                    <Ul>
                        <Li>My Types
                            <ul>
                                <Li>{`weight ${props?.pokemon?.weight}`}</Li>
                                <Li>{`height ${props?.pokemon?.height}`}</Li>
                                <Li>{`order ${props?.pokemon?.order}`}</Li>
                                {props?.pokemon?.types.map(type => (
                                    <Li key={type.type.name}>{type.type.name}</Li>))}
                            </ul>
                        </Li>
                    </Ul>
                    <Ul>
                        <Li>My Abilities
                            <ul>
                                {props?.pokemon?.abilities.map(ability => (
                                    <Li key={ability.ability.name}>{ability.ability.name}</Li>))}
                            </ul>
                        </Li>
                    </Ul>
                    <Ul>
                        <Li>My Moves
                            <ul>
                                {props?.pokemon?.moves.map(move => (
                                    <Li key={move.move.name}>
                                        <Link to={`/move/${move.move.name}`}>{move.move.name}</Link>
                                    </Li>))}
                            </ul>
                        </Li>
                    </Ul>
                </div>
            </Container>
        </>
    };

    return (
        <>
            <Pokemon key={pokemon?.name} pokemon={pokemon}/>
        </>);
};

export default PokemonPage;
