import React from "react";
import {Image} from "react-bootstrap";
import IPokemonData from "../Types/Pokemon";

interface IPokemonComponent {
    pokemon: IPokemonData
}

const PokemonImage: React.FC<IPokemonComponent> = (props) => {
    const urlParts = props.pokemon.url.split("/");
    const id = urlParts[urlParts.length - 2];
    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    return <Image alt={props.pokemon.name} src={imgUrl} roundedCircle/>
}

export default PokemonImage;
