import React, { Component } from 'react'
import styled from 'styled-components';

export default class Button extends Component {
    render() {
        const Button = styled.button`
        color: yellow;
        font-size: 1em;
        margin: 1em;
        padding: 0.25em 1em;
        border: 2px solid tomato;
        border-radius: 3px;
      `;

        return (
            <div>
                <Button>New Game</Button>
            </div>
        );
    }
}