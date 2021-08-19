import React from "react";
import PokeComponentType from "../Types/PokeComponentType";
import useLocalStorage from "../Hooks/useLocalStorage";
import IPokemonData from "../Types/Pokemon";
import {ListGroup as Lg} from "react-bootstrap";
import CaptureButton from "./CaptureButton";

/**
 * Functional component for list of captured pokemon.
 * @param props Captured pokemon.
 * @constructor of CapturedPokemons.
 */
const CapturedPokemons: React.FC<PokeComponentType> = (props) => {
    const {checkCapturedPokemon, setCapturePokemon} = props;
    const [capturedPokemonList] = useLocalStorage<Array<IPokemonData>>('capturedPokemonList', []);
    const list = capturedPokemonList.map((currentPokemon, index) =>
        (<Lg.Item key={index}>
            {currentPokemon.name}
            <CaptureButton pokemon={currentPokemon} checkCapturedPokemon={checkCapturedPokemon}
                           setCapturePokemon={setCapturePokemon}/>
        </Lg.Item>)
    );

    return (
        <>
            <div className="col-md-6">
                <h3>Captured Pokemon List</h3>
                <Lg className="list-group">
                    {list}
                </Lg>
            </div>
        </>
    );
}
export default CapturedPokemons;
