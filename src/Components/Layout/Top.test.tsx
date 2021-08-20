import React from 'react';
import Top from "./Top";
import {getByText} from "@testing-library/react";
import { render } from '@testing-library/react';
import {BrowserRouter as Router }from "react-router-dom";

test('testing the navbar Top', () => {
    const myName: string = 'foo';
    const { getByText } = render(
        <div className="App">
            <Router basename={'/pokedex'}>
                <Top/>
            </Router>
        </div>
    );
    expect(getByText(`Pokédex Mission`)).toBeTruthy();
});
