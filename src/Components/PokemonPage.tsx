import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import IPokemonData from "../Types/Pokemon";
import PokemonListService from "../Services/PokemonListService";

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
        console.log(pokemon)
    }, []);

    const Pokemon = (props) => {
        console.log(props);
        return <>
            <img src={props?.pokemon?.sprites?.front_default} alt="Logo"/>
            <ul>
                <li><span>weight:</span><span>{props?.pokemon?.weight}</span></li>
                <li><span>height:</span><span>{props?.pokemon?.height}</span></li>
                <li><span>order:</span><span>{props?.pokemon?.order}</span></li>
                <li><span><strong>types:</strong></span>
                    <ul>{props?.pokemon?.types.map(type => (<li>{type.type.name}</li>))}</ul>
                </li>
                <li><span><strong>Abilities:</strong></span>
                    <ul>{props?.pokemon?.abilities.map(ability => (<li>{ability.ability.name}</li>))}</ul>
                </li>
                <li><span><strong>Moves:</strong></span>
                    <ul>{props?.pokemon?.moves.map(move => (
                        <li><Link to={`/move/${move.move.name}`}>{move.move.name}</Link></li>))}</ul>
                </li>
            </ul>
        </>
    };


    return (<>
        <h1>Hello "{params.name}"</h1>
        <Link to="/">Back to main</Link>
        <Pokemon pokemon={pokemon}/>
    </>);
};

export default PokemonPage;