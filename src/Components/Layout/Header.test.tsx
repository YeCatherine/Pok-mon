import React from 'react';
import Header from "./Header";
import {getByText} from "@testing-library/react";
import {render} from '@testing-library/react';
import {BrowserRouter as Router} from "react-router-dom";

test('testing the navbar Top', () => {
    const myName: string = 'foo';
    const {getByText} = render(
        <div className="App">
            <Router basename={'/pokedex'}>
                <Header/>
            </Router>
        </div>
    );
    expect(getByText(`Pokédex Mission`)).toBeTruthy();
});
