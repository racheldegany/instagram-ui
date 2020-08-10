import React from 'react';
import'./Username.scss';

function Username(props) {

    const size = props.size || 'sm';
    const padding = props.padding ? 'pl-2' : '';
    const className = 'Username_' + size + ` ${padding}`;
    return (
        <span className={`Username text-dark font-weight-bold ${className}`}>
            {props.name}
        </span>
    );
}

export default Username;