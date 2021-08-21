import React, {useEffect, useState, useContext} from "react";
import PokemonListService from "../Services/PokemonListService";
import {useGlobalContext} from '../Services/Context'

/**
 * The language switcher.
 * @param props
 * @constructor The functional component for switching languages.
 */
const LanguageSwitcher: React.FC = (props) => {
    const [currentLanguage, setCurrentLanguage] = useState<string>('en');
    const [languageList, setLanguageList] = useState<Array<string>>([]);
    const {language, setLanguage} = useGlobalContext()

    useEffect(() => {
        PokemonListService.getLanguages()
            .then((response: any) => {
                setLanguageList(response.data.results.map(language => language.name));
            })
            .catch((e: any) => {
                console.log(e);
            })
    }, []);

    const handleChange = (event) => {
        setCurrentLanguage(event.target.value)
        setLanguage(event.target.value)
    }

    return (
        <select name="languages" value={currentLanguage}
                onChange={handleChange}>
            {languageList.map(language => <option
                value={language}>{language}</option>)}
        </select>
    );
}
export default LanguageSwitcher;
