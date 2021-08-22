/**
 * General Pokemon Ability object structure.
 */
interface GenericPokemonAbility {
    name: string
    url: string
}

/**
 * Sprites of the Pokemon: Front default as fallback and Official as main.
 */
interface Sprites {
    front_default: string;
    other: {
        front_default: {
            front_default: string
        }
    }
}

interface StatsList {
    stat: GenericPokemonAbility;
    base_stat: string;
}

/**
 * Pokemon data type.
 */
export default interface IPokemonData {
    /**
     * Unique pokemon id.
     */
    id?: any | null,
    /**
     * Pokemon name.
     */
    name: string,
    names: Array<GenericPokemonAbility>
    /**
     * Url.
     */
    url: string
    /**
     * Weight.
     */
    weight: string,
    /**
     * Height
     */
    height: string,
    /**
     * Order number
     */
    order: string,
    /**
     * Pokemon types.
     */
    types: Array<{ type: GenericPokemonAbility }>

    /**
     * Abilities.
     */
    abilities: Array<{ ability: GenericPokemonAbility }>
    /**
     * Moves interface.
     */
    moves: Array<{ move: GenericPokemonAbility }>
    /**
     * Evolution chain
     */
    published?: boolean,
    sprites: Sprites
    stats: Array<StatsList>
    evolution_chain?: GenericPokemonAbility
}
