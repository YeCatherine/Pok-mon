import React, {useState, useEffect} from "react";
import PokemonListService from "../Services/PokemonListService";
import IPokemonData from "../Types/Pokemon";

const PokemonList: React.FC = () => {

    const [pokemon, setPokemon] = useState<Array<IPokemonData>>([]);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        retrievePokemon();
    }, []);

    const retrievePokemon = () => {
        PokemonListService.getAll()
            .then((response:any) => {
                setPokemon(response.data.results);
                console.log(response.data)
            })
            .catch((e:any) => {
                console.log(e);
            })
    }

    return(
        <div className="list-row">
            <div className="col-md-6">
                <h3>Pokemon List</h3>
                <ul className="list-group">
                    {pokemon && pokemon.map((onePokemon,index) =>(
                        <li className={"list-group-item" + (index ===currentIndex ? "active" : "")}>
                            {onePokemon.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )

}

export default PokemonList;