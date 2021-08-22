import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import IPokemonData from "../../Types/IPokemonData";
import IPokemonSimpleComponent from "../../Types/IPokemonSimpleComponent";
import PokemonListService from "../../Services/PokemonListService";
import {
    Container,
    Image,
    ListGroup as Ul,
    ListGroupItem as Li
} from "react-bootstrap";
import EvolutionChain from "../UI/EvolutionChain";
import {useGlobalContext} from '../../Services/Context'
import PokemonCard from "../UI/PokemonCard";

/**
 * Outputs the list of pokemon weight, height, order, type name, abilities, moves.
 * @param props The pokemon.
 * @constructor Functional component of pokemon page.
 */
const PokemonPage: React.FC = (props) => {
    const params = useParams<any>();
    const [pokemon, setPokemon] = useState<IPokemonData>();
    const [pokemonSpecies, setPokemonSpecies] = useState<IPokemonData>();
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

        PokemonListService.getSpecies(params.name)
            .then((response: any) => {
                setPokemonSpecies(response.data);
                const translatedName = response.data.names.filter(lang => lang.language.name === language)
                setName((translatedName[0].name) ? translatedName[0].name : params.name);
            }).catch((e: any) => {
            console.log(e);
        });
    }, []);


    if (typeof pokemon === 'undefined' || typeof pokemonSpecies === 'undefined') return (<h1>Loading...</h1>);

    return (<>
        <Container>
            <div
                className="list-group d-flex flex-wrap flex-row justify-content-around">
                <Ul>
                    <Li className="pokemon">
                        {`My name is "${name}"`}
                        <Ul>
                            <PokemonCard pokemon={pokemon}/>
                        </Ul>
                    </Li>
                </Ul>
                <Ul><Li><EvolutionChain pokemon={pokemon}
                                        pokemonSpecies={pokemonSpecies}/></Li></Ul>
                <Ul>
                    <Li>Base Stats
                        <Ul>
                            {pokemon.stats.map(st => (
                                <Li key={st.stat.name}>{st.stat.name} - {st.base_stat}</Li>))}
                        </Ul>
                    </Li>
                </Ul>
                <Ul>
                    <Li>My Type
                        <Ul>
                            {pokemon.types.map(typ => (
                                <Li key={typ.type.name}>{typ.type.name}</Li>))}
                        </Ul>
                    </Li>
                </Ul>
                <Ul>
                    <Li>My Size
                        <Ul>
                            <Li>{`weight ${pokemon.weight}`}</Li>
                            <Li>{`height ${pokemon.height}`}</Li>
                            <Li>{`order ${pokemon.order}`}</Li>
                        </Ul>
                    </Li>
                </Ul>
                <Ul>
                    <Li>My Abilities
                        <ul>
                            {pokemon.abilities.map(ability => (
                                <Li key={ability.ability.name}>{ability.ability.name}</Li>))}
                        </ul>
                    </Li>
                </Ul>
                <Ul>
                    <Li>My Moves
                        <Ul>
                            {pokemon.moves.map(move => (
                                <Li key={move.move.name}>
                                    <Link
                                        to={`/move/${move.move.name}`}>{move.move.name}</Link>
                                </Li>))}
                        </Ul>
                    </Li>
                </Ul>
            </div>
        </Container>
    </>);

};


export default PokemonPage;
