export default interface IPokemonData {
    id?: any | null,
    name: string,
    weight: string,
    height: string,
    order: string,
    types: Array<string>,
    abilities: Array<string>,
    published?: boolean,
}