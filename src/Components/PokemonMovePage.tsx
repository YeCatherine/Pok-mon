import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

import IPokemonData from "../Types/Pokemon";
import PokeComponentType from "../Types/PokeComponentType";
import PokemonListService from "../Services/PokemonListService";

const PokemonMovePage: React.FC = (props) => {
    const params = useParams<any>();
    const [move, setMove] = useState<IPokemonData>();

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
    }, []);

    const Move = (props) => {
        console.log(props);
        return <>
            <h1>Related Pokemon</h1>
            <ul>
                {props?.move?.learned_by_pokemon.map(pokemon => <li>{pokemon.name}</li>)}
            </ul>
        </>

    };


    return (<>
        <h1>Move name "{params.name}"</h1>
        <Link to="/">Back to main</Link>
        <Move move={move}/>
    </>);
};

export default PokemonMovePage;