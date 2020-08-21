import React, {useEffect, useState} from "react";
import PokemonListService from "../Services/PokemonListService";
import IPokemonData from "../Types/Pokemon";
import IPokemonImage from "../Types/IPokemonImage";
import {ListGroup} from "react-bootstrap";
import {prepareUrl} from "../Services/Common";

/**
 * Item of chain evolution sequence.
 */
interface IEvolutionChainItem {
    species: IPokemonData | null;
    evolves_to: Array<IEvolutionChainItem>;
}

/**
 * Retrieves evolution chain.
 * @param props The pokemon.
 * @constructor The functional component of EvolutionChain.
 */
const EvolutionChain: React.FC<IPokemonImage> = (props) => {
    const {pokemon} = props
    const [evolutionId, setEvolutionId] = useState<number>();
    const [evolutionChain, setEvolutionChain] = useState<IEvolutionChainItem>();
    const [evolution, setEvolution] = useState<Array<IPokemonData>>([]);

    useEffect(() => {
        PokemonListService.getSpecies(pokemon.name).then((response: any) => {
            setEvolutionId(prepareUrl(response.data.evolution_chain.url));
        });
    }, []);

    useEffect(() => {
        if (typeof evolutionId === 'undefined') return;
        PokemonListService.getEvolutionChain(evolutionId)
            .then((response: any) => {
                if (typeof response.data.chain !== "undefined") {
                    setEvolutionChain(response.data.chain);
                }
            })
            .catch((e: any) => {
                console.log(e);
            });
    }, [evolutionId]);

    useEffect(() => {
        const evolutionList: Array<IPokemonData> = [];
        if (typeof evolutionChain === "undefined") return;
        (function getItem(chainItem: IEvolutionChainItem): any {
                console.log("chainItem=", chainItem);
                if (chainItem.species) {
                    evolutionList.push(chainItem.species)
                    console.log("add", chainItem.species);
                    if (chainItem.evolves_to.length) {

                        getItem(chainItem.evolves_to[0]);
                    }
                }
            }
        )(evolutionChain);
        setEvolution(evolutionList);

    }, [evolutionChain])

    if (!pokemon) return <h1>No Chain</h1>;
    return (
        <>
            <ul className="card text-dark text-center">
                <ListGroup>Evolution Chain</ListGroup>
                {evolution && evolution.map(pokemon => <ListGroup>{pokemon.name}</ListGroup>)}
            </ul>
        </>
    )
}
export default EvolutionChain;
