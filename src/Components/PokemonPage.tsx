import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import IPokemonData from "../Types/Pokemon";
import PokemonListService from "../Services/PokemonListService";
import {Container, Row, Col, Image, ListGroup as Ul, ListGroupItem as Li} from "react-bootstrap";

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
    }, []);

    const Pokemon = (props) => {

        return <>

            <Container>
                <Row>
                    <Col xs={6} md={4}>
                        <Image src={props?.pokemon?.sprites?.front_default} alt={props?.pokemon?.name} roundedCircle/>
                    </Col>
                    <Col xs={6} md={4}>
                        <Ul>
                            <Li><span>weight:</span><span>{props?.pokemon?.weight}</span></Li>
                            <Li><span>height:</span><span>{props?.pokemon?.height}</span></Li>
                            <Li><span>order:</span><span>{props?.pokemon?.order}</span></Li>
                        </Ul>
                        <Ul>
                            <Li><h2>types:</h2>
                                <ul>{props?.pokemon?.types.map(type => (
                                    <Li>{type.type.name}</Li>))}</ul>
                            </Li>
                        </Ul>
                        <Ul>
                            <Li><span><strong>Abilities:</strong></span>
                                <ul>{props?.pokemon?.abilities.map(ability => (
                                    <Li>{ability.ability.name}</Li>))}</ul>
                            </Li>
                        </Ul>
                        <Ul>
                            <Li><span><strong>Moves:</strong></span>
                                <ul>{props?.pokemon?.moves.map(move => (
                                    <Li><Link
                                        to={`/move/${move.move.name}`}>{move.move.name}</Link></Li>))}</ul>
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
        <Pokemon pokemon={pokemon}/>
    </>);
};

export default PokemonPage;
