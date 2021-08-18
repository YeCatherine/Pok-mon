import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import PokemonListService from "../Services/PokemonListService";
import IPokemonData from "../Types/Pokemon";
import CapturedPokemons from "./CapturedPokemons";
import PokeComponentType from "../Types/PokeComponentType";

const PokemonList: React.FC<PokeComponentType> = (props) => {
    const {checkCapturedPokemon, setCapturePokemon} = props;
    const [pokemon, setPokemon] = useState<Array<IPokemonData>>([]);
    const [sortStatus, setSortStatus] = useState(true);

    useEffect(() => {
        PokemonListService.getAll()
            .then((response: any) => {
                setPokemon(response.data.results);
                console.log(response.data + "response")
                console.log(response.data.results)
            })
            .catch((e: any) => {
                console.log(e);
            })
    }, []);

    const sortingLogic = (a: IPokemonData, b: IPokemonData) => {
        if (a.name > b.name) {
            return sortStatus ? 1 : -1
        }
        if (a.name < b.name) {
            return sortStatus ? -1 : 1
        }
        return 0;
    }

    return (
        <div className="list-row">
            <div className="col-md-6">
                <h3>Pokemon List</h3>
                <ul className="list-group">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <button onClick={() => setSortStatus(!sortStatus)}>
                        ClickMe to sort {sortStatus ? 'ASK' : 'DESC'}
                    </button>
                    {pokemon && pokemon.sort(sortingLogic).map((onePokemon, index) =>
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
            <hr/>

        </div>
    )
}

export default PokemonList;