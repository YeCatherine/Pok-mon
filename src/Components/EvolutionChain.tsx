import {useEffect} from "react";
import PokemonListService from "../Services/PokemonListService";

const EvolutionChain = () => {
    useEffect(() => {
        // @todo add evolution chain ID.
        const data = PokemonListService.getEvolutionChain(10);
        const evolution = [];
        let chainItem = data.chain;
        console.log(chainItem);

        // (function getItem(chainItem) {
        //         evolution.push(chainItem.species)
        //         if (chainItem.evolves_to.length) {
        //             getItem(chainItem.evolves_to[0]);
        //         }
        //     }
        // )(chainItem)

        console.log("chain", evolution);
    }, []);
}
export default EvolutionChain;
