import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import IPokemonData from "../Types/Pokemon";
import PokemonListService from "../Services/PokemonListService";
import {
    Container,
    Image,
    ListGroup as Ul,
    ListGroupItem as Li
} from "react-bootstrap";
import EvolutionChain from "./EvolutionChain";
import {useGlobalContext} from '../Services/Context'

/**
 * Outputs the list of pokemon weight, height, order, type name, abilities, moves.
 * @param props The pokemon.
 * @constructor Functional component of pokemon page.
 */
const PokemonPage: React.FC = (props) => {
    const params = useParams<any>();
    const [pokemon, setPokemon] = useState<IPokemonData>();
    const [name, setName] = useState<string>("");
    const {language} = useGlobalContext()

    useEffect(() => {
        PokemonListService.get(params.name)
            .then((response: any) => {
                setPokemon(response.data);
            })
            .catch((e: any) => {
                console.log(e);
            });
    }, [params.name]);

    PokemonListService.getSpecies(params.name)
        .then((response: any) => {
            const translatedName = response.data.names.filter(lang => lang.language.name === language)
            setName(translatedName[0].name);
        }).catch((e: any) => {
        console.log(e);
    });

    /**
     * Outputs the pokemon properties.
     * @param props The pokemon.
     * @constructor Pokemon properties.
     */
    const Pokemon = (props) => {
        return <>
            <Container>
                <div
                    className="list-group d-flex flex-wrap flex-row justify-content-around">
                    <Ul>
                        <Li className="pokemon">
                            {`My name is "${name}"`}
                            <ul>
                                <Image
                                    src={props?.pokemon?.sprites?.front_default}
                                    alt={props?.pokemon?.name}
                                    roundedCircle/>
                            </ul>
                        </Li>
                    </Ul>
                    <Ul><Li><EvolutionChain pokemon={props?.pokemon}/></Li></Ul>
                    <Ul>
                        <Li>Base Stats
                            <ul>
                                {props?.pokemon?.stats.map(st => (
                                    <Li key={st.stat.name}>{st.stat.name} - {st.base_stat}</Li>))}
                            </ul>
                        </Li>
                    </Ul>
                    <Ul>
                        <Li>My Type
                            <ul>
                                {props?.pokemon?.types.map(typ => (
                                    <Li key={typ.type.name}>{typ.type.name}</Li>))}
                            </ul>
                        </Li>
                    </Ul>
                    <Ul>
                        <Li>My Size
                            <ul>
                                <Li>{`weight ${props?.pokemon?.weight}`}</Li>
                                <Li>{`height ${props?.pokemon?.height}`}</Li>
                                <Li>{`order ${props?.pokemon?.order}`}</Li>
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
                                        <Link
                                            to={`/move/${move.move.name}`}>{move.move.name}</Link>
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
            {pokemon && <Pokemon key={pokemon?.name} pokemon={pokemon}/>}
        </>);
}


export default PokemonPage;
