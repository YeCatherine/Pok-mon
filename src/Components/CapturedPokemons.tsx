import React from "react";
import PokeComponentType from "../Types/PokeComponentType";
import useLocalStorage from "../Hooks/useLocalStorage";
import IPokemonData from "../Types/Pokemon";
import {ListGroup} from "react-bootstrap";

interface ICaptureButton {
    pokemon: IPokemonData;
    checkCapturedPokemon: (pokemon: IPokemonData) => boolean;
    setCapturePokemon: (pokemon: IPokemonData) => void;
}

const CaptureButton: React.FC<ICaptureButton> = (props) => {
    const {pokemon, checkCapturedPokemon, setCapturePokemon} = props;
    return (<button
        onClick={() => setCapturePokemon(pokemon)}>
        {checkCapturedPokemon(pokemon) ? "Escape" : "Capture"}
    </button>);
}
const CapturedPokemons: React.FC<PokeComponentType> = (props) => {
    const {checkCapturedPokemon, setCapturePokemon} = props;
    const [capturedPokemonList] = useLocalStorage<Array<IPokemonData>>('capturedPokemonList', []);
    const list = capturedPokemonList.map((currentPokemon, index) =>
        (<ListGroup.Item key={index}>
            {currentPokemon.name}
            <CaptureButton pokemon={currentPokemon} checkCapturedPokemon={checkCapturedPokemon}
                           setCapturePokemon={setCapturePokemon}/>
        </ListGroup.Item>)
    );

    return (
        <>
            <div className="col-md-6">
                <h3>Captured Pokemon List</h3>
                <ListGroup className="list-group">
                    {list}
                </ListGroup>
            </div>
        </>
    );
}
export default CapturedPokemons;
