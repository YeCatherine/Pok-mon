import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import PokemonListService from "../Services/PokemonListService";
import IPokemonData from "../Types/Pokemon";
import useLocalStorage from "../Hooks/useLocalStorage";

const PokemonList: React.FC = () => {

    const [pokemon, setPokemon] = useState<Array<IPokemonData>>([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [capturedPokemonList, setCapturedPokemonList] = useLocalStorage<Array<IPokemonData>>('capturedPokemonList', []);

    useEffect(() => {
        retrievePokemon();
    }, []);

    const retrievePokemon = () => {
        PokemonListService.getAll()
            .then((response: any) => {
                setPokemon(response.data.results);
                console.log(response.data)
            })
            .catch((e: any) => {
                console.log(e);
            })
    };

    const setCapturePokemon = (pokemon: IPokemonData, index: number) => {
        if (capturedPokemonList.indexOf(pokemon) !== null) {

            console.log(capturedPokemonList.indexOf(pokemon));

            setCapturedPokemonList([...capturedPokemonList, pokemon])
        }
    };

    return (
        <div className="list-row">
            <div className="col-md-6">
                <h3>Pokemon List</h3>
                <ul className="list-group">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {pokemon && pokemon.map((onePokemon, index) => {
                        const name = onePokemon.name;
                        return (
                            <li className={"list-group-item" + (index === currentIndex ? "active" : "")}
                                onClick={() => setCapturePokemon(onePokemon, index)}
                                key={index}
                            >
                                <Link to={`/pokemon/${name}`}>{name}</Link>
                                <button>Captured</button>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="col-md-6">
                <h3>Captured Pokemon List</h3>
                <ul className="list-group">
                    {capturedPokemonList && capturedPokemonList.map((onePokemon, index) => {
                        const name = onePokemon.name;
                        return (
                            <li className={"list-group-item" + (index === currentIndex ? "active" : "")}
                                onClick={() => setCapturePokemon(onePokemon, index)}
                                key={index}
                            >
                                {name}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )

}

export default PokemonList;