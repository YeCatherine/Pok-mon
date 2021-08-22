import React, {useEffect, useState} from "react";
import IPokemonData from "../../Types/Pokemon";
import IPokemonImage from "../../Types/IPokemonImage";
import {ListGroup} from "react-bootstrap";
import {getIdFromURL} from "../../Services/Common";
import PokemonListService from "../../Services/PokemonListService";
import PokemonCard from "./PokemonCard";

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
            setEvolutionId(getIdFromURL(response.data.evolution_chain.url));
        });
    }, [pokemon]);

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
                if (chainItem.species) {
                    evolutionList.push(chainItem.species)
                    if (chainItem.evolves_to.length) {
                        getItem(chainItem.evolves_to[0]);
                    }
                }
            }
        )(evolutionChain);
        setEvolution(evolutionList);

    }, [evolutionChain]);

    /**
     * Get Evolution sequense.
     *
     * @param {Array} evolution - List of related pokemons evolution.
     */
    const evolutionList = (evolution:Array<IPokemonData>) => {
        return evolution.map((pokemon, index) => <PokemonCard
            key={index}
            pokemon={pokemon}/>)
    }
    if (!pokemon || !evolution || evolution.length <= 1) return null;

    return (
        <ul className="card text-dark text-center">
            <ListGroup>Evolution Chain</ListGroup>
            {evolutionList}
        </ul>
    )
}
export default EvolutionChain;
