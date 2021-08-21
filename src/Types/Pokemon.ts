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
     * Pokemon types
     */
    types: Array<string>,
    /**
     * Abilities
     */
    abilities: Array<string>,
    /**
     * Evolution chain
     */
    published?: boolean,
}
