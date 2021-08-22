import React from 'react';
import {render, screen} from '@testing-library/react';

import App from './App';

describe('Find element by text', () => {
    it('Check for component "Captured"', () => {
        render(<App/>);
        const linkElement = screen.getByText(/Captured/i);
        expect(linkElement).toBeInTheDocument();
    });

    it('Check for component "See also"', () => {
        render(<App/>);
        const linkElement = screen.getByText(/See also/i);
        expect(linkElement).toBeInTheDocument();
    });
});
