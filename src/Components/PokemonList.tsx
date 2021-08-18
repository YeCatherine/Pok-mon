import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import PokemonListService from "../Services/PokemonListService";
import IPokemonData from "../Types/Pokemon";
import CapturedPokemons from './CapturedPokemons';
import PokeComponentType from "../Types/PokeComponentType";

const PokemonList: React.FC<PokeComponentType> = (props) => {
    const {checkCapturedPokemon, setCapturePokemon} = props;
    const [pokemon, setPokemon] = useState<Array<IPokemonData>>([]);

    useEffect(() => {
        PokemonListService.getAll()
            .then((response: any) => {
                setPokemon(response.data.results);
                console.log(response.data)
            })
            .catch((e: any) => {
                console.log(e);
            })
    }, []);

    return (
        <div className="list-row">
            <div className="col-md-6">
                <h3>Pokemon List</h3>
                <ul className="list-group">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {pokemon && pokemon.map((onePokemon, index) =>
                        (<li key={index}>
                            <Link to={`/pokemon/${onePokemon.name}`}>{onePokemon.name}</Link>
                            <button
                                onClick={() => setCapturePokemon(onePokemon)}>
                                {checkCapturedPokemon(onePokemon) ? "Escape" : "Capture"}
                            </button>
                        </li>)
                    )}
                </ul>
            </div>
            <CapturedPokemons checkCapturedPokemon={checkCapturedPokemon} setCapturePokemon={setCapturePokemon}/>
        </div>
    )
}

export default PokemonList;