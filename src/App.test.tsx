import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

// Unit test
describe('Find element by text', () => {
    it('Check for component "Captured Pokemon List"', () => {
        render(<App/>);
        const linkElement = screen.getByText(/Captured Pokemon List/i);
        expect(linkElement).toBeInTheDocument();
    });

    it('Check for component "Random not Captured Pokemon"', () => {
        render(<App/>);
        const linkElement = screen.getByText(/Random not Captured Pokemon/i);
        expect(linkElement).toBeInTheDocument();
    });
});
